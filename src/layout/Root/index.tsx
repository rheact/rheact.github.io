import { FC } from "react";
import "./root.css";

const Root: FC = ({ children }) => {
    return (
        <div id="layout-root">
            {children}
        </div>
    );
}

export default Root;
