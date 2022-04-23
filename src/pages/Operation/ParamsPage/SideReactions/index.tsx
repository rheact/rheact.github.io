import { useMemo } from 'react';
import { Button, Card, CardBody, CardHeader } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import { ADD_SIDE_REACTION } from 'store';
import { RheactState } from 'model';
import SideReactionCard from './SideReactionCard';

const SideReactionsMasterCard = () => {
    const numSideReactions = useSelector((store: RheactState) => store.operatingParams.numSideReactions);
    const dispatch = useDispatch();

    const srCards = useMemo(() => _
        .range(numSideReactions)
        .map(i => <SideReactionCard key={`sr${i}`} index={i} />)
    ,[numSideReactions]);

    return (
        <Card>
            <CardHeader className="fw-bolder color-dark">Side Reactions</CardHeader>
            <CardBody>
                <div className="d-flex align-items-center mb-2">
                    <Button onClick={() => dispatch(ADD_SIDE_REACTION())}><i className="bi bi-plus-lg" /> Add </Button>
                    <span className="ms-auto text-muted">Enter the known side-reactions and their onset details.</span>
                </div>

                {numSideReactions > 0 && <hr />}
                {srCards}
            </CardBody>
        </Card>
    );
};

export default SideReactionsMasterCard;
