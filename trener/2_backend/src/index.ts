import express from 'express'

const app = express(); 

app.get("/", (req, res) => {
  res.send(/* html */ `<h1>Hello!</h1>`);
});

// let HOST: string = "localhost"; // Type Widening >=
const HOST = "localhost" // literal type == 
const PORT = 3000;

app.listen(PORT, HOST, (error) => {
  if (error) {
    console.log(`Error ${error.message}`);
  } else {
    console.log(`Listening on http://${HOST}:${PORT}/`);
  }
});



// "localhost" extends string