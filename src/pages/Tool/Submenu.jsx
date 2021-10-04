import { ListGroup, ListGroupItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import R from './routes';

const Submenu = () => {
  return (
    <ListGroup className="mb-2">
      <ListGroupItem tag={NavLink} to={R.ROUTE_GUIDE}>
        <i className="bi-question-circle me-2" />
        Guide
      </ListGroupItem>

      <ListGroupItem tag={NavLink} to={R.ROUTE_REPORT_DETAILS}>
        <i className="bi-pencil-fill me-2" />
        Report Details
      </ListGroupItem>

      <ListGroupItem tag={NavLink} to={R.ROUTE_OPERATION_DETAILS} className="text-danger">
        <i className="bi-box me-2" />
        Operating Parameters ★
      </ListGroupItem>

      <ListGroupItem tag={NavLink} to={R.ROUTE_RESULTS}>
        <i class="bi bi-file-earmark-bar-graph-fill me-2" />
        Generate Results
      </ListGroupItem>
    </ListGroup>
  );
};

export default Submenu;
