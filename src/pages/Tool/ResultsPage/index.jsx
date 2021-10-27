import { Alert, Button, Col, Container, Navbar, Progress, Row, Table } from "reactstrap";
import { useCallback } from "react";
import './results.css';
import { useSelector } from "react-redux";

const GenerateButton = () => {
  const state = useSelector(s => s);
  const onClick = useCallback(() => {
    
  }, [state]);

  return (
    <Container className="py-2">
      <Row>
        <Button className="w-100" color="success" size="lg">Click Here to Generate Report</Button>
      </Row>
      <Row className="mt-2">
        <Progress striped color="success" value="25" />
        {JSON.stringify(state, '4')}
      </Row>
    </Container>
  );
};

const ResultsPage = () => {
  const onPrint = useCallback(() => {
    window.print();
  }, []);

  return (
    <>
      <Navbar className="border-bottom sticky-top" style={{ backgroundColor: 'white' }}>
        <Button className="ms-auto"  color="secondary">
          <i className="bi bi-person-lines-fill me-1" />
          Send Feedback
        </Button>

        <Button color="primary" className="ms-1" onClick={onPrint}>
          <i className="bi bi-printer-fill me-1" />
          Print
        </Button>
      </Navbar>

      <GenerateButton />

      <Container id="printable" className="px-5">
        <Row>
          <Col className="text-center">
            <h1 className="fw-bolder display-2">Report</h1>
            <hr />
          </Col>
        </Row>

        <Row>
          <Col>
            <h2>Calculations</h2>
          </Col>
        </Row>

        <Row>
          <Col>
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
          </Col>
        </Row>

        <Row>
          <Col>
            <h2>Alerts</h2>
          </Col>
        </Row>

        <Row>
          <Col>
            <Alert color="danger" className="fw-bolder">
              <Row>
                <Col xs={1}>
                  <i className="bi bi-exclamation-diamond-fill"/>
                </Col>
                <Col>
                  Final temperature exceeds Benzene's boiling point
                </Col>
                <Col xs={3}>
                  502 &deg;C
                  exceeds
                  300 &deg;C
                </Col>
              </Row>
            </Alert>

            <Alert color="danger" className="fw-bolder">
              <Row>
                <Col xs={1}>
                  <i className="bi bi-exclamation-diamond-fill"/>
                </Col>
                <Col>
                  Final temperature exceeds Reactant 2 boiling point
                </Col>
                <Col xs={3}>
                  502 &deg;C
                  exceeds
                  300 &deg;C
                </Col>
              </Row>
            </Alert>
          </Col>
        </Row>

        <Row>
          <Col>
            <h2>Cameo Matrix</h2>
            <hr />
          </Col>
        </Row>

        <Row>
          <Col>
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
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ResultsPage;
