import { uuid } from 'uuidv4';
import { MongoClient } from 'mongodb';

function handler(req, res) {
    // if request is post then print post else print get
    const eventId = req.query.eventid;
    console.log(req.query)
    if (req.method === 'POST') {
        // get data from request body
        const data = req.body;
        const { email, name, comment } = data;
        // if data is not valid, do not submit
        if (!email || !email.includes('@') || !name || !comment) {
            return res.status(400).json({ message: 'Invalid data' });
        }
        // log data to console
        const newComment = {
            eventId,
            email,
            name,
            comment,
        }

        MongoClient.connect('mongodb+srv://jatindera:CoolerMaster009@cluster0.uoxzg.mongodb.net/events?retryWrites=true&w=majority', (err, client) => {
            if (err) {
                return res.status(500).end();
            }
            const db = client.db();
            db.collection('comments').insertOne(newComment, (err, result) => {
                if (err) {
                    return res.status(500).end();
                }
                client.close();
                res.status(200).json({ message: `Got comment from: ${email}` });
            });
        });
    }
    // send status code 200 and a message with email, name, and comment

    else if (req.method === 'GET') {
        console.log("inside get")
        MongoClient.connect('mongodb+srv://jatindera:CoolerMaster009@cluster0.uoxzg.mongodb.net/events?retryWrites=true&w=majority', (err, client) => {
            if (err) {
                return res.status(500).end();
            }
            const db = client.db();
            db.collection('comments').find({ eventId }).toArray((err, comments) => {
                if (err) {
                    return res.status(500).end();
                }
                client.close();
                console.log(comments);
                res.status(200).json(comments);
            });
        });

    }

}



export default handler;