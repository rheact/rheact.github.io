import { FC, useMemo, useCallback } from "react";
import { isUndefined } from 'lodash';
import { Container, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Button, Row } from "reactstrap";
import { useSelector } from "react-redux";
import { RheactState, MOCComponents, MOCHMatrix, MOCProjectDetails, MOCOperatingParameters } from "model";
import questions from 'data/mocQuestions.json';

import './style.css'

type MOCProps = {
    prevButton?: React.ReactNode
    nextButton?: React.ReactNode
}

const HazardAssessment: FC<any> = () => {

    const mocHMatrix = useSelector<RheactState, MOCHMatrix>(state => state.mocHMatrix);
    const level1 = mocHMatrix.level1.join(', ')
    const level2 = mocHMatrix.level2.join(', ')
    const level3 = mocHMatrix.level3.join(', ')

    return (
        <>
            {
                level1 && (
                    <div>
                        <span className="moc-hazard-title">Level 1 Review: </span>
                        {level1}
                    </div>
                )
            }
            {
                level2 && (
                    <div>
                        <span className="moc-hazard-title">Level 2 Review: </span>
                        {level2}
                    </div>
                )
            }
            {
                level3 && (
                    <div>
                        <span className="moc-hazard-title">Level 3 Review: </span>
                        {level3}
                    </div>
                )
            }
            {
                !level1 && !level2 && !level3 && (
                    <div>No Recommendations</div>
                )
            }
        </>
    )
}

const Recommendations: FC<any> = () => {
    const resps = useSelector<RheactState>(state => state.mocQuestionnaireResponse) as any;
    
    const recs = useMemo(() => Object.keys(resps)
        .map(uid => questions.find(q => q.uid === uid)), [resps]);

    return (
        <ListGroup className="moc-table">
            {recs.map(r => (r && 
                <ListGroupItem>
                    <ListGroupItemText className="moc-question-title">{r.question}</ListGroupItemText>
                    {
                        r.type == 'bool' && !isUndefined(resps[r.uid]) && <ListGroupItemHeading>{resps[r.uid] ? (r.answer as { yes: string; no: string; }).yes : (r.answer as { yes: string; no: string; }).no}</ListGroupItemHeading>
                    }
                    {
                        r.type == 'boolPersonnel' 
                        && !isUndefined(resps[r.uid]) 
                        && <ListGroupItemHeading>{resps[r.uid] ? (r.answer as {
                            yes: string;
                            no: {
                                personnelChange: string;
                                noPersonnelChange: string;
                            };
                        }).yes : 
                            (
                                resps[r.uid] ?
                                    (r.answer as {
                                    yes: string;
                                    no: {
                                        personnelChange: string;
                                        noPersonnelChange: string;
                                    };}).no.personnelChange
                                :
                                    (r.answer as {
                                    yes: string;
                                    no: {
                                        personnelChange: string;
                                        noPersonnelChange: string;
                                    };}).no.noPersonnelChange
                            )
                        }</ListGroupItemHeading>
                    }
                    {
                        r.type == 'multi'
                        && (
                            (resps[r.uid]).map((index: number) => {
                                console.log('multi ', index)
                                return <ListGroupItemHeading>{r.choices![index]} : {(r.answer as string[])[index]}</ListGroupItemHeading>
                            })
                        )
                    }
                </ListGroupItem>
            ))}
        </ListGroup>
    );
};

const MOCResultsPage: FC<MOCProps> = ({ prevButton }) => {

    const {
        nameOfResearcher,
        projectTitle,
        labLocation,
        principalInvestigator,
        organization,
    } = useSelector<RheactState, MOCProjectDetails>(state => state.mocProjectDetails);

    const { chemicals } = useSelector<RheactState, MOCComponents>(state => state.mocComponents);

    const { 
        operatingTemp,
        operatingPressure,
        quantityOfKeyReagent,
        totalReactionScale
    } = useSelector<RheactState, MOCOperatingParameters>(state => state.mocOperatingParameters);

    const onPrint = useCallback(() => {
        window.print();
    }, []);

    return (
        <>
        <Button color="primary" className="ms-1 moc-print" onClick={onPrint}>
            <i className="bi bi-printer-fill me-1" />
            Print
        </Button>
        <Container className="moc-printable">
            <Row className="g-2" id={"moc-details-printable"} style={{display: 'none'}}>
                <h3 className="moc-section-title">Project Details</h3>
                <div className="h5 fw-bolder">Project Information</div>
                <div>Project Title: {projectTitle || "N/A"}</div>
                <div>Name of Researcher: {nameOfResearcher || "N/A"}</div>
                <div>Principal Investigator: {principalInvestigator || "N/A"}</div>
                <div>Lab Location: {labLocation || "N/A"}</div>
                <div>Organization: {organization || "N/A"}</div>
                <div className="h5 fw-bolder">Chemical Details</div>
                {
                    chemicals.length > 0 ? chemicals.map(chem => {
                        return (
                            <div>
                                <span>Chemical Name: {chem.productName || 'N/A'}</span>
                                <span>Cas Number: {chem.casNo || 'N/A'}</span>
                            </div>
                        )
                    }): <div>No chemicals</div>
                }
                <div className="h5 fw-bolder">Operating Parameters</div>
                <div>Operating Temperature (&#8451;): {operatingTemp || "N/A"}</div>
                <div>Operating Pressure (atm): {operatingPressure || "N/A"}</div>
                <div>Quantity of Key Reagent (g/mL): {quantityOfKeyReagent || "N/A"}</div>
                <div>Total Reaction Scale (g/mL): {totalReactionScale || "N/A"}</div>
            </Row>
            <div className="custom-alert moc-level">
                Review Levels:
                <ul>
                    <li>Level 1(Low Risk): Review by User and Lab Peers</li>
                    <li>Level 2 (Medium Risk): Additional review by Lab Safety Officer, Lab manager and Lab PI</li>
                    <li>Level 3 (High Risk): Additional review by Environmental, Health and Safety (EH&S) personnel of the organization</li>
                </ul>
            </div>
            <h3 className="moc-section-title">Chemical Hazard Assessment</h3>
            <div>Based on Hazard Matrix of uploaded chemicals, the following levels of review are recommended:</div>
            <HazardAssessment />
            <h3 className="moc-section-title">Recommendations from Questionnaire</h3>
            <Recommendations />
        </Container>
        {prevButton}
        </>
    );
};

export default MOCResultsPage;
