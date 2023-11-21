import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, Input, Label } from 'reactstrap';
import * as STORE from 'store';

import "../style.css"

const ProjectCard = () => {
    const dispatch = useDispatch();
    const {
        nameOfResearcher,
        projectTitle,
        labLocation,
        principalInvestigator,
        organization,
    } = useSelector(state => state.info);

    return (
        <Card>
            <CardBody className="rh-card">
                <div className="h5 fw-bolder">Project Information</div>
                <Label>Project Title</Label>
                <Input value={projectTitle} onChange={e => dispatch(STORE.SET_PROJECT_TITLE(e.target.value))} />

                <Label>Name of Researcher</Label>
                <Input value={nameOfResearcher} onChange={e => dispatch(STORE.SET_NAME_OF_RESEARCHER(e.target.value))} />

                <Label>Principal Investigator</Label>
                <Input value={principalInvestigator} onChange={e => dispatch(STORE.SET_PRINCIPAL_INVESTIGATOR(e.target.value))} />

                <Label>Lab Location</Label>
                <Input value={labLocation} onChange={e => dispatch(STORE.SET_LAB_LOCATION(e.target.value))} />

                <Label>Organization</Label>
                <Input value={organization} onChange={e => dispatch(STORE.SET_ORGANIZATION(e.target.value))} />
            </CardBody>
        </Card>
    );
};

export default ProjectCard;
