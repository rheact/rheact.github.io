import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToggle } from "react-use";
import {
    ButtonDropdown,
    Card,
    CardBody, DropdownItem, DropdownMenu, DropdownToggle, Input, InputGroup, InputGroupText
} from "reactstrap";
import {
    SET_CP,
    SET_CP_UNIT,
    SET_HEAT_OF_REACTION,
    SET_HEAT_OF_REACTION_UNIT,
    SET_PRESSURE,
    SET_PRESSURE_UNIT,
    SET_TEMPERATURE,
    SET_TEMPERATURE_UNIT
} from "../../../store/reducer";
import { CP_UNITS_LIST, HEAT_UNITS_LIST, PRESSURE_UNITS_LIST, TEMPERATURE_UNITS_LIST } from '../../../units/constants';
import CpIcon from "./icons/cp.png";
import HeatIcon from "./icons/heat.png";
import PressureIcon from "./icons/pressure.png";
import TemperatureIcon from "./icons/temperature.png";

const ParamCard = ({ label, icon, unitList, name, valueAction, unitAction }) => {
    const value = useSelector((state) => state.operatingParams[name]);
    const unit = useSelector((state) => state.operatingParams[name + "Unit"]);
    const [unitDropdownState, toggleUnitDropdown] = useToggle();
    const dispatch = useDispatch();

    const onValueChange = useCallback(
        (e) => {
            dispatch(valueAction(e.target.value));
        },
        [dispatch, valueAction]
    );

    useEffect(() => {
        if(!unit) {
            dispatch(unitAction(unitList[0]));
        }
    }, [dispatch, unit, unitAction, unitList]);

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
                        placeholder={`Enter ${unit}`}
                    />
                </InputGroup>

                <ButtonDropdown toggle={toggleUnitDropdown} isOpen={unitDropdownState} className="mt-2">
                    <DropdownToggle color="dark" caret>{unit}</DropdownToggle>
                    <DropdownMenu>
                        {unitList &&
                            unitList.map((e) => (
                                <DropdownItem onClick={() => dispatch(unitAction(e))} key={e}>
                                    {e}
                                </DropdownItem>
                            ))}
                    </DropdownMenu>
                </ButtonDropdown>
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
        unitAction: SET_TEMPERATURE_UNIT,
        unitList: TEMPERATURE_UNITS_LIST,
    };

    return <ParamCard {...props} />;
};

export const PressureCard = () => {
    const props = {
        label: "Pressure",
        icon: PressureIcon,
        name: "pressure",
        valueAction: SET_PRESSURE,
        unitAction: SET_PRESSURE_UNIT,
        unitList: PRESSURE_UNITS_LIST,
    };

    return <ParamCard {...props} />;
};

export const CpCard = () => {
    const props = {
        label: "Cp (mix)",
        icon: CpIcon,
        name: "cp",
        valueAction: SET_CP,
        unitAction: SET_CP_UNIT,
        unitList: CP_UNITS_LIST,
    };

    return <ParamCard {...props} />;
};

export const HeatCard = () => {
    const props = {
        label: "Heat of Reaction",
        icon: HeatIcon,
        name: "heatOfReaction",
        valueAction: SET_HEAT_OF_REACTION,
        unitAction: SET_HEAT_OF_REACTION_UNIT,
        unitList: HEAT_UNITS_LIST,
    };

    return <ParamCard {...props} />;
};
