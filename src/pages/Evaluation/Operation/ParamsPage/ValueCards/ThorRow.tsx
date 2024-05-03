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
    changeAction: any
};

const ThorRow: FC<ThorRowProps> = ({ chemical, section, index, changeAction }) => {
    const dispatch = useDispatch();
    const [errorMsg, setErrorMsg] = useState<string>(chemical.heatOfFormation ? '' : 'Heat of formation cannot be empty!')

    if(!chemical.phase) {
        dispatch(STORE.CHANGE_CHEMICAL_PHASE({section, index, newPhase: ''}))
    }

    const onChangeMoles = useCallback((moles)=> {
        const update: Chemical = { ...chemical };
        update.thor_sc = moles;
        dispatch(
            changeAction({
                index,
                update,
            })
        );
    }, [chemical])

    const onChangeHeat = useCallback((heat) => {
        const update: Chemical = { ...chemical };
        update.heatOfFormation = heat;
        dispatch(
            changeAction({
                index,
                update,
            })
        );
        if (!heat) {
            setErrorMsg('Heat of formation cannot be empty!')
        }
    }, [chemical])

    const handleOnKeyDown = useCallback((e) => {
        if(e.key === "ArrowUp" || e.key === "ArrowDown") {
            e.preventDefault();
        }
    }, [])

    const calculateHeatofFormation = useCallback(async () => {
        if (!chemical.phase) {
            setErrorMsg('Please specify the state of the chemical')
        }
        if(chemical.casNo && chemical.phase && chemical.thor_sc) {
            server
            .getHeatOfFormation(chemical.casNo, chemical.phase, Number(chemical.thor_sc))
            .then((res) => {
                dispatch(STORE.SET_HEAT_OF_FORMATION({section, index, heatOfFormation: res}))
                setErrorMsg('')
            })
            .catch((e) => {
                setErrorMsg(e.message)
            })
        }
            
    }, [dispatch, chemical])

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
                    invalid={!chemical.thor_sc || Number(chemical.thor_sc) <= 0}
                    type="number"
                    value={chemical.thor_sc} 
                    onChange={e => onChangeMoles(e.target.value)}
                    onKeyDown={e => handleOnKeyDown(e)}
                    onWheel={e => e.currentTarget.blur()}
                />
                <div className="invalid-feedback">
                    Stoichiometric coefficient must be a positive number!
                </div>
            </td>
            <td>
                <Input 
                    invalid={!chemical.heatOfFormation}
                    type="number" 
                    value={chemical.heatOfFormation}
                    onChange={e => onChangeHeat(e.target.value)}
                    onKeyDown={e => handleOnKeyDown(e)}
                    onWheel={e => e.currentTarget.blur()}
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
