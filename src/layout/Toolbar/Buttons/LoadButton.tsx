import { FC } from "react";
import { useDropzone } from "react-dropzone";
import { useToggle } from "react-use";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import createStore from "store";

type DropzoneModalTypes = {
    open: boolean,
    toggle: Function,
    loadFn: Function,
};

const DropzoneModal: FC<DropzoneModalTypes> = ({ open, toggle, loadFn }) => {
    const { getRootProps, getInputProps } = useDropzone({
        onDrop: async (f) => {
            const file = f[0];
            if (!file) return;
            const text = await file.text();
            const json = JSON.parse(text);
            const preloadedState = createStore(json);
            loadFn(preloadedState);
            toggle();
        },
        accept: ['.json', '.rheact'],
    });

    return (
        <Modal isOpen={open}>
            <ModalHeader toggle={() => toggle()}>Upload a RHEACT File</ModalHeader>
            <ModalBody>
                Old JSON files are also accepted.
                <div {...getRootProps({ className: "dropzone" })}>
                    <input {...getInputProps()} />
                    <div className="d-flex justify-content-center align-items-center">
                        <i className="bi-file-earmark-medical-fill" />
                    </div>
                    <p>
                        <br />
                        Drag and drop a JSON file here
                        <br />
                        Or click to open file selector
                    </p>
                </div>
            </ModalBody>
        </Modal>
    );
};

type LoadButtonProps = {
    loadFn: Function
};

const LoadButton: FC<LoadButtonProps> = ({ loadFn }) => {
    const [open, toggle] = useToggle(false);

    return (
        <Button onClick={toggle} color="dark" size="sm">
            <i className="bi-cloud-upload-fill" /> Load
            <DropzoneModal
                open={open}
                toggle={toggle}
                loadFn={loadFn}
            />
        </Button>
    );
};

export default LoadButton;
