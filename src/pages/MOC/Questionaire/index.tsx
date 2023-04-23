import { FC, useCallback } from "react";
import { includes } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { Button, ButtonGroup, Col, Container, ListGroup, ListGroupItem, Row, Input, Label } from "reactstrap";
import { SET_MOC_QUESTION } from "store";
import { RheactState } from "model";
import questions from 'data/mocQuestions.json';

import './style.css';

type Question = {
    uid: string,
    question: string,
    type: string,
    choices?: string[],
    answer: any,
}

type MOCProps = {
    prevButton?: React.ReactNode
    nextButton?: React.ReactNode
}

const MOCQuestion: FC<Question> = ({ uid, question, type, choices }) => {
    const responses = useSelector<RheactState>(state => state.mocQuestionnaireResponse || {}) as any;
    const dispatch = useDispatch();

    const onYes = useCallback(() => {
        dispatch(SET_MOC_QUESTION({ uid, response: true }));
    }, [dispatch, uid]);

    const onNo = useCallback(() => {
        dispatch(SET_MOC_QUESTION({ uid, response: false }));
    }, [dispatch, uid]);

    const onCheckboxBtnClick = useCallback((selected: number) => {
        let cSelected = (responses[uid] && type == "multi") ? [...responses[uid]] : []
        const index = cSelected.indexOf(selected);

        if (index < 0) {
            cSelected.push(selected);
        } else {
            cSelected.splice(index, 1);
        }

        dispatch(SET_MOC_QUESTION({ uid, response: cSelected}));
    }, [dispatch, responses]);

    return (
        <ListGroupItem>
            <Row className="p-2">
                <Col sm={10} className={"moc-question"}>
                    {question}
                </Col>
                {
                    (type == "bool" || type == 'boolPersonnel') && (
                        <Col className="d-flex align-items-center justify-content-end">
                            <ButtonGroup>
                                <Button outline={responses[uid] !== true} onClick={onYes} color="success">Yes</Button>
                                <Button outline={responses[uid] !== false} onClick={onNo} color="danger">No</Button>
                            </ButtonGroup>
                        </Col>
                    )
                }
                {
                    type == "multi" && (
                        <>
                            {choices?.map((c, i) => {
                                return (
                                    <div className={"moc-checkbox"}>
                                        <Input type="checkbox" onChange={() => onCheckboxBtnClick(i)} checked={responses[uid] ? includes(responses[uid], i) : false}/>
                                        <Label check>
                                            {c}
                                        </Label>
                                    </div>
                                )
                            })}
                        </>
                    )
                }
            </Row>
        </ListGroupItem>
    );
}

export default function MOCQuestions({ prevButton, nextButton }: MOCProps) {
    return (
        <Container className="p-2">
            <ListGroup>
                {questions.map(q => <MOCQuestion key={q.uid} {...q} />)}
            </ListGroup>
            {prevButton}
            {nextButton}
        </Container>
    );
}
