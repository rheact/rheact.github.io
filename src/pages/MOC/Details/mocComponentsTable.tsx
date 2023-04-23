import { useSelector } from "react-redux";
import { Table } from "reactstrap";
import { CHANGE_CHEMICAL, REMOVE_CHEMICAL } from "store";
import { RheactState, MOCComponents } from "model";
import MOCChemicalRow from './mocChemicalRow';

const MOCComponentsTable = () => {
    const mocComponents = useSelector<RheactState, MOCComponents>(state => state.mocComponents);
    
    return (
        <Table hover>
            <colgroup>
                <col span={1} style={{ width: "25%" }} />
                <col span={1} style={{ width: "50%" }} />
                <col span={1} style={{ width: "25%" }} />
            </colgroup>
            <thead>
                <th>CAS-No</th>
                <th>Component Name</th>
                <th>Actions</th>
            </thead>
            <tbody>
                {mocComponents.chemicals.map((c, i) => <MOCChemicalRow chemical={c} index={i} changeAction={CHANGE_CHEMICAL} removeAction={REMOVE_CHEMICAL}/>)}
            </tbody>
        </Table>
    );
}

export default MOCComponentsTable;
