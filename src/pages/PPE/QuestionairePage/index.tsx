import { FC, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Button, ButtonGroup, Col, Container, ListGroup, ListGroupItem, Row } from "reactstrap";
import { RheactState, SET_PPE_QUESTION } from "store";
import questions from 'data/questions.json';

type Question = {
    uid: string,
    question: string,
    answer: string,
}

const PPEQuestionSingle: FC<Question> = ({ uid, question }) => {
    const responses = useSelector<RheactState>(state => state.ppe_questionnaire || {}) as any;
    const dispatch = useDispatch();

    const onYes = useCallback(() => {
        dispatch(SET_PPE_QUESTION({ uid, response: true }));
    }, [dispatch, uid]);

    const onNo = useCallback(() => {
        dispatch(SET_PPE_QUESTION({ uid, response: false }));
    }, [dispatch, uid]);

    return (
        <ListGroupItem>
            <Row className="p-2">
                <Col sm={10}>
                {question}
                </Col>
                <Col className="d-flex align-items-center justify-content-end">
                    <ButtonGroup>
                        <Button outline={responses[uid] !== true} onClick={onYes} color="success">Yes</Button>
                        <Button outline={responses[uid] !== false} onClick={onNo} color="danger">No</Button>
                    </ButtonGroup>
                </Col>
            </Row>
        </ListGroupItem>
    );
}

export default function PPEQuestions() {
    return (
        <Container>
            <Alert>
                This questionnaire will help you conisider PPE that may be relevant to your process.
                <br />
                <br />
                Please consult the Hazard and Chemical Compatibility Matrix before answering the following questions!
            </Alert>
            <ListGroup>
                {questions.map(q => <PPEQuestionSingle key={q.uid} {...q} />)}
            </ListGroup>
        </Container>
    );
}
