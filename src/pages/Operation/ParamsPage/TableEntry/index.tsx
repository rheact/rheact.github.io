import { Equation, RheactState } from "model";
import { useSelector } from "react-redux";
import { Alert, Table } from "reactstrap";
import { CHANGE_DILUENT, CHANGE_PRODUCT, CHANGE_REACTANT } from "store";
import TableRow from "./TableRow";

const TableEntry = () => {
    const equation = useSelector<RheactState>(state => state.compound) as Equation; 
    const cp = useSelector<RheactState>(state =>  state.operatingParams.cp) as string;

    return (
        <div>
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
                        <th>Name</th>
                        <th>Mol. wt.</th>
                        <th>Mass fraction</th>
                        <th>C<sub>p</sub></th>
                        <th>Include component in C<sub>p, mix</sub> estimation</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th colSpan={5}>Reactants</th>
                    </tr>
                    {equation.reactants.map((c, i) => (
                        <TableRow
                            key={'r/' + c.productName + '/' + i}
                            listname='reactants'
                            index={i}
                            changeAction={CHANGE_REACTANT}
                        />
                    ))}

                    <tr>
                        <th colSpan={5}>Products</th>
                    </tr>
                    {equation.products.map((c, i) => (
                        <TableRow
                            key={'p/' + c.productName  + '/' + i}
                            listname='products'
                            index={i}
                            changeAction={CHANGE_PRODUCT}
                        />
                    ))}

                    <tr>
                        <th colSpan={5}>Diluents</th>
                    </tr>
                    {equation.diluents.map((c, i) => (
                        <TableRow
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
