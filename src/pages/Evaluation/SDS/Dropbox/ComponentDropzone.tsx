import server from "api";
import { FC } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { OperatingParams, RheactState } from "model";

export type ComponentDropzoneProps = {
    addAction: any,
};

const ComponentDropzone: FC<ComponentDropzoneProps> = ({
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
                    .catch(_ => alert("Error: Could not parse some of the PDFs uploaded, please upload a Sigma Aldrich SDS only. (Note: For non-US countries, kindly visit the Sigma-Aldrich website and adjust your location settings to the United States in order to access and download the US version of SDS PDFs.)"))
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

export default ComponentDropzone;
