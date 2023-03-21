const bodyParser = require("body-parser");
const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());
const port = 3001;
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mydatabase",
});

conn.connect((err) => {
  if (err) throw err;
  console.warn(`Mysql connection done on port ${port}`);
});
app.post("/form", bodyParser.json(), (req, res) => {
  const { email, password } = req.body;
 // const hashedPassword = bcrypt.hashSync(password, 10); //code is working fine without it also

  const sql = `SELECT * FROM record WHERE email = ?`;
  const values = [email];

  conn.query(sql, values, (err, result) => {
    if (err) {
      console.warn("Error querying database: ", err);
      res.status(500).send("Internal Server Error");
    } else {
    // console.warn("chek result  line no. 33 here : ",result);
    //here we are cheking match for email
      if (result.length == 0) {
        console.warn({ message: "Incorrect email or password" });
        res.status(401).send({ message: "Incorrect email or password" });
      } else {
        const storedPassword = result[0].password;
        // console.warn("check line no 39  here ",password)
        //here we are checking match for password 
        const match = bcrypt.compareSync(password, storedPassword);
        if (match) {
          conn.query(
            `SELECT * FROM record WHERE email = '${email}'`,
            (err, result) => {
              if (err) {
                console.warn("Error selecting record:", err);
                res.status(500).send("Error selecting record");
              } else {
                console.log("Selected record:", result);
                res
                  .status(200)
                  .send({ message: "Record selected", data: result });
              }
            }
          );
        } else {
          console.warn({ message: "Incorrect email or password" });
          res.status(401).send({ message: "Incorrect email or password" });
        }
      }
    }
  });
});

app.listen(port);
