var db = require('./models')

exports.index = function(req, res) {
  db.measures.last(100, function(err, speeds){
    return res.render('layout', {data: speeds, msg: err})
  });
};
