import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardBody, CardHeader, Col, Container, Input, InputGroup, Row } from 'reactstrap';
import { SET_CP, SET_HEAT_OF_REACTION, SET_PRESSURE, SET_TEMPERATURE } from '../store';
import CpIcon from './icons/cp.png';
import HeatIcon from './icons/heat.png';
import PressureIcon from './icons/pressure.png';
import TemperatureIcon from './icons/temperature.png';

const ParamCard = ({ label, icon, unitList, key, valueAction }) => {
  const value = useSelector(store => store.operatingParams[key]);
  const dispatch = useDispatch();
  const [unit, setCurrUnit] = useState(unitList[0]);

  const onValueChange = useCallback((e) => {
    dispatch(valueAction(e.target.value));
  }, [unit]);

  return (
    <Card>
      <CardHeader className="fw-bolder bg-warning text-white">
        {label}
      </CardHeader>
      <CardBody tag={Container}>
        <Row>
          <Col sm={1}>
            <img src={icon} width={32} />
          </Col>
          <Col>
            <InputGroup>
              <Input value={value} onChange={onValueChange} placeholder={`Enter ${label} in ${unit}`} />
                {unitList && unitList.map((e =>
                  (<Button color="dark" outline active={e === unit} onClick={() => (e)}>{e}</Button>)
                ))}
            </InputGroup>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export const TemperatureCard = () => {
  const props = {
    label: 'Temperature',
    icon: TemperatureIcon,
    key: 'temperature',
    valueAction: SET_TEMPERATURE,
    unitList: ['°C', '°F', 'K'],
  };

  return <ParamCard {...props} />
};

export const PressureCard = () => {
  const props = {
    label: 'Pressure',
    icon: PressureIcon,
    key: 'pressure',
    valueAction: SET_PRESSURE,
    unitList: ['bar'],
  };

  return <ParamCard {...props} />
};

export const CpCard = () => {
  const props = {
    label: 'Cp (mix)',
    icon: CpIcon,
    key: 'cp',
    valueAction: SET_CP,
    unitList: ['cal/g/°C'],
  };

  return <ParamCard {...props} />
};

export const HeatCard = () => {
  const props = {
    label: 'Heat of Reaction',
    icon: HeatIcon,
    key: 'heatOfReaction',
    valueAction: SET_HEAT_OF_REACTION,
    unitList: ['cal/g'],
  };

  return <ParamCard {...props} />
};
