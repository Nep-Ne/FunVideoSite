import React from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import data from '../data.js';
function VideoScreen(props) {
    const videos = data.videos;

    return (

        <Row>
            <Col md={10}>
                <iframe src='/videos/FilmForth Project.mp4' width="100%" height="500" allowfullscreen allow="autoplay" ></iframe>
                <div class="container pb-cmnt-container">
                    <div class="row">
                        <div class="col-md-6 col-md-offset-3">
                            <div class="card card-info">
                                <div class="card-body">
                                    <textarea placeholder="Write your comment here!" class="pb-cmnt-textarea"></textarea>
                                    <form class="form-inline">
                                        <div class="btn-group">
                                            <button class="btn" type="button"><span class="fa fa-picture-o fa-lg"></span></button>
                                            <button class="btn" type="button"><span class="fa fa-video-camera fa-lg"></span></button>
                                            <button class="btn" type="button"><span class="fa fa-microphone fa-lg"></span></button>
                                            <button class="btn" type="button"><span class="fa fa-music fa-lg"></span></button>
                                        </div>
                                        <button class="btn btn-primary pull-right" type="button">Share</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </Col>
            <Col md={2}>
                {videos.map((video) => (
                    // <div className="col-md-4" key={video.id}> nếu lấy cái này thì nó sẽ lấy 4/12 diện tích(4/12  =1/3) của cái Col md={2}
                    <Col key={video.id}>
                        <div className="pb-video">
                            <video className="pb-video-frame" width="100%" height="100" src={video.video} controls ></video>
                            <a className="form-control label-warning text-center" href="/id">{video.name} - {video.author}</a>
                        </div>
                    </Col>
                ))}

            </Col>

        </Row>





    )

}
export default VideoScreen;//đừng quên dấu ; ko thì nó sẽ ko export đâu nha !!