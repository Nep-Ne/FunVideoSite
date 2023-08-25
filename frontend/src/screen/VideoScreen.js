import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { listVideos } from '../actions/videoActions';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import data from '../data.js';
import { detailsVideos, saveVideoComment } from "../actions/videoActions.js";
import { VIDEO_COMMENT_SAVE_RESET } from '../constants/videoConstants';

function VideoScreen(props) {
    // const videos = data.videos;
    const dispatch = useDispatch();
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const videoDetail = useSelector((state) => state.videoDetails);
    const { video, loading, error } = videoDetail;
    const videoList = useSelector((state) => state.videoList);
    const { videos } = videoList;
    const videoCommentSave = useSelector((state) => state.videoCommentSave);
    const { success: videoSaveSuccess } = videoCommentSave;
    const [comment, setComment] = useState('');
    useEffect(() => {
        if (videoSaveSuccess) {
            alert('Review submitted successfully.');
            setComment('');
            dispatch({ type: VIDEO_COMMENT_SAVE_RESET });
        }

        dispatch(detailsVideos(props.match.params.id));
        dispatch(listVideos());
        return () => {
            //
        };
    }, [videoSaveSuccess]);
    const submitHandler = (e) => {
        e.preventDefault();
        // dispatch actions
        dispatch(
            saveVideoComment(props.match.params.id, {
                author: userInfo.name,
                comment: comment,
            })
        );
    };
    console.log(video);//console.log(video.name) lại bị lỗi ???


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
                                <a href={'/iduser'}>
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
                                        <textarea placeholder="Write your comment here!" class="pb-cmnt-textarea" name="comment" value={comment} onChange={(e) => setComment(e.target.value)} ></textarea>
                                        {/* <form className="form-inline" onSubmit={submitHandler}>  tại sao cái hàm này sẽ ko thực hiện nếu để ở đây thay vì để ở chỗ button ??? trả lời vì button bên dưới là type "button" chứ ko phải type submit !!!!*/}
                                        <form className="form-inline">
                                            <div className="btn-group">
                                                <button className="btn" type="button"><span class="fa fa-picture-o fa-lg"></span></button>
                                                <button className="btn" type="button"><span class="fa fa-video-camera fa-lg"></span></button>
                                                <button className="btn" type="button"><span class="fa fa-microphone fa-lg"></span></button>
                                                <button className="btn" type="button"><span class="fa fa-music fa-lg"></span></button>
                                            </div>
                                            <button className="btn btn-primary pull-right" type="button" onClick={submitHandler}>Share</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h2>Comments</h2>
                        {video.comments && video.comments.length > 0 ? (
                            <ul className="comment" id="comments">
                                {video.comments.map((comment) => (
                                    <li key={comment._id}>
                                        <div>{comment.author}</div>
                                        <div>{comment.createdAt.substring(0, 10)}</div>
                                        <div>{comment.comment}</div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div>There is no comment</div>
                        )}
                    </div>
                    {/* Tại sao cái bên dưới lại bị lỗi ????*/}
                    {/* <h2>Comments</h2>
                        {!video.comments.length && <div>There is no comment</div>}
                        <ul className="comment" id="comments">
                            {video.comments.map((comment) => (
                                <li key={comment._id}>
                                    <div>{comment.author}</div>
                                    <div>{comment.createdAt.substring(0, 10)}</div>
                                    <div>{comment.comment}</div>
                                </li>
                            ))}
                        </ul> */}




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