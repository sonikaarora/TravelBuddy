
/*
 * GET users listing.
 */
//var mongoURL = "mongodb://localhost:27017/waterqualitydb";
var mongoURL = "mongodb://admin:admin@ds015403.mlab.com:15403/travelbuddy";
var mongo = require("./mongo");

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.userLogin = function(req,res){
	var emailaddress = req.param("emailaddress");
	var firstname = req.param("firstname");
	var lastname = req.param("lastname");;
	var password = req.param("password");
	var phone = req.param("phone");
	console.log(password +" is the object");
	var json_responses;
	
	
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('login');

		coll.insert({emailaddress: emailaddress, firstname:firstname,lastname:lastname, password:password, phone:phone}, function(err, result){
			if (result) {
				console.log("inserted successfully....");
				json_responses = {"statusCode" : 200,"emailaddress":emailaddress,"firstname":firstname };
				res.send(json_responses);
			} else {
				console.log("returned false");
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
				
			}
		});
	});
	};
	
exports.saveBlogs = function(req,res){
	var emailaddress = req.param("emailaddress");
	var name = req.param("blogsName");
	var content = req.param("content");
	var date = new Date();
	console.log("blogsName..........",name);
	
	var json_responses;
	
	
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('blogs');

		coll.insert({emailaddress: emailaddress, blogsName:name,content:content, date:date}, function(err, result){
			if (result) {
				console.log("inserted successfully....");
				json_responses = {"statusCode" : 200,"emailaddress":emailaddress,"blogsName":name,"date":date };
				res.send(json_responses);
			} else {
				console.log("returned false");
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
				
			}
		});
	});
};

exports.getBlogs = function(req,res){
	var json_responses;
	mongo.connect(mongoURL, function(){
	console.log('Connected to mongo at: ' + mongoURL);
	var coll = mongo.collection('blogs');
	var emailaddress = req.param("emailaddress");
	console.log("email address............",emailaddress);
	coll.find({emailaddress:emailaddress}).toArray(function (err, result) {
	      if (err) {
	        console.log(err);
	      } else if (result.length) {
	        console.log('Found:', result);
	        json_responses = {"statusCode" : 200,"blogs":result};
			res.send(json_responses);
	      } else {
	        console.log('No document(s) found with defined "find" criteria!');
	      }
	      //Close connection
	   //   db.close();
	    });
	});
	
};
	
exports.getUser = function(req,res){
	var json_responses;
	mongo.connect(mongoURL, function(){
	console.log('Connected to mongo at: ' + mongoURL);
	var coll = mongo.collection('login');
	var emailaddress = req.param("emailaddress");
	console.log("email address............",emailaddress);
	coll.find({emailaddress:emailaddress}).toArray(function (err, result) {
	      if (err) {
	        console.log(err);
	      } else if (result.length) {
	        console.log('Found:', result);
	        json_responses = {"statusCode" : 200,"profile":result};
			res.send(json_responses);
	      } else {
	        console.log('No document(s) found with defined "find" criteria!');
	      }
	      //Close connection
	   //   db.close();
	    });
	});
};

exports.userInterest = function(req,res)
{

	var firstname = req.param("firstname");
	var lastname = req.param("lastname");
	var phone = req.param("phone");
	var emailaddress = req.param("emailaddress");
	var city = req.param("city");
	var activity = req.param("activity");;
	var budget = req.param("budget");
	var json_responses;
	
	
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('interest');
		
		coll.remove({"emailaddress" : emailaddress}, function(err, result) {
	          if (err) {
	              console.log(err);
	          }
	          console.log(result);
	          coll.insert({firstname: firstname, lastname: lastname,phone:phone, emailaddress: emailaddress, city:city,activity:activity, budget:budget}, function(err, result){
	  			if (result) {
	  				console.log("inserted successfully....");
	  				json_responses = {"statusCode" : 200,"interest":result};
	  				res.send(json_responses);
	  			} else {
	  				console.log("returned false");
	  				json_responses = {"statusCode" : 401};
	  				res.send(json_responses);
	  				
	  			}
	  		});
	      });
		
		

		
	});
	
};

exports.userersWithSameInterest = function(req,res)
{
	console.log("inside userersWithSameInterest...........");

	var json_responses;
	var city = req.param("city");
	var activity = req.param("activity");;
	var budget = req.param("budget");

	var resultArray = [];
	for(var i = 0; i< city.length;i++)
		{
		var citiName = city[i];
		var activityName = activity[i];
		var budgetName = budget[i];
		
	mongo.connect(mongoURL, function(){
	console.log('Connected to mongo at: ' + mongoURL);
	var coll = mongo.collection('interest');

	//coll.find({city:citiName,activity:activityName, budget:budgetName}).toArray(function (err, result) {
	coll.find({city:{value: citiName},activity:{value: activityName}, budget:budgetName}).toArray(function (err, result) {
	      if (err) {
	        console.log(err);
	      } else if (result.length) {
	        console.log('Found users...:', result);
	        json_responses = {"statusCode" : 200,"interest":result};
				res.send(json_responses);
	        	
	      
	      
	      } else {
	        console.log('No document(s) found with defined "find" criteria!');
	      }
	    
	    });
	});
		}
	
};

exports.getUserInterest = function(req,res)
{
	var json_responses;
	mongo.connect(mongoURL, function(){
	console.log('Connected to mongo at: ' + mongoURL);
	var emailaddress = req.param("emailaddress");
	var coll = mongo.collection('interest');
	coll.find({emailaddress:emailaddress}).toArray(function (err, result) {
	      if (err) {
	        console.log(err);
	      } else if (result.length) {
	        console.log('Found:', result);
	        json_responses = {"statusCode" : 200,"interest":result};
			res.send(json_responses);
	      } else {
	        console.log('No document(s) found with defined "find" criteria!');
	      }
	      //Close connection
	   //   db.close();
	    });
	});


};

exports.updateUser = function(req,res)
{
	var id = req.param("id");
	var email = req.param("emailaddress");
	var name = req.param("firstname");
	var last = req.param("lastname");
	var ph = req.param("phone");
	var ObjectId = require('mongodb').ObjectID;
	var json_responses;
	mongo.connect(mongoURL, function(){
		var coll = mongo.collection('login');

		coll.update({_id:ObjectId(id)},{$set:{emailaddress:email,firstname:name,lastname:last,phone:ph}}, function(err, result){
			if (result) {
				console.log("inserted successfully....");
				json_responses = {"statusCode" : 200};
				res.send(json_responses);
			} else {
				console.log("returned false");
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
				
			}
		});
	});
	
	
}

exports.getBlogs = function(req,res){
	var json_responses;
	var email = req.param("emailaddress");
	mongo.connect(mongoURL, function(){
	console.log('Connected to mongo at: ' + mongoURL);
	var coll = mongo.collection('blogs');
	
	coll.find({emailaddress:email}).toArray(function (err, result) {
	      if (err) {
	        console.log(err);
	      } else if (result.length) {
	        console.log('Found:', result);
	        json_responses = {"statusCode" : 200,"blogs":result};
			res.send(json_responses);
	      } else {
	        console.log('No document(s) found with defined "find" criteria!');
	      }
	      //Close connection
	   //   db.close();
	    });
	});
	
};

	