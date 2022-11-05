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

    return (
        <Container>
            <ListGroup horizontal id="ppe-steps">
                <ListGroupItem className="step">
                    <div className={classnames(
                        'step-content',
                        questionaireActive
                            ? 'step-active'
                            : 'step-inactive'
                        )}>
                        <i className={`bi bi-card-list me-2`} />
                        <span className="step-label">Questionaire</span>
                    </div>
                </ListGroupItem>
                <ListGroupItem className="step">
                    <div className={classnames(
                        'step-content',
                        resultsActive
                            ? 'step-active'
                            : 'step-inactive'
                        )}>
                        <i className={`bi bi-file-earmark-text me-2`} />
                        <span className="step-label">Report</span>
                    </div>
                </ListGroupItem>
            </ListGroup>
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
