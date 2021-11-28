import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardBody, DropdownItem, DropdownMenu, DropdownToggle, Input, InputGroup, InputGroupText, UncontrolledButtonDropdown
} from "reactstrap";
import {
  SET_CP,
  SET_HEAT_OF_REACTION,
  SET_PRESSURE,
  SET_TEMPERATURE
} from "../store";
import CpIcon from "./icons/cp.png";
import HeatIcon from "./icons/heat.png";
import PressureIcon from "./icons/pressure.png";
import TemperatureIcon from "./icons/temperature.png";

const ParamCard = ({ label, icon, unitList, name, valueAction }) => {
    const value = useSelector((state) => state.operatingParams[name]);
    const dispatch = useDispatch();
    const [unit, setCurrUnit] = useState(unitList[0]);

    const onValueChange = useCallback(
        (e) => {
            dispatch(valueAction(e.target.value));
        },
        [dispatch, valueAction]
    );

    return (
        <Card className={!value ? "border-danger" : "bg-light"}>
            <CardBody className="d-flex flex-column">
                <img src={icon} width={64} alt={label} className="mx-auto" />
                <span className="fw-bolder text-center">{label}</span>

                <InputGroup>
                  <InputGroupText className="bg-light">Value</InputGroupText>
                  <Input
                      value={value}
                      invalid={!value}
                      onChange={onValueChange}
                      placeholder={`Enter ${label} in ${unit}`}
                  />
                </InputGroup>

                <UncontrolledButtonDropdown className="mt-2">
                    <DropdownToggle color="dark" caret>{unit}</DropdownToggle>
                    <DropdownMenu>
                        {unitList &&
                            unitList.map((e) => (
                                <DropdownItem outline onClick={() => e}>
                                    {e}
                                </DropdownItem>
                            ))}
                    </DropdownMenu>
                </UncontrolledButtonDropdown>
            </CardBody>
        </Card>
    );
};

export const TemperatureCard = () => {
    const props = {
        label: "Temperature",
        icon: TemperatureIcon,
        name: "temperature",
        valueAction: SET_TEMPERATURE,
        unitList: ["°C", "°F", "K"],
    };

    return <ParamCard {...props} />;
};

export const PressureCard = () => {
    const props = {
        label: "Pressure",
        icon: PressureIcon,
        name: "pressure",
        valueAction: SET_PRESSURE,
        unitList: ["bar"],
    };

    return <ParamCard {...props} />;
};

export const CpCard = () => {
    const props = {
        label: "Cp (mix)",
        icon: CpIcon,
        name: "cp",
        valueAction: SET_CP,
        unitList: ["cal/g/°C"],
    };

    return <ParamCard {...props} />;
};

export const HeatCard = () => {
    const props = {
        label: "Heat of Reaction",
        icon: HeatIcon,
        name: "heatOfReaction",
        valueAction: SET_HEAT_OF_REACTION,
        unitList: ["cal/g"],
    };

    return <ParamCard {...props} />;
};
