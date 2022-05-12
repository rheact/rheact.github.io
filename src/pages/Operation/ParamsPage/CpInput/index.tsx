import { RheactState } from "model";
import { useSelector } from "react-redux";
import { useToggle } from "react-use";
import { Card, CardBody, Input, Label } from "reactstrap";
import CpCard from "../ValueCards/CpCard";
import CpTable from "./CpTable";

const CpInput = () => {
    const cp = useSelector<RheactState, string>(state => state.operatingParams.cp);
    const [manual, toggle] = useToggle(false);

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

                <Input disabled={cp !== ""} checked={cp !== "" || manual} onClick={toggle} type="checkbox" />
                <Label check className="ms-1">
                    Enter C<sub>p</sub> of mixture manually
                </Label>

                {(manual || cp !== "")
                    ? <CpCard />
                    : <CpTable />}
            </CardBody>
        </Card>
    );
};

export default CpInput;
