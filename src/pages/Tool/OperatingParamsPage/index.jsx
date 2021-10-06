import { Card, CardBody, CardHeader, Col, Container, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Input, InputGroup, Row, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import R from '../routes';
import SectionSds from './SectionSds';
import AlertAldrichOnly from './AlertAldrichOnly';

import CpIcon from './icons/cp.png';
import HeatIcon from './icons/heat.png';
import PressureIcon from './icons/pressure.png';
import TemperatureIcon from './icons/temperature.png';

const ParamCard = ({ label, unit, icon }) => {
  return (
    <Card>
      <CardHeader className="fw-bolder">
        {label}
      </CardHeader>
      <CardBody tag={Container}>
        <Row>
          <Col xs={1}>
            <img src={icon} width={32} />
          </Col>
          <Col xs={11}>
            <InputGroup>
              <Input />
              <Dropdown group>
                <DropdownToggle outline caret>
                  {unit}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>Header</DropdownItem>
                  <DropdownItem disabled>Action</DropdownItem>
                  <DropdownItem>Another Action</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Another Action</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </InputGroup>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

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
          <ParamCard label="Temperature" unit="&deg; C" icon={TemperatureIcon} />
        </Col>
        <Col>
          <ParamCard label="Pressure" unit="bars" icon={PressureIcon} />
        </Col>
      </Row>

      <Row className="mt-2">
        <Col>
          <ParamCard label="Heat of Reaction" unit="cal/g" icon={HeatIcon} />
        </Col>
        <Col>
          <ParamCard label="Cp (mix)" unit="cal/g/&deg; C" icon={CpIcon} />
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
