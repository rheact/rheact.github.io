import { ListGroup, ListGroupItem } from 'reactstrap';

const Submenu = () => {
  return (
    <ListGroup>
      <ListGroupItem active>
        Report Details
      </ListGroupItem>
      <ListGroupItem>
        Operating Parameters
      </ListGroupItem>
      <ListGroupItem>
        Side Reactions
      </ListGroupItem>
      <ListGroupItem>
        Safety Data Sheets
      </ListGroupItem>
      <ListGroupItem>
        Results
      </ListGroupItem>
    </ListGroup>
  );
};

export default Submenu;
