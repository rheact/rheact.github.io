import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import classnames from 'classnames'
import { FC, useState, Dispatch, SetStateAction } from 'react';
import QuestionairePage from './QuestionairePage';
import ResultsPage from './ResultsPage'

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


const PPEPage = () => {
    const [questionaireActive, setQuestionaireActive] = useState<boolean>(true);
    const [resultsActive, setResultsActive] = useState<boolean>(false);

    const handleStepperClick = (activeF: Dispatch<SetStateAction<boolean>>) => {
        if (questionaireActive) {
            setQuestionaireActive(false)
        }
        if (resultsActive) {
            setResultsActive(false)
        }
        activeF(true)
    }

    return (
        <Container>
            <div className="mt-2  arrow-steps clearfix">
                <div className={classnames(
                    'step',
                    questionaireActive
                        ? 'step-active'
                        : 'step-inactive'
                    )}
                    onClick={() => handleStepperClick(setQuestionaireActive)}
                >
                    <i className={`bi bi-card-list me-2`} />
                    <span className="step-label">Questionaire</span>
                </div>
                <div className={classnames(
                    'step',
                    resultsActive
                        ? 'step-active'
                        : 'step-inactive'
                    )}
                    onClick={() => handleStepperClick(setResultsActive)}
                >
                    <i className={`bi bi-file-earmark-text me-2`} />
                    <span className="step-label">Report</span>
                </div>
            </div>
            {questionaireActive && 
                <QuestionairePage 
                    nextButton={
                        <NextButton 
                            label='Next - Report' 
                            activeF={setResultsActive} 
                            deactiveF={setQuestionaireActive}
                        />
                    }
                />
            }
            {resultsActive && 
                <ResultsPage 
                    prevButton={
                        <PrevButton
                            label='Previous - Questionaire'
                            activeF={setQuestionaireActive}
                            deactiveF={setResultsActive}
                        />
                    }
                />
            }
        </Container>
    );
};

export default PPEPage;
