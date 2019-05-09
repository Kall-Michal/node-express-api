/* 
    This is the Controller module for all the endpoints.
    Here is where all the logic for how to handle the incoming data goes.
    Once the logic is defined, then it can be exported and used in app.js
*/

/* A make-believe database that we will use to make our API calls to-from :) */
const library = [
  "Factfulness",
  "The Rosy Project",
  "A Brave New World",
  "Catcher And The Rye",
  "Hyperbole And A Half"
];

/*  
    Exporting an object that holds properties with the logic required for the endpoints. 
    This object can now be accessed in app.js
*/
module.exports = {
  /* Create property handles how to work with the POST request in app.js */
  create: (req, res) => {
    let dataFromUser = req.body.name;

    /* 
        Added security measure that does a sanity check on dataFromUser:
        If a user were to pass something empty then, our server replies with a Bad Request status code(400)
        and error message. 

        By adding the "return", we are implicilty saying that either execute that which is in the if-scope ... 
    */
    if (dataFromUser === undefined) {
      return res.status(400).send("The request value cannot be empty!");
    }

    /* else ... do that which is outside the if-statement. */
    library.push(dataFromUser);
    res.send(`A new book ${dataFromUser} has been added to the library`);
  },

  /* Read property which handles how to work with the GET request in app.js */
  read: (req, res) => {
    res.send(library);
  },

  /* Update property which handles how to work with the PUT request in app.js */
  update: (req, res) => {
    let bookId = req.params.bookId;
    let newName = req.body.name;

    /* 
        Added security measure that do a sanity check on the value of bookId and newName:
        If either were empty then status code 400 and a message is returned to user.

        Same rules apply here with the "return".
    */
    if (bookId === undefined || newName === undefined) {
      return res.status(400).send("The request value cannot be empty!");
    }

    /*
        Added security measure that does a sanity check on the validity of bookId in accordance our database:
        If the entered number is either less than 0, equal or greater than the length of the array.
        A status code 400 and a message is returned to user.

        Same rules apply here with the "return".
     */
    if (bookId < 0 || bookId >= library.length) {
      return res.status(400).send("The id value passed isn't valid!");
    }

    library.splice(bookId, 1, newName);
    res.send(`The book at position ${bookId} has been updated to ${newName}`);
  },

  /* Delete property which handles how to work with the POST request in app.js */
  delete: (req, res) => {
    let bookId = req.params.bookId;

    /* 
        Added security measures that do a sanity check on the value of bookId.
        If it is empty then status code 400 and a message is returned to user.

        Same rules apply here with the "return".
    */
    if (bookId === undefined) {
      return res.status(400).send("The request value cannot be empty!");
    }

    /*
        Added security measure that does a sanity check on the validity of bookId in accordance our database:
        If the entered number is either less than 0, equal or greater than the length of the array.
        A status code 400 and a message is returned to user.

        Same rules apply here with the "return".
    */
    if (bookId < 0 || bookId >= library.length) {
      return res.status(400).send("The id value passed isn't valid!");
    }

    library.splice(bookId, 1);
    res.send(`The book has been deleted!`);
  },

  /* Query property which handles how to work with the GET request with query parameters in app.js */
  query: (req, res) => {
    let query = req.query.name;

    if (!library.includes(query)) {
      return res.status(400).send("This book does not exist in our database");
    }
    res.send(`Found the book ${query}`);
  }
};
