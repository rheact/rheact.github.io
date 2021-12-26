import { Card, CardBody, CardHeader, Input, Label } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { SET_NAME_OF_RESEARCHER, SET_PROJECT_TITLE, SET_PRINCIPAL_INVESTIGATOR, SET_LAB_LOCATION, SET_ORGANIZATION } from '../../../store/reducer';

const ProjectCard = () => {
    const dispatch = useDispatch();
    const {
        nameOfResearcher,
        projectTitle,
        labLocation,
        principalInvestigator,
        organization,
    } = useSelector(store => store);

    return (
        <Card>
            <CardHeader className="fw-bolder color-dark">Project Information</CardHeader>
            <CardBody>
                <Label>Name of Researcher</Label>
                <Input value={nameOfResearcher} onChange={e => dispatch(SET_NAME_OF_RESEARCHER(e.target.value))} />

                <Label>Project Title</Label>
                <Input value={projectTitle} onChange={e => dispatch(SET_PROJECT_TITLE(e.target.value))} />

                <Label>Principal Investigator</Label>
                <Input value={principalInvestigator} onChange={e => dispatch(SET_PRINCIPAL_INVESTIGATOR(e.target.value))} />

                <Label>Lab Location</Label>
                <Input value={labLocation} onChange={e => dispatch(SET_LAB_LOCATION(e.target.value))} />

                <Label>Organization</Label>
                <Input value={organization} onChange={e => dispatch(SET_ORGANIZATION(e.target.value))} />
            </CardBody>
        </Card>
    );
};

export default ProjectCard;
