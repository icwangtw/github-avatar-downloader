var request = require('request');
var token = require("./secrets.js")
var fs = require('fs');

var owner = process.argv[2]
var repo = process.argv[3]
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

function downloadImageByURL(url, filePath) {
  request.get(url)
        .on("error", function(error){
          console.log("error!")
        })
        .on("response", function(response){
          console.log("Response Status Code: ", response.statusCode);
        })
        .on("data", function(){
          console.log("Image downloading...")
        })
        .on("end", function(){
          console.log("Image downloaded!")
        })
        .pipe(fs.createWriteStream(filePath))
}

getRepoContributors(owner, repo, function(error, result) {
  if (error) {
    console.log(error)
  }
  else {
    var parsed = JSON.parse(result)
    fs.mkdir("./avatars")
    parsed.forEach(function(i){
      downloadImageByURL(i.avatar_url, "./avatars/" + i.login + ".jpg")
    })
  }
});
