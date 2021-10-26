import { Button, Card, CardBody, CardHeader, Col, Input, InputGroup, InputGroupText, Label, Row } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { ADD_SIDE_REACTION, SET_SR_TEMPERATURE, SET_SR_PRESSURE, SET_SR_DETAILS, REMOVE_SIDE_REACTION } from '../store';
import _ from 'lodash';

const SideReaction = ({ index }) => {
  const { tempOnset, pressureOnset, details } = useSelector(store => store.operatingParams.sideReactions[index]);
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
            </InputGroup>
          </Col>
          <Col>
            <Label>Pressure Onset</Label>
            <InputGroup>
              <InputGroupText><i className="bi bi-speedometer" /></InputGroupText>
              <Input value={pressureOnset}
                onChange={e => dispatch(SET_SR_PRESSURE({ index, text: e.target.value }))} />
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


const SideReactionsMasterCard = () => {
  const numSideReactions = useSelector(store => store.operatingParams.numSideReactions);
  const dispatch = useDispatch();

  return (
    <Card>
      <CardHeader className="fw-bolder color-dark">Side Reactions</CardHeader>
      <CardBody>
        <div className="d-flex align-items-center mb-2">
          <Button onClick={() => dispatch(ADD_SIDE_REACTION())}><i className="bi bi-plus-lg" /> Add </Button>
          <span className="ms-auto text-muted">Enter the known side-reactions and their onset details.</span>
        </div>

        {numSideReactions > 0 && <hr />}
        {_.range(numSideReactions).map(i => <SideReaction index={i} />)}
      </CardBody>
    </Card>
  );
};

export default SideReactionsMasterCard;
