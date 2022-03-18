import { NavLink } from "react-router-dom";
import { Button, ButtonGroup } from "reactstrap";
import R from "../routes";

const FormatButton = ({ icon, route, children, color, className }) => (
    <Button
        className={"text-center " + className}
        size="sm"
        tag={NavLink}
        to={route}
        color={color || "dark"}
    >
        <i className={icon} /> {children}
    </Button>
);

const ToolPages = ({ className }) => {
    return (
        <span className={className}>
            <FormatButton icon="bi-question-circle">
                RHEACT
            </FormatButton>

            <FormatButton color="success" className="ms-1" icon="bi-box" route={R.ROUTE_OPERATION_DETAILS}>
                Upload SDS 
            </FormatButton>

            <ButtonGroup className="mx-2">
                <Button size="sm" disabled color="primary">Operation</Button>
                <FormatButton icon="bi-box" route={R.ROUTE_OPERATION_DETAILS}>
                    Parameters
                </FormatButton>
                <FormatButton
                    icon="bi-pencil-fill"
                    route={R.ROUTE_REPORT_DETAILS}
                >
                    Details
                </FormatButton>
                <FormatButton
                    icon="bi bi-file-earmark-bar-graph-fill"
                    route={R.ROUTE_RESULTS}
                >
                    Report
                </FormatButton>
            </ButtonGroup>

            <ButtonGroup className="mx-2">
                <Button size="sm" disabled color="primary">PPE</Button>
                <FormatButton icon="bi-box" route={R.ROUTE_PPE_QUESTIONAIRE}>
                    Questionaire
                </FormatButton>
                <FormatButton
                    icon="bi bi-file-earmark-bar-graph-fill"
                    route={R.ROUTE_RESULTS}
                >
                    Report
                </FormatButton>
            </ButtonGroup>
        </span>
    );
};

export default ToolPages;
