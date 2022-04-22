import { Card, CardBody } from "reactstrap";
import CpCard from "../ValueCards/CpCard";
import TableEntry from "./TableEntry";


const CpInput = () => {
    return (
        <Card>
            <CardBody>
                <span className="h5 fw-bolder">C<sub>p</sub> (mix)</span>

                <p className="text-muted">
                    Enter specific heat capacity of the mixture at operating temperature.

                    You can <b>either enter the C<sub>p</sub> of the mixture here</b> or let
                    Rheact calculate the C<sub>p</sub> of the mixture by summing
                    up the molecule weight fractions and specific heat capacities of
                    reactants and products.
                </p>

                <CpCard />
                <TableEntry />
            </CardBody>
        </Card>
    );
};

export default CpInput;
