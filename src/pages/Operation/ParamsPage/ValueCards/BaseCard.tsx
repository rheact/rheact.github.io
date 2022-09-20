import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { FC, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToggle } from "react-use";
import { ButtonDropdown, Card, DropdownItem, DropdownMenu, DropdownToggle, Input, InputGroup } from "reactstrap";
import { OperatingParams, RheactState } from 'model';

type UnitChangeSelectorProps = {
    list: string[],
    keyName: keyof OperatingParams
    unitAction: any,
};

const UnitChangeSelector: FC<UnitChangeSelectorProps> = ({ list, keyName, unitAction }) => {
    const dispatch = useDispatch();
    const current = useSelector<RheactState>(state => state.operatingParams[keyName]) as string;
    const [open, toggle] = useToggle(false);

    const onSelect = useCallback((unit: string) => {
        dispatch(unitAction(unit));
    }, [dispatch, unitAction]);

    const handleToggle = useCallback(() => {
        toggle(!open)
    }, [toggle, open])

    return (
        <ButtonDropdown isOpen={open} toggle={handleToggle}>
            <DropdownToggle caret>
                {current}
            </DropdownToggle>
            <DropdownMenu>
                {list.map((u) => (
                    <DropdownItem onClick={() => onSelect(u)}>
                        {u}
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </ButtonDropdown>
    );
};

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
    const dispatch = useDispatch();

    // TODO: Fix uncontrolled input box bug
    const onValueChange = useCallback(
        (e) => {
            dispatch(valueAction(e.target.value));
        },
        [dispatch, valueAction]
    );

    return (
        <Card fluid className="d-flex flex-column justify-content-center align-items-center p-2">
            <img src={icon} width={64} alt={label} className="mx-auto" />
            <span className="fw-bolder text-center">{label}</span>

            <InputGroup color="dark">
                <Input
                    value={value}
                    invalid={!value}
                    type="number"
                    onChange={onValueChange}
                    placeholder={`Enter ${label}`}
                />
                <UnitChangeSelector
                    keyName={name + 'Unit' as keyof OperatingParams}
                    unitAction={unitAction}
                    list={unitList}
                />
            </InputGroup>

            {children}
        </Card>
    );
};

export default BaseCard;
