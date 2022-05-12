import _ from 'lodash';
import { RheactState } from 'model';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardBody } from 'reactstrap';
import { ADD_SIDE_REACTION } from 'store';
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
            <CardBody>
                <span className="h5 fw-bolder">Side Reactions</span>
                <div className="d-flex align-items-center mb-2">
                    <Button size="sm" onClick={() => dispatch(ADD_SIDE_REACTION())}><i className="bi bi-plus-lg" /> Add </Button>
                    <span className="ms-auto text-muted">Enter the known side-reactions and their onset details.</span>
                </div>

                {numSideReactions > 0 && <hr />}
                {srCards}
            </CardBody>
        </Card>
    );
};

export default SideReactionsMasterCard;
