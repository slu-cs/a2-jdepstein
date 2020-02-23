const fs = require('fs');
const readline = require('readline');
const mongoose = require('mongoose');
const connect = require('./db');
const Voter = require('./schema');

connect(); // To the database

const file = readline.createInterface({
  input: fs.createReadStream('voters.csv')

});

const votes = [];
file.on('line', function(line) {
  const columns = line.split(',');
  votes.push(
        new Voter({
          first: columns[0],
          last: columns[1],
          zip: columns[2],
          history: columns[3]
    })
  );
});



file.on('close', function() {
mongoose.connection.dropDatabase()
    .then(() => Promise.all(votes.map(d => d.save())))
    .then(() => mongoose.connection.close())
    .then(() => console.log('Database is ready.'))
    .catch(error => console.log(error.stack));

  });
