import { Card, Col, Container, Row } from 'reactstrap';

const Guide = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Card className="p-1">
            <div className="text-center">
              <h1 className="display-1 fw-bolder">RHEACT</h1>
              <img width="200px" src="https://sites.utexas.edu/ils/files/2019/08/CISTAR-Logo-Medium-768x301.jpg" />
            </div>

          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Guide;
