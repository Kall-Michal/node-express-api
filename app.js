const express = require("express");
const libRoutes = require("./routes/library-routes");
const app = express();
const port = 3000;

// Express middleware that handles JSON.
app.use(express.json());

// GET - uses the logic passed in read found inside the module library-routes.
app.get("/api/books", libRoutes.read);

// GET - uses - query
app.get("/api/books/search?", libRoutes.query);

// POST - uses the logic passed in create found inside the module library-routes.
app.post("/api/books", libRoutes.create);

// PUT - uses the logic passed in update found inside the module library-routes.
app.put("/api/books/:bookId", libRoutes.update);

// DELETE - uses the logic passed in delete found inside the module library-routes.
app.delete("/api/books/:bookId", libRoutes.delete);

// GET - uses - query
app.get("/api/books/search?", libRoutes.query);

// Listen to app
app.listen(port, () => console.log(`Listening to port ${port}`));
