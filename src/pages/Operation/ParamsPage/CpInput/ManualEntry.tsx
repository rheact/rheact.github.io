import { Alert } from "reactstrap";
import CpCard from "../ValueCards/CpCard";

const CpManual = () => {
    return (
        <div className="p-2">
            <Alert color="info">
                Enter specific heat capacity of the mixture at operating temperature.
                
                You can <b>either enter the C<sub>p</sub> of the mixture here</b> or let
                Rheact calculate the C<sub>p</sub> of the mixture by summing
                up the molecule weight fractions and specific heat capacities of
                reactants and products.
            </Alert>
            
            <CpCard />
        </div>
    );
};

export default CpManual;
