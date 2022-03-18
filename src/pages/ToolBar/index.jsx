import { Button } from "reactstrap";
import SaveLoadGroup from "./SaveLoad";
import ToolPages from "./ToolPages";

const ToolBar = () => {
    return (
        <div
            className="d-flex sticky-top shadow-sm mb-2 p-2"
            style={{ backgroundColor: "white" }}
        >
            <ToolPages />
            <Button size="sm" className="ms-auto">
                Settings
            </Button>
            <SaveLoadGroup className="ms-1" />
        </div>
    );
};

export default ToolBar;
