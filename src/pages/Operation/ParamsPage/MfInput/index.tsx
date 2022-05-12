import { Equation, RheactState } from "model";
import { useSelector } from "react-redux";
import { Card, CardBody, Table } from "reactstrap";
import { CHANGE_DILUENT, CHANGE_PRODUCT, CHANGE_REACTANT } from "store";
import MfRow from "./MfRow";

const MfEntry = () => {
    const equation = useSelector<RheactState>(state => state.compound) as Equation;

    return (
        <Card>
            <CardBody>
                <span className="h5 fw-bolder">Components Information</span>

                <Table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Mol. wt.</th>
                            <th>Mass fraction</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th colSpan={3}>Reactants</th>
                        </tr>
                        {equation.reactants.map((c, i) => (
                            <MfRow
                                key={'r/' + c.productName + '/' + i}
                                listname='reactants'
                                index={i}
                                changeAction={CHANGE_REACTANT}
                            />
                        ))}

                        <tr>
                            <th colSpan={3}>Products</th>
                        </tr>
                        {equation.products.map((c, i) => (
                            <MfRow
                                key={'p/' + c.productName + '/' + i}
                                listname='products'
                                index={i}
                                changeAction={CHANGE_PRODUCT}
                            />
                        ))}

                        <tr>
                            <th colSpan={3}>Diluents</th>
                        </tr>
                        {equation.diluents.map((c, i) => (
                            <MfRow
                                key={'d/' + c.productName + '/' + i}
                                listname='diluents'
                                index={i}
                                changeAction={CHANGE_DILUENT}
                            />
                        ))}
                    </tbody>
                </Table>
            </CardBody>
        </Card>
    );
};

export default MfEntry;
