///api/new-meetup
// POST /api/new-meetup
import { MongoClient } from "mongodb"

const handler = async (req, res) => {
    if (req.method === 'POST') {
        try {
            // const { title, image, address, description } = req.body
            const data = req.body
            const client = await MongoClient.connect('mongodb+srv://tal51:12345@cluster0.p3oka.mongodb.net/meetups_db?retryWrites=true&w=majority')
            const db = client.db()
            const meetupsCollection = db.collection('meetup')
            const result = await meetupsCollection.insertOne(data)
            client.close()
            res.status(201).json({ message: 'Meetup Inserted!' })
        } catch (error) {
            console.log('mongo handler error:', error);
        }
    }
}
export default handler