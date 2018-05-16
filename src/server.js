'use strict';

import path from 'path';
import { Server } from 'http';
import Express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from './routes';
import NotFoundPage from './components/NotFoundPage';
import SocketIO from 'socket.io';


// Initialize the server and configure support for ejs templates
const app = new Express();
const server = new Server(app);
let io = new SocketIO(server);


var cors = require('cors');
var bodyParser = require('body-parser');
var config = require('../server/confApi.js');
//var jobConf = require('../server/standBy.js')(io);
var moment = require('moment');


app.use(bodyParser.json());
app.use(cors());


// Views setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// Define the folder that will be used for static assets
app.use(Express.static(path.join(__dirname, 'static')));


// Universal routing and rendering
app.get('*', (req, res) => {
  match(
    { routes, location: req.url },
    (err, redirectLocation, renderProps) => {

      // in case of error display the error message
      if (err) {
        return res.status(500).send(err.message);
      }

      // in case of redirect propagate the redirect to the browser
      if (redirectLocation) {
        return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      }

      // generate the React markup for the current route
      let markup;
      if (renderProps) {
        // if the current route matched we have renderProps
        markup = renderToString(<RouterContext {...renderProps}/>);
      } else {
        // otherwise we can render a 404 page
        markup = renderToString(<NotFoundPage/>);
        res.status(404);
      }

      // render the index template with the embedded React markup
      return res.render('index', { markup });
    }
  );
});


// Api Routes
var apiRoutes = Express.Router();
app.use('/api', apiRoutes);


// Token verify 
apiRoutes.use(function(req, res, next){
  next();
  // var token = req.query.token || req.body.token || req.params.token || req.headers['x-access-token'];
  // if(token){
  //   if(token === config.apiToken)
  //     next();
  //   else{
  //     return res.status(403).send({
  //       success: false,
  //       message: 'This App is Secured and Restricted...'
  //     });
  //   }
  // }else{
  //   return res.status(403).send({
  //     sucess: false,
  //     message: 'This App is Secured and Restricted...'
  //   });
  // }
});


// Login Dashboard End-Point
apiRoutes
  .post("/dash", function(req, res){
    if(req.body === {}){
      res.status(400).send({error: "Error empty data"});
    }
    var data = req.body;
    console.log(data);
    io.sockets.emit('dash', data);
    res.status(200).end();
  })
  .post("/serverTime", function(req, res){
    var time = moment().unix();
    console.log(time);
    res.status(200).send({time: time});
  });

// Socket io connection
io.on('connection',(socket) =>{
  console.log('=== User connected ===');
  console.log("socket ID: ",socket.id);
});

// Start the server
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';
server.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  console.info(`Server running on http://localhost:${port} [${env}]`);
});
