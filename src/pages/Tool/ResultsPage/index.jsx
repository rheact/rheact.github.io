import { useCallback, useReducer } from "react";
import { useSelector } from "react-redux";
import { Button, Card, CardBody, CardHeader, Progress, Table } from "reactstrap";
import server from '../../../api';
import './results.css';

const GenerateButton = () => {
  const state = useSelector(s => s);
  const [pending, changePending] = useReducer((s, delta) => s + delta, 0);
  const maxJobs = 3;

  const onClick = useCallback(async () => {
    changePending(maxJobs);

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
      .getHazardMatrix(state.compound)
      .then((data) => {
        changePending(-1);
        return data;
      });
  }, [state, pending]);

  return (
    <Card color="light">
      <CardHeader className="fw-bold">Generating Results</CardHeader>

      <CardBody>

        <div className="w-100 d-flex flex-column align-items-center">
          <i className="bi bi-gear-wide-connected display-1" />
          <Button color="success" className="circle" size="lg" onClick={onClick}>Click Here to Generate Report</Button>
          {pending > 0 && (
            <div className="w-100 mt-2">
              <Progress animated striped color="danger" value={((maxJobs - pending) / maxJobs) * 100} className="px-0" />
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

const ResultsPage = () => {
  const onPrint = useCallback(() => {
    window.print();
  }, []);

  return (
    <>
      <div className="sticky-top w-100 d-flex align-items-center p-2 border" style={{ backgroundColor: 'white' }}>
        <Button className="ms-auto" color="secondary">
          <i className="bi bi-person-lines-fill me-1" />
          Send Feedback
        </Button>

        <Button color="primary" className="ms-1" onClick={onPrint}>
          <i className="bi bi-printer-fill me-1" />
          Print
        </Button>
      </div>

      <div className="mt-2">
        <GenerateButton />
      </div>

      <section id="printable" className="px-5">
        <div className="text-center">
          <h1 className="fw-bolder display-2">Report</h1>
          <hr />
        </div>

        <div>
          <h2>Calculations</h2>
        </div>

        <div>
          <Table dark bordered>

            <tbody>
              <tr>
                <td>Adiabatic temperature change</td>
                <td>62 &deg;C</td>
              </tr>
              <tr>
                <td>Calculated final temperature</td>
                <td>502 &deg;C</td>
              </tr>
              <tr>
                <td>Calculated final pressure</td>
                <td>5 bars</td>
              </tr>
            </tbody>

          </Table>
        </div>

        <div>
          <h2>Cameo Matrix</h2>
          <hr />
        </div>

        <div>
          <Table bordered>
            <tbody>

              <tr>
                <td></td>
                <td className="bg-success fw-bolder text-center py-4">Hydrogen</td>
              </tr>

              <tr>
                <td className="bg-success fw-bolder text-center py-4">Oxygen</td>
                <td className="text-center py-4">Incompatible <i className="bg-danger bi-x-lg" /></td>
                <th className="bg-success fw-bolder text-center py-4">Oxygen</th>
              </tr>


              <tr>
                <td className="bg-success fw-bolder text-center py-4">Carbon Dioxide</td>
                <td className="text-center py-4">Compatible <i className="bg-success bi-check-lg" /></td>
                <td className="text-center py-4">Compatible <i className="bg-success bi-check-lg" /></td>
              </tr>
            </tbody>
          </Table>
        </div>
      </section>
    </>
  );
};

export default ResultsPage;
