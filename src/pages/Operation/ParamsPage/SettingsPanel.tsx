import { FC, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardBody, CardHeader, Input, InputGroup, InputGroupText } from "reactstrap";
import { OperatingParams, RheactState, SET_CP_UNIT, SET_HEAT_OF_REACTION_UNIT, SET_PRESSURE_UNIT, SET_TEMPERATURE_UNIT } from "store";
import { CP_UNITS_LIST, HEAT_UNITS_LIST, PRESSURE_UNITS_LIST, TEMPERATURE_UNITS_LIST } from "units";

type UnitChangeSelectorProps = {
    list: string[],
    keyName: keyof OperatingParams
    unitAction: any,
    label: string,
};

const UnitChangeSelector: FC<UnitChangeSelectorProps> = ({ list, keyName, unitAction, label }) => {
    const dispatch = useDispatch();
    const currentUnit = useSelector<RheactState>(state => state.operatingParams[keyName]) as string;

    const onSelect = useCallback((unit: string) => {
        dispatch(unitAction(unit));
    }, [dispatch, unitAction]);

    return (
        <InputGroup className="mt-2">
            <InputGroupText>{label}</InputGroupText>
            <Input type="select" value={currentUnit || ''} onChange={e => onSelect(e.target.value)}>
                {list.map((u) => (
                    <option key={u} value={u}>{u}</option>
                ))}
            </Input>
        </InputGroup>
    );
};

const SettingsPanel = () => {
    return (
        <Card>
            <CardHeader className="fw-bolder">Settings</CardHeader>
            <CardBody>
                <UnitChangeSelector
                    keyName="temperatureUnit"
                    label="Temperature Unit"
                    unitAction={SET_TEMPERATURE_UNIT}
                    list={TEMPERATURE_UNITS_LIST}
                />

                <UnitChangeSelector
                    keyName="pressureUnit"
                    label="Pressure Unit"
                    unitAction={SET_PRESSURE_UNIT}
                    list={PRESSURE_UNITS_LIST}
                />

                <UnitChangeSelector
                    keyName="heatOfReactionUnit"
                    label="Heat of Reaction Unit"
                    unitAction={SET_HEAT_OF_REACTION_UNIT}
                    list={HEAT_UNITS_LIST}
                />

                <UnitChangeSelector
                    keyName="cpUnit"
                    label="Specific Heat Capacity Unit"
                    unitAction={SET_CP_UNIT}
                    list={CP_UNITS_LIST}
                />
            </CardBody>
        </Card>
    );
};

export default SettingsPanel;
