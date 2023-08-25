import React, { useState, useEffect } from 'react';
// import data from '../data.js';
import { useSelector, useDispatch } from 'react-redux';
import { listVideos } from '../actions/videoActions';
import {
    increaseviewVideo,
  } from '../actions/videoActions';
import { Button, Col, Container, Form, Row } from "react-bootstrap";
function HomeScreen(props) {
    // const videos = data.videos;//nếu để data không thì sẽ bị lỗi vì data không có hàm map chỉ có cái videos của cái data (data.videos) thì mới có thể sử dụng hàm map !!
     

    const videoList = useSelector((state) => state.videoList);
    const { videos, loading, error } = videoList;
    const [views,setViews] =useState(0);
    const dispatch = useDispatch();
    console.log(videos);//xem consolse của frontend trong phần kiểm tra phần tử !!!

    const handleViews =(video) =>
    {
        // setViews=(video.views+1);
        // console.log(views);
        dispatch(increaseviewVideo(video));

    }
    useEffect(() => {
        dispatch(listVideos());//đừng để thiếu () của hàm listVideos như vậy nó sẽ chạy ko đúng  !!!!!

        return () => {
            //
        };
    }, []);
    return (
        // <ListGroup>

        //     <ListGroup.Item>
        //         <video width="320" src={video.video} type="video/mp4" height="240" controls>
        //         </video></ListGroup.Item>
        //     <ListGroup.Item>{video.name}</ListGroup.Item>
        //     <ListGroup.Item>{video.author}</ListGroup.Item>
        // </ListGroup>
        <>
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>{error}</div>
            ) : (

                <div className="container-fluid pb-video-container" >
                    <h3 className="text-center">Sample Video Gallery</h3>
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
                    {/* nếu ko có Row thì mỗi lần map thì nó sẽ tự động xuống dòng */}
                    {/* Row nằm đây để có gì các video nằm trên cùng 1 row nếu để row nằm trong phần map thì dẫn đến mỗi video trên mỗi Row vì row được tạo liên tục mỗi lần map !! */}
                    <Row>
                        {videos.map((video) => (
                            <div className="col-md-4" key={video._id}>
                                {/* col-md-4 với ý nghĩa cột này chiếm 4/12, ý nghĩa của 12 là cứ 1 hàng trong grid được chia làm 12 phần bằng nhau và 
                        ta cần tường minh 1 cột sẽ chiếm mấy phần của 1 hàng col-md-6 thì có nghĩa là 
                        nó chiếm 6/12 của cái dòng và kết hợp cái đầu tiên thì dòng này đã sử dụng 10/12 và chỉ còn tối đa 
                        thêm 1 cột col-md-2 nữa thôi nếu lớn hơn thì sẽ tự động dưa xuống dòng tiếp theo*/}
                                <div className="pb-video">
                                    <video className="pb-video-frame" width="100%" height="230" src={video.pathvideo}  controls muted ></video>
                                    <a className="form-control label-warning text-center" href={"/video/"+video._id} onClick={()=> handleViews(video)}>{video.title} - {video.author} </a>
                                </div>
                            </div>
                        ))}

                    </Row>
                </div>)
            }
            
        </>)
}

export default HomeScreen;