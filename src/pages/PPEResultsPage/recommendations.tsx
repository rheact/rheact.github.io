import { FC } from "react";
import { useSelector } from "react-redux";
import { Card, CardBody, CardHeader } from "reactstrap";
import { Chemical, Equation, RheactState } from "store";

const RecommendationCard: FC<{ chemical: Chemical }> = ({ chemical }) => {
    return (
        <Card className="my-1">
            <CardHeader>
                <b>{chemical.productName} ({chemical.casNo})</b>
            </CardHeader>
            <CardBody className="d-flex flex-column align-items-center">
                {chemical.ppe_pages?.map(psrc => (
                    <img className="w-100" src={psrc} />
                ))}
            </CardBody>
        </Card>
    );
};

const Recommendations: FC<any> = () => {
    const compounds = useSelector<RheactState>(state => state.compound) as Equation;

    return (
        <>
        {compounds.reactants.map(c => <RecommendationCard chemical={c} />)}
        {compounds.products.map(c => <RecommendationCard chemical={c} />)}
        {compounds.diluents.map(c => <RecommendationCard chemical={c} />)}
        </>
    );
};

export default Recommendations;
