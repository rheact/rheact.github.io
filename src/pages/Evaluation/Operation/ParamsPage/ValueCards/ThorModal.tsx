import { FC, useCallback } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Alert, Button, Modal, ModalBody, ModalHeader, Table } from "reactstrap";
import { Equation, OperatingParams, RheactState } from "model";
import { HeatUnit } from 'units'
import { SET_HEAT_OF_REACTION, SET_HEAT_OF_REACTION_UNIT, CHANGE_REACTANT, CHANGE_PRODUCT } from 'store';
import ThorRow from './ThorRow';

import './style.css'

const ComponentTable = () => {
    const dispatch = useDispatch();
    const equation = useSelector<RheactState, Equation>(state => state.compound);
    const operatingParams = useSelector<RheactState, OperatingParams>(state => state.operatingParams);

    const calculateHeatOfReaction = useCallback(() => {
        let rSum = 0
        let pSum = 0
        let valid = true
        equation.reactants.map(chem => {
            if(!chem.heatOfFormation) {
                dispatch(SET_HEAT_OF_REACTION(''))
                valid = false
                return
            }
            rSum += parseFloat(chem.heatOfFormation)
        })
        equation.products.map(chem => {
            if(!chem.heatOfFormation) {
                dispatch(SET_HEAT_OF_REACTION(''))
                valid = false
                return
            }
            pSum += parseFloat(chem.heatOfFormation)
        })
        if(valid) {
            dispatch(SET_HEAT_OF_REACTION(pSum - rSum))
            dispatch(SET_HEAT_OF_REACTION_UNIT(HeatUnit.kJ_mol))
        }
    }, [dispatch, equation])

    return (
        <>
        <Table hover>
            <colgroup>
                <col span={1} style={{ width: "10%" }} />
                <col span={1} style={{ width: "10%" }} />
                <col span={1} style={{ width: "20%" }} />
                <col span={1} style={{ width: "10%" }} />
                <col span={1} style={{ width: "15%" }} />
                <col span={1} style={{ width: "15%" }} />
                <col span={1} style={{ width: "15%" }} />
            </colgroup>
            <thead>
                <tr>
                    <th>Section</th>
                    <th>CAS-No</th>
                    <th>Component Name</th>
                    <th>Phase</th>
                    <th>Stoichiometric Coefficient</th>
                    <th>Heat of formation (KJ/mol)</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {equation.reactants.map((c, i) => <ThorRow chemical={c} section="Reactant" index={i} changeAction={CHANGE_REACTANT}/> )}
                {equation.products.map((c, i) => <ThorRow chemical={c} section="Product" index={i} changeAction={CHANGE_PRODUCT}/> )}
            </tbody>
        </Table>
        <Button className="green-btn" onClick={calculateHeatOfReaction}>Calculate Heat of Reaction</Button>
        { operatingParams.heatOfReaction &&
            <div id="thor-result">
                Heat of Reaction: {operatingParams.heatOfReaction} KJ/mol
            </div>
        }
        </>
    );
}

type ThorModalProps = {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ThorModal: FC<ThorModalProps> = ({ open, setOpen }) => {
    return (
        <Modal isOpen={open} id='thor-modal'>
            <ModalHeader toggle={() => setOpen(false)}>
                Heat of Reaction Calculation Tool
            </ModalHeader>
            <ModalBody>
                <div id='thor-des'>
                    <Alert color="light" isOpen>
                        RHEACT does not check if your reaction scheme is correct nor if you entered a non-balanced reaction.
                    </Alert>
                    This tool calculates the heat of reaction using Hess's law and the standard enthalpy of formation (25&deg;C) of each component in the defined state. The enthalpy values are based on published data in the following sources:
                    <ul>
                        <li>CRC Handbook of Chemistry and Physics, 95th ed.; Haynes, W. M., Ed.; CRC Press, 2014</li>
                        <li>Pedley, J. B.; Naylor, R. D. “Thermochemical Data of Organic Compounds”; Chapmam and Hall, 1986</li>
                        <li>Wagman, D. D. et al. “The NBS Tables of Chemical Thermodynamic Properties: Selected Values for Inorganic and C1 and C2 Organic Substances in SI Units”. J. Phys. Chem. Ref. Data 1982, 11 (Suppl. 2), 2-1 - 2-392</li>
                    </ul>
                </div>
                <ComponentTable />
            </ModalBody>
        </Modal>
    );
};

export default ThorModal;
