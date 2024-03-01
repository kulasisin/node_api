var http = require("http");
const { v4: uuidv4 } = require("uuid");
const errHandle = require("./errorHandle");
const todolist = [
  //   {
  //     title: "測試一",
  //     id: uuidv4(),
  //   },
  //   {
  //     title: "測試二",
  //     id: uuidv4(),
  //   },
];
const requestListner = (req, res) => {
  const headers = {
    "Access-Control-Allow-Headers":
      "Content-Type, Authorization, Content-Length, X-Requested-With",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "PATCH, POST, GET,OPTIONS,DELETE",
    "Content-Type": "application/json",
  };
  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });

  if (req.url == "/todolist" && req.method == "GET") {
    res.writeHead(200, headers);
    res.write(
      JSON.stringify({
        status: "success",
        data: todolist,
      })
    );
    res.end();
  } else if (req.url == "/todolist" && req.method == "POST") {
    req.on("end", () => {
      try {
        const title = JSON.parse(body).title;
        if (title != undefined) {
          const todo = { title: title, id: uuidv4() };
          todolist.push(todo);
          res.writeHead(200, headers);
          res.write(
            JSON.stringify({
              status: "success",
              data: todolist,
            })
          );
          res.end();
        } else {
          errHandle(res);
        }
      } catch (error) {
        errHandle(res);
      }
    });
  } else if (req.url == "/todolist" && req.method == "DELETE") {
    todolist.length = 0;
    res.writeHead(200, headers);
    res.write(
      JSON.stringify({
        status: "success",
        data: todolist,
      })
    );
    res.end();
  } else if (req.url.startsWith("/todolist/") && req.method == "DELETE") {
    const id = req.url.split("/").pop();
    const index = todolist.findIndex((element) => (element.id = id));
    console.log(id, index);
    if (index !== -1) {
      todolist.splice(index, 1);
      res.writeHead(200, headers);
      res.write(
        JSON.stringify({
          status: "success",
          data: todolist,
          messeage: "刪除成功",
        })
      );
      res.end();
    } else {
      errHandle(res);
    }
  } else if (req.url.startsWith("/todolist/") && req.method == "PATCH") {
    req.on("end", () => {
      try {
        const todo = JSON.parse(body).title;
        const id = req.url.split("/").pop();
        const index = todolist.findIndex((element) => element.id == id);
        if (todo != undefined && index !== -1) {
          todolist[index].title = todo;
          res.writeHead(200, headers);
          res.write(
            JSON.stringify({
              status: "success",
              data: todolist,
            })
          );
          res.end();
        } else {
          errHandle(res);
        }
      } catch (error) {
        errHandle(res);
      }
    });
  } else if (req.method == "OPTIONS") {
    res.writeHead(200, headers);
    res.end();
  } else {
    res.writeHead(404, headers);
    res.write(
      JSON.stringify({
        status: "fail",
        messeage: "無此網站路由",
      })
    );
    res.end();
  }
};
const server = http.createServer(requestListner);

server.listen(8080);
