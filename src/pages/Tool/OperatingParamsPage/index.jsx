import { NavLink } from 'react-router-dom';
import { Button, Col, Container, Row } from 'reactstrap';
import R from '../routes';
import { AlertAldrichOnly, SearchBox } from './SearchBox';
import { CpCard, HeatCard, PressureCard, TemperatureCard } from './ParamCards';
import SectionSds from './SectionSds';

const OperatingParamsPage = () => {
  return (
    <Container>
    
      {/* Operating Parameters */}

      <h4>Operation Parameters</h4>

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

      {/* SDS Upload */}

      <h4 className="mt-5">SDS Upload</h4>

      <Row className="mt-2">
        <SearchBox />
      </Row>

      <Row className="mt-2">
        <Col>
          <AlertAldrichOnly />
        </Col>
      </Row>

      <Row className="mt-2">
        <SectionSds />
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
