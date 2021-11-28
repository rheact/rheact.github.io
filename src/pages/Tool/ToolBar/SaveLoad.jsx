import { useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, ButtonGroup } from "reactstrap";
import { LOAD_JSON } from "../store";

export const LoadButton = () => {
    const fileUploadRef = useRef();
    const dispatch = useDispatch();

    const onClick = useCallback(() => {
        fileUploadRef.current.click();
    }, [fileUploadRef]);

    const onUpload = useCallback(
        (e) => {
            const file = e.target.files[0];
            if (!file) return;
            file.text().then(text => {
                const json = JSON.parse(text);
                dispatch(LOAD_JSON(json));
            });
        },
        [dispatch]
    );

    return (
        <Button onClick={onClick} color="warning" size="sm" outline>
            <i className="bi-cloud-upload-fill" /> Load
            <input
                onClick={onUpload}
                ref={fileUploadRef}
                type="file"
                id="imgupload"
                style={{ display: "none" }}
            />
        </Button>
    );
};

export const SaveButton = () => {
    const state = useSelector((state) => state);
    const onClick = useCallback(() => {
        const a = document.createElement("a");
        const file = new Blob([JSON.stringify(state)], { type: "text/json" });
        a.href = URL.createObjectURL(file);
        a.download = state.projectTitle + ".json";
        a.click();
    }, [state]);

    return (
        <Button size="sm" color="warning" onClick={onClick} outline>
            <i className="bi-save-fill" /> Save
        </Button>
    );
};

const SaveLoadGroup = ({ className }) => (
    <ButtonGroup className={className}>
        <SaveButton />
        <LoadButton />
    </ButtonGroup>
);

export default SaveLoadGroup;
