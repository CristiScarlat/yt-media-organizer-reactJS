import axios from "axios";

export const download = async (videoId) => {
    return await axios.post("https://us-central1-universal-scheduler-c7e22.cloudfunctions.net/ytdl", { videoId }, { responseType: 'blob' })
}