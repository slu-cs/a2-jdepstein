const mongoose = require('mongoose');
const connect = require('./db');
const Voter = require('./schema');

connect(); // To the database

/*// What documents are in the collection?
const query = Professor.find();
query.exec(function(error, professors) {
  if (error) console.error(error.stack);
  console.log(professors);
});*/

const queries = [
  Voter.count()

  //Voter.find().where('first').equals('STARR'),

  //Voter.find().where('history').in('GE16'),

  //Voter.find().distnct('zip').count(),

  //Voter.sort('last').find().where('zip').equals(13617).last()

]

Promise.all(queries)
  .then(function(results) {
    console.log('Registered voters: ', results[0]);
    //console.log('Voters with name STARR: ', results[1]);
    //console.log(' 2016 general election Voters: ', results[2]);
    //console.log('last-name that comes last in the county: ', results[3]);
    //console.log('Distinct zip codes: ', results[4]);
    mongoose.connection.close();
  }).catch(error => console.error(error.stack));
