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

  const data = users.filter((user) => {
    if (typeof name === "string" && name.trim() !== "") {
      if (user.name.toLowerCase().includes(name.toLowerCase())) return true;
    } else {
      name;
      return false;
    }
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
