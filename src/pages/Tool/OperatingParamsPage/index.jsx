import { NavLink } from 'react-router-dom';
import { Button, Col, Col as div, Container, Row } from 'reactstrap';
import R from '../routes';
import { AlertAldrichOnly, SearchBox } from './SearchBox';
import { CpCard, HeatCard, PressureCard, TemperatureCard } from './ParamCards';
import { DiluentDropzone, ProductDropzone, ReactantDropzone } from './SdsCards';

const OperatingParamsPage = () => {
  return (
    <Container>

      {/* Navigation Buttons */}

      <div className="sticky-top w-100 d-flex align-items-center p-2 border" style={{ backgroundColor: 'white' }}>

        <Button tag={NavLink} to={R.ROUTE_REPORT_DETAILS} size="lg" color="primary" className="ms-auto">
          <i className="bi bi-pencil-fill me-1" />
          Add Details to Report
        </Button>

        <Button tag={NavLink} to={R.ROUTE_RESULTS} size="lg" color="danger" className="ms-2">
          <i className="bi bi-file-earmark-bar-graph-fill me-1" />
          Generate Report
        </Button>
        <i className="bi bi-arrow-right h3 m-0 ms-2" />
      </div>

      {/* Operating Parameters */}

      <h4>Operation Parameters</h4>

      <Row className="mt-2">
        <Col md={6}>
          <TemperatureCard />
        </Col>
        <Col md={6}>
          <PressureCard />
        </Col>
      </Row>

      <Row className="mt-2">
        <Col md={6}>
          <HeatCard />
        </Col>
        <Col md={6}>
          <CpCard />

        </Col>
      </Row>

      {/* SDS Upload */}

      <h4 className="mt-5">SDS Upload</h4>

      <Row className="mt-2">
        <SearchBox />
      </Row>

      <Row className="mt-2">
        <div>
          <AlertAldrichOnly />
        </div>
      </Row>

      <div className="mt-2">
        <ReactantDropzone />
      </div>

      <div className="mt-2">
        <ProductDropzone />
      </div>

      <div className="mt-2">
        <DiluentDropzone />
      </div>

    </Container>
  );

}

export default OperatingParamsPage;
