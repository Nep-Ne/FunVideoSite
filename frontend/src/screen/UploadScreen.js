import react from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
function UploadScreen(props) {
    return (
        <div>
            <Container>
                <Row className="vh-100 d-flex justify-content-center align-items-center">
                    <Col md={8} lg={6} xs={12}>
                        <div className="border border-3 border-primary"></div>
                        <Card className="shadow">
                            <Card.Body>
                                <div className="mb-3 mt-md-4">
                                    <h2 className="fw-bold mb-2 text-uppercase ">Upload video</h2>

                                    <div className="mb-3">
                                        <Form>
                                            <Form.Group className="mb-3" controlId="formBasicTitle">
                                                <Form.Label className="text-center">
                                                    Title
                                                </Form.Label>
                                                <Form.Control placeholder="Enter title" />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicAuthor">
                                                <Form.Label className="text-center">
                                                    Author
                                                </Form.Label>
                                                <Form.Control placeholder="Enter author" />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicPath">
                                                <Form.Label className="text-center">
                                                    Path
                                                </Form.Label>
                                                <Form.Control placeholder="Path" />
                                            </Form.Group>

                                            <label for="formFileMultiple" class="form-label">Multiple files input example</label>
                                            <input class="form-control" type="file" id="formFileMultiple" multiple />



                                            <div className="d-grid">
                                                <Button variant="primary" type="submit">
                                                    Submit
                                                </Button>
                                            </div>
                                        </Form>

                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )


}
export default UploadScreen;