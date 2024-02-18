import axios from "axios";

export const download = async (videoId) => {
    return await axios.post("https://starfish-app-7peaj.ondigitalocean.app/download", { videoId, apiKey: process.env.REACT_APP_APIKEY }, { responseType: 'blob' })
}