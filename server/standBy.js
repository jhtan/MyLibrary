var request = require('request');
var moment = require('moment');
var schedule = require('node-schedule');


// module.exports = function (io) {
// 	console.log("==== STAND BY====");
//
// 	// get vizix configuration
// 	var options = {
// 		url: 'http://10.100.0.159:8080/riot-core-services/api/user/login',
// 		method: 'POST',
// 		headers: {
// 			"Content-Type": "application/json",
// 			'Access-Control-Allow-Origin': '*'
// 		},
// 		json: true,
// 		body: {
// 			username: 'root',
// 			password: 'root',
// 			menus: {
// 				thingType: 'thingType:r'
// 			}
// 		}
// 	};
// 	request(options, function(error,response,body){
// 		console.log("Login --> ", body.token);
// 		getConfiguration(io, body.token);
// 	});
// }
//
// // Getting the molinete configuration
// function getConfiguration(io, token){
// 	var options = {
// 		url: 'http://10.100.0.159:8080/riot-core-services/api/things',
// 		method: 'GET',
// 		headers: {
// 			"Content-Type": "application/json",
// 			'Access-Control-Allow-Origin': '*',
// 			'token': token
// 		},
// 		qs:{
// 			where: "thingTypeCode='Configuracion'"
// 		}
// 	};
//
// 	request(options, function(error, response, body){
// 		var conf = JSON.parse(body).results[0];
// 		// console.log("conf: ", conf);
//
// 		// Job Configuration
// 		var tempDate = moment(conf.HoraInicio_Almuerzo);
// 		var lunchStart = new schedule.RecurrenceRule();
// 		lunchStart.hour = tempDate.get('Hour');
// 		lunchStart.minute = tempDate.get('minute');
// 		lunchStart.dayOfWeek = [new schedule.Range(1,5)];
//
// 		tempDate = moment(conf.HoraFin_Almuerzo);
// 		var lunchEnd = new schedule.RecurrenceRule();
// 		lunchEnd.hour = tempDate.get('Hour');
// 		lunchEnd.minute = tempDate.get('minute');
// 		lunchEnd.dayOfWeek = [new schedule.Range(1,5)];
//
// 		tempDate = moment(conf.HoraInicio_Cena);
// 		var dinnerStart = new schedule.RecurrenceRule();
// 		dinnerStart.hour = tempDate.get('Hour');
// 		dinnerStart.minute = tempDate.get('minute');
// 		dinnerStart.dayOfWeek = [new schedule.Range(1,5)];
//
// 		tempDate = moment(conf.HoraFin_Cena);
// 		var dinnerEnd = new schedule.RecurrenceRule();
// 		dinnerEnd.hour = tempDate.get('Hour');
// 		dinnerEnd.minute = tempDate.get('minute');
// 		dinnerEnd.dayOfWeek = [new schedule.Range(1,5)];
//
// 		// start lunch
// 		var a = schedule.scheduleJob(lunchStart, function(){
// 		  console.log("====== LUNCH START ======");
// 		  io.sockets.emit('standBy', {
// 		  	event: 'lunch',
// 		  	status: 'start'
// 		  });
// 		});
//
// 		// end lunch
// 		var b = schedule.scheduleJob(lunchEnd, function(){
// 			console.log("====== LUNCH END ======");
// 			io.sockets.emit('standBy', {
// 		  	event: 'lunch',
// 		  	status: 'end'
// 		  });
// 		});
//
// 		// start dinner
// 		var c = schedule.scheduleJob(dinnerStart, function(){
// 			console.log("====== DINNER START ======");
// 			io.sockets.emit('standBy', {
// 		  	event: 'dinner',
// 		  	status: 'start'
// 		  });
// 		});
//
// 		// end dinner
// 		var d = schedule.scheduleJob(dinnerEnd, function(){
// 			console.log("====== DINNER END ======");
// 			io.sockets.emit('standBy', {
// 		  	event: 'dinner',
// 		  	status: 'end'
// 		  });
// 		});
//
// 	});
// }



