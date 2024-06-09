const express = require('express');
const router = express.Router();
const Post = require('../models/Post');


/**
*GET/
*HOME
 */

router.get('', async (req, res) => {
    const locals ={
        title: "NodeJs Blog",
        description: "Simple Blog created with NodeJs, Express & MongoDb."
    }

    try {
        const data = await Post.find();
        res.render('index', { locals, data } );
    } catch (error) {
        console.log(error);
    }   
});


/**
 * GET /
 * Post : id
 */
 
router.get('/post/:id', async (req, res) => {

    try {
        let slug = req.params.id;

        const data = await Post.findById({ _id: slug });

        const locals ={
            title: data.title,
            description: "Simple Blog created with NodeJs, Express & MongoDb."
            
        }

        res.render('post', { locals, data } );
    } catch (error) {
        console.log(error);
    }   
});
 

/**
 * POST /
 * Post - searchTerm
 */

router.post('/search', async (req, res) => {
    try {

        const locals ={
            title: "search",
            description: "Simple Blog created with NodeJs, Express & MongoDb."
        }

        let searchTerm = req.body.searchTerm;
        const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9]/g, "")

        const data = await Post.find({
            $or: [
                { title: { $regex: new RegExp(searchNoSpecialChar, 'i') }},
                { body: { $regex: new RegExp(searchNoSpecialChar, 'i') }}
            ]
        });


        res.render("search", {
            data,
            locals
        } );
    } catch (error) {
        console.log(error);
    }   
});





router.get('/about', (req, res) => {
    res.render('about', { locals } );
});




/*
function insertPostData () {
    Post.insertMany([
    {
      title: "Building APIs with Node.js",
      body: "Learn how to use NOde.js to build RESTful APIs using Frameworks like Express.js. "
    },
    {
      title: "Deployment of Node.js application",
      body: "Understand the different ways to deploy your NOde.js application , including on-premises,cloud,and contact."

    },
    {
      title: "Authentication and Authorization in Node.js",
      body: "Learn How to addd authentication and authorization to your Node.js web application using passport.js ."
    },
    {
      title: "Understand How to work with MongoDB and Mongoose",
      body: "Understand how to work with MongoDB and Mongoose , an object Data Modeling (ODM) library, in Node.js application."
    },
    {
      title: "build real-time, event-driven application in Node.js",
      body: "Socket.io: Learn how to use socket.io to build real-time, event-driven application in Node.js."
    },
    {
      title: "Discover how to use Express.js",
      body: "Discover how to use Express.js, a popular Node.js web framework, to build web applications."
    },
    {
      title: "Asynchronous programming with NOde.js",
      body: "Asynchronous programming with NOde.js: Explore the asynchronous nature of Node.js and how it allows for NOde.js."
    },
    {
      title: "Learn the basics of Node.js and its architecture",
      body: "Learn the basics of Node.js and its architecture, how it works , and why it is popular among developers."
    },
    {
      title: "NodeJs Limiting Network Traffic",
      body: "Learn how to limit network traffic."
    },
    {
      title: "Learn MOrgan - HTTP request logger for NOde.js",
      body: "Learn Morgan."
    },

    ])
}
insertPostData();
*/

module.exports = router;