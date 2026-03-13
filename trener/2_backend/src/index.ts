import express from "express";
import { getUserById, isValidColor, USER_COLORS, users } from "./users/users";

const app = express();

app.get("/", (req, res) => {
  res.send(/* html */ `<h1>Hello!</h1>`);
});

// http://127.0.0.1:9000/users?name=Alice
// http://127.0.0.1:9000/users?color=red

app.get('/users/:userId',(req,res)=>{
  const id = req.params['userId']

  const user = getUserById(id)

  res.send(user)
})

app.get("/users", (req, res) => {
  const { name, color } = req.query;

  // Function (Type) Guard
  if (!!name && typeof name !== "string") return res.send({ message: "Error" });
  if (!(color && isValidColor(color))) return res.send({ message: "Error" });

  const data = users.filter((user) => {
    let valid = true;

    if (name)
      valid = valid && user.name.toLowerCase().includes(name.toLowerCase());

    // if (color as USER_COLORS) valid = valid && USER_COLORS.includes(color as USER_COLORS);
    if (color) valid = valid && USER_COLORS.includes(color);

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
