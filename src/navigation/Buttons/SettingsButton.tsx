import R from 'pages/routes';
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

const SettingsButton = () => {
    return (
        <Button tag={Link} to={R.ROUTE_SETTINGS} size="sm" color="dark" outline>
            <i className="bi-gear" /> Settings
        </Button>
    );
};

export default SettingsButton;
