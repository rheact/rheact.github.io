import { Card, CardBody, CardHeader } from "reactstrap";
import CpManual from "./ManualEntry";
import TableEntry from "./TableEntry";

const CpInput = () => {
    return (
        <Card>
            <CardHeader className="fw-bold">C<sub>p</sub> (mix)</CardHeader>
            <CardBody>
                <CpManual />
                <TableEntry />
            </CardBody>
        </Card>
    );
};

export default CpInput;
