import { FC } from "react";
import { Navbar } from "reactstrap";
import OpButtons from "./Buttons";

const Toolbar: FC = () => {
    return (
        <Navbar className="border-bottom">
            <OpButtons />
        </Navbar>
    );
};

export default Toolbar;
