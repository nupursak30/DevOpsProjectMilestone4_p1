var http      = require('http');
var httpProxy = require('http-proxy');
var request = require("request");
var Random = require('random-js');
var redis = require('redis')
const child_process = require('child_process');

var client = redis.createClient(6379, '127.0.0.1', {})
var nodes = ['http://slave1','http://slave2']

var TARGET = null;
rand = new Random(Random.engines.mt19937().seed(0));
var options = {};
var proxy   = httpProxy.createProxyServer(options);

http.createServer(function (req, res) {
        
        var result = child_process.execSync(`sudo ssh -o StrictHostKeyChecking=no -i aws-cb1-key.pem ubuntu@slave1 free -m | awk 'NR==2{printf $4;}'`).toString();
		console.log(result);
		if (result < 100) {
            console.log("processing request through Backup server");
            proxy.web( req, res, {target: nodes[1] } );  
          }
          else{
            console.log("processing request through Default server");
            proxy.web( req, res, {target: nodes[0] } );
          }
}).listen(9000);
