var fs = require('fs');
var request = require("request");
var done = require("./bash")





var promptFunc = function() {
    process.stdout.write('prompt >');

    process.stdin.on('data', function(data) {
        var cmd = data.toString().trim();
       	cmd = cmd.split(" ")
       	//console.log(cmd)
        if (cmd[0] === "pwd") {
            done.done(process.cwd())
        } else if (cmd[0] === "date") {
            date = new Date();
            done.done(date.toDateString())
        } 
        else if (cmd[0] === 'ls'){
        	ls();
        } 
        else if (cmd[0] === 'echo') {
        	cmd.shift()
        	done.done(cmd.join(" "))
        }
        else if(cmd[0] === "cat") {
        	done.done(fs.readFileSync(cmd[1]).toString())
        }
        else if(cmd[0] === "head") {
        	var text = fs.readFileSync(cmd[2]).toString()
        	var lines = text.split("\n")
        	var string = ""
        	for (var i = 0; i < cmd[1]; i++)
        	{
        		string+= lines[i] + "\n"
        	}
        	done.done(string);
        }
        else if (cmd[0] === "tail") {
        	var text = fs.readFileSync(cmd[2]).toString()
        	var lines = text.split("\n")
        	lines = lines.slice(-cmd[1])
        	var string = ""
        	for (var i = 0; i < cmd[1]; i++)
        	{
        		string+= lines[i] + "\n"
        	}
        	done.done(string);
        }
        else if(cmd[0] === "sort"){
        	var text = fs.readFileSync(cmd[1]).toString().toLowerCase()
        	var lines = text.split("\n")
        	lines = lines.sort()
        	var string = ""
        	for (var i = 0; i < lines.length; i++)
        	{
        		string+= lines[i] + "\n"
        	}
        	done.done(string);
        } 
        else if(cmd[0] === "wc"){
        	var text = fs.readFileSync(cmd[1]).toString().toLowerCase()
        	var lines = text.split("\n")
        	done.done(lines.length.toString());
        }
        else if(cmd[0] === 'uniq'){
        	var text = fs.readFileSync(cmd[1]).toString().toLowerCase()
        	var lines = text.split("\n")
        	var string = ""
        	for (var i = 0; i < lines.length; i++) {
        		var current = lines[i];
        		if (current !== lines[i+1]){
        			string+= current + "\n"
        		}
        	}
        	done.done(string);
        }

        else if (cmd[0] === 'curl') {
        	curlFunc(cmd[1]);
        }
        else {
            done.done('You type: ' + cmd);
            done.done('\nprompt > ')
        }
    });
}

var ls = function() {
    var output = "";
    fs.readdir('.', function(err, files) {
      files.forEach(function(file) {
        output += file.toString() + "\n";
      })
      done.done(output);
    });
  }




var curlFunc = function(command) {
	request(command, function(error, response, body){
		if (!error && response.statusCode == 200){
			done.done(body)
		}
	});

	// process.stdout.write(req);
}



module.exports = {
    pwd: promptFunc,
    // commands: commands,
    ls: ls,
    curlFunc: curlFunc
}