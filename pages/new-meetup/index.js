import NewMeetupForm from '../../components/meetups/NewMeetupForm'
import Head from 'next/head'
import { Fragment } from 'react';
import { useRouter } from 'next/router';
import { httpService } from '../../services/httpService';
const NewMeetupPage = () => {
    const router = useRouter()
    const addMeetupHandler = async (enteredMeetupData) => {
        try {
            await httpService.newMeetup(enteredMeetupData)
            router.push('/')
        } catch (error) {
            console.log('addMeetupHandler error', error);
        }
    }
    return (
        <Fragment>
            <Head>
                <title>Add a New Meetup</title>
                <meta name="description" content="Add your own meetups and creating amazing networking opportunities." />
            </Head>
            <NewMeetupForm onAddMeetup={addMeetupHandler} />
        </Fragment>
    );
}

export default NewMeetupPage;