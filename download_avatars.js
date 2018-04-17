require("dotenv").config();
var request = require('request');
var token = process.env.GITHUB_TOKEN;
var fs = require('fs');

var owner = process.argv[2];
var repo = process.argv[3];

if (owner === null || repo === null) {
  console.log("Please input both the onwer and repository.");
} else if (!fs.existsSync("./.env")) {
  console.log("Please provide a valid .env file")
} else {
  console.log('Welcome to the GitHub Avatar Downloader!');
  downloadAvatar();
};

function getRepoContributors(repoOwner, repoName, callBack) {
  var input = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {"User-Agent": "request",
              "Authorization":"token " + token
    }
  };
  request(input, function(error, response, body){
    callBack(error, body);
    console.log(response);
  });
};

function downloadImageByURL(url, filePath) {
  request.get(url)
        .on("error", function(error){
          console.log("Error: " + error)
        })
        // .on("response", function(response){
        //   console.log(response)
        // })
        .on("end", function(){
          console.log("Image downloaded!")
        })
        .pipe(fs.createWriteStream(filePath))
};

function downloadAvatar() {
  getRepoContributors(owner, repo, function(error, result) {
    if (error) {
      console.log("Error:" + error);
    }
    else {
      var path = "./avatars"
      var parsed = JSON.parse(result);
      console.log(parsed)
    };
  });
};
