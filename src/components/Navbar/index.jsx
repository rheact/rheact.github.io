import { useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Button, Collapse, Nav, Navbar, NavItem, NavLink } from 'reactstrap';
import { store, LOAD_JSON } from '../../pages/Tool/store';

const LoadButton = ({ className }) => {
  const fileUploadRef = useRef();

  const onClick = useCallback(() => {
    fileUploadRef.current.click();
  }, [fileUploadRef]);

  const onUpload = useCallback(async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const text = (await file.text());
    const json = JSON.parse(text);
    store.dispatch(LOAD_JSON(json));
  }, []);

  return (
    <>
      <Button onClick={onClick} size="sm" color="info" className={className}> <i className="bi-cloud-upload-fill" /> Load </Button>
      <input onClick={onUpload} ref={fileUploadRef} type="file" id="imgupload" style={{ display: "none" }} />
    </>
  );
};

const SaveButton = ({ className }) => {
  const state = useSelector(state => state);
  const onClick = useCallback(() => {
    const a = document.createElement("a");
    const file = new Blob([JSON.stringify(state)], {type: 'text/json'});
    a.href = URL.createObjectURL(file);
    a.download = state.projectTitle + '.json';
    a.click(); 
  }, [state, state.projectTitle]);

  return (
    <Button size="sm" color="success" className={className} onClick={onClick}> <i className="bi-save-fill" /> Save </Button>
  );
};


const ToolNavbar = () => {
  return (
    <>
      <Navbar className="d-flex justify-content-center p-0 shadow-sm" style={{ zIndex: 10, background: "linear-gradient(180deg, rgba(239,255,0,1) 0%, rgba(255,186,0,1) 100%)" }}>
        <span className="fs-5 fw-bold" style={{ fontFamily: "Futura" }}>RHEACT</span>
      </Navbar>
      <Navbar color="light" light expand="xs" className="px-2 d-flex justify-content-between">
        <Collapse isOpen>
          <Nav navbar>
            <NavItem>
              <NavLink to="/">Tool</NavLink>
            </NavItem>

            <NavItem>
              <NavLink to="/about">About</NavLink>
            </NavItem>
          </Nav>
        </Collapse>

        <div>
          <SaveButton />
          <LoadButton className="ms-1" />
        </div>
      </Navbar>
    </>
  );
};

export default ToolNavbar;