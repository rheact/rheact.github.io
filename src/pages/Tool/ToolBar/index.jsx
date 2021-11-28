import SaveLoadGroup from "./SaveLoad";
import ToolPages from "./ToolPages";

const ToolBar = () => {
    return (
        <div
            className="d-flex sticky-top shadow-sm mb-2 p-2"
            style={{ backgroundColor: "white" }}
        >
            <ToolPages />

            <SaveLoadGroup className="ms-auto" />
        </div>
    );
};

export default ToolBar;
