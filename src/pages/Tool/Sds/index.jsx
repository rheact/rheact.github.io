import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Alert, Button, Col, Container, Form, Input, InputGroup, InputGroupText, Row } from 'reactstrap';
import { useInput } from '../../../hooks';
import './dropzone.css';
import SigmaLogo from './sigma.png';


const SdsPage = () => {
  const searchInput = useInput();

  const onSearch = useCallback((e) => {
    e.preventDefault();
    const st = `https://www.sigmaaldrich.com/US/en/search/${searchInput.value}?focus=products&page=1&perPage=30&sort=relevance&term=${searchInput.value}&type=product`;
    window.open(st);
  }, [searchInput.value]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone();

  return (
    <Container>
      <Row>
        <Col>
          <Alert color="light">
            <Row>
              <Col xs={1}>
                <img width="100%" src={SigmaLogo} />
              </Col>
              <Col className="fst-italic">
                RHEACT currently only supports SDS from Sigma-Aldrich. You can use the searchbar below to go to Sigma-Aldrich's SDS lookup website and download the SDS PDFs.
              </Col>
            </Row>
          </Alert>
        </Col>
      </Row>

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
    </Container>
  );
};

export default SdsPage;
