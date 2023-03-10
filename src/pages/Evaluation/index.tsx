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

type EvaluationPageProps = {
    loadFn: Function
};


const EvaluationPage: FC<EvaluationPageProps> = function ({ loadFn }) {
    const [detailsActive, setDetailsActive] = useState<boolean>(true);
    const [componentsActive, setComponentsActive] = useState<boolean>(false);
    const [paramActive, setParamActive] = useState<boolean>(false);
    const [analysisActive, setAnalysisActive] = useState<boolean>(false);

    const handleStepperClick = (activeF: Dispatch<SetStateAction<boolean>>) => {
        if (detailsActive) {
            setDetailsActive(false)
        }
        if (componentsActive) {
            setComponentsActive(false)
        }
        if (paramActive) {
            setParamActive(false)
        }
        if (analysisActive) {
            setAnalysisActive(false)
        }
        activeF(true)
    }

    return (
        <Container>
            <div className="mt-2  arrow-steps clearfix">
                <div className={classnames(
                    'step',
                    detailsActive
                        ? 'step-active'
                        : 'step-inactive'
                    )}
                    onClick={() => handleStepperClick(setDetailsActive)}
                >
                    <i className={`bi bi-pencil-fill me-2`} />
                    <span className="step-label">Details</span> 
                </div>
                <div className={classnames(
                    'step',
                    componentsActive
                        ? 'step-active'
                        : 'step-inactive'
                    )}
                    onClick={() => handleStepperClick(setComponentsActive)}
                >
                    <i className={`bi bi-gear me-2`} />
                    <span className="step-label">Components</span>
                </div>
                <div className={classnames(
                    'step',
                    paramActive
                        ? 'step-active'
                        : 'step-inactive'
                    )}
                    onClick={() => handleStepperClick(setParamActive)}
                >
                    <i className={`bi bi-box me-2`} />
                    <span className="step-label">Process Parameters</span>
                </div>
                <div className={classnames(
                    'step',
                    analysisActive
                        ? 'step-active'
                        : 'step-inactive'
                    )}
                    onClick={() => handleStepperClick(setAnalysisActive)}
                >
                    <i className={`bi bi-file-earmark-bar-graph-fill me-2`} />
                <span className="step-label">Analysis</span> 
                </div>
            </div>
            {detailsActive && 
                <DetailsPage 
                    nextButton={
                        <NextButton 
                            label='Next - Components' 
                            activeF={setComponentsActive} 
                            deactiveF={setDetailsActive}
                        />
                    }
                    loadFn={loadFn}
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
