import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Container, Row, Col, Button, Form, Input, InputGroup, InputGroupText, Table } from 'reactstrap';
import { useInput } from '../../../hooks';
import './dropzone.css';

/*
 {
    "autoIgnitionTemp": "498",
    "boilingPt": "80.1",
    "casNo": "71-43-2",
    "cp": 1.237333,
    "decompositionTemp": "No data available",
    "flashPt": "11.0",
    "hNumbers": "H225, H315, H319, H340, H350, H372, H304, H401, H412",
    "hStatements": "Flammable liquids (Category 2)\nSkin irritation (Category 2)\nEye irritation (Category 2A)\nGerm cell mutagenicity (Category 1B)\nCarcinogenicity (Category 1A)\nSpecific target organ toxicity - repeated exposure (Category 1), Blood\nAspiration hazard (Category 1)\nShort-term (acute) aquatic hazard (Category 2)\nLong-term (chronic) aquatic hazard (Category 3)",
    "lowerExplosionLim": "1.4",
    "molWt": "78.11 ",
    "ph": "No data available",
    "productName": "Benzene ",
    "relDensity": "No data available",
    "upperExplosionLim": "8.0",
    "vapourDensity": "No data available",
    "vapourPressure": "221.3",
    "viscosity": "0.78"
}
 */

const SdsPage = () => {
  const searchInput = useInput();

  const onSearch = useCallback((e) => {
    e.preventDefault();
    const st = `https://www.sigmaaldrich.com/US/en/search/${searchInput.value}?focus=products&page=1&perPage=30&sort=relevance&term=${searchInput.value}&type=product`;
    window.open(st);
  }, [searchInput.value]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone();

  return (
    <Container fluid>
      <Row>
        <Col>
          <Form onSubmit={onSearch}>
            <InputGroup>
              <InputGroupText className="bg-info text-light">
                <i className="bi-search" />
              </InputGroupText>

              <Input {...searchInput} placeholder="Name or CAS number" />

              <Button color="dark" type="submit">Search</Button>
            </InputGroup>
          </Form>
        </Col>
      </Row>

      <Row className="mt-2">
        <Col>
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
        </Col>
      </Row>

      <Row className="mt-2">
        <Col>
          <Table size="lg" className="bg-light" bordered>
            <tbody>
              <tr>
                <th scope="row" width="60px">Reactant</th>
                <td width="40px"> 1 </td>
                <td>Benzene</td>
                <td width="80px" className="text-center text-success"><i className="bi bi-pencil-fill" /> Edit</td>
                <td width="100px" className="text-center text-danger"><i className="bi bi-x-lg" /> Remove</td>
              </tr>
              <tr>
                <th scope="row" width="60px">Reactant</th>
                <td width="40px"> 2 </td>
                <td>Methanol</td>
                <td width="80px" className="text-center text-success"><i className="bi bi-pencil-fill" /> Edit</td>
                <td width="100px" className="text-center text-danger"><i className="bi bi-x-lg" /> Remove</td>
              </tr>
              <tr>
                <th scope="row" width="60px">Product</th>
                <td width="40px"> 1 </td>
                <td>Ethanol</td>
                <td width="80px" className="text-center text-success"><i className="bi bi-pencil-fill" /> Edit</td>
                <td width="100px" className="text-center text-danger"><i className="bi bi-x-lg" /> Remove</td>
              </tr>
              <tr>
                <th scope="row" width="60px">Product</th>
                <td width="40px"> 2 </td>
                <td>Methane</td>
                <td width="80px" className="text-center text-success"><i className="bi bi-pencil-fill" /> Edit</td>
                <td width="100px" className="text-center text-danger"><i className="bi bi-x-lg" /> Remove</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default SdsPage;
