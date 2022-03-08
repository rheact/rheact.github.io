import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, Input, Label } from 'reactstrap';
import { SET_LAB_LOCATION, SET_NAME_OF_RESEARCHER, SET_ORGANIZATION, SET_PRINCIPAL_INVESTIGATOR, SET_PROJECT_TITLE } from '../../../store/reducer';

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
            <CardBody>
                <div className="h5 fw-bolder">Project Information</div>
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
