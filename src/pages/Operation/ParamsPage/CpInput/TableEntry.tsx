import { ChangeEvent, FC, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Button, Input, InputGroup, InputGroupText, Table } from "reactstrap";
import { CHANGE_DILUENT, CHANGE_PRODUCT, CHANGE_REACTANT, Chemical, Equation, RheactState } from "store";

type ChemicalRowProps = {
    changeAction: any,
    listname: string,
    index: number,
};

const ChemicalRow: FC<ChemicalRowProps> = ({ changeAction, listname, index }) => {
    const dispatch = useDispatch();
    const cp = useSelector<RheactState>(state =>  state.operatingParams.cp) as string;
    const chemical = useSelector<RheactState>(state =>  (state.compound as any)[listname][index]) as Chemical;

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

    return (
        <tr>
            <td>{index + 1}</td>
            <td>{chemical.productName}</td>
            <td>
                <Input
                    value={chemical.molWt}
                    onChange={getChangeProp('molWt')}
                    className={!chemical.molWt ? 'border-danger' : ''}
                />
            </td>
            <td>
                <Input
                    value={chemical.molWtFraction}
                    onChange={getChangeProp('molWtFraction')}
                    className={!chemical.molWtFraction ? 'border-danger' : ''}
                    type="number"
                />
            </td>
            <td>
                <InputGroup>
                    <Input
                        disabled={!!cp || chemical.neglected}
                        value={chemical.cp}
                        onChange={getChangeProp('cp')}
                        className={!chemical.cp && !cp ? 'border-danger' : ''}
                        type="number"
                    />
                    <InputGroupText className="bg-dark text-white">cal/g/°C</InputGroupText>
                </InputGroup>
            </td>
            <td>
                <Button
                    color={chemical.neglected ? 'danger' : 'success'}
                    outline
                    onClick={onNeglect}
                >
                    {chemical.neglected && (<i className="bi bi-x-lg" />)}
                    {!chemical.neglected && (<i className="bi bi-check-lg" />)}
                </Button>
            </td>
        </tr>
    );
}

const TableEntry = () => {
    const equation = useSelector<RheactState>(state => state.compound) as Equation; 
    const cp = useSelector<RheactState>(state =>  state.operatingParams.cp) as string;

    return (
        <div className="p-2">
            {!cp ? (
                <Alert color="warning">
                    RHEACT estimates C<sub>p</sub> of individual chemicals
                    with a backend-database of <b>liquid phase</b> chemicals based on the operating temperature
                    at the time of upload of SDS. The C<sub>p</sub> is <b>not
                    re-estimated when you change the system temperature</b>.
                    <br />
                    <br />
                    Please enter any missing C<sub>p</sub> and value confirm the estimated C<sub>p</sub> values manually!
                </Alert>
            ) : (
                <Alert color="secondary">
                    Since you have entered in the C<sub>p</sub> mixture, you do not need to enter individual component C<sub>p</sub>.
                    However, do enter the mass fractions.
                </Alert>
            )}

            <Table>
                <thead>
                    <tr>
                        <th>Index</th>
                        <th>Name</th>
                        <th>Molecular Weight</th>
                        <th>Mass fraction</th>
                        <th>C<sub>p</sub></th>
                        <th>Include component in C<sub>p, mix</sub> estimation</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th colSpan={6}>Reactants</th>
                    </tr>
                    {equation.reactants.map((c, i) => (
                        <ChemicalRow
                            key={'r/' + c.productName + '/' + i}
                            listname='reactants'
                            index={i}
                            changeAction={CHANGE_REACTANT}
                        />
                    ))}

                    <tr>
                        <th colSpan={6}>Products</th>
                    </tr>
                    {equation.products.map((c, i) => (
                        <ChemicalRow
                            key={'p/' + c.productName  + '/' + i}
                            listname='products'
                            index={i}
                            changeAction={CHANGE_PRODUCT}
                        />
                    ))}

                    <tr>
                        <th colSpan={6}>Diluents</th>
                    </tr>
                    {equation.diluents.map((c, i) => (
                        <ChemicalRow
                            key={'d/' + c.productName  + '/' + i}
                            listname='diluents'
                            index={i}
                            changeAction={CHANGE_DILUENT}
                        />
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default TableEntry;
