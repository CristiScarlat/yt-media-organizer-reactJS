import axios from "axios";

export const download = async (videoId) => {
    return await axios.post(process.env.REACT_APP_REST_API_ENDPOINT, { videoId, apiKey: process.env.REACT_APP_APIKEY }, { responseType: 'blob' })
}