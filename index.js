const express = require("express");
const app = express();
const port = 5005;

app.use(express.json());

var users = [
  {
    email: "abc@dal.ca",
    firstName: "ABC",
    id: "1",
  },
  {
    email: "xyz@dal.ca",
    firstName: "XYZ",
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
  const newFirstname = req.body.firstName;
  var flag = false;

  if (newEmail == undefined && newFirstname == undefined) {
    res.status(400).json({
      message: "Invalide Input email and firstname is not available",
      success: false,
    });
  } else {
    if (newEmail == undefined) {
      users.forEach((user) => {
        if (user.id == id) {
          user.firstName = newFirstname;
          flag = true;
        }
      });
      res.status(200).json({
        message: "firstname updated",
        success: true,
      });
    } else if (newFirstname == undefined) {
      users.forEach((user) => {
        if (user.id == id) {
          user.email = newEmail;
          flag = true;
        }
      });
      res.status(200).json({
        message: "email updated",
        success: true,
      });
    } else {
      users.forEach((user) => {
        if (user.id == id) {
          user.firstName = newFirstname;
          user.email = newEmail;
          flag = true;
        }
      });
      res.status(200).json({
        message: "User updated",
        success: true,
      });
    }
  }
});

app.post("/add", (req, res) => {
  const newEmail = req.body.email;
  const newFirstname = req.body.firstName;
  if (newEmail == undefined || newFirstname == undefined) {
    res.status(400).json({
      message: "Invalide Input",
      success: false,
    });
  } else {
    id = users.length;
    users.push({
      email: newEmail,
      firstName: newFirstname,
      id: String(++id),
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
