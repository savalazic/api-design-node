// var action = function(cb) {
//   setTimeout(function() {
//     cb('hey')
//   }, 5000)
// }

// action(function(arg) {
//   console.log(arg)
// })

// var action = function () {
//   return new Promise(function (resolve, reject) {
//     setTimeout(function () {
//       resolve('hey');
//       reject(new Error('nooooo'));
//     }, 2000);
//   });
// }

// var promise = action();

// promise
//   .then(function (word) {
//     console.log(word);
//   })
//   .catch(function (err) {
//     console.log(err);
//   });


var fs = require('fs');

var readFile = function() {
  return new Promise(function(resolve, reject) {
    fs.readFile('./package.json', function (err, file) {
      return err ? reject(err) : resolve(file.toString());
    });
  });
}

readFile()
  .then(function(file) {
    console.log(file)
  })
  .catch(function(err) {
    console.log(err);
  });

// nested promises
readFile()
  .then(function(file) {
    return 'hey';
  })
  .then(function(word) {
    console.log(word);
  });

// real world example
readFile()
  .then(logFile, function(err) {
    console.log(err);
  })
  .then(sendEmail)
  .then(callHome)
  .catch(function(err) {
    console.log(err);
  });

