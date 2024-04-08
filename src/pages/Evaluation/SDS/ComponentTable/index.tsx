import { useSelector } from "react-redux";
import { Table } from "reactstrap";
import { CHANGE_DILUENT, CHANGE_PRODUCT, CHANGE_REACTANT, REMOVE_DILUENT, REMOVE_PRODUCT, REMOVE_REACTANT } from "store";
import { Equation, RheactState } from "model";
import ChemicalRow from "./ChemicalRow";

const ComponentTable = () => {
    const equation = useSelector<RheactState, Equation>(state => state.compound);
    return (
        <Table hover>
            <colgroup>
                <col span={1} style={{ width: "12%" }} />
                <col span={1} style={{ width: "15%" }} />
                <col span={1} style={{ width: "28%" }} />
                <col span={1} style={{ width: "15%" }} />
                <col span={1} style={{ width: "15%" }} />
                <col span={1} style={{ width: "15%" }} />
            </colgroup>
            <thead>
                <th>Section</th>
                <th>CAS-No</th>
                <th>Component Name</th>
                <th>Molecular Weight</th>
                <th>Phase</th>
                <th>Actions</th>
            </thead>

            <tbody>
                {equation.reactants.map((c, i) => <ChemicalRow key={c.casNo + "reactant" + c.phase} chemical={c} section="Reactant" index={i} changeAction={CHANGE_REACTANT} removeAction={REMOVE_REACTANT} /> )}
                {equation.products.map((c, i) => <ChemicalRow key={c.casNo + "product" + c.phase} chemical={c} section="Product" index={i} changeAction={CHANGE_PRODUCT} removeAction={REMOVE_PRODUCT} /> )}
                {equation.diluents.map((c, i) => <ChemicalRow key={c.casNo + "diluent" + c.phase} chemical={c} section="Diluent" index={i} changeAction={CHANGE_DILUENT} removeAction={REMOVE_DILUENT} /> )}
            </tbody>
        </Table>
    );
}

export default ComponentTable;
