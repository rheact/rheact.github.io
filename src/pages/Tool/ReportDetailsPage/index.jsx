import { NavLink } from 'react-router-dom';
import { Button, Col, Container, Row } from 'reactstrap';
import R from '../routes';
import AlertReportOnly from './AlertReportOnly';
import ChemicalDetails from './ChemicalDetails';
import ProjectCard from './ProjectCard';
import ReactionCard from './ReactionCard';
import SideReactions from './SideReactionsCard';


const ReportDetails = () => {
  return (
    <>
      {/* Navigation Buttons */}

      <div className="sticky-top w-100 d-flex align-items-center p-2 border" style={{ backgroundColor: 'white' }}>
        <i className="bi bi-arrow-left h3 m-0 ms-2" />
        <Button tag={NavLink} to={R.ROUTE_OPERATION_DETAILS} color="primary" className="ms-2">
          <i className="bi bi-box me-1" />
          Change Operation Parameters
        </Button>

        <Button tag={NavLink} to={R.ROUTE_RESULTS} color="danger" className="ms-auto">
          <i className="bi bi-file-earmark-bar-graph-fill me-1" />
          Generate Report
        </Button>
        <i className="bi bi-arrow-right h3 m-0 ms-2" />
      </div>
      <Container className="mt-2">
        <div>
          <AlertReportOnly />
        </div>

        <Row>
          <Col>
            <ReactionCard />
          </Col>
        </Row>

        <Row className="mt-1">
          <Col md={6}>
            <ProjectCard />
          </Col>
          <Col md={6}>
            <ChemicalDetails />
          </Col>
        </Row>

        <Row className="mt-1">
          <Col>
            <SideReactions />
          </Col>
        </Row>
      </Container>
    </>
  );

}

export default ReportDetails;
