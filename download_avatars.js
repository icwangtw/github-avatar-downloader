var request = require('request');
var token = require("./secrets.js")

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, callBack) {
  var input = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {"User-Agent": "request",
              "Authorization": token.GITHUB_TOKEN
    }
  };
  request(input, function(error, response, body) {
    callBack(error, body);
  });
}

getRepoContributors("jquery", "jquery", function(error, result) {
  console.log("Errors:", error);
  console.log("Result:", result);
});