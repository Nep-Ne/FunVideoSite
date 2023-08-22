import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { listVideos } from '../actions/videoActions';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import data from '../data.js';
import { detailsVideos } from "../actions/videoActions.js";
function VideoScreen(props) {
    // const videos = data.videos;
    const dispatch = useDispatch();

    const videoDetail = useSelector((state) => state.videoDetails);
    const { video, loading, error } = videoDetail;
    const videoList = useSelector((state) => state.videoList);
    const { videos } = videoList;
    useEffect(() => {

        dispatch(detailsVideos(props.match.params.id));
        dispatch(listVideos());
        return () => {
            //
        };
    }, []);


    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>{error} </div>
            ) : (<Row>
                <Col md={8}>
                    {/* thanh phan cua video */}
                    <Row>
                        {/* Video */}
                        <video src={video.pathvideo} width="100%" height="600" controls autoplay="autoplay" ></video> {/* ko xài iframe được phải dùng video !!!!!! */}
                        {/* Ten video */}
                        <Col md={11}>
                            <div className="video-title">
                                {video.title}
                            </div>
                            <div>
                                User:
                                {/* <a href={'/' + user.id}> */}
                                <a href={'/iduser' }>
                                        {video.author}
                                </a>

                            </div>

                        </Col>
                        <Col md={1}>
                            {video.views} Views
                        </Col>

                    </Row>



                    {/*thanh comment */}
                    <div className="container pb-cmnt-container">
                        <div className="row">
                            <div className="col-md-12 col-md-offset-3">
                                <div className="card card-info">
                                    <div className="card-body">
                                        <textarea placeholder="Write your comment here!" class="pb-cmnt-textarea"></textarea>
                                        <form className="form-inline">
                                            <div className="btn-group">
                                                <button className="btn" type="button"><span class="fa fa-picture-o fa-lg"></span></button>
                                                <button className="btn" type="button"><span class="fa fa-video-camera fa-lg"></span></button>
                                                <button className="btn" type="button"><span class="fa fa-microphone fa-lg"></span></button>
                                                <button className="btn" type="button"><span class="fa fa-music fa-lg"></span></button>
                                            </div>
                                            <button className="btn btn-primary pull-right" type="button">Share</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </Col>
                <Col md={4}>
                    {videos.map((video) => (
                        // <div className="col-md-4" key={video.id}> nếu lấy cái này thì nó sẽ lấy 4/12 diện tích(4/12  =1/3) của cái Col md={2}
                        <Col key={video._id}>
                            <div className="pb-video">
                                <video className="pb-video-frame" width="100%" height="300" src={video.pathvideo} controls ></video>
                                <a className="form-control label-warning text-center" href={"/video/" + video._id}>{video.title} - {video.author}</a>
                            </div>
                        </Col>
                    ))}

                </Col>

            </Row>
            )
            }

        </>






    )

}
export default VideoScreen;//đừng quên dấu ; ko thì nó sẽ ko export đâu nha !!