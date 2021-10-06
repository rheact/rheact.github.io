import { Col, Container, Row, Button } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import R from '../routes';
import { actions as A } from '../store';

import ProjectCard from './ProjectCard';
import ReactionCard from './ReactionCard';
import ChemicalDetails from './ChemicalDetails';
import AlertReportOnly from './AlertReportOnly';
import SideReactions from './SideReactionsCard';

const ReportDetails = () => {
  const {
    type,
    nameOfResearcher,
    projectTitle,
    labLocation,
    principalInvestigator,
    organization,
    chemicalScheme,
    description,
    compound,
  } = useSelector(store => store);


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

      <Row className="mt-2">
        <Col className="d-flex justify-content-end">
          <NavLink to={R.ROUTE_RESULTS}>
            <Button size="lg" color="danger">
              <i className="bi bi-file-earmark-bar-graph-fill me-1" />
              Generate Report
            </Button>
          </NavLink>
        </Col>
      </Row>
    </Container>
  );

}

export default ReportDetails;
