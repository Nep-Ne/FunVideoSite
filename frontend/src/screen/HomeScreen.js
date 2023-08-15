import react from "react";
import data from '../data.js'

import Row from 'react-bootstrap/Row';
function HomeScreen(props) {
    const videos = data.videos;//nếu để data không thì sẽ bị lỗi vì data không có hàm map chỉ có cái videos của cái data (data.videos) thì mới có thể sử dụng hàm map !!
    console.log(videos);//xem consolse của frontend trong phần kiểm tra phần tử !!!
    return (
        // <ListGroup>

        //     <ListGroup.Item>
        //         <video width="320" src={video.video} type="video/mp4" height="240" controls>
        //         </video></ListGroup.Item>
        //     <ListGroup.Item>{video.name}</ListGroup.Item>
        //     <ListGroup.Item>{video.author}</ListGroup.Item>
        // </ListGroup>


        <div className="container-fluid pb-video-container">
            <h3 className="text-center">Sample Video Gallery</h3>
            <Row>
                {videos.map((video) => (
                    <div className="col-md-4" key={video.id}>
                        <div className="pb-video">
                            <video className="pb-video-frame" width="100%" height="230" src={video.video} controls ></video>
                            <a className="form-control label-warning text-center" href="/signin">{video.name} - {video.author}</a>
                        </div>
                    </div>
                ))}

            </Row>
        </div>
    );
}

export default HomeScreen;