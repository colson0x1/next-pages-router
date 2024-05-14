/* @ NEXT API Routes */

// Now using API instead of Dummy Data
// That can be easily done by the last major NEXT.js feature which is added
// by NEXT.to our React Apps.
// NEXTjs makes it easy for us to build an API, a backend API together with our
// frontend React App in the same project!
// For this, we can use another key NEXTjs feature called API Routes.
// API routes are special routes, special pages, which don't return HTML code
// but which are instead about accepting incoming HTTP requests, also
// POST, PATCH, PUT, DELETE requests, whatever we need with JSON Data attached
// to them and which then might do whatever we need to do. For example: store
// data in a database and then return JSON data.
// So we could say API routes allow us to build our own API end points as
// part of this NEXT project.
// And they will then be served by the same server as our NEXT app.
// To add API routes, we add special folder in our `pages` folder called
// `api`.
// And just as the pages folder has to be named pages, this folder has to be
// named API and it has to be in the pages folder.
// Then NEXTjs will pick up any JavaScript files stored in there and turn those
// files into API routes.
// So into endpoints, that can be targeted by requests and that should receive
// JSON and return JSON.
// In this api folder, we can add JS files where the file names will act as path
// segments in the URL.
// For example: `new-meetup.js`

// Now in those JS files, like here, we then don't create a React Component function.
// These API routes are not about defining, rendering or returning React components.
// Instead in there, we will define functions which contains server side code
// because API routes will only run on the server, never on the client.
// Decoding them will never be exposed to the client. So we can also use credentials
// in API routes without compromising them. And those functions are then simply
// triggered whenever a request is sent to this route. So to `/api/new-meetup` here.
// This would be the URL of this file and if a request is sent to this URL,
// it will trigger the function which we have to define in this file.
// Now often this function is named hanlder but the name is up to us.
// The important thing is that it's exported.
// So we export this handler function here and this function will receive a request
// and a response object. We might notice from NODE.js and Express.js.
// The request object contains data about the incoming request.
// The response object will be needed for sending back a response.
// Now from that request object, we can get things like headers or the request body
// and also the request method, through a method property here.
// req.method
// This allows us to find out which kind of request was sent.
// And we could for example check if we are receiving having a post request here.
// So if the request method is POST, and we only execute the code in this if check,
// if it is a incoming request post request.
// For other kinds of requests, we don't do anything.
// So that would ensure that only POST requests to this route would actually trigger
// this code in here.
// Then here we can get our data by accessing req.body;
// The `body` field is another built-in filed which contains the body of the
// incoming request, the data of the incoming request.
// And then we can do whatever we need to do.
// Now this here will be the endpoint for creating a new meetup. And therefore
// it's probably fair to expect that this data which we get contains a title,
// a meetup image, an address and a description field.
// After all, it's our page, our project, and our API. So we can expect whichever
// data we need. We will then just have to make sure that we send the correct
// data when we do send a request to this API route.
// Here we do indeed expect that we get some data out of this data, so out of
// this request body and we'll use object destructuring here and we expect to get
// a title, a image field, an address field, and a description field.
// So these are the four fields which we expect to get on the incoming request body.
// And then we can store them in a database, for example!

import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;

    // We don't need destructuring here since we directly passed data to
    // insertOne()
    // const { title, image, address, description } = data;

    // connect returns a promise hence we turn handler into async
    // This gives us connected client eventually
    const client = await MongoClient.connect(
      'mongodb+srv://colson:startup2025@cluster0.h31egms.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0',
    );
    // on that client object we can call db method to get hold of that
    // database to which we're connecting here
    // If the database doesn't exist, it will be created on the fly
    const db = client.db();

    // And then on this database, we can get access to our meetupsCollection
    // MongoDB is a NoSQL Database that works with collections full of documents.
    // Collections would be kind of our tables in a SQL database and documents
    // would be our entries in those tables.
    // So we have collections which holds multiple documents!
    // And a single meetup would be a single document, the overall collection
    // then holds multiple meetups, multiple meetup documents.
    // And we get hold of a collection by using our database and then the collection
    // method.
    // And the collection can have any name of our choice just as the database if
    // it doesn't exist yet, it will be generated on the fly.
    const meetupsCollection = db.collection('meetups');

    // And now that we got hold of the meetupsCollection, on that collection here,
    // we can call `insertOne()` which is one of the built-in query commands
    // for inserting one new document into this collection.
    // And now a great thing about MongoDB is that a document is just a object in
    // the end, a JavaScript object.
    // And that now could be an object with title, image, address and description.
    // And since that is the case, since that would make a lot of sense, we can
    // also just directly insert data so this full data object into our database.
    // Now we would insert this data object into the database. Now, this also
    // is an async operation. insertOne() returns a promise and hence we can await
    // this here as well to get back the result of this operation.
    // Result will be an object with for example, the automatically generated ID.
    // We can also use try catch for error handling!
    const result = await meetupsCollection.insertOne(data);
    console.log(result);

    // We want to call client.close() to close the database connection once
    // we're done.
    client.close();
    // And then we need to use this res object to send back a response.
    // Because we're getting the request, we're then storing data in the database,
    // ultimately, we also need to send back a response then.
    // This works similarly to what we might be used to from NODE/Express.
    // We have a status method, which we can call on response to set a HTTP status
    // code of the response which will be returned.
    // For example 201 status code to indicate that something was inserted successfully.
    // We can then chain a JSON call here to prepare the JSON data that will
    // be added to the outgoing response.
    // Here we can add a for example, message key.
    // With that, we have a basic API route which will insert meetups into our
    // database.
    res.status(201).json({ message: 'Meetup inserted!' });
  }
}
