import express from "express";
import { users } from "./users/users";

const app = express();

app.get("/", (req, res) => {
  res.send(/* html */ `<h1>Hello!</h1>`);
});

// http://127.0.0.1:9000/users?name=Alice
// http://127.0.0.1:9000/users?color=red

app.get("/users", (req, res) => {
  const { name, color } = req.query;

  // /users - all users
  // /users?name=a - only with name
  // /users?name=a&color=red - name & color

  const data = users.filter((user) => {
    // let valid: boolean;
    let valid = true;

    if (typeof name === "string") {
      valid = user.name.toLowerCase().includes(name.toLowerCase());
    }

    if (typeof color === "string" && ["red", "green", "blue"].includes(color)) {
      valid = user.color == color;
    }

    return valid;
  });

  res.send(data);
});

const HOST = process.env["HOST"] || "localhost";
const PORT = parseInt(process.env["PORT"] || "3000");

app.listen(PORT, HOST, (error) => {
  if (error) {
    console.log(`Error ${error.message}`);
  } else {
    console.log(`Listening on http://${HOST}:${PORT}/`);
  }
});
