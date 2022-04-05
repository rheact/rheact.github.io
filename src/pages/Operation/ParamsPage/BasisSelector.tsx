import _ from 'lodash';
import { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, CardBody, CardHeader, Input, InputGroup } from "reactstrap";
import { BasisChemical, Chemical, Equation, RheactState, SET_BASIS } from "store";

const BasisSelector = () => {
    const dispatch = useDispatch();
    const equation = useSelector<RheactState>(state => state.compound) as Equation;
    
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

    // Selection for change of basis
    const [selection, setSelection] = useState<number>(-1);

    // Current setting for basis
    const currentBasisIndex = useSelector<RheactState>(state => state.operatingParams.basis) as (BasisChemical | undefined);
    const currentBasis = useMemo(() => {
        if(!currentBasisIndex)
            return undefined;
        
        switch(currentBasisIndex.list) {
            case 'reactants':
                return equation.reactants[currentBasisIndex.index];
            case 'products':
                return equation.products[currentBasisIndex.index];
            case 'diluents':
                return equation.diluents[currentBasisIndex.index];
        }

        return {
            productName: 'Error, contact CISTAR with project file',
            molWt: 'nan',
        };
    }, [currentBasisIndex, equation]);

    // Sets a new basis
    const onChangeCallback = useCallback(() => {
        if(selection === -1) {
            return;
        }

        const selectedChemical = listOfChemicals[selection];
        dispatch(SET_BASIS({
            list: selectedChemical.list,
            index: selectedChemical.index,
        }))
    }, [dispatch, listOfChemicals, selection]);

    return (
        <Card>
            <CardHeader className='fw-bold'>Basis of Reaction</CardHeader>
            <CardBody className='flex-column'>

                <Card className={currentBasis === undefined ? 'border-danger' : ''}>
                    <CardHeader>Current Basis</CardHeader>
                    <CardBody className='text-center'>
                        {!currentBasis && "No Basis Selected"}
                        {currentBasis !== undefined && `${currentBasis.productName} / Mol Wt: ${currentBasis.molWt}`}
                    </CardBody>
                </Card>

                <InputGroup className='mt-2'>
                    <Input
                        type='select'
                        value={selection}
                        onChange={e => setSelection(parseInt(e.target.value))}
                        className={currentBasis === undefined ? 'border-danger' : ''}
                    >
                        <option hidden key='default' value={-1}>Select a basis chemical</option>
                        {listOfChemicals.map(
                            (c, idx) => (
                                <option key={idx} value={idx}>{c.productName} / Mol Wt: {c.molWt}</option>    
                            )
                        )}
                    </Input>
                    <Button type='submit' color='info' onClick={onChangeCallback}>Change Basis</Button>
                </InputGroup>
            </CardBody>
        </Card>
    );
};

export default BasisSelector;
