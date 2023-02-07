var restler = require('restler');

var ANSI_RESET = "\u001B[0m";
var ANSI_RED = "\u001B[31m";
var ANSI_GREEN = "\u001B[32m";

function check1(jar, version, func_complete) {
  restler.get(
    "https://artifactory.octanner.net/api/storage/oct-libs-releases-local/com/octanner/batchapplications/"
    + jar + "/" + version
    + "/" + jar + "-" + version + "-jar-with-dependencies.jar",
    { headers : {"X-JFrog-Art-Api" : process.env.ARTIFACTORY_API_KEY}})
  .on('complete', func_complete);
}

function check(jar, version, func_complete) {
  var auth = new Buffer(process.env.OCT_VAULT_SHARED_READ_ARTIFACTORY_USERNAME + ':' + process.env.OCT_VAULT_SHARED_READ_ARTIFACTORY_PASSWORD).toString('base64')
  restler.get(
    "https://artifactory.octanner.net/api/storage/oct-libs-releases-local/com/octanner/batchapplications/"
    + jar + "/" + version
    + "/" + jar + "-" + version + "-jar-with-dependencies.jar",
    { headers : {"Authorization" : "Basic " + auth}})
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
var jars = ['awardimageprocessing', 'brochurejmsprocessing', 'recipientbrochureprocessing', 'sapupdate', 'cpq-comparison-report' ]

jars.forEach(function(jar)  {
  check1(jar, version, handler);
});


