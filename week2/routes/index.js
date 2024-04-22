const Post = require("../models/post");
const headers = require("../headers");
const httpControllers = require("../controllers/http");
const postsControllers = require("../controllers/posts");
const routes = async (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });

  if (req.url == "/posts" && req.method == "GET") {
    postsControllers.getPosts(req, res);
  } else if (req.url == "/posts" && req.method == "POST") {
    req.on("end", () => postsControllers.createPosts({ body, req, res }));
  } else if (req.url == "/posts" && req.method == "DELETE") {
    postsControllers.deletePosts(req, res);
  } else if (req.url.startsWith("/posts/") && req.method == "DELETE") {
    postsControllers.deletePost(req, res);
  } else if (req.url.startsWith("/posts/") && req.method == "PATCH") {
    req.on("end", () => postsControllers.patchPost({ body, req, res }));
  } else if (req.method == "OPTIONS") {
    httpControllers.cors(req, res);
  } else {
    httpControllers.notFound(req, res);
  }
};

module.exports = routes;
