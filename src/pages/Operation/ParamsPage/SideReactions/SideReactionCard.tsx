import { FC } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Input, InputGroup, InputGroupText, Label, Row } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { SET_SR_TEMPERATURE, SET_SR_PRESSURE, SET_SR_DETAILS, REMOVE_SIDE_REACTION } from 'store';
import { RheactState } from 'model';

type SideReactionCardProps = {
    index: number,
};

const SideReactionCard: FC<SideReactionCardProps> = ({ index }) => {
    const { tempOnset, pressureOnset, details } = useSelector((store: RheactState) => store.operatingParams.sideReactions[index]);
    const dispatch = useDispatch();

    return (
        <Card color="light" className="mt-2">
            <CardHeader className="d-flex justify-content-between align-items-center">
                <i>Side Reaction {index + 1}</i>

                <Button outline color="danger" onClick={() => dispatch(REMOVE_SIDE_REACTION(index))}>
                    <i className="bi bi-x-lg me-1" />
          Delete
                </Button>
            </CardHeader>

            <CardBody>
                <Row>
                    <Col>
                        <Label>Temperature Onset</Label>
                        <InputGroup>
                            <InputGroupText><i className="bi bi-thermometer-half" /></InputGroupText>
                            <Input value={tempOnset}
                                onChange={e => dispatch(SET_SR_TEMPERATURE({ index, text: e.target.value }))} />
                            <InputGroupText>&deg;C</InputGroupText>
                        </InputGroup>
                    </Col>
                    <Col>
                        <Label>Pressure Onset</Label>
                        <InputGroup>
                            <InputGroupText><i className="bi bi-speedometer" /></InputGroupText>
                            <Input value={pressureOnset}
                                onChange={e => dispatch(SET_SR_PRESSURE({ index, text: e.target.value }))} />
                            <InputGroupText>bar</InputGroupText>
                        </InputGroup>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Label>Side Reaction Description</Label>
                        <InputGroup>
                            <InputGroupText><i className="bi bi-info-circle" /></InputGroupText>
                            <Input type="textarea"
                                value={details}
                                onChange={e => dispatch(SET_SR_DETAILS({ index, text: e.target.value }))} />
                        </InputGroup>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
};

export default SideReactionCard;
