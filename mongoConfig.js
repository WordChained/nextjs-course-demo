import { MongoClient } from 'mongodb';

const meetupsDB = async () => {
    try {
        const client = await MongoClient.connect('mongodb+srv://tal51:12345@cluster0.p3oka.mongodb.net/meetups_db?retryWrites=true&w=majority')
        const db = client.db()

        const meetupsCollection = db.collection('meetup')
        // client.close()
        console.log(meetupsCollection);
        return meetupsCollection
    } catch (error) {
        console.log('meetupsDB on mongoConfig error:', error);
    }
}
export const mongoConfig = {
    meetupsDB
}