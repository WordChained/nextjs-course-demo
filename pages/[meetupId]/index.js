import { ObjectId, MongoClient } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import { Fragment } from "react";
import Head from "next/head";
const MeetupDetails = ({ meetupData }) => {
    return (
        <Fragment>
            <Head>
                <title>{meetupData.title}</title>
                <meta name="description" content={meetupData.description} />
            </Head>
            <MeetupDetail
                image={meetupData.image}
                title={meetupData.title}
                description={meetupData.description}
                address={meetupData.address}
            />
        </Fragment>
    );
}
export async function getStaticPaths() {
    const client = await MongoClient.connect('mongodb+srv://tal51:12345@cluster0.p3oka.mongodb.net/meetups_db?retryWrites=true&w=majority')
    const db = client.db()
    const meetupsCollection = db.collection('meetup')
    const meetups = await meetupsCollection.find(
        {},//empty means no filter criteria
        {
            _id: 1 //only include the id but no other values
        }).toArray()
    return {
        paths: meetups.map(meetup => ({
            params: { meetupId: meetup._id.toString() }
        })),
        fallback: 'blocking'
    };
}
export async function getStaticProps(context) {
    const meetupId = context.params.meetupId

    const client = await MongoClient.connect('mongodb+srv://tal51:12345@cluster0.p3oka.mongodb.net/meetups_db?retryWrites=true&w=majority')
    const db = client.db()
    const meetupsCollection = db.collection('meetup')
    const selectedMeetup = await meetupsCollection.findOne({ _id: ObjectId(meetupId) })
    return {
        props: {
            meetupData: {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                description: selectedMeetup.description,
                image: selectedMeetup.image,
                address: selectedMeetup.address
            }
        }
    };
}
export default MeetupDetails;