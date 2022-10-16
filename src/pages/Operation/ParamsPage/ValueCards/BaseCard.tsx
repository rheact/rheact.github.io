import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { FC, useCallback, useEffect, useRef, useState } from "react";
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
    labelText: string,
    labelNode: React.ReactNode,
    icon: string,
    unitList: string[],
    name: string,
    valueAction: ActionCreatorWithPayload<any, string>,
    unitAction: ActionCreatorWithPayload<any, string>,
}

const BaseCard: FC<BaseCardProps> = ({ labelText, labelNode, icon, unitList, name, valueAction, unitAction, children }) => {
    const value = useSelector<RheactState>((state) => (state.operatingParams as any)[name]) as string;
    const dispatch = useDispatch();
    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
    const [invalid, setInvalid] = useState<boolean>(value === '')

    // TODO: Fix uncontrolled input box bug
    const onValueChange = useCallback(
        (e) => {
            dispatch(valueAction(e.target.value));
        },
        [dispatch, valueAction]
    );

    useEffect(() => {
        const handleWheel = (e: any) => e.preventDefault();
        const handleArrowKey = (e: any) => {
            if(e.key === "ArrowUp" || e.key === "ArrowDown") {
                e.preventDefault();
            }

        }
        inputRef.current!.addEventListener("wheel", handleWheel) 
        inputRef.current!.addEventListener("keydown", handleArrowKey)

        return () => {
            if(inputRef.current) {
                inputRef.current!.removeEventListener("wheel", handleWheel);
                inputRef.current!.removeEventListener("keydown", handleArrowKey)
            }
        };
    }, []);

    return (
        <Card fluid className="d-flex flex-column justify-content-center align-items-center p-2">
            <img src={icon} width={64} alt={labelText} className="mx-auto" />
            <span className="fw-bolder text-center">
                {labelNode}
            </span>
            <InputGroup color="dark">
                <Input
                    innerRef={inputRef}
                    value={value}
                    invalid={invalid}
                    type="number"
                    onChange={onValueChange}
                    onFocus={() => setInvalid(false)}
                    onBlur={() => setInvalid(value === '')}
                    placeholder={`Enter ${labelText}`}
                />
                <UnitChangeSelector
                    keyName={name + 'Unit' as keyof OperatingParams}
                    unitAction={unitAction}
                    list={unitList}
                />
                <div className="invalid-feedback">
                    {labelText} field cannot be empty!
                </div>
            </InputGroup>
            {children}
        </Card>
    );
};

export default BaseCard;
