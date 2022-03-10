//express 불러오기와 기본셋팅
const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

const MongoClient = require("mongodb").MongoClient;
MongoClient.connect(
  "mongodb+srv://admin:qwer1234@cluster0.5bxyw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  (error, client) => {
    app.listen(8080, function () {
      console.log("디비접속성공");
    });
  }
);

//get('경로', 화면을 띄운 후 실행할 함수.)
app.get("/pet", function (request, response) {
  response.send("펫용품 쇼핑할 수 있는 사이트입니다.");
});

app.get("/beauty", function (request, response) {
  response.send("뷰티용품 쇼핑 페이지임");
});

//html 파일을 보내는 방법.
app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.get("/write", function (request, response) {
  response.sendFile(__dirname + "/write.html");
});

app.post("/add", (request, response) => {
  response.send("전송완료");
  console.log(request.body.detail);
  console.log(request.body.title);
});
