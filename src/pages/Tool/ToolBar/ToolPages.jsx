import { NavLink } from "react-router-dom";
import { Button, ButtonGroup } from "reactstrap";
import R from "../routes";

const FormatButton = ({ icon, route, children }) => (
    <Button
        className="text-center"
        size="sm"
        tag={NavLink}
        to={route}
        outline
        color="dark"
    >
        <i className={icon} /> {children}
    </Button>
);

const ToolPages = ({ className }) => {
    return (
        <span className={className}>
            <FormatButton icon="bi-question-circle" route={R.ROUTE_GUIDE}>
                Guide
            </FormatButton>
            <ButtonGroup className="mx-2">
                <FormatButton icon="bi-box" route={R.ROUTE_OPERATION_DETAILS}>
                    Operation Details
                </FormatButton>
                <FormatButton
                    icon="bi-pencil-fill"
                    route={R.ROUTE_REPORT_DETAILS}
                >
                    Report Details
                </FormatButton>
            </ButtonGroup>

            <FormatButton
                icon="bi bi-file-earmark-bar-graph-fill"
                route={R.ROUTE_RESULTS}
            >
                Report
            </FormatButton>
        </span>
    );
};

export default ToolPages;
