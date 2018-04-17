require("dotenv").config();
var request = require('request');
var token = process.env.GITHUB_TOKEN;
var fs = require('fs');

var owner = process.argv[2];
var repo = process.argv[3];

if (owner === null || repo === null) {
  console.log("please input both the onwer and repository");
} else {
  console.log('Welcome to the GitHub Avatar Downloader!');
  downloadAvatar();
};


function getRepoContributors(repoOwner, repoName, callBack) {
  var input = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {"User-Agent": "request",
              "Authorization": "token" + token.GITHUB_TOKEN
    }
  };
  request(input, function(error, response, body){
    callBack(error, body);
  });
};

function downloadImageByURL(url, filePath) {
  request.get(url)
        .on("error", function(error){
          console.log("error!")
        })
        .on("end", function(){
          console.log("Image downloaded!")
        })
        .pipe(fs.createWriteStream(filePath))
};

function downloadAvatar() {
  getRepoContributors(owner, repo, function(error, result) {
    if (error) {
      console.log(error);
    }
    else {
      var parsed = JSON.parse(result);
      var path = "./avatars"
      if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
      };
      parsed.forEach(function(person){
        downloadImageByURL(person.avatar_url, "./avatars/" + person.login + ".jpg")
      });
    };
  });
};
