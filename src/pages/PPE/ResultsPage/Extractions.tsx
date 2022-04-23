import { FC } from "react";
import { useSelector } from "react-redux";
import { Chemical, Equation, RheactState } from "model";

const ExtractionCard: FC<{ chemical: Chemical }> = ({ chemical }) => {
    return (
        <div className="my-1 border border-2 p-1 d-flex flex-column align-items-center">
            <h4 className="fw-bolder">{chemical.productName} ({chemical.casNo})</h4>
            {chemical.ppe_pages?.map(psrc => (
                <img alt={chemical.productName} style={{ width: '80%' }} src={psrc} />
            ))}
        </div>
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
