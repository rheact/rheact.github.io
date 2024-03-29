import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, Input, Label } from 'reactstrap';
import { RheactState, MOCProjectDetails } from 'model';
import * as STORE from 'store';

const ProjectDetailsCard = () => {
    const dispatch = useDispatch();
    const {
        projectTitle,
        nameOfResearcher,
        principalInvestigator,
        labLocation,
        organization,
    } = useSelector<RheactState>(state => state.mocProjectDetails) as MOCProjectDetails;

    return (
        <Card>
            <CardBody className="rh-card">
                <div className="h5 fw-bolder">Project Information</div>
                <Label>Project Title</Label>
                <Input value={projectTitle} onChange={e => dispatch(STORE.SET_MOC_PROJECT_TITLE(e.target.value))} />

                <Label>Name of Researcher</Label>
                <Input value={nameOfResearcher} onChange={e => dispatch(STORE.SET_MOC_NAME_OF_RESEARCHER(e.target.value))} />

                <Label>Principal Investigator</Label>
                <Input value={principalInvestigator} onChange={e => dispatch(STORE.SET_MOC_PRINCIPAL_INVESTIGATOR(e.target.value))} />

                <Label>Lab Location</Label>
                <Input value={labLocation} onChange={e => dispatch(STORE.SET_MOC_LAB_LOCATION(e.target.value))} />

                <Label>Organization</Label>
                <Input value={organization} onChange={e => dispatch(STORE.SET_MOC_ORGANIZATION(e.target.value))} />
            </CardBody>
        </Card>
    );
};

export default ProjectDetailsCard;
