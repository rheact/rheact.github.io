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

                {!manual && 
                <>
                    <p className="text-danger">
                        Based on a backend database (imported from RAST), RHEACT uses temperature of the operation
                            to estimate liquid C<sub>p</sub> of common components using C<sub>p</sub> = A + B * T.
                            Please confirm the estimated liquid C<sub>p</sub> values before generating the report.
                    </p>
                    <p className="text-danger">
                        For unavailable liquid Cp or for all gas phase Cp, please go to 
                        <a target="_blank" href="webbook.nist.gov" style={{textDecoration: "none"}}> NIST Chemistry WebBook </a> 
                        or 
                        <a target="_blank" href="www.engineeringtoolbox.com" style={{textDecoration: "none"}}> The Engineering ToolBox </a> 
                        or other sources to obtain Cp values
                    </p>
                </>
                }

                {(manual || cp !== "")
                    ? <CpCard />
                    : <CpTable />}
            </CardBody>
        </Card>
    );
};

export default CpInput;
