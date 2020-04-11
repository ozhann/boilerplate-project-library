/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

"use strict";

var expect = require("chai").expect;
const shortid = require("shortid");
//var MongoClient = require('mongodb').MongoClient;
//var ObjectId = require('mongodb').ObjectId;
//const MONGODB_CONNECTION_STRING = process.env.DB;
//Example connection: MongoClient.connect(MONGODB_CONNECTION_STRING, function(err, db) {});

let books = [];

module.exports = function (app) {
  app
    .route("/api/books")
    .get(function (req, res) {
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
      return res.json(
        books.map((book) => ({
          _id: book._id,
          title: book.title,
          commentcount: book.comments.length,
        }))
      );
    })

    .post(function (req, res) {
      //response will contain new book object including atleast _id and title
      const { title } = req.body;
      const newBook = {
        _id: shortid.generate(),
        title,
        comments: [],
      };
      books.push(newBook);
      return res.json(newBook);
    })

    .delete(function (req, res) {
      //if successful response will be 'complete delete successful'
      books = [];
      return res.json({
        success: "Complete delete successful!",
      });
    });

  app
    .route("/api/books/:id")
    .get(function (req, res) {
      const { id } = req.params;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}

      const book = books.find((book) => book._id === id);
      if (!book) {
        res.send("No book found!");
      }

      return res.json(book);
    })

    .post(function (req, res) {
      const { id } = req.params;
      const { comment } = req.body;

      // this will update the books array
      books = books.map((book) => {
        if (book._id === id) {
          book.comments.push(comment);
        }
        return book;
      });
      return res.json(books.find((book) => book._id === id));
      //json res format same as .get
    })

    .delete(function (req, res) {
      const { id } = req.params;

      //this will filter out the book
      books = books.filter((book) => book._id !== id);

      //if successful response will be 'delete successful'
      return res.send("Delete successful");
    });
};
