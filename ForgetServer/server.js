const express = require('express');  // Import the Express library
const cors = require('cors');  // Import the CORS middleware
const bodyParser = require('body-parser');  // Import the Body Parser middleware
const nodemailer = require('nodemailer');  // Import the Nodemailer library
const mysql = require('mysql2');  // Import the MySQL2 library

const app = express();  // Create an instance of the Express application

app.use(cors());  // Enable CORS for all routes

app.use(bodyParser.urlencoded({ extended: true }));  // Enable parsing of URL-encoded request bodies
app.use(bodyParser.json());  // Enable parsing of JSON request bodies

const port = 8000;  // Set the port number to 8000

const conn = mysql.createConnection({  // Create a MySQL connection
  host: 'localhost',  // Set the host to 'localhost'
  user: 'root',  // Set the user to 'root'
  password: '',  // Set the password to an empty string
  database: 'mydatabase'  // Set the database to 'mydatabase'
});

conn.connect((err) => {  // Connect to the MySQL database
  if (err) throw err;  // If there is an error, throw it
  else console.warn('Database Connected With MYSQL');  // Otherwise, log a success message
});

app.post('/sentEmail', async (req, res) => {  // Define a POST route for sending an email
  const email = req.body.email;  // Extract the email address from the request body
  
 // check if email exists in database
 conn.query(
  `SELECT * FROM record WHERE email = '${email}'`,  // Check if the email exists in the database
  async (err, result) => {  // Use an async callback function to handle the query result
    if (err) {  // If there is an error, log it and return a 500 error response
      console.error(err);
      res.status(500).json({ error: 'Something went wrong.' });
      return;
    }

    if (result.length === 0) {  // If the query returns no results, return a 404 error response
      res.status(404).json({ error: 'Email not found.' });
      return;
    }
 
      const token = Math.floor(Math.random() * 1000000); // generate random token

         // save token to database
         const sql = `INSERT INTO password_reset (token, email) VALUES ('${token}', '${email}')`;  // Insert the token into the password_reset table
         conn.query(sql, async (err, result) => {  // Use an async callback function to handle the query result
           if (err) {  // If there is an error, log it and return a 500 error response
             console.error(err);
             res.status(500).json({ error: 'Something went wrong.' });
             return;
           }
   
           if (result.affectedRows === 0) {  // If the query did not affect any rows, return a 500 error response
             res.status(500).json({ error: 'Failed to save token.' });
             return;
           }

           console.log('Token saved to database.');  // Log a success message
          });
    
          const sendMail = async () => {  // Define an asynchronous function for sending the email
            let testAccount = await nodemailer.createTestAccount();  // Create a test email account
    

        // connect with the smtp
        let transporter = await nodemailer.createTransport({
          service: 'Gmail',
          port: 465,
          auth: {
            user: 'farmanmalik4487@gmail.com',
            pass: 'drjayetmacoqdutn'
          }
        });

        let info = await transporter.sendMail({
          from: 'farman@gmail.com', // sender address
          to: "farmanmalik4487@gmail.com", // list of receivers
          subject: 'Reset Password', // Subject line
          html: `
          <p>Dear ${result[0].email},</p>
          <p>Please click on the link below to reset your password:</p>
          <a href="http://localhost:3000/reset">
          Reset Password</a>
          ` // html body
        });

        console.log('Message sent: %s', info.messageId);
        res.json({ message: 'Email sent successfully!' });
      };

      sendMail().catch((err) => {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong.' });
      });
    }
  );
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
