import axios from 'axios';

const yt = axios.create({
	baseURL: 'https://www.googleapis.com/youtube/v3',
	params: {
		//part: 'snippet',
		type: 'video',
		//maxResults: 5,
		key: process.env.REACT_APP_KEY
	},
});


export const ytSearch = async searchTerm => {
    return await yt.get('/search', {
        params: {
            q: searchTerm,
            part: 'snippet',
            pageToken: "CA8QAA",
            //maxResults: 5,
            type: 'video',
            key: process.env.REACT_APP_GOOGLE_KEY,
        },
    });
};