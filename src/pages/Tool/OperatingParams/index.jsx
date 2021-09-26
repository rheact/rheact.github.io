import { Card, CardBody, CardHeader, Col, Container, Input, InputGroup, InputGroupAddon, Row } from 'reactstrap';
import PressureIcon from './pressure.png';
import TemperatureIcon from './temperature.png';
import HeatIcon from './heat.png';
import CpIcon from './cp.png';

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
              <InputGroupAddon addonType="append">
                {unit}
              </InputGroupAddon>
            </InputGroup>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

const OperatingParams = () => {
  return (
    <Container>
      <Row className="py-2">
        <Col>
          <ParamCard label="Temperature" unit="&deg; C" icon={TemperatureIcon} />
        </Col>
        <Col>
          <ParamCard label="Pressure" unit="bars" icon={PressureIcon} />
        </Col>
      </Row>

      <Row className="py-2">
        <Col>
          <ParamCard label="Heat of Reaction" unit="cal/g" icon={HeatIcon} />
        </Col>
        <Col>
          <ParamCard label="Cp (mix)" unit="cal/g/&deg; C" icon={CpIcon} />
        </Col>
      </Row>
    </Container>
  );

}

export default OperatingParams;
