import { MongoClient } from 'mongodb'

export async function connectDatabase() {
    const client = await MongoClient.connect('mongodb+srv://user:password@cluster0.uoxzg.mongodb.net/newsletter?retryWrites=true&w=majority')
    const db = client.db()
    return db
}

export async function insertEmail(email) {
    const db = await connectDatabase()
    const collection = db.collection('emails')
    await collection.insertOne({ email })
}

export async function getEmails(sort) {
    if (sort === 'asc') {
        sort = { '_id': 1 }
    }
    else {
        sort = { '_id': -1 }
    }
    const db = await connectDatabase()
    const collection = db.collection('emails')
    const emails = await collection.find({}).sort(sort).toArray()
    return emails
}





