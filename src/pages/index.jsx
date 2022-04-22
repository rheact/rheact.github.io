import { Route, Switch } from "react-router-dom";
import ReportDetailsPage from "./Operation/OptionalDetailsPage";
// Operation
import ParamsPage from "./Operation/ParamsPage";
import ResultsPage from "./Operation/ResultsPage";
// PPE
import QuestionairePage from './PPE/QuestionairePage';
import PPEResultsPage from './PPE/ResultsPage';
import R from "./routes";
import SDSPage from "./SDS";

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

                <Route>
                    <SDSPage />
                </Route>
            </Switch>
    );
};

export default ToolIndex;
