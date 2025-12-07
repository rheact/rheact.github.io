import server from "api";
import { useCallback, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Progress } from "reactstrap";
import * as STORE from "store";
import { RESET_RESULTS } from "store";

const GenerateButton = () => {
    const state = useSelector((s) => s);
    const dispatch = useDispatch();
    const [pending, changePending] = useReducer((s, delta) => s + delta, 0);
    const maxJobs = 3;

    const onClick = useCallback(async () => {
        dispatch(RESET_RESULTS());
        changePending(maxJobs);

        const promiseCalculations = server
            .getCalculationBlock(state)
            .then((data) => {
                dispatch(STORE.SET_CALCULATIONS(JSON.parse(data)));
                return data;
            })
            .finally(() => {
                changePending(-1);
            });

        const promiseCameo = server
            .getCameoTable(state.compound)
            .then((data) => {
                dispatch(STORE.SET_CAMEO(JSON.parse(data)));
                return data;
            })
            .finally(() => {
                changePending(-1);
            });

        const hNums = {};
        const allCompounds = state.compound.reactants
            .concat(state.compound.products)
            .concat(state.compound.diluents);
        const filteredCompounds = allCompounds.filter((c) => !!c.productName);
        filteredCompounds.forEach((c) => {
            hNums[c.productName] = {
                hNumbers: c.hNumbers,
                hStatements: c.hStatements,
            };
        });
        dispatch(STORE.SET_HNUMS(hNums));

        const promiseHazard = server
            .getHazardMatrix(hNums)
            .then((data) => {
                dispatch(STORE.SET_HAZARDS(data));
                return data;
            })
            .finally(() => {
                changePending(-1);
            });

        Promise.all([
            promiseCalculations, promiseCameo, promiseHazard
        ]).then((values) => {
            dispatch(STORE.SET_TIME(new Date().toLocaleString()))
            return values
        })
        .catch((e) => {
            alert(e.message)
            changePending(-1*maxJobs)
        })
    }, [state, dispatch]);

    return (
        <div className="p-5">
            <div className="w-100 d-flex flex-column align-items-center">
                <i
                    className={
                        "bi bi-gear-fill display-1 " +
                        (pending > 0 ? "spin" : "")
                    }
                />
                <Button
                    disabled={pending > 0}
                    color="success"
                    className="circle"
                    size="lg"
                    onClick={onClick}
                >
                    { pending > 0 && (
                        <Spinner size="sm">
                            Loading...
                        </Spinner>
                    )}
                    Click Here to Generate Report
                </Button>
                {pending > 0 && (
                    <div className="w-100 mt-2">
                        <Progress
                            animated
                            striped
                            color="danger"
                            value={((maxJobs - pending) / maxJobs) * 100}
                            className="px-0"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default GenerateButton;
