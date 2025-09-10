const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com', // 👈 Replace with your Gmail
      pass: 'your-app-password',   // 👈 App Password (not regular password)
    },
  });
  let mailOptions = {
    from: email,
    to: 'your-email@gmail.com', // 👈 You'll receive the email here
    subject: 'New Community Subscriber',
    text: `New subscriber joined: ${email}`,
  };
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Thank you for subscribing!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to send email.' });
  }
};