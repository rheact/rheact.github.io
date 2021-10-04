import { Card, Col, Container, Row } from 'reactstrap';
import P2SACLogo from './P2SAC.jpg';

const GuidePage = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Card className="p-1">
            <div className="text-center">
              <h1 className="display-1 fw-bolder">RHEACT</h1>
              <h2 className="text-muted">Reactive Hazards Evaluation & Analysis Compilation Tool</h2>

              <hr />

              <div>
              Developed by:
              </div>

              <img height="100px" src="https://sites.utexas.edu/ils/files/2019/08/CISTAR-Logo-Medium-768x301.jpg" />
              {/* <img height="60px" src="https://marcom.purdue.edu/app/uploads/2020/01/2_UniversityLogo_Horizontal.png" /> */}
              <img height="100px" src={P2SACLogo} />
            </div>

          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default GuidePage;
