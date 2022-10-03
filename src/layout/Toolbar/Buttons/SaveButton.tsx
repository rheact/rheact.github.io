import { FC, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Tooltip } from "reactstrap";
import { RheactState } from "model";

const SaveButton: FC<any> = () => {
    const state = useSelector((state: RheactState) => state);
    const [tooltipOpen, setTooltipOpen] = useState(false);

    const toggle = () => setTooltipOpen(!tooltipOpen);

    const onClick = useCallback(() => {
        const a = document.createElement("a");
        const file = new Blob([JSON.stringify(state)], { type: "text/json" });
        a.href = URL.createObjectURL(file);
        a.download = state.info.projectTitle + ".rheact";
        a.click();
    }, [state]);

    return (
        <>
            <Button size="sm" color="dark" onClick={onClick}>
                <i className="bi-save-fill" /> Save as json
            </Button>
            <i style={{marginLeft: "5px"}} id="saveHint" className="bi bi-question-circle"></i>
            <Tooltip
                style={{textTransform: "none"}}
                placement="top"
                isOpen={tooltipOpen}
                autohide={false}
                target="saveHint"
                toggle={toggle}
            >
                You can save your progress as a local RHEACT/JSON file on your computer and continue later! Note: the RHEACT File extension is a JSON file.
            </Tooltip>
        </>
    );
};

export default SaveButton;
