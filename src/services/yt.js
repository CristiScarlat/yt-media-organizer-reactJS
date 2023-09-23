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


export const ytSearch = async (searchTerm, pageToken) => {
    const params = {
        q: searchTerm,
        part: 'snippet',
        //pageToken: "CA8QAA",
        maxResults: 10,
        type: 'video',
        key: process.env.REACT_APP_GOOGLE_KEY,
    }

    if(pageToken)params.pageToken = pageToken;
    
    return await yt.get('/search', {
        params: params,
    });
};