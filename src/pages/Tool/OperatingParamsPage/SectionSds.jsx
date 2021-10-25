import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { useToggle } from 'react-use';
import { Button, Card, CardBody, CardHeader, Col, Collapse, Container, FormFeedback, FormGroup, Input, InputGroup, Label, Row, Table } from 'reactstrap';
import _ from 'lodash';
import server from '../../../api';
import { ADD_REACTANT, CHANGE_REACTANT, REMOVE_REACTANT } from '../store';
import './dropzone.css';

const CompoundCard = ({ type, index }) => {
  /**
   * @type {import('../state').Chemical}
   */
  const compound = useSelector(state => state.compound[type][index]);
  const dispatch = useDispatch();
  const getChangeProp = useCallback((key) => (e) => {
    const update = {...compound};
    update[key] = e.target.value;
    dispatch(CHANGE_REACTANT({
      index,
      update,
    }));
  }, [compound]);
  const [viewProps, toggleProps] = useToggle();

  const propMap = [
      {
        label: "Name",
        key: "productName",
      },
      {
        label: "CAS-No",
        key: "casNo",
      },
      {
        label: "hNumbers",
        key: "hNumbers",
        type: "textarea",
      },
      {
        label: "hStatements",
        key: "hStatements",
        type: "textarea",
      },
      {
        label: "Auto-ignition temperature (°C)",
        key: "autoIgnitionTemp",
      },
      {
        label: "Initial boiling point (°C)",
        key: "boilingPt",
      },
      {
        label: "Decomposition temperature (°C)",
        key: "decompositionTemp",
      },
      {
        label: "Flash point (°C)",
        key: "flashPt",
      },
      {
        label: "Mol. Weight (g/mol)",
        key: "molWt",
      },
      {
        label: "pH at 20°C (g/l)",
        key: "ph",
      },
      {
        label: "Relative density at 25°C (g/cm3)",
        key: "relDensity",
      },
      {
        label: "Upper explosion limit (% V)",
        key: "upperExplosionLim",
      },
      {
        label: "Lower explosion limit (% V)",
        key: "lowerExplosionLim",
      },
      {
        label: "Vapour density (Air = 1.0)",
        key: "vapourDensity",
      },
      {
        label: "Vapour pressure at 20°C (hPa)",
        key: "vapourPressure",
      },
      {
        label: "Viscosity",
        key: "viscosity",
      },
    ];

  return (
    <Card color="light">
      <CardHeader className="h5 d-flex justify-content-between align-items-center">
        <div>
          <span className="text-primary">{index + 1}. </span>
          <b>{compound.productName}</b>
          <span> </span>
          <span>(CAS-NO: {compound.casNo})</span>
        </div>

        <div>
          <Button className="me-2" color="info" onClick={toggleProps}>
            <i className="bi bi-pencil me-1" />
            Edit Properties
          </Button>
          <Button color="danger" onClick={() => dispatch(REMOVE_REACTANT(index))}>
            <i className="bi bi-x-lg me-1" />
            Delete
          </Button>
        </div>
      </CardHeader>
      <CardBody>
        <Row>
          <Col>
            <Label>Initial Weight Fraction</Label>
            <Input value={compound.molWtFraction} invalid={!compound.molWtFraction} onChange={getChangeProp("molWtFraction")} />
          </Col>
          <Col>
            <FormGroup>
              <Label>Specific heat capacity - Cp</Label>
              <InputGroup>
                <Input value={compound.cp} invalid={!compound.cp} onChange={getChangeProp("cp")} />
                <Button color="dark">cal/g/°C</Button>
              </InputGroup>
              <FormFeedback></FormFeedback>
            </FormGroup>
          </Col>
        </Row>

        <Collapse isOpen={viewProps}>
          <Table bordered striped className="mt-4">
            <tbody>
              {propMap.map(e => (
                <tr>
                  <td>{e.label}</td>
                  <td>
                    <Input value={compound[e.key]} onChange={getChangeProp(e.key)} type={e.type} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Collapse>
      </CardBody>
    </Card>
  );
};

export const ReactantsDrop = () => {
  const temperature = useSelector(state => state.operatingParams.temperature);
  const num = useSelector(state => state.compound.numReactants);
  const dispatch = useDispatch();

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop: async (f) => {
      const data = await server.parsePDF(f, temperature || 0);
      dispatch(ADD_REACTANT(data));
    },
  });

  return (
    <Card>
      <CardHeader className="fw-bolder bg-danger text-white">Reactants</CardHeader>
      <CardBody>
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <center>
            <i className="bi-file-earmark-medical-fill" />
          </center>
          <p>
            <br />
            Drag and drop SDS files here
            <br />
            Or click to open file selector
          </p>
        </div>

        <div className="mt-2">
          {_.range(num).map(i => (
            <div className="mt-1">
              <CompoundCard type="reactants" index={i} />
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}

const SdsPage = () => {

  return (
    <Container fluid>
      <Row>
        <Col>
          <ReactantsDrop />
        </Col>
      </Row>
    </Container>
  );
};

export default SdsPage;
