import { FC, useCallback, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Button, Modal, ModalBody, ModalHeader, Table } from "reactstrap";
import { Equation, RheactState } from "model";
import { SET_HEAT_OF_REACTION } from 'store';
import ThorRow from './ThorRow';

import './style.css'

const ComponentTable = () => {
    const dispatch = useDispatch();
    const equation = useSelector<RheactState, Equation>(state => state.compound);
    const [heatOfReaction, setHeatOfReaction] = useState<number>()

    const calculateHeatOfReaction = useCallback(() => {
        let rSum = 0
        let pSum = 0
        let valid = true
        equation.reactants.map(chem => {
            if(!chem.heatOfFormation) {
                setHeatOfReaction(undefined)
                valid = false
                console.log('fk reactant ', chem)
                return
            }
            rSum += parseFloat(chem.heatOfFormation)
        })
        equation.products.map(chem => {
            if(!chem.heatOfFormation) {
                setHeatOfReaction(undefined)
                console.log('fk product ', chem)
                valid = false
                return
            }
            console.log(chem.heatOfFormation)
            console.log(typeof chem.heatOfFormation)
            pSum += parseFloat(chem.heatOfFormation)
        })
        if(valid) {
            setHeatOfReaction(pSum - rSum)
            dispatch(SET_HEAT_OF_REACTION(pSum - rSum))
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
                    <th>Number of Moles</th>
                    <th>Heat of Formation</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {equation.reactants.map((c, i) => <ThorRow chemical={c} section="Reactant" index={i} /> )}
                {equation.products.map((c, i) => <ThorRow chemical={c} section="Product" index={i} /> )}
            </tbody>
        </Table>
        <Button className="green-btn" onClick={calculateHeatOfReaction}>Calculate Heat of Reaction</Button>
        { heatOfReaction != undefined &&
            <div id="thor-result">
                Heat of Reaction: {heatOfReaction}
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
            <ModalHeader toggle={() => setOpen(false)}>Heat of Reaction Calculation Tool</ModalHeader>
            <ModalBody>
                <ComponentTable />
            </ModalBody>
        </Modal>
    );
};

export default ThorModal;
