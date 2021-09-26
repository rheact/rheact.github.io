import { Card, CardBody, CardHeader, Input, Label } from 'reactstrap';

const ProjectCard = () => {
  return (
    <Card>
      <CardHeader className="fw-bolder color-dark">Project Information</CardHeader>
      <CardBody>
        <Label>Name of Researcher</Label>
        <Input />
        <Label>Project Title</Label>
        <Input />
        <Label>Principal Investigator</Label>
        <Input />
        <Label>Lab Location</Label>
        <Input />
        <Label>Organization</Label>
        <Input />
      </CardBody>
    </Card>
  );
};

export default ProjectCard;
