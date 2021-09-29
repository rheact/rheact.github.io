import { Button, Col, Container, Navbar, Row, Table } from "reactstrap";
import { useCallback } from "react";

const Results = () => {
  const onPrint = useCallback(() => {
    window.print();
  }, []);


  return (
    <>
      <Navbar>
        <Button outline color="secondary">
          <i className="bi bi-person-lines-fill me-1" />
          Send Feedback
        </Button>

        <Button color="primary" className="ms-auto" onClick={onPrint}>
          <i className="bi bi-printer-fill me-1" />
          Print
        </Button>
      </Navbar>

      <Container id="printable" className="px-5">
        <Row>
          <Col className="text-center">
            <hr />
            <h1 className="fw-bolder display-2">Report</h1>
            <hr />
          </Col>
        </Row>

        <Row>
          <Col>
            <h2>Calculations</h2>
            <hr />
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

export default Results;
