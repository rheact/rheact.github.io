import { FC } from "react";
import { Button, Navbar } from "reactstrap";
import OpButtons from "./Buttons";

const Toolbar: FC = () => {
    return (
        <Navbar className="border-bottom">
            <OpButtons />
            <Button tag="a" href="https://www.google.com/" size="sm" className="ms-auto" color="secondary">
                <i className="bi bi-person-lines-fill me-1" />
                Send Feedback
            </Button>
        </Navbar>
    );
};

export default Toolbar;
