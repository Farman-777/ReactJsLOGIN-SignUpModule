const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());

// The following two lines are equivalent to app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use the correct property name for the MySQL connection options
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mydatabase'
});

conn.connect((err) => {
  if (err) {
    console.error(err);
    throw err;
  }
  console.warn("Connected to MySQL database");
});

app.post('/addList', (req, res) => {
  const { fname, lname, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const selectSql = "SELECT * FROM record WHERE email = ?";
  const selectValues = [email];

  conn.query(selectSql, selectValues, (selectErr, selectResult) => {
    if (selectErr) {
      console.error(selectErr);
      res.status(500).send("Error in checking record");
    } else if (selectResult.length > 0) {
      console.warn("Email ID already exist please try with new ID...")
      res.status(400).send("Email ID already exist please try with new ID...");
      return; 
    } else {
      const insertSql = "INSERT INTO record (fname, lname, email, password) VALUES (?, ?, ?, ?)";
      const insertValues = [fname, lname, email, hashedPassword];

      conn.query(insertSql, insertValues, (insertErr, insertResult) => {
        if (insertErr) { 
          console.error(insertErr);
          res.status(500).send("Error in inserting record");
        } else {
          console.log("Record inserted successfully\n", insertResult);
          res.send("Record inserted...");
        }
      });
    }
  });
});
 
 
// app.post('/addList', (req, res) => {
//   const { fname, lname, email, password } = req.body;
//   const hashedPassword = bcrypt.hashSync(password, 10);
//   const sql = "INSERT INTO record (fname, lname, email, password) VALUES (?, ?, ?, ?)";
//   const values = [fname, lname, email, hashedPassword];
  
//   conn.query(sql, values, (err, result) => {
//     if (err) { 
//       console.error(err);
//       res.status(500).send("Error in inserting record");
//     }
//     else if(result.length > 0){ 
//       console.warn("Record Alreade Exist...")
//       res.status(400).send("Record Alreade Exist...")}
//     else {
//       console.log("Record inserted successfully\n", result);
//       res.send("Record inserted...");
//     }
//   });
// }); 

const port = 4501;
app.listen(port, () => {
  console.warn(`Server is running on port ${port}`);
});
