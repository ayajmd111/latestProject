var express = require('express');
var db = require('./app/config/db');
var app = express();
const cluster = require('cluster');
var url = require('url');
var fs=require('fs')
// fs.unlink('./file.txt',function (err) {
//     if (err) throw err;
//     console.log('file deleted')
//   });


// var routes= require('./app/routes/routes')
// var result = url.parse('http://www.yogeshdotnet.com?id100&name=ayaj',true).query;
// var result = url.parse('https://maps.googleapis.com/maps/api/geocode/json?&address',true).query;
// console.log('result.name',JSON.stringify(result));

bodyParser = require('body-parser');
app.use(bodyParser.json());

// app.use(auth)
require('./app/routes/routes')(app);
if(cluster.isMaster){
    
    let numCores = require('os').cpus().length;
    for(let i = 0; i < numCores; i++) {
        cluster.fork();
    }
    cluster.on('online',function(worker){
        console.log('Worker ' + worker.process.pid + ' is listening');

    })
    cluster.on('exit', function(worker, code, signal) {
        console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
        console.log('Starting a new worker');
        cluster.fork();
        
    });


}else{
app.listen(4000)


}
 


