import { Col, Container, Row } from 'reactstrap';
import ProjectCard from './ProjectCard';
import ReactionCard from './ReactionCard';
import ChemicalDetails from './ChemicalDetails';
import AlertReportOnly from './AlertReportOnly';
import SideReactions from './SideReactionsCard';

const ReportDetails = () => {
  return (
    <Container>
      <Row>
        <Col>
          <AlertReportOnly />
        </Col>
      </Row>

      <Row>
        <Col>
          <ReactionCard />
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
          <SideReactions />
        </Col>
      </Row>
    </Container>
  );

}

export default ReportDetails;
