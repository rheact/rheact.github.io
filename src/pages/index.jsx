import { Route, Switch } from "react-router-dom";
import R from "./routes";
// Welcome
import WelcomePage from "./About/Welcome"
// User Guide
import UserGuidePage from "./About/UserGuide"
// Operation
import EvaluationPage from "./Evaluation";
// PPE
import PPEPage from './PPE';
// PAC
import PACPage from './PAC';
// Documentation
import LicensePage from './License/License';
import AcknowledgementsPage from "./License/Acknowledgements";
import PublicationsPage from "./Publications";
import ContactUsPage from "./Contact";

const ToolIndex = ({ loadFn }) => {
    return (
            <Switch>
                <Route path={R.ROUTE_EVALUATION}>
                    <EvaluationPage loadFn={loadFn} />
                </Route>

                <Route path={R.ROUTE_PPE_EVALUATION}>
                    <PPEPage />
                </Route>

                <Route path={R.ROUTE_PAC}>
                    <PACPage />
                </Route>

                <Route path={R.ROUTE_USER_GUIDE}>
                    <UserGuidePage />
                </Route>

                <Route path={R.ROUTE_LICENSE}>
                    <LicensePage />
                </Route>

                <Route path={R.ROUTE_ACKNOWLEDGEMENTS}>
                    <AcknowledgementsPage />
                </Route>

                <Route path={R.ROUTE_REFERENCES}>
                    <PublicationsPage />
                </Route>

                <Route path={R.ROUTE_CONTACT}>
                    <ContactUsPage />
                </Route>

                <Route>
                    <WelcomePage />
                </Route>
            </Switch>
    );
};

export default ToolIndex;
