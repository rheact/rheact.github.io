import { Col, Container, Row } from 'reactstrap';
import Submenu from './Submenu';
import ProjectCard from './cards/ProjectCard';
import ReactionCard from './cards/ReactionCard';
import ChemicalDetails from './cards/ChemicalDetails';
import AlertReportOnly from './cards/AlertReportOnly';

const ToolPage = () => {
  return (
    <Container fluid>
      <Row>
        <Col md={3}>
          <Submenu/>
        </Col>
        <Col>
          {/* This is a page */}
          <Container>
            <Row>
              <Col>
                <AlertReportOnly />
              </Col>
            </Row>

            <Row className="my-1">
              <Col md={6}>
                <ProjectCard />
              </Col>
              <Col md={6}>
                <ChemicalDetails />
              </Col>
            </Row>

            <Row className="my-1">
              <Col>
                <ReactionCard />
              </Col>
            </Row>
          </Container>
          {/* ! This is a page */}
        </Col>
      </Row>
    </Container>
  );
};

export default ToolPage;
