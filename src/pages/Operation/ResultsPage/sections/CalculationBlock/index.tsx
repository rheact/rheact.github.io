import { Calculations, RheactState } from 'model';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Card } from 'reactstrap';

const CalculationBlock: FC<any> = function ({ className }) {
    const results = useSelector<RheactState, Calculations | undefined>((state) => state.results.calculations);

    if (!results) {
        return (<h2 className={`text-muted ${className}`}>No calculations.</h2>);
    }

    return (
        <div className={className}>
            <h2>Calculations</h2>
            <div className="d-flex justify-content-center">
                {results.finalTempDisplay && (
                    <Card className="d-flex flex-column p-4 mx-2">
                        <span className="h6 text-center">Final Temperature</span>
                        <span className="h5 text-center">
                            {results.finalTempDisplay}
                        </span>
                    </Card>
                )}

                {results.adiabaticTempDisplay && (
                    <Card className="d-flex flex-column p-4 mx-2">
                        <span className="h6 text-center">Adiabatic Temperature Change</span>
                        <span className="h5 text-center">
                            {results.adiabaticTempDisplay}
                        </span>
                    </Card>
                )}

                {/* <Card className="d-flex flex-column p-4 mx-2">
                    <span className="h6 text-center">Adiabatic Pressure Change</span>
                    <span className="h5 text-center">
                        {results.adiabaticPressure}
                    </span>
                </Card> */}
            </div>
        </div>
    );
};

export default CalculationBlock;
