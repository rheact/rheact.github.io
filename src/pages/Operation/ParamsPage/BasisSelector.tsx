import _ from 'lodash';
import { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, CardBody, CardHeader, Input, InputGroup } from "reactstrap";
import { BasisChemical, Equation, RheactState, SET_BASIS } from "store";

const BasisSelector = () => {
    const dispatch = useDispatch();
    const equation = useSelector<RheactState>(state => state.compound) as Equation;
    
    // Collect all chemicals for selector
    const listOfChemicals = useMemo(() => {
        return _
            .concat(equation.reactants, equation.products, equation.diluents)
            .map(c => ({
                productName: c.productName,   
                molWt: c.molWt,
            }));
    }, [equation]);

    // Selection for change of basis
    const [selection, setSelection] = useState<number>(-1);

    // Current setting for basis
    const currentBasis = useSelector<RheactState>(state => state.operatingParams.basis) as (BasisChemical | undefined);

    // Sets a new basis
    const onChangeCallback = useCallback(() => {
        if(selection !== -1)
            dispatch(SET_BASIS(listOfChemicals[selection]))
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
