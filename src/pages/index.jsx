import { HashRouter as Router, Route, Switch } from "react-router-dom";
import ToolBar from "navigation";
import R from "./routes";
import SDSPage from "./SDS";
// Operation
import ParamsPage from "./Operation/ParamsPage";
import ReportDetailsPage from "./Operation/OptionalDetailsPage";
import ResultsPage from "./Operation/ResultsPage";
// PPE
import QuestionairePage from './PPE/QuestionairePage';
import PPEResultsPage from './PPE/ResultsPage';
import SettingsPage from './SettingsPage';

const ToolIndex = () => {
    return (
        <Router initialEntries={Object.keys(R)} initialIndex={1}>
            <ToolBar />
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

                <Route path={R.ROUTE_SETTINGS}>
                    <SettingsPage />
                </Route>

                <Route>
                    <SDSPage />
                </Route>
            </Switch>
        </Router>
    );
};

export default ToolIndex;
