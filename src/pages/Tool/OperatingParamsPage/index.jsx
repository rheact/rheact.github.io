import { Card, CardBody, CardHeader, Col, Container, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Input, InputGroup, Row } from 'reactstrap';
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
      <Row>
        <Col>
          <AlertAldrichOnly />
        </Col>
      </Row>

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

      <Row className="mt-2">
        <SectionSds />
      </Row>
    </Container>
  );

}

export default OperatingParamsPage;
