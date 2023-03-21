const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const app = express();

const PORT = 4500;

app.use(cors());

// Remove bodyParser middleware and use express.json() instead
app.use(express.json());

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mydatabase",
});

// Move the endpoint for handling password reset above the database connection code
// so that it can be accessed before the connection is established
app.post("/resetPassword", (req, res) => {
  const { email, password, confirmPassword } = req.body;

  // validate the input data 
  if (password !== confirmPassword) {
    console.warn("Passwords do not match");
    return res.status(400).json({ message: "Passwords do not match" });
  }

  // encrypt the new password
  let hashedPassword;
  try {
    hashedPassword = bcrypt.hashSync(password, 10);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "An error occurred while hashing the password" });
  }

  // update the user's password in the database
  conn.query(
    "UPDATE record SET password = ? WHERE email = ?",
    [hashedPassword, email],
    (err, results) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ message: "An error occurred while re-setting the password" });
      }
      if (results.affectedRows === 0) {
        console.warn("User does not exist");
        return res.status(404).json({ message: "User not found" });
      }
      console.warn("Password Reset Successfully")
      res.json({ message: "Password reset successful" });
    }
  );
});

// Connect to the database
conn.connect((err) => {
  if (err) throw err;
  else console.warn(`Database Connected With Mysql`);
});

// Start the server after the database connection is established
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
