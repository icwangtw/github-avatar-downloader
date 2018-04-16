var request = require('request');
var token = require("./secrets.js")

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, callBack) {
  var input = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {"User-Agent": "request",
              "Authorization": "token" + token.GITHUB_TOKEN
    }
  };
  request(input, function(error, response, body) {
    callBack(error, body);
  });
}


getRepoContributors("jquery", "jquery", function(error, result) {
  if (error) {
    console.log(error)
  }
  else {
    var parsed = JSON.parse(result)
    parsed.forEach(function(i){
      console.log(i.avatar_url)
    })
  }
});