import { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";
import { useToggle } from "react-use";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import { LOAD_JSON } from "../../store/reducer";

const DropzoneModal = ({ open, toggle }) => {
    const dispatch = useDispatch();
    const { getRootProps, getInputProps } = useDropzone({
        onDrop: async (f) => {
            const file = f[0];
            if (!file) return;
            const text = await file.text();
            const json = JSON.parse(text);
            dispatch(LOAD_JSON(json));
            toggle();
        },
        accept: ['.json', '.rheact'],
    });

    return (
        <Modal isOpen={open}>
            <ModalHeader toggle={toggle}>Upload a RHEACT File</ModalHeader>
            <ModalBody>
                Old JSON files are also accepted.
                <div {...getRootProps({ className: "dropzone" })}>
                    <input {...getInputProps()} />
                    <center>
                        <i className="bi-file-earmark-medical-fill" />
                    </center>
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

const LoadButton = () => {
    const [open, toggle] = useToggle(false);

    return (
        <>
            <Button onClick={toggle} color="warning" size="sm" outline>
                <i className="bi-cloud-upload-fill" /> Load
                <DropzoneModal
                    className="p-0 m-0"
                    open={open}
                    toggle={toggle}
                />
            </Button>
        </>
    );
};

export default LoadButton;
