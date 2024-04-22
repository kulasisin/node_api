const headers = require("../headers");
const { successHandle } = require("../service/helpers");
const http = {
  cors(req, res) {
    successHandle({ res });
  },
  notFound(req, res) {
    res.writeHead(404, headers);
    res.write(
      JSON.stringify({
        status: false,
        message: "找不到路由",
      })
    );
    res.end();
  },
};
module.exports = http;