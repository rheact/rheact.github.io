import { NavLink } from 'react-router-dom';
import { ListGroup, ListGroupItem } from 'reactstrap';
import R from './routes';

const Submenu = () => {
  return (
    <ListGroup className="mb-2">
      <ListGroupItem className="text-center" tag={NavLink} to={R.ROUTE_GUIDE}>
        <i className="bi-question-circle h3" />
        <br />
        <span className="text-muted h6">
          Guide
        </span>
      </ListGroupItem>

      <ListGroupItem className="text-center text-danger" tag={NavLink} to={R.ROUTE_OPERATION_DETAILS}>
        <i className="bi-box h3" />
        <br />
        <span className="h6">
          Operation Details
        </span>
      </ListGroupItem>

      <ListGroupItem className="text-center" tag={NavLink} to={R.ROUTE_REPORT_DETAILS}>
        <i className="bi-pencil-fill h3" />
        <br />
        <span className="text-muted h6">
          Report Details
        </span>
      </ListGroupItem>

      <ListGroupItem className="text-center" tag={NavLink} to={R.ROUTE_RESULTS}>
        <i class="bi bi-file-earmark-bar-graph-fill h3" />
        <br />
        <span className="text-muted h6">
          Report
        </span>
      </ListGroupItem>
    </ListGroup>
  );
};

export default Submenu;
