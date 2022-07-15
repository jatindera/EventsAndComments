function handler(req, res) {
  // send status code 200
  res.status(200).json({ message: 'Feedback received' });
}

export default handler;

