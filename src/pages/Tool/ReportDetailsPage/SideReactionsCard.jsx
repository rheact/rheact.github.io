import { Button, Card, CardBody, CardHeader, Input, Label } from 'reactstrap';

const SideReaction = () => {
};


const SideReactionsMasterCard = () => {
  return (
    <Card>
      <CardHeader className="fw-bolder color-dark">Side Reactions</CardHeader>
      <CardBody>
        <div className="d-flex align-items-center">
          <Button><i className="bi bi-plus-lg" /> Add </Button>
          <span className="ms-auto text-muted">Enter the known side-reactions and their onset details.</span>
        </div>
      </CardBody>
    </Card>
  );
};

export default SideReactionsMasterCard;
