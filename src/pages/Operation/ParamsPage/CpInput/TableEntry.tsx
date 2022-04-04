import { ChangeEvent, FC, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Input, InputGroup, InputGroupText, Table } from "reactstrap";
import { CHANGE_DILUENT, CHANGE_PRODUCT, CHANGE_REACTANT, Chemical, Equation, RheactState } from "store";

type ChemicalRowProps = {
    changeAction: any,
    listname: string,
    index: number,
};

const ChemicalRow: FC<ChemicalRowProps> = ({ changeAction, listname, index }) => {
    const dispatch = useDispatch();
    const unit = useSelector<RheactState>(state =>  state.operatingParams.cpUnit) as string;
    const chemical = useSelector<RheactState>(state =>  (state.compound as any)[listname][index]) as Chemical;

    const getChangeProp = useCallback(
        (key: keyof Chemical) => (e: ChangeEvent<HTMLInputElement>) => {
            const update = { ...chemical };
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

    return (
        <tr>
            <td>{index + 1}</td>
            <td>{chemical.productName}</td>
            <td>
                <Input
                    value={chemical.molWtFraction}
                    onChange={getChangeProp('molWtFraction')}
                    className={!chemical.molWtFraction ? 'border-danger' : ''}
                />
            </td>
            <td>
                <InputGroup>
                    <Input
                        value={chemical.cp}
                        onChange={getChangeProp('cp')}
                        className={!chemical.cp ? 'border-danger' : ''}
                    />
                    <InputGroupText className="bg-dark text-white">{unit}</InputGroupText>
                </InputGroup>
            </td>
        </tr>
    );
}

const TableEntry = () => {
    const equation = useSelector<RheactState>(state => state.compound) as Equation; 

    return (
        <div className="p-2">
            <Alert color="danger">
                RHEACT estimates C<sub>p</sub> of individual chemicals
                with a backend-database based on the operating temperature
                at the time of upload of SDS. The C<sub>p</sub> is not
                re-estimated when you change the system temperature. Please
                confirm the estimated C<sub>p</sub> values manually!
            </Alert>

            <Table>
                <thead>
                    <tr>
                        <th>Index</th>
                        <th>Name</th>
                        <th>Molecular Weight Fraction</th>
                        <th>C<sub>p</sub></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th colSpan={4}>Reactants</th>
                    </tr>
                    {equation.reactants.map((_, i) => (
                        <ChemicalRow
                            listname='reactants'
                            index={i}
                            changeAction={CHANGE_REACTANT}
                        />
                    ))}

                    <tr>
                        <th colSpan={4}>Products</th>
                    </tr>
                    {equation.products.map((_, i) => (
                        <ChemicalRow
                            listname='products'
                            index={i}
                            changeAction={CHANGE_PRODUCT}
                        />
                    ))}

                    <tr>
                        <th colSpan={4}>Diluents</th>
                    </tr>
                    {equation.diluents.map((_, i) => (
                        <ChemicalRow
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