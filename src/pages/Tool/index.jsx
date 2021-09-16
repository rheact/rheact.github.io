import { Col, Container, Row } from 'reactstrap';
import Submenu from './Submenu';
import ProjectCard from './cards/ProjectCard';

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
                <ProjectCard />
              </Col>
              <Col>

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
