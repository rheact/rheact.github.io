import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { FC, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Card,
    CardBody, Input, InputGroup, InputGroupText
} from "reactstrap";
import { RheactState } from 'store';

type BaseCardProps = {
    label: string,
    icon: string,
    unitList: string[],
    name: string,
    valueAction: ActionCreatorWithPayload<any, string>,
    unitAction: ActionCreatorWithPayload<any, string>,
}

const BaseCard: FC<BaseCardProps> = ({ label, icon, unitList, name, valueAction, unitAction, children }) => {
    const value = useSelector<RheactState>((state) => (state.operatingParams as any)[name]) as string;
    const unit = useSelector<RheactState>((state) => (state.operatingParams as any)[name + "Unit"]) as string;
    const dispatch = useDispatch();

    // TODO: Fix uncontrolled input box bug
    const onValueChange = useCallback(
        (e) => {
            dispatch(valueAction(e.target.value));
        },
        [dispatch, valueAction]
    );

    // If no unit in state, set unit to the first available in list
    useEffect(() => {
        if(!unit) {
            dispatch(unitAction(unitList[0]));
        }
    }, [dispatch, unit, unitAction, unitList]);

    return (
        <Card className={!value ? "border-danger" : ""}>
            <CardBody className="d-flex flex-column">
                <img src={icon} width={64} alt={label} className="mx-auto" />
                <span className="fw-bolder text-center">{label}</span>

                <InputGroup>
                    <Input
                        value={value}
                        invalid={!value}
                        type="number"
                        onChange={onValueChange}
                        placeholder={`Enter ${label}`}
                    />
                    <InputGroupText className="bg-dark text-white">{unit}</InputGroupText>
                </InputGroup>
                {children}
            </CardBody>
        </Card>
    );
};

export default BaseCard;
