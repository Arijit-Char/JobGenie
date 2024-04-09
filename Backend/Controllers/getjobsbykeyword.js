import axios from 'axios';

export const getjobs = async (req, res) => {
    try {
        const { job } = req.body;
        const options = {
            method: 'GET',
            url: 'https://rapid-linkedin-jobs-api.p.rapidapi.com/search-jobs',
            params: {
                keywords: job,
                datePosted: 'anyTime',
                sort: 'mostRelevant'
            },
            headers: {
                'X-RapidAPI-Key': process.env.RapidAPIKey,
                'X-RapidAPI-Host': process.env.RapidAPIHostJobs
            }
        };
        try {
            const response = await axios.request(options);
            res.status(200).json({
                success: true,
                error: response.data
            });
        } catch (error) {
            console.error(error);
        }
    }

    catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};
