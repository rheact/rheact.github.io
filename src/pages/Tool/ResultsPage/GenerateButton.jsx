import { useCallback, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Progress } from "reactstrap";
import server from '../../../api';
import { SET_CALCULATIONS, SET_CAMEO, SET_HAZARDS, SET_HNUMS } from '../store';

const GenerateButton = () => {
  const state = useSelector(s => s);
  const dispatch = useDispatch();
  const [pending, changePending] = useReducer((s, delta) => s + delta, 0);
  const maxJobs = 3;

  const onClick = useCallback(async () => {
    changePending(maxJobs);

    const hNums = {};
    const allCompounds = state.compound.reactants.concat(state.compound.products).concat(state.compound.diluents);
    const filteredCompounds = allCompounds.filter(c => !!c.productName);
    filteredCompounds.forEach(c => {
        hNums[c.productName] = {
            hNumbers: c.hNumbers,
            hStatements: c.hStatements
        };
    });

    const calculationBlock = server
      .getCalculationBlock(state.operatingParams, state.compound)
      .then((data) => {
        changePending(-1);
        return data;
      });

    const cameoMatrix = server
      .getCameoTable(state.compound)
      .then((data) => {
        changePending(-1);
        return data;
      });

    const hazardMatrix = server
      .getHazardMatrix(hNums)
      .then((data) => {
        changePending(-1);
        return data;
      });

    try {
      const data = await Promise.all([calculationBlock, cameoMatrix, hazardMatrix]);
      dispatch(SET_CALCULATIONS(JSON.parse(data[0])));
      dispatch(SET_CAMEO(JSON.parse(data[1])));
      dispatch(SET_HAZARDS(data[2]));
      dispatch(SET_HNUMS(hNums));
    } catch (e) {
      console.log("ERROR IN GENERATING RESULTS.");
      console.error(e);
      return;
    }
  }, [state, pending]);

  return (
    <Card color="light" className="p-5">
        <div className="w-100 d-flex flex-column align-items-center">
          <i className={"bi bi-gear-fill display-1 " + (pending > 0 ? "spin" : "")} />
          <Button disabled={pending > 0} color="success" className="circle" size="lg" onClick={onClick}>Click Here to Generate Report</Button>
          {pending > 0 && (
            <div className="w-100 mt-2">
              <Progress animated striped color="danger" value={((maxJobs - pending) / maxJobs) * 100} className="px-0" />
            </div>
          )}
        </div>
    </Card>
      );
};

export default GenerateButton;
