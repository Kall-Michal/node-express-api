const express = require("express");
const libController = require("./controllers/library-routes");
const app = express();
const port = 3000;

// Express middleware that handles JSON.
app.use(express.json());

// GET - uses the logic passed in read found inside the module library-routes.
app.get("/api/books", libController.read);

// GET - uses - query
app.get("/api/books/search?", libController.query);

// POST - uses the logic passed in create found inside the module library-routes.
app.post("/api/books", libController.create);

// PUT - uses the logic passed in update found inside the module library-routes.
app.put("/api/books/:bookId", libController.update);

// DELETE - uses the logic passed in delete found inside the module library-routes.
app.delete("/api/books/:bookId", libController.delete);

// Listen to app
app.listen(port, () => console.log(`Listening to port ${port}`));
