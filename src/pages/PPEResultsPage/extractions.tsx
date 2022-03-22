import { FC } from "react";
import { useSelector } from "react-redux";
import { Card, CardBody, CardHeader } from "reactstrap";
import { Chemical, Equation, RheactState } from "store";

const ExtractionCard: FC<{ chemical: Chemical }> = ({ chemical }) => {
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

const Extractions: FC<any> = () => {
    const compounds = useSelector<RheactState>(state => state.compound) as Equation;

    return (
        <>
        {compounds.reactants.map(c => <ExtractionCard chemical={c} />)}
        {compounds.products.map(c => <ExtractionCard chemical={c} />)}
        {compounds.diluents.map(c => <ExtractionCard chemical={c} />)}
        </>
    );
};

export default Extractions;
