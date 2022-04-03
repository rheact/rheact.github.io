import { useSelector } from 'react-redux';
import { Card } from 'reactstrap';

const CalculationBlock = function ({ className }) {
    const results = useSelector((state) => state.results);

    if (!results || !results.finalTemp || !results.adiabaticTemp || !results.adiabaticPressure) {
        return (<h2 className={`text-muted ${className}`}>No calculations.</h2>);
    }

    return (
        <div className={className}>
            <h2>Calculations</h2>
            <div className="d-flex justify-content-center">
                <Card className="d-flex flex-column p-4 mx-2">
                    <span className="h6 text-center">Final Temperature</span>
                    <span className="h5 text-center">
                        {results.finalTemp.toFixed(3)}
                        {' '}
&deg;C
                    </span>
                </Card>

                <Card className="d-flex flex-column p-4 mx-2">
                    <span className="h6 text-center">Adiabatic Temperature Change</span>
                    <span className="h5 text-center">
                        {results.adiabaticTemp.toFixed(3)}
                        {' '}
&deg;C
                    </span>
                </Card>

                {/* <Card className="d-flex flex-column p-4 mx-2">
                    <span className="h6 text-center">Adiabatic Pressure Change</span>
                    <span className="h5 text-center">
                        {results.adiabaticPressure.toFixed(3)}
                        {' '}
bar
                    </span>
                </Card> */}
            </div>
        </div>
    );
};

export default CalculationBlock;
