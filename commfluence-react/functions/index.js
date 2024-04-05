/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });






//Function to Send Emails 

const functions = require('firebase-functions');  //Defines Cloud Functions for Firebase 
const admin = require('firebase-admin');         //Interactes with Firebase Admin SDK  
admin.initializeApp();
const nodemailer = require('nodemailer');    //Nodemailer sends the emails



//Configured to use Gmail SMTP service

const transporter = nodemailer.createTransport({

  service: 'gmail',

  auth: {

    user: 'your-email@gmail.com',   //replace this with Commfluence email or a email tester
    pass: 'your-password',          //replace this with Commfluence password or password of an email tester

 },                                //Once launched anyone who has access to our git will have access to email password unless changed, we can also

});                                 //use enviromental varianles to store email credientials to ensure security 



exports.sendTaskEmail = functions.firestore

    .document('tasks/{taskId}')

    .onWrite((change, context) => {

        const task = change.after.exists ? change.after.data() : null;

        if (task && task.assigneeEmail) {

            const mailOptions = {

              from: 'your-email@gmail.com',

              to: task.assigneeEmail,

              subject: 'New Task Assigned',

              text: `You have been assigned a new task: ${task.name}`,

            /*  html: `<p>CLICK LINK TO ACCESS TASK : <strong>${task.name}</strong>.</p><p><a href="https://yourwebsite.com/task-page?taskId=${context.params.taskId}">here</a>.</p>`,     */
           
            //^^Above must include a link of our site so the email can provide a link to the task, or hopefully just the site
           
        };



            return transporter.sendMail(mailOptions)

              .then(() => console.log('Email sent'))

              .catch((error) => console.error('Error sending email:', error));

        }

        return null;

    });



