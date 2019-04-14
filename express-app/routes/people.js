var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'), //mongo connection
  bodyParser = require('body-parser'), //parses information from POST
  methodOverride = require('method-override'); //used to manipulate POST

router.use(bodyParser.urlencoded({ extended: true }))
router.use(methodOverride(function(req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}))

//build the REST operations at the base for people
router.route('/')
  //GET all people
  .get(function(req, res, next) {
      //retrieve all people from Monogo
    mongoose.model('Person').find({}, function (err, people) {
      if (err) {
          return console.error(err);
      } else {
          //respond to both HTML and JSON. JSON responses require 'Accept: application/json;' in the Request Header
          res.format({
            //HTML response will render the index.pug file in the views/people folder. We are also setting "people"
            //to be an accessible variable in our pug view
            html: function(){
              res.render('people/index', {
                'title': 'List of People',
                'people' : people
              });
            },
            //JSON response will show all people in JSON format
            json: function(){
              res.json(people);
            }
        });
      }
      });
  })
  //POST a new person
  .post(function(req, res) {
    // Get values from POST request. These can be done through forms or REST calls.
    //These rely on the "name" attributes for forms
    var name = req.body.name;
    var age = req.body.age;
    var dob = req.body.dob;
    var isloved = req.body.isloved;

    if (isloved !== true && isloved === 'on') isloved = true;

    //call the create function for our database
    mongoose.model('Person').create({
      name : name,
      age : age,
      dob : dob,
      isloved : isloved
    }, function (err, person) {
        if (err) {
            res.send('There was a problem adding the information to the database. ' + err);
        } else {
            //Person has been created
            console.log('POST creating new Person: ' + person);
            res.format({
                //HTML response will set the location and redirect back to the home page.
                //You could also create a 'success' page if that's your thing
              html: function(){
                  // If it worked, set the header so the address bar doesn't still say /adduser
                  res.location('people');
                  // And forward to success page
                  res.redirect("/people");
              },
              //JSON response will show the newly created person
              json: function(){
                  res.json(person);
              }
          });
        }
      })
    });

/* GET New Person page. */
router.get('/new', function(req, res) {
  res.render('people/new', { title: 'Add New Person' });
});

// route middleware to validate :id
router.param('id', function(req, res, next, id) {
  //console.log('validating ' + id + ' exists');
  //find the ID in the Database
  mongoose.model('Person').findById(id, function (err, person) {
    //if it isn't found, we are going to repond with 404
    if (err) {
        console.log(id + ' was not found');
        res.status(404)
        var err = new Error('Not Found');
        err.status = 404;
        res.format({
          html: function(){
            next(err);
          },
          json: function(){
            res.json({message : err.status  + ' ' + err});
          }
        });
    //if it is found we continue on
    } else {
        // JSON document response for every GET/PUT/DELETE call
        //console.log(person);
        // once validation is done save the new item in the req
        req.id = id;
        // go to the next thing
        next();
    }
  });
});

router.route('/:id')
  .get(function(req, res) {
    mongoose.model('Person').findById(req.id, function (err, person) {
      if (err) {
        console.log('GET Error: There was a problem retrieving: ' + err);
      } else {
        console.log('GET Retrieving ID: ' + person._id);
        var personDob = person.dob.toISOString();
        personDob = personDob.substring(0, personDob.indexOf('T'))
        res.format({
          html: function(){
              res.render('people/show', {
                "personDob" : personDob,
                "person" : person
              });
          },
          json: function(){
              res.json(person);
          }
        });
      }
    });
  });

router.route('/:id/edit')
	//GET the individual person by Mongo ID
	.get(function(req, res) {
	    //search for the person within Mongo
	    mongoose.model('Person').findById(req.id, function (err, person) {
	        if (err) {
	            console.log('GET Error: There was a problem retrieving: ' + err);
	        } else {
	            //Return the person
	            console.log('GET Retrieving ID: ' + person._id);
              var personDob = person.dob.toISOString();
              personDob = personDob.substring(0, personDob.indexOf('T'))
	            res.format({
	                //HTML response will render the 'edit.pug' template
	                html: function(){
	                       res.render('people/edit', {
	                          title: 'Person' + person._id,
                            'personDob' : personDob,
	                          'person' : person
	                      });
	                 },
	                 //JSON response will return the JSON output
	                json: function(){
	                  res.json(person);
	                }
	            });
	        }
	    });
	})
	//PUT to update a person by ID
	.put(function(req, res) {
	    // Get our REST or form values. These rely on the "name" attributes
	    var name = req.body.name;
	    var age = req.body.age;
	    var dob = req.body.dob;
	    var isloved = req.body.isloved;

      if (isloved !== true && isloved === 'on') isloved = true;

	    //find the document by ID
	    mongoose.model('Person').findById(req.id, function (err, person) {
	        //update it
	        person.update({
            name : name,
            age : age,
            dob : dob,
            isloved : isloved
	        }, function (err, personID) {
	          if (err) {
	              res.send("There was a problem updating the information to the database: " + err);
	          }
	          else {
              //HTML responds by going back to the page or you can be fancy and create a new view that shows a success page.
              res.format({
                 html: function(){
                   res.redirect("/people/" + person._id);
                 },
                 //JSON responds showing the updated values
                 json: function(){
                   res.json(person);
                 }
              });
           }
        })
     });
	})
	//DELETE a person by ID
	.delete(function (req, res){
	    //find person by ID
	    mongoose.model('Person').findById(req.id, function (err, person) {
	        if (err) {
	            return console.error(err);
	        } else {
	            //remove it from Mongo
	            person.remove(function (err, person) {
	                if (err) {
	                    return console.error(err);
	                } else {
	                    //Returning success messages saying it was deleted
	                    console.log('DELETE removing ID: ' + person._id);
	                    res.format({
	                        //HTML returns us back to the main page, or you can create a success page
	                          html: function(){
                               res.redirect("/people");
	                         },
	                         //JSON returns the item with the message that is has been deleted
	                        json: function(){
                             res.json({message : 'deleted',
                                 item : person
                             });
	                         }
	                      });
	                }
	            });
	        }
	    });
	});

module.exports = router;
