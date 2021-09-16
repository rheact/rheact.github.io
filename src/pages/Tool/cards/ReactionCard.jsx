import { Card, CardBody, CardHeader, Input, Label } from 'reactstrap';
import { useState } from 'react';

const ReactionCard = () => {
  const [r, setR] = useState(0);

  return (
    <Card>
      <CardHeader className="fw-bolder">
        Reaction Details
      </CardHeader>

      <CardBody>
        <Label>Complete Balanced Reaction</Label>
        <Input onChange={e => setR(e.target.value)} type="textarea" />

        <Label>Description of scope of project</Label>
        <Input type="textarea" />
      </CardBody>
    </Card>
  );
};

export default ReactionCard;
