import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, Input, Label } from 'reactstrap';
import { RheactState, MOCOperatingParameters } from 'model';
import * as STORE from 'store';

const OperatingParametersCard = () => {
    const dispatch = useDispatch();
    const {
        operatingTemp,
        operatingPressure,
        quantityOfKeyReagent,
        totalReactionScale
    } = useSelector<RheactState>(state => state.mocOperatingParameters) as MOCOperatingParameters;

    return (
        <Card>
            <CardBody className="rh-card">
                <div className="h5 fw-bolder">Operating Parameters</div>
                <Label>Operating Temperature (&#8451;)</Label>
                <Input value={operatingTemp} onChange={e => dispatch(STORE.SET_MOC_TEMP(e.target.value))} />

                <Label>Operating Pressure (atm)</Label>
                <Input value={operatingPressure} onChange={e => dispatch(STORE.SET_MOC_PRESSURE(e.target.value))} />

                <Label>Quantity of Key Reagent (g or mL)</Label>
                <Input value={quantityOfKeyReagent} onChange={e => dispatch(STORE.SET_MOC_QUAN(e.target.value))} />

                <Label>Total Reaction Scale (g or mL)</Label>
                <Input value={totalReactionScale} onChange={e => dispatch(STORE.SET_MOC_TOTAL_SCALE(e.target.value))} />
            </CardBody>
        </Card>
    );
};

export default OperatingParametersCard;
