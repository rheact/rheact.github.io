import { Route, Switch } from "react-router-dom";
// Welcome
import WelcomePage from "./About/Welcome"
// User Guide
import UserGuidePage from "./About/UserGuide"
import ReportDetailsPage from "./ProjectInfo";
// Operation
import ParamsPage from "./Operation/ParamsPage";
import ResultsPage from "./Operation/ResultsPage";
// PPE
import QuestionairePage from './PPE/QuestionairePage';
import PPEResultsPage from './PPE/ResultsPage';
import R from "./routes";
import SDSPage from "./SDS";

// Documentation
import LicensePage from './License/License';
import AcknowledgementsPage from "./License/Acknowledgements";
import PublicationsPage from "./Publications";
import ContactUsPage from "./Contact";

const ToolIndex = () => {
    return (
            <Switch>
                <Route path={R.ROUTE_OPERATION_DETAILS}>
                    <ReportDetailsPage />
                </Route>

                <Route path={R.ROUTE_OPERATION_PARAMS}>
                    <ParamsPage />
                </Route>

                <Route path={R.ROUTE_OPERATION_REPORT}>
                    <ResultsPage />
                </Route>

                <Route path={R.ROUTE_PPE_QUESTIONAIRE}>
                    <QuestionairePage />
                </Route>

                <Route path={R.ROUTE_PPE_REPORT}>
                    <PPEResultsPage />
                </Route>

                <Route path={R.ROUTE_USER_GUIDE}>
                    <UserGuidePage />
                </Route>

                <Route path={R.ROUTE_SDS}>
                    <SDSPage />
                </Route>

                <Route path={R.ROUTE_LICENSE}>
                    <LicensePage />
                </Route>

                <Route path={R.ROUTE_ACKNOWLEDGEMENTS}>
                    <AcknowledgementsPage />
                </Route>

                <Route path={R.ROUTE_PUBLICATIONS}>
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
