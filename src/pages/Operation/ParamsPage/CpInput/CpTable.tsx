import { Chemical, Equation, OperatingParams, RheactState } from "model";
import { ChangeEvent, FC, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, InputGroup, InputGroupText, Table } from "reactstrap";
import { CHANGE_DILUENT, CHANGE_PRODUCT, CHANGE_REACTANT } from 'store';
import api from 'api';

type CpRowProps = {
    changeAction: any,
    listname: string,
    index: number,
};

const CpRow: FC<CpRowProps> = ({ changeAction, listname, index }) => {
    const dispatch = useDispatch();
    const params = useSelector<RheactState, OperatingParams>(state => state.operatingParams);
    const chemical = useSelector<RheactState>(state => (state.compound as any)[listname][index]) as Chemical;
    const [invalid, setInvalid] = useState<boolean>(false)

    const getChangeProp = useCallback(
        (key: keyof Chemical) => (e: ChangeEvent<HTMLInputElement>) => {
            const update: any = { ...chemical };
            update[key] = e.target.value as any;
            dispatch(
                changeAction({
                    index,
                    update,
                })
            );
        },
        [changeAction, index, chemical, dispatch]
    );

    const onNeglect = useCallback(
        () => {
            const update: Chemical = { ...chemical };
            update.neglected = !update.neglected;
            dispatch(
                changeAction({
                    index,
                    update,
                })
            );
        },
        [changeAction, index, chemical, dispatch]
    );

    const onEstimate = useCallback(
        async () => {
            if(!chemical.casNo) {
                return;
            }
            const data = await api.estimateCp(chemical.casNo, params.temperature, params.temperatureUnit);
            if(data === "\"\"") {
                setInvalid(true)
                return;
            }
            const update: Chemical = { ...chemical };
            update.cp = data;
            dispatch(
                changeAction({
                    index,
                    update,
                })
            );

        },
        [chemical, params.temperature, params.temperatureUnit, dispatch, changeAction, index]
    );

    const removeFeedback = useCallback(
        () => {
            setInvalid(false)
        },
        []
    )

    return (
        <tr className="m-1" style={{ width: '30%' }}>
            <td>{chemical.productName}</td>
            <td>{chemical.molWtFraction}</td>
            <td>
                <InputGroup>
                    <Input
                        onFocus={removeFeedback}
                        disabled={chemical.neglected}
                        value={chemical.cp}
                        invalid={invalid}
                        onChange={getChangeProp('cp')}
                        className={!chemical.cp ? 'border-danger' : ''}
                        type="number"
                    />
                    <InputGroupText className="bg-dark text-white">cal/g/°C</InputGroupText>
                    <div className="invalid-feedback">
                        Liquid Cp of {chemical.productName} is not available in the RHEACT backend database. Please enter Liquid Cp values obtained from other sources.
                    </div>
                </InputGroup>
            </td>

            <td>
                <Button
                    color={chemical.neglected ? 'danger' : 'success'}
                    size="sm"
                    outline
                    onClick={onNeglect}
                >
                    {chemical.neglected && (
                        <span>
                            <i className="bi bi-x-lg" />
                            Neglected
                        </span>)}
                    {!chemical.neglected && (
                        <span>
                            <i className="bi bi-check-lg" />
                            Included
                        </span>)}
                </Button>

                <Button
                    color="dark"
                    className="ms-1"
                    size="sm"
                    disabled={!params.temperature}
                    onClick={onEstimate}
                >
                    Estimate C<sub>p</sub>
                </Button>
            </td>
        </tr>
    );
};

const CpTable = () => {
    const eq = useSelector<RheactState, Equation>(state => state.compound);

    return (
        <Table>
            <thead>
                <tr>
                    <th>Component Name</th>
                    <th>Mass Fraction</th>
                    <th>C<sub>p</sub></th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {eq.reactants.map((c, i) => <CpRow
                    key={`cp/${c.productName}`}
                    changeAction={CHANGE_REACTANT}
                    listname="reactants"
                    index={i} />)}
                {eq.products.map((c, i) => <CpRow
                    key={`cp/${c.productName}`}
                    changeAction={CHANGE_PRODUCT}
                    listname="products"
                    index={i} />)}
                {eq.diluents.map((c, i) => <CpRow
                    key={`cp/${c.productName}`}
                    changeAction={CHANGE_DILUENT}
                    listname="diluents"
                    index={i} />)}
            </tbody>
        </Table>
    );
};

export default CpTable;
