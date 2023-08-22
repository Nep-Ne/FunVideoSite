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
    VIDEO_REVIEW_SAVE_REQUEST,
    VIDEO_REVIEW_SAVE_FAIL,
    VIDEO_REVIEW_SAVE_SUCCESS,
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
  
  const yourVideos = () => async (dispatch) => {
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


  export {
    listVideos,
    detailsVideos,
    // yourVideos,
    // saveVideos,
    // deleteVideos,
    // saveVideosReview,
  };