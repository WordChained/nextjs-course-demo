import MeetupList from '../components/meetups/MeetupList'
// import { mongoConfig } from '../mongoConfig';
import { MongoClient } from 'mongodb';
import Head from 'next/head'
import { Fragment } from 'react';


const HomePage = (props) => {
    return (
        <Fragment>
            <Head>
                <title>React Meetups</title>
                <meta name="description" content="Browse a huge list of highly active React Meetups" />
            </Head>
            <MeetupList meetups={props.meetups} />
        </Fragment>
    );
}

// this runs every X time (with 'revalidate',that we used below)
export async function getStaticProps(context) {
    // console.log(context);
    //here we fetch data from an API
    const client = await MongoClient.connect('mongodb+srv://tal51:12345@cluster0.p3oka.mongodb.net/meetups_db?retryWrites=true&w=majority')
    const db = client.db()

    const meetupsCollection = db.collection('meetup')
    const meetups = await meetupsCollection.find().toArray()
    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                address: meetup.title,
                image: meetup.image,
                id: meetup._id.toString()
            }))
        },
        revalidate: 10 //this refreshes the data on the server and rebuilds every X seconds
    };
}

//this runs for every request! good for sites with many requests
//also, use this if we need the request object (req,res)
// export async function getServerSideProps({ req, res }) {
//     //we get context here as well, which is where we can get the req and res
//     return {
//         props: { meetups: DUMMY_MEETUP }
//     };
// }
export default HomePage;