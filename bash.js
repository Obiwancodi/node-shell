var command = require("./commands");


var userCommand = 'pwd';

var ls = 'ls';

var done = function(output) {
	process.stdout.write(output)
	process.stdout.write("prompt >")
}


command[userCommand]();

module.exports.done = done