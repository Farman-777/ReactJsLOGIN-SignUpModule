const bodyParser = require("body-parser");
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const Port = 2500;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mydatabase",
});

// Establish connection with the MySQL database
conn.connect((err) => {
  if (err) throw err;
  console.warn("Connection Established Successfully...");
});

// Route to check if a user is visiting for the first time
app.post("/check", (req, res) => {
  const { email,firstlogin } = req.body;


  // Use parameterized query to prevent SQL injection
  conn.query(
    "SELECT * FROM record WHERE email = ? AND FirstLogin = ?",
    [email, 1],
    (err, result) => {
      if (err) {
        // Handle errors with a 500 Internal Server Error response
        console.error(err);
        res.status(500).send("Internal Server Error");
      } else {
        // If the query returns a row, the user is visiting for the first time
        if (result.length > 0) {
          console.warn("user visiting first time...");
          conn.query(
            `UPDATE record SET FirstLogin = ${0} WHERE email = '${email}'`,
            (err, result) => {
              if (err) { console.error(err); }
               else { console.warn(`FirstLogin value updated for ${email}`); }
            }
          );
          // Send a response indicating that the user is visiting for the first time
        res.status(200).send({isFirstLogin:true});
   
        } 
        else {
          console.warn("User Has visited before...");
          // Send a response indicating that the user has visited before
          res.status(200).send({isFirstLogin:false});
        }
      }
    }
  );
});

// Start the server
app.listen(Port, () => console.warn(`Server Is Running On Port : ${Port}`));
