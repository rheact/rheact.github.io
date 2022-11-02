import { FC } from 'react';
import { Equation, Chemical, RheactState } from "model";
import { useSelector } from "react-redux";
import { Card, CardBody, Input, Table } from "reactstrap";
import { CHANGE_DILUENT, CHANGE_PRODUCT, CHANGE_REACTANT } from "store";
import MfRow from "./MfRow";

import "./style.css"

type TotalMassFractionProps = {
    reactants: Chemical[],
    products: Chemical[],
    diluents: Chemical[]
};

const TotalMassFraction: FC<TotalMassFractionProps> = ({reactants, products, diluents}) => {
    let total = 0
    reactants.map((c, i) => {
        total += parseFloat(c.molWtFraction || '0')
    })
    products.map((c, i) => {
        total += parseFloat(c.molWtFraction || '0')
    })
    diluents.map((c, i) => {
        total += parseFloat(c.molWtFraction || '0')
    })
    total = parseFloat(total.toFixed(5))
    const isEmpty = reactants.length == 0 && products.length == 0 && diluents.length == 0

    return (
        <tr>
            <td style={{fontWeight: "bold"}}>Total</td>
            <td>{'    '}</td>
            <td>
                <Input 
                    id="totalMassFraction"
                    readOnly
                    value={total}
                    invalid={isEmpty || total > 1 || total < 0.95}
                />
                <div id="totalMassFractionFeedback" className="invalid-feedback">
                    Total mass fraction must be in range [0.95, 1]!
                </div>
            </td>
        </tr>
    );
}

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
                        <TotalMassFraction
                            reactants={equation.reactants}
                            products={equation.products}
                            diluents={equation.diluents}
                        />                        
                    </tbody>
                </Table>
            </CardBody>
        </Card>
    );
};

export default MfEntry;
