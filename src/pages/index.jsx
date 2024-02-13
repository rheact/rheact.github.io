import { Route, Switch, Redirect } from "react-router-dom";
import R from "./routes";
// Welcome
import WelcomePage from "./About/Welcome"
// User Guide
import UserGuidePage from "./About/UserGuide"
// Operation
import EvaluationPage from "./Evaluation";
// PPE
import PPEPage from './PPE';
// MOC
import MOCPage from './MOC';
// PAC
import PACPage from './PAC';
// Resource Links
import ResourceLinksPage from './ResourceLinks';
// Documentation
import LicensePage from './License/License';
import AcknowledgementsPage from "./License/Acknowledgements";
import PublicationsPage from "./Publications";
import ContactUsPage from "./Contact";

const ToolIndex = ({ loadFn, showDisclaimer }) => {
    return (
        <Switch>
            <Route path={R.ROUTE_EVALUATION}>
                {showDisclaimer ? <Redirect to="/" /> : <EvaluationPage loadFn={loadFn} />}
            </Route>

            <Route path={R.ROUTE_PPE_EVALUATION}>
                {showDisclaimer ? <Redirect to="/" /> : <PPEPage />}
            </Route>

            <Route path={R.ROUTE_MOC_GUIDE}>
                {showDisclaimer ? <Redirect to="/" /> : <MOCPage />}
            </Route>

            <Route path={R.ROUTE_PAC}>
                {showDisclaimer ? <Redirect to="/" /> : <PACPage />}
            </Route>

            <Route path={R.ROUTE_USER_GUIDE}>
                {showDisclaimer ? <Redirect to="/" /> : <UserGuidePage />}
            </Route>

            <Route path={R.ROUTE_RESOURCE_LINKS}>
                {showDisclaimer ? <Redirect to="/" /> : <ResourceLinksPage />}
            </Route>

            <Route path={R.ROUTE_LICENSE}>
                {showDisclaimer ? <Redirect to="/" /> : <LicensePage />}
            </Route>

            <Route path={R.ROUTE_ACKNOWLEDGEMENTS}>
                {showDisclaimer ? <Redirect to="/" /> : <AcknowledgementsPage />}
            </Route>

            <Route path={R.ROUTE_REFERENCES}>
                {showDisclaimer ? <Redirect to="/" /> : <PublicationsPage />}
            </Route>

            <Route path={R.ROUTE_CONTACT}>
                {showDisclaimer ? <Redirect to="/" /> : <ContactUsPage />}
            </Route>

            <Route>
                <WelcomePage />
            </Route>
        </Switch>
    );
};

export default ToolIndex;
