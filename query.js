const mongoose = require('mongoose');
const connect = require('./db');
const Voter = require('./schema');

connect(); // To the database


const queries = [

  //1)
  Voter.find().where('zip').equals('13617'),

  //2)
  Voter.find().where('first').equals('STARR'),

  //3)
  Voter.find().where('history').in('GE16').countDocuments(),

  //4)
  Voter.find().sort('-last').limit(1),

  //5)
  Voter.distinct('zip')

];

//Promise all the Queries
Promise.all(queries)
  .then(function(results) {
    console.log('Number of registered voters in Canton: ', results[0].length);
    console.log('Voters with name the first name STARR: ', results[1].map(v => (v.first + " " + v.last)));
    console.log('Number of 2016 general election Voters: ', results[2]);
    console.log('last-name that comes last in the county in alphabetical order:', results[3].map(v => v.last));
    console.log('Number of Distinct zip codes: ', results[4].length);
    mongoose.connection.close();
  }).catch(error => console.error(error.stack));
