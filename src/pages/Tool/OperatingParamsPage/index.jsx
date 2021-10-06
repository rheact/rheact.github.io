import { NavLink } from 'react-router-dom';
import { Button, Col, Container, Row } from 'reactstrap';
import R from '../routes';
import AlertAldrichOnly from './AlertAldrichOnly';
import { CpCard, HeatCard, PressureCard, TemperatureCard } from './ParamCards';
import SectionSds from './SectionSds';

const OperatingParamsPage = () => {
  return (
    <Container>

      {/* SDS Upload */}

      <Row>
        <Col>
          <AlertAldrichOnly />
        </Col>
      </Row>

      <Row className="mt-2">
        <SectionSds />
      </Row>

      {/* Operating Parameters */}

      <Row className="mt-2">
        <Col>
          <TemperatureCard />
        </Col>
        <Col>
          <PressureCard />
        </Col>
      </Row>

      <Row className="mt-2">
        <Col>
          <HeatCard />
        </Col>
        <Col>
          <CpCard />
        </Col>
      </Row>

      {/* Navigation Buttons */}

      <Row className="mt-2">
        <Col className="d-flex justify-content-end">
          <NavLink to={R.ROUTE_REPORT_DETAILS}>
            <Button size="lg" color="primary">
              <i className="bi bi-pen me-1" />
              Add more information to Report
            </Button>
          </NavLink>
          <NavLink to={R.ROUTE_RESULTS}>
            <Button size="lg" color="danger" className="ms-2">
              <i className="bi bi-file-earmark-bar-graph-fill me-1" />
              Generate Report
            </Button>
          </NavLink>
        </Col>
      </Row>

    </Container>
  );

}

export default OperatingParamsPage;
