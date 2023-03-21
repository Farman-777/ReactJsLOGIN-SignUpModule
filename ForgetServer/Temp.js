const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();

const port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.post('/send-email', async (req, res) => {
  let data = req.body;
  console.log(data);

  const sendMail = async () => {
    let testAccount = await nodemailer.createTestAccount();
  
    // connect with the smtp
    let transporter = await nodemailer.createTransport({
      service: 'Gmail',
      port: 465,
      auth: {
        user: 'farmanmalik4487@gmail.com',
        pass: 'drjayetmacoqdutn'
      },
    });
  
    let info = await transporter.sendMail({
      from: `${data.name} <${data.email}>`, // sender address
      to: 'farmanmalik4487@gmail.com', // list of receivers
      subject: 'Contact Form Submission', // Subject line
      html: `
        <h3>Contact Details</h3>
        <ul>
          <li>Name: ${data.name}</li>
          <li>Email: ${data.email}</li>
        </ul>
        <h3>Message</h3>
        <p>${data.message}</p>
      ` // html body
    });
  
    console.log('Message sent: %s', info.messageId);
    res.json({ message: 'Email sent successfully!' });
  };
  

  sendMail().catch(err => {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong.' });
  });
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
