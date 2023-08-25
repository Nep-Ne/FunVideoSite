import {
    VIDEO_LIST_REQUEST,
    VIDEO_LIST_SUCCESS,
    VIDEO_LIST_FAIL,
    VIDEO_DETAILS_REQUEST,
    VIDEO_DETAILS_SUCCESS,
    VIDEO_DETAILS_FAIL,
    VIDEO_SAVE_REQUEST,
    VIDEO_SAVE_SUCCESS,
    VIDEO_SAVE_FAIL,
    VIDEO_DELETE_SUCCESS,
    VIDEO_DELETE_FAIL,
    VIDEO_DELETE_REQUEST,
    VIDEO_COMMENT_SAVE_REQUEST,
    VIDEO_COMMENT_SAVE_FAIL,
    VIDEO_COMMENT_SAVE_SUCCESS,
  } from '../constants/videoConstants';
  import axios from 'axios';
  import Axios from 'axios';
  
  const listVideos = () => async (dispatch) => {
    try {
      dispatch({ type: VIDEO_LIST_REQUEST });
      const { data } = await axios.get(
        '/api/videos' 
      );
      dispatch({ type: VIDEO_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: VIDEO_LIST_FAIL, payload: error.message });
    }
  };
  
  const yourVideos = (userId) => async (dispatch) => {//xài chung reducer+ constant+store của listVideos ?
    try {
      dispatch({ type: VIDEO_LIST_REQUEST });
      const { data } = await axios.get(
        '/api/videos/author/' + userId
      );
      dispatch({ type: VIDEO_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: VIDEO_LIST_FAIL, payload: error.message });
    }
  };

  const detailsVideos =(videoId) => async(dispatch) =>
  {
    try{
      dispatch({ type: VIDEO_DETAILS_REQUEST });
      const { data } = await axios.get(
        '/api/videos/' + videoId
      );
      dispatch({ type: VIDEO_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: VIDEO_DETAILS_FAIL, payload: error.message });
    }
  };

  const deleteVideo = (videoId) => async (dispatch, getState) => {
    try {
      const {
        userSignin: { userInfo },
      } = getState();
      dispatch({ type: VIDEO_DELETE_REQUEST, payload: videoId });
      const { data } = await axios.delete('/api/videos/' + videoId, {
        headers: {
          Authorization: 'Bearer ' + userInfo.token,
        },
      });
      dispatch({ type: VIDEO_DELETE_SUCCESS, payload: data, success: true });
    } catch (error) {
      dispatch({ type: VIDEO_DELETE_FAIL, payload: error.message });
    }
  };
  

  const saveVideo = (video) => async (dispatch, getState) => {
    try {
      dispatch({ type: VIDEO_SAVE_REQUEST, payload: video });
      const {
        userSignin: { userInfo },
      } = getState();
      if (!video._id) {
        const { data } = await Axios.post('/api/videos', video, {
          headers: {
            Authorization: 'Bearer ' + userInfo.token,
          },
        });
        dispatch({ type: VIDEO_SAVE_SUCCESS, payload: data });
      } else {
        const { data } = await Axios.put(
          '/api/videos/' + video._id,
          video,
          {
            headers: {
              Authorization: 'Bearer ' + userInfo.token,
            },
          }
        );
        dispatch({ type: VIDEO_SAVE_SUCCESS, payload: data });
      }
    } catch (error) {
      dispatch({ type: VIDEO_SAVE_FAIL, payload: error.message });
    }
  };

// sử dụng chung constant,reducer của saveVideo!!
  const increaseviewVideo = (video) => async (dispatch, getState) => {
    try {
      dispatch({ type: VIDEO_SAVE_REQUEST, payload: video });
      
       
        const { data } = await Axios.patch(
          '/api/videos/' + video._id,
          video
        );
        dispatch({ type: VIDEO_SAVE_SUCCESS, payload: data });
      
    } catch (error) {
      dispatch({ type: VIDEO_SAVE_FAIL, payload: error.message });
    }
  };

  const saveVideoComment = (videoId, comment) => async (dispatch, getState) => {
    try {
      const {
        userSignin: {
          userInfo: { token },
        },
      } = getState();
      dispatch({ type: VIDEO_COMMENT_SAVE_REQUEST, payload: comment });
      const { data } = await axios.post(
        '/api/videos/'+videoId+'/comments',
        comment,
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
      dispatch({ type: VIDEO_COMMENT_SAVE_SUCCESS, payload: data });
    } catch (error) {
      // report error
      dispatch({ type: VIDEO_COMMENT_SAVE_FAIL, payload: error.message });
    }
  };
  

  export {
    listVideos,
    detailsVideos,
    yourVideos,
    saveVideo,
    deleteVideo,
    increaseviewVideo,
    saveVideoComment,
  };