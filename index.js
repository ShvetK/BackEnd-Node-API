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

var id = 2;

app.get("/users", (req, res) => {
  res.json({
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
  users.forEach((user) => {
    if (user.id == id) {
      user.firstname = newFirstname;
      user.email = newEmail;
      flag = true;
    }
  });
  if (flag) {
    res.json({
      message: "User updated",
      success: true,
    });
  } else {
    res.json({
      message: `ID ${id} is not available in list`,
      success: false,
    });
  }
});

app.post("/add", (req, res) => {
  const newEmail = req.body.email;
  const newFirstname = req.body.firstname;
  users.push({
    email: newEmail,
    firstname: newFirstname,
    id: String(++id),
  });
  res.json({
    message: "User added",
    success: true,
  });
});

app.get("/user/:id", (req, res) => {
  const id = req.params.id;
  var flag = true;
  users.forEach((user) => {
    if (user.id == id) {
      flag = false;
      res.json({
        success: true,
        user: user,
      });
    }
  });
  if (flag) {
    res.json({
      success: false,
      message: `ID ${id} is not available in list`,
    });
  }
});

app.listen(port, () => {
  console.log(`Tutorial 5 is listing on ${port}`);
});
