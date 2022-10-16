import _ from 'lodash';
import { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardBody, Input, InputGroup } from "reactstrap";
import { SET_BASIS } from 'store';
import { BasisChemical, Chemical, Equation, RheactState } from "model";
import { HeatUnit } from 'units'

const BasisSelector = () => {
    const dispatch = useDispatch();
    const equation = useSelector<RheactState>(state => state.compound) as Equation;
    const heatOfReactionUnit = useSelector<RheactState>(state => state.operatingParams.heatOfReactionUnit) as HeatUnit
    
    // Collect all chemicals for selector
    const listOfChemicals = useMemo(() => {
        const indexMap = (list: string) => (c: Chemical, index: number) => ({
            productName: c.productName,   
            molWt: c.molWt,
            list,
            index
        });
        const reactants = equation.reactants.map(indexMap('reactants'));
        const products= equation.products.map(indexMap('products'));
        const diluents = equation.diluents.map(indexMap('diluents'));
        return _.concat(reactants, products, diluents);
    }, [equation]);

    // Current setting for basis
    const currentBasisIndex = useSelector<RheactState>(state => state.operatingParams.basis) as (BasisChemical | undefined);

    // Selection for change of basis
    const [selection, setSelection] = useState<number>();

    const currentBasis = useMemo(() => {
        if(!currentBasisIndex)
            return undefined;
        if(!selection) {
            setSelection(currentBasisIndex.index)
        }
        switch(currentBasisIndex.list) {
            case 'reactants':
                return equation.reactants[currentBasisIndex.index];
            case 'products':
                return equation.products[currentBasisIndex.index];
            case 'diluents':
            default:
                return equation.diluents[currentBasisIndex.index];
        }
    }, [currentBasisIndex, equation]);

    // Sets a new basis
    const handleBasisChange = useCallback((newSelection) => {
        if(!newSelection) {
            setSelection(undefined)
            dispatch(SET_BASIS({
                list: '',
                index: undefined,
            }));
            return;
        }
        newSelection = parseInt(newSelection)
        setSelection(newSelection)
        
        if(newSelection === -1) {
            dispatch(SET_BASIS({
                list: '',
                index: -1,
            }));
        }

        if(newSelection !== -1) {
            const selectedChemical = listOfChemicals[newSelection];
            dispatch(SET_BASIS({
                list: selectedChemical.list,
                index: selectedChemical.index,
            }));
        }
    }, [dispatch, listOfChemicals])

    return (
        <Card className={currentBasisIndex === undefined ? "border-danger" : ""}>
            <CardBody>
                <div className='h5 fw-bold'>Current Basis for Heat of Reaction</div>

                <div className='text-center'>
                    {currentBasisIndex === undefined || currentBasisIndex.index === undefined ? "Please select a basis for heat of reaction from the drop-down below" : ""}
                    {currentBasisIndex !== undefined && currentBasisIndex.index === -1 ? "Total Reaction Mass" : ""}
                    {currentBasis !== undefined && `${currentBasis.productName} / Mol Wt: ${currentBasis.molWt}`}
                    <InputGroup className='mt-2'>
                        <Input
                            type='select'
                            invalid={selection === undefined}
                            value={selection}
                            onChange={e => handleBasisChange(e.target.value)}
                        >
                            <option key='' value={undefined}></option>
                            {!heatOfReactionUnit.endsWith('mol') && <option key='default' value={-1}>Total Reaction Mass</option>}
                            {listOfChemicals.map(
                                (c, idx) => (
                                    <option key={idx} value={idx}>{c.productName} / Mol Wt: {c.molWt}</option>    
                                )
                            )}
                        </Input>
                        <div className="invalid-feedback">
                            Current Basis for Heat of Reaction cannot be empty!
                        </div>
                    </InputGroup>
                </div>
            </CardBody>
        </Card>
    );
};

export default BasisSelector;
