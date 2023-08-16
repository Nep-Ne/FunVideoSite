import react from "react";
import data from '../data.js';
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";

function ListVideoScreen(props) {
    const videos = data.videos;
    return (
        <div className="container-fluid pb-video-container">
            <h3 className="text-center">Your Video Gallery</h3>
            <Container fluid className="mt-5 d-flex justify-content-center">
                <Row>
                    <Col md={10}>
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="md-12"
                                aria-label="Search"
                            />

                        </Form>
                    </Col>
                    <Col md={2}>
                        <Button>
                            Search
                        </Button>

                    </Col>
                </Row>
            </Container>
            <Row>
                {videos.map((video) => (
                    <div className="col-md-4" key={video.id}>
                        <div className="pb-video">
                            <video className="pb-video-frame" width="100%" height="230" src={video.video} controls ></video>
                            <a className="form-control label-warning text-center" href="/id">{video.name} - {video.author}</a>
                            <Row>
                                <Col md={6}>
                                    <div className="d-grid">
                                        <Button href="/uploads">Edit</Button>
                                    </div>

                                </Col>
                                <Col md={6}>
                                    <div className="d-grid">
                                        <Button onClick={''}>Delete</Button>
                                    </div>

                                </Col>
                            </Row>

                        </div>
                    </div>
                ))}

            </Row>
        </div>
    );


}
export default ListVideoScreen;