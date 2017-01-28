var express = require('express');
var path = require('path');
var fs = require('fs');
var fileUpload = require('express-fileupload');


var app = express();
app.use(fileUpload());




app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.post('/upload', function(req, res){
	console.log(req.files);
	var file = req.files.displayImage;
	file.mv(path.join(__dirname, 'uploads/file1.c'), function(err) {
    if (err) {
      res.status(500).send(err);
    }
    else {
    	console.log('uploaded successfully '+file.name);

    	var stats = fs.statSync(path.join(__dirname, 'uploads/file1.c'));
 	 var fileSizeInBytes = stats["size"];
 	 console.log(stats);
	res.send({
		size : fileSizeInBytes
	});
      // res.send('File uploaded!');
    }
  });

});

app.get('/', function(req, res){
	res.render('index');
});

var port = process.env.PORT || 3000;
app.listen(port, function(){
	console.log('Server listening on port : '+port);
});







