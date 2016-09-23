var restler = require('restler');

var ANSI_RESET = "\u001B[0m";
var ANSI_RED = "\u001B[31m";
var ANSI_GREEN = "\u001B[32m";

function check(jar, version, func_complete) {
  restler.get(
    "https://artifactory.octanner.net/api/storage/oct-libs-releases-local/com/octanner/batchapplications/"
    + jar + "/" + version
    + "/" + jar + "-" + version + "-jar-with-dependencies.jar",
    { headers : {"X-JFrog-Art-Api" : process.env.ARTIFACTORY_API_KEY}})
  .on('complete', func_complete);
}

function handler(result) {
  if (result['size'] < 1000000) {
    console.log(ANSI_RED + result['path'] + " IS SKINNY!!!!" + ANSI_RESET);
  }
  else {
    console.log(ANSI_GREEN + result['path'] + " is Fat" + ANSI_RESET);
  }
}


var version = process.argv[2]
var jars = ['awardimageprocessing', 'brochurejmsprocessing', 'recipientbrochureprocessing', 'sapupdate' ]

jars.forEach(function(jar)  {
  check(jar, version, handler);
});


