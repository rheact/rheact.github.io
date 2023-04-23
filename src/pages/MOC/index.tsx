import { Container, Button } from "reactstrap";
import classnames from 'classnames'
import { FC, useState, Dispatch, SetStateAction, useCallback } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { RheactState, MOCComponents } from "model";
import server from "api";
import * as STORE from "store";
import DetailsPage from './Details';
import QuestionairePage from './Questionaire';
import ResultsPage from "./Results";

type StepButtonProps = {
    label: string;
    activeF: Dispatch<SetStateAction<boolean>>
    deactiveF: Dispatch<SetStateAction<boolean>>
    otherF?: any
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

const NextButton: FC<StepButtonProps> = function ({ label, activeF, deactiveF, otherF }) {
    return (
        <Button 
            className="nav-btn nav-btn-right"
            onClick={() => {
                activeF(true)
                deactiveF(false)
                if (otherF) {
                    otherF()
                }
            }
        }>
            {label}
        </Button>
    );
};

const MOCPage = () => {
    const dispatch = useDispatch();
    const mocComponents = useSelector<RheactState, MOCComponents>(state => state.mocComponents);
    const [detailsActive, setDetailsActive] = useState<boolean>(true);
    const [questionaireActive, setQuestionaireActive] = useState<boolean>(false);
    const [resultsActive, setResultsActive] = useState<boolean>(false);

    const handleStepperClick = (activeF: Dispatch<SetStateAction<boolean>>) => {
        if (detailsActive) {
            setDetailsActive(false)
        }
        if (questionaireActive) {
            setQuestionaireActive(false)
        }
        if (resultsActive) {
            setResultsActive(false)
        }
        activeF(true)
    }

    const fetchMOCHMatrix = useCallback(() => {
    
        const hNumsMap: {[key: string]: string} = {}
        mocComponents.chemicals.map((c, i) => {
            hNumsMap[i] = c.hNumbers || ''
        })

        server
        .getMOCHMatrix(hNumsMap)
        .then((data) => {
            const jsonData = JSON.parse(data.data)
            dispatch(STORE.SET_MOC_HAMTRIX({ level1: jsonData.level1, level2: jsonData.level2, level3: jsonData.level3}))
        })
    }, [mocComponents])

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
                    <i className={`bi bi-card-list me-2`} />
                    <span className="step-label">Details</span>
                </div>
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
                    onClick={() => {
                        handleStepperClick(setResultsActive)
                        fetchMOCHMatrix()
                    }}
                >
                    <i className={`bi bi-file-earmark-text me-2`} />
                    <span className="step-label">Report</span>
                </div>
            </div>
            {detailsActive && 
                <DetailsPage
                    nextButton={
                        <NextButton 
                            label='Next - Questionaire' 
                            activeF={setQuestionaireActive} 
                            deactiveF={setDetailsActive}
                        />
                    }
                />
            }
            {questionaireActive && 
                <QuestionairePage
                    prevButton={
                        <PrevButton
                            label='Previous - Details'
                            activeF={setDetailsActive}
                            deactiveF={setQuestionaireActive}
                        />
                    }
                    nextButton={
                        <NextButton 
                            label='Next - Report'
                            activeF={setResultsActive} 
                            deactiveF={setQuestionaireActive}
                            otherF={fetchMOCHMatrix}
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

export default MOCPage;
