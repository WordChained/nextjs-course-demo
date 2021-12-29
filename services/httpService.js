import axios from 'axios';

const newMeetup = async (newMeetup) => {

    const res = await axios.post('/api/new-meetup', newMeetup)
    console.log('New Meetup', res.data);
}

export const httpService = {
    newMeetup,
}