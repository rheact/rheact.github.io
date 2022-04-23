import server from "api";
import { FC } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { OperatingParams, RheactState } from "store";

export type DropzoneProps = {
    addAction: any,
};

const Dropzone: FC<DropzoneProps> = ({
    addAction,
}) => {
    const dispatch = useDispatch();
    const operatingParams = useSelector<RheactState, OperatingParams>((s) => s.operatingParams);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (files) => {
            // Run for each file.            
            files.forEach(
                (f) => (
                    server.parsePDF(f, operatingParams)
                    .then(data => dispatch(addAction(data)))
                    .catch(_ => alert("Error: Could not parse some of the PDFs uploaded, please upload a Sigma Aldrich SDS only."))
                )
            );
        },
    });

    return (
        <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            <div className="text-center">
                <i className="bi-file-earmark-medical-fill" />
            </div>
            <p>
                <br />
                Drag and drop SDS files here
                <br />
                Or click to open file selector
            </p>
        </div>
    );
};

export default Dropzone;
