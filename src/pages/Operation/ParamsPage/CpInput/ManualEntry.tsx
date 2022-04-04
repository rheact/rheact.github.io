import CpCard from "../ValueCards/CpCard";

const CpManual = () => {
    return (
        <div className="p-2">
            <p className="text-muted">
                Enter specific heat capacity of the mixture at operating temperature.
                
                You can either enter the C<sub>p</sub> of the mixture here or let
                Rheact calculate the C<sub>p</sub> of the mixture by summing
                up the molecule weight fractions and specific heat capacities of
                reactants and products. Go to the other tab if you don't wish to
                calculate C<sub>p</sub>.
            </p>
            
            <CpCard />
        </div>
    );
};

export default CpManual;
