const express = require("express");
const app = express();
const port = 5005;

app.use(express.json());

var users = [
  {
    email: "abc@dal.ca",
    firstname: "ABC",
    id: "1",
  },
  {
    email: "xyz@dal.ca",
    firstname: "XYZ",
    id: "2",
  },
];

app.get("/users", (req, res) => {
  res.status(200).json({
    message: "Users retrieved",
    success: true,
    users: users,
  });
});

app.put("/update/:id", (req, res) => {
  const id = req.params.id;
  const newEmail = req.body.email;
  const newFirstname = req.body.firstname;
  var flag = false;

  if (
    newEmail == "" ||
    newEmail == null ||
    newFirstname == "" ||
    newFirstname == null
  ) {
    res.status(400).json({
      message: "Invalide Input",
      success: false,
    });
  } else {
    users.forEach((user) => {
      if (user.id == id) {
        user.firstname = newFirstname;
        user.email = newEmail;
        flag = true;
      }
    });
    if (flag) {
      res.status(200).json({
        message: "User updated",
        success: true,
      });
    } else {
      res.status(404).json({
        message: `ID ${id} is not available in list`,
        success: false,
      });
    }
  }
});

app.post("/add", (req, res) => {
  const newEmail = req.body.email;
  const newFirstname = req.body.firstname;
  if (
    newEmail == "" ||
    newEmail == null ||
    newFirstname == "" ||
    newFirstname == null
  ) {
    res.status(400).json({
      message: "Invalide Input",
      success: false,
    });
  } else {
    users.push({
      email: newEmail,
      firstname: newFirstname,
      id: String(++users.length),
    });
    res.status(200).json({
      message: "User added",
      success: true,
    });
  }
});

app.get("/user/:id", (req, res) => {
  const id = req.params.id;
  var flag = true;
  users.forEach((user) => {
    if (user.id == id) {
      flag = false;
      res.status(200).json({
        success: true,
        user: user,
      });
    }
  });
  if (flag) {
    res.status(400).json({
      message: `ID ${id} is not available in list`,
      success: false,
    });
  }
});

app.listen(port, () => {
  console.log(`Tutorial 5 is listing on ${port}`);
});
