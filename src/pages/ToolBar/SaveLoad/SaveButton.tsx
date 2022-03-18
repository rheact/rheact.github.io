import { FC, useCallback } from "react";
import { useSelector } from "react-redux";
import { Button } from "reactstrap";
import { RheactState } from '../../../store';

const SaveButton: FC<any> = () => {
    const state = useSelector((state: RheactState) => state);
    const onClick = useCallback(() => {
        const a = document.createElement("a");
        const file = new Blob([JSON.stringify(state)], { type: "text/json" });
        a.href = URL.createObjectURL(file);
        a.download = state.projectTitle + ".rheact";
        a.click();
    }, [state]);

    return (
        <Button size="sm" color="dark" onClick={onClick} outline>
            <i className="bi-save-fill" /> Save
        </Button>
    );
};

export default SaveButton;
