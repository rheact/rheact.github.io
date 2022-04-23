import { FC, useMemo } from "react";
import { useSelector } from "react-redux";
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from "reactstrap";
import { RheactState } from "model";
import questions from 'data/questions.json';

const Recommendations: FC<any> = () => {
    const resps = useSelector<RheactState>(state => state.ppe_questionnaire) as any;

    const recs = useMemo(() => Object.keys(resps)
        .filter(uid => resps[uid])
        .map(uid => questions.find(q => q.uid === uid)), [resps]);

    return (
        <ListGroup>
            {recs.map(r => (r && 
                <ListGroupItem>
                    <ListGroupItemHeading>{r.answer}</ListGroupItemHeading>
                    <ListGroupItemText className="text-muted">{r.question}</ListGroupItemText>
                </ListGroupItem>
            ))}
        </ListGroup>
    );
};

export default Recommendations;
