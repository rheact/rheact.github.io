import { Container, ListGroup, ListGroupItem, Button, NavLink } from "reactstrap";
import classnames from 'classnames'
import { FC, useState, Dispatch, SetStateAction } from 'react';
import { NavLink as Link } from 'react-router-dom';
import R from 'pages/routes';
import DetailsPage from './ProjectInfo';
import ComponentsPage from './SDS';
import ProcessParamPage from './Operation/ParamsPage';
import AnalysisPage from './Operation/ResultsPage';

import './style.css';

type StepButtonProps = {
    label: string;
    activeF: Dispatch<SetStateAction<boolean>>
    deactiveF: Dispatch<SetStateAction<boolean>>
};

const PrevButton: FC<StepButtonProps> = function ({ label, activeF, deactiveF }) {
    return (
        <Button 
            className="nav-btn nav-btn-left"
            onClick={() => {
                activeF(true)
                deactiveF(false)
            }
        }>
            {label}
        </Button>
    );
};

const NextButton: FC<StepButtonProps> = function ({ label, activeF, deactiveF }) {
    return (
        <Button 
            className="nav-btn nav-btn-right"
            onClick={() => {
                activeF(true)
                deactiveF(false)
            }
        }>
            {label}
        </Button>
    );
};


const EvaluationPage = () => {
    const [detailsActive, setDetailsActive] = useState<boolean>(true);
    const [componentsActive, setComponentsActive] = useState<boolean>(false);
    const [paramActive, setParamActive] = useState<boolean>(false);
    const [analysisActive, setAnalysisActive] = useState<boolean>(false);

    return (
        <Container>
            <ListGroup horizontal id="evaluation-steps">
                <ListGroupItem className="step">
                    <div className={classnames(
                        'step-content',
                        detailsActive
                            ? 'step-active'
                            : 'step-inactive'
                        )}>
                        <i className={`bi bi-pencil-fill me-2`} />
                        <span className="step-label">Details</span>
                    </div>
                </ListGroupItem>
                <ListGroupItem className="step">
                    <div className={classnames(
                        'step-content',
                        componentsActive
                            ? 'step-active'
                            : 'step-inactive'
                        )}>
                        <i className={`bi bi-gear me-2`} />
                        <span className="step-label">Components</span>
                    </div>
                </ListGroupItem>
                <ListGroupItem className="step">
                    <div className={classnames(
                        'step-content',
                        paramActive
                            ? 'step-active'
                            : 'step-inactive'
                        )}>
                        <i className={`bi bi-box me-2`} />
                        <span className="step-label">Process Parameters</span>
                    </div>
                </ListGroupItem>
                <ListGroupItem className="step">
                    <div className={classnames(
                        'step-content',
                        analysisActive
                            ? 'step-active'
                            : 'step-inactive'
                        )}>
                        <i className={`bi bi-file-earmark-bar-graph-fill me-2`} />
                        <span className="step-label">Analysis</span>
                    </div>
                </ListGroupItem>
            </ListGroup>
            {detailsActive && 
                <DetailsPage 
                    nextButton={
                        <NextButton 
                            label='Next - Components' 
                            activeF={setComponentsActive} 
                            deactiveF={setDetailsActive}
                        />
                    }
                />
            }
            {componentsActive && 
                <ComponentsPage 
                    prevButton={
                        <PrevButton
                            label='Previous - Details'
                            activeF={setDetailsActive}
                            deactiveF={setComponentsActive}
                        />
                    }
                    nextButton={
                        <NextButton 
                            label='Next - Process Parameters'
                            activeF={setParamActive} 
                            deactiveF={setComponentsActive}
                        />
                    }
                />
            }
            {paramActive && 
                <ProcessParamPage 
                    prevButton={
                        <PrevButton
                            label='Previous - Components'
                            activeF={setComponentsActive}
                            deactiveF={setParamActive}
                        />
                    }
                    nextButton={
                        <NextButton 
                            label='Next - Generate Report' 
                            activeF={setAnalysisActive} 
                            deactiveF={setParamActive}
                        />
                    }
                />
            }
            {analysisActive && 
                <AnalysisPage 
                    prevButton={
                        <PrevButton
                            label='Previous - Process Parameters'
                            activeF={setParamActive}
                            deactiveF={setAnalysisActive}
                        />
                    }
                    nextButton={
                        <NavLink
                            tag={Link}
                            to={R.ROUTE_PPE_EVALUATION}
                            className="nav-btn nav-btn-right"
                        >
                            Next - PPE Evaluation
                        </NavLink>
                    }
                />
            }
        </Container>
    );
};

export default EvaluationPage;
