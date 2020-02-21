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
  Voter.find().where('zip').equals('13617').count(),

  Voter.find().where('first').equals('STARR'),

  Voter.find().where('history').in('GE16').count(),

  Voter.find().sort('-last').where('zip').equals('13617').limit(1),

  Voter.distinct('zip')



];

Promise.all(queries)
  .then(function(results) {
    console.log('Registered voters: ', results[0]);
    console.log('Voters with name STARR: ', results[1].map(v => (v.first + " " + v.last)));
    console.log('2016 general election Voters: ', results[2]);
    console.log('last-name that comes last in the county in alphabetical order:', results[3].map(v => v.last));
    console.log('Distinct zip codes: ', size(results[4]));
    mongoose.connection.close();
  }).catch(error => console.error(error.stack));
