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
  Voter.count(),

  Voter.find().where('first').equals('STARR'),

  Voter.find().where('history').in('GE16').count(),

  Voter.distinct('zip').length,

  Voter.find().sort('-last').where('zip').equals(13617).limit(1)

]

Promise.all(queries)
  .then(function(results) {
    console.log('Registered voters: ', results[0]);
    console.log('Voters with name STARR: ', results[1].map(p => p.first, p.last));
    console.log(' 2016 general election Voters: ', results[2]);
    console.log('Distinct zip codes: ', results[3]);
    console.log('Last something: ', results[4].map(p => p.last));
    mongoose.connection.close();
  }).catch(error => console.error(error.stack));
