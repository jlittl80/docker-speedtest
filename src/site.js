var db = require('./models')

exports.index = function(req, res) {
  db.measures.last(100, function(err, speeds){
    if(err) res.render('error', {msg: err})
    return res.render('layout', {data: speeds})
  });
};
