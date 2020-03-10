exports.last = function(interval, done) {
  // load file here
  var fs = require('fs');
  fs.readFile( '/data/speeds.csv', function (err, data) {
    if (err) return done(err, null);
    // get the input stream of the file
    var lines = data.toString().split("\n");
    var res = [[],[],[],[]];
    var start = 0;
    for (i = start; i < lines.length; i++) {
      var line = lines[i];
      if(line && line.length > 0) {
        var items = line.split(';');
        if(items.length >= 4) {
          var times = items[0].toString().replace('  ', ' ').split(' ');
          var clock = times[3].split(':');
          res[0].push(times[2] + '-' + times[1] + '-' + times[4] + ' ' + (parseInt(clock[0]) + 1).toString() + ':' + clock[1] + ' [' + times[0] + ']');
          //Dev note: we do what we do below to the ping because if the script
          //times out for any reason, we will get 0 for up/download but the ping
          //will timeout and record 1800000 seconds, which screws stats and the graph
          res[1].push((items[1] > 2000) ? 0 : items[1]); //Ping
          res[2].push(items[2]); //Down
          res[3].push(items[3]); //Up
        }
      }
    }
    return done(null, res);
  });
};
