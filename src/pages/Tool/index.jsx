import { Col, Container, Row } from 'reactstrap';
import { MemoryRouter, Route, Switch } from 'react-router-dom';

import Submenu from './Submenu';

import R from './routes';
import Guide from './Guide';
import ReportDetails from './ReportDetails';
import OperatingParams from './OperatingParams';
import SdsPage from './Sds';
import Results from './Results';

const ToolPage = () => {
  return (
    <MemoryRouter
      initialEntries={Object.keys(R)}
      initialIndex={0}
    >
      <Container fluid>
        <Row>
          <Col md={2}>
            <Submenu />
          </Col>
          <Col>
            <Switch>
              <Route path={R.ROUTE_REPORT_DETAILS}>
                <ReportDetails />
              </Route>

              <Route path={R.ROUTE_OPERATION_DETAILS}>
                <OperatingParams />
              </Route>

              <Route path={R.ROUTE_SDS}>
                <SdsPage />
              </Route>

              <Route path={R.ROUTE_RESULTS}>
                <Results />
              </Route>

              <Route>
                <Guide />
              </Route>
            </Switch>
          </Col>
        </Row>
      </Container>
    </MemoryRouter>
  );
};

export default ToolPage;
