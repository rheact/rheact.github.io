import { useCallback } from "react";
import { useSelector } from "react-redux";
import { Button } from "reactstrap";

const SaveButton = () => {
    const state = useSelector((state) => state);
    const onClick = useCallback(() => {
        const a = document.createElement("a");
        const file = new Blob([JSON.stringify(state)], { type: "text/json" });
        a.href = URL.createObjectURL(file);
        a.download = state.projectTitle + ".rheact";
        a.click();
    }, [state]);

    return (
        <Button size="sm" color="warning" onClick={onClick} outline>
            <i className="bi-save-fill" /> Save
        </Button>
    );
};

export default SaveButton;
