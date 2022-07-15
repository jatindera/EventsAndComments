import { insertEmail } from '../../helpers/db-utils';
// write a function i.e, handler that accepts a request and response object, and returns a response object
async function handler(req, res) {
    // if request method is not POST, do not submit
    if (req.method !== 'POST') {
        return res.status(405).end();
    }
    // if request body is not JSON, do not submit
    if (req.headers['content-type'] !== 'application/json') {
        return res.status(415).end();
    }
    // if request body is not valid, do not submit
    const body = req.body;
    console.log(body)
    if (!body || !body.email || !body.email.includes('@')) {
        return res.status(400).end();
    }

    try {
        // insert email into database
        insertEmail(body.email);
        // return response
        return res.status(201).json({
            message: `Email added successfully ${body.email}`
        });
    } catch (err) {
        console.log(err)
        return res.status(500).end();
    }


}

export default handler;







