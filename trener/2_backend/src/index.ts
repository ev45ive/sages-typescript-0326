// console.log("Hello NodeJs!");
// console.log(process.argv.slice(2));
// console.log(process.env['PORT']);
import express from 'express'

const app = express(); 

app.get("/", (req, res) => {
  res.send(/* html */ `<h1>Hello!</h1>`);
});

const HOST = "localhost";
const PORT = 3000;

app.listen(PORT, HOST, (error) => {
  if (error) {
    console.log(`Error ${error.message}`);
  } else {
    console.log(`Listening on http://${HOST}:${PORT}/`);
  }
});
