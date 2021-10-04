import { Card, CardBody, CardHeader, Input, InputGroup, InputGroupText, Label } from 'reactstrap';

const ChemicalDetails = () => {
  return (
    <Card>
      <CardHeader className="fw-bolder color-dark">Chemical Details</CardHeader>
      <CardBody>
        <Label>Reaction Class</Label>
        <Input />
        <Label>Reaction Scale</Label>
        <InputGroup>
          <Input />
          <InputGroupText>
            kg
          </InputGroupText>
        </InputGroup>
        <Label>Key Reagent Quantity</Label>
        <InputGroup>
          <Input />
          <InputGroupText>
            moles
          </InputGroupText>
        </InputGroup>
        <Label>State</Label>
        <Input type="select">
          <option>Liquid</option>
          <option>Gas</option>
        </Input>
      </CardBody>
    </Card>
  );
};

export default ChemicalDetails;
