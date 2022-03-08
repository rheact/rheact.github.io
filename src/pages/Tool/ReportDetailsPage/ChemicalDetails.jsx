import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, Input, InputGroup, InputGroupText, Label } from 'reactstrap';
import { SET_KEY_REAGENT_QUANTITY, SET_PHYSICAL_STATE, SET_REACTION_CLASS, SET_REACTION_SCALE } from '../../../store/reducer';

const ChemicalDetails = () => {
    const dispatch = useDispatch();
    const {
        reactionClass,
        reactionScale,
        physicalState,
        keyReagentQuantity,
    } = useSelector(store => store.operatingParams);

    return (
        <Card>
            <CardBody>
                <div className="h5 fw-bolder">Chemical Details</div>
                <Label>Reaction Class</Label>
                <Input value={reactionClass} onChange={e => dispatch(SET_REACTION_CLASS(e.target.value))} />

                <Label>Reaction Scale</Label>
                <InputGroup>
                    <Input value={reactionScale} onChange={e => dispatch(SET_REACTION_SCALE(e.target.value))} />
                    <InputGroupText>
            kg
                    </InputGroupText>
                </InputGroup>

                <Label>Key Reagent Quantity</Label>
                <InputGroup>
                    <Input value={keyReagentQuantity} onChange={e => dispatch(SET_KEY_REAGENT_QUANTITY(e.target.value))} />
                    <InputGroupText>
            moles
                    </InputGroupText>
                </InputGroup>

                <Label>State</Label>
                <Input type="select" value={physicalState} onChange={e => dispatch(SET_PHYSICAL_STATE(e.target.value))}>
                    <option>NA</option>
                    <option>Liquid</option>
                    <option>Gas</option>
                </Input>
            </CardBody>
        </Card>
    );
};

export default ChemicalDetails;
