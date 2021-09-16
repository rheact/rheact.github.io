import { Card, CardBody, CardHeader, Input, Label } from 'reactstrap';

const ReactionCard = () => {
  return (
    <Card>
      <CardHeader className="fw-bolder">
        Reaction Details
      </CardHeader>

      <CardBody>
        <Label>Complete Balanced Reaction</Label>
        <Input type="textarea" />

        <Label>Description of scope of project</Label>
        <Input type="textarea" />
      </CardBody>
    </Card>
  );
};

export default ReactionCard;
