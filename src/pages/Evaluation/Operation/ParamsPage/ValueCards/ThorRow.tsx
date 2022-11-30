import { FC, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Input } from "reactstrap";
import { Chemical } from "model";
import * as STORE from 'store';
import server from "api";

import "./style.css"

type ThorRowProps = {
    chemical: Chemical,
    section: "Reactant" | "Product" | "Diluent",
    index: number
};

const ThorRow: FC<ThorRowProps> = ({ chemical, section, index }) => {
    const dispatch = useDispatch();
    const [numberOfMoles, setNumberOfMoles] = useState<number>(0)
    const [heatOfFormation, setHeatOfFormation] = useState<number>()
    const [errorMsg, setErrorMsg] = useState<string>('Heat of formation cannot be empty!')

    if(!chemical.phase) {
        dispatch(STORE.CHANGE_CHEMICAL_PHASE({section, index, newPhase: 'Solid'}))
    }

    const onChangeMoles = useCallback((moles)=> {
        console.log('new number of moles ', moles)
        setNumberOfMoles(moles)
    }, [])

    const onChangeHeat = useCallback((heat) => {
        setHeatOfFormation(heat)
    }, [])

    const calculateHeatofFormation = useCallback(async () => {

        if(chemical.casNo && numberOfMoles) {
            server
            .getHeatOfFormation(chemical.casNo, chemical.phase, numberOfMoles)
            .then((res) => {
                dispatch(STORE.SET_HEAT_OF_FORMATION({section, index, heatOfFormation: res}))
                setHeatOfFormation(res)
            })
            .catch((e) => {
                setErrorMsg(e.message)
            })
        }
            
    }, [dispatch, numberOfMoles])

    return (
        <tr>
            <td>
                {section}
            </td>
            <td>
                {chemical.casNo}
            </td>
            <td>
                {chemical.productName}    
            </td>
            <td>
                {chemical.phase}    
            </td>
            <td>
                <Input 
                    invalid={!numberOfMoles || numberOfMoles <= 0}
                    type="number" value={numberOfMoles} 
                    onChange={e => onChangeMoles(e.target.value)}
                />
                <div className="invalid-feedback">
                    Number of moles must be a positive number!
                </div>
            </td>
            <td>
                <Input 
                    invalid={!heatOfFormation}
                    type="number" value={heatOfFormation}
                    onChange={e => onChangeHeat(e.target.value)}
                    onFocus={_ => setErrorMsg('Heat of formation cannot be empty!')}
                /> 
                <div className="invalid-feedback">
                    {errorMsg}
                </div> 
            </td>
            <td>
                <Button onClick={calculateHeatofFormation} className="green-btn">Calculate</Button>
            </td>
        </tr>
    );
};

export default ThorRow;
