import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import data from '../data.js';
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import {
    saveVideo,
    listVideos,
    deleteVideo,
    yourVideos,
} from '../actions/videoActions';
function ListVideoScreen(props) {
    // const videos = data.videos;
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const [modalVisible, setModalVisible] = useState(false);
    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState(userInfo.name);
    const [pathvideo, setPathvideo] = useState('');
    const [uploading, setUploading] = useState(false);
    const videoList = useSelector((state) => state.videoList);
    const { loading, videos, error } = videoList;

    const videoSave = useSelector((state) => state.videoSave);
    const {
        loading: loadingSave,
        success: successSave,
        error: errorSave,
    } = videoSave;

    const videoDelete = useSelector((state) => state.videoDelete);
    const {
        loading: loadingDelete,
        success: successDelete,
        error: errorDelete,
    } = videoDelete;
    const dispatch = useDispatch();

    useEffect(() => {
        if (successSave) {
            setModalVisible(false);
        }

        dispatch(yourVideos(props.match.params.id));//props.match.params.id tương ứng phần /:id của router này
        return () => {
            //
        };
    }, [successSave, successDelete]);

    const openModal = (video) => {
        setModalVisible(true);
        setId(video._id);
        setTitle(video.title);
        // setAuthor(video.author);
        setPathvideo(video.pathvideo);
    };
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            saveVideo({
                _id: id,
                title,
                author,
                pathvideo,

            })
        );
    };
    const deleteHandler = (video) => {
        dispatch(deleteVideo(video._id));
    };

    const uploadFileHandler = (e) => {
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('video', file); // Thay đổi 'image' thành 'video'
        setUploading(true);
        axios
            .post('/api/uploads', bodyFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((response) => {
                setPathvideo(response.data); // Thay đổi 'image' thành 'video'
                setUploading(false);
            })
            .catch((err) => {
                console.log(err);
                setUploading(false);
            });
    };

    return (

        <>
            {/* hien thi edit, create video form */}
            {modalVisible && (<Container>
                <Row className="vh-100 d-flex justify-content-center align-items-center">
                    <Col md={8} lg={6} xs={12}>
                        <div className="border border-3 border-primary"></div>
                        <Card className="shadow">
                            <Card.Body>
                                <div className="mb-3 mt-md-4">
                                    <h2 className="fw-bold mb-2 text-uppercase ">Upload video</h2>

                                    <div className="mb-3">
                                        <Form onSubmit={submitHandler}>
                                            <Form.Group className="mb-3" controlId="formBasicTitle">
                                                <Form.Label className="text-center">
                                                    Title
                                                </Form.Label>
                                                <Form.Control placeholder="Enter title" type="text" name="title" value={title} id="title" onChange={(e) => setTitle(e.target.value)} />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicAuthor">
                                                <Form.Label className="text-center">
                                                    Author
                                                </Form.Label>
                                                <Form.Control placeholder="Enter author" type="text" name="author" value={author} id="author" onChange={(e) => setAuthor(e.target.value)} disabled/>
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicPath">
                                                <Form.Label className="text-center">
                                                    Path
                                                </Form.Label>
                                                <Form.Control placeholder="Path" type="text" name="pathvideo" value={pathvideo} id="pathvideo" onChange={(e) => setPathvideo(e.target.value)} />
                                            </Form.Group>

                                            <label for="formFileMultiple" class="form-label">Multiple files input example</label>
                                            <input class="form-control" type="file" id="formFileMultiple" onChange={uploadFileHandler} />



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
            </Container>)
            }






            {/* hien thi list your video  */}
            {!modalVisible && (<div className="container-fluid pb-video-container">
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
                        <div className="col-md-4" key={video._id}>
                            <div className="pb-video">
                                <video className="pb-video-frame" width="100%" height="230" src={video.pathvideo} controls muted ></video>
                                <a className="form-control label-warning text-center" href={"/video/" + video._id}>{video.title} - {video.author}</a>
                                <Row>
                                    <Col md={6}>
                                        <div className="d-grid">
                                            <Button onClick={() => openModal(video)}>Edit</Button>
                                        </div>

                                    </Col>
                                    <Col md={6}>
                                        <div className="d-grid">
                                            <Button onClick={() => deleteHandler(video)}>Delete</Button>
                                            {/* <Button onClick={(video) => deleteHandler(video)}>Delete</Button>  sẽ bị lỗi do onClick={(video)....  phải bỏ video đi !!!*/}
                                        </div>

                                    </Col>
                                </Row>

                            </div>
                        </div>
                    ))
                    }
                    <div className="col-md-4 d-flex justify-content-center align-items-center">
                        <Button onClick={() => openModal({})}>New Video</Button>

                    </div>

                </Row>
            </div>)
            }

        </>

        // list video


    );


}
export default ListVideoScreen;