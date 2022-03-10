//express 불러오기와 기본셋팅
const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

let db;
const MongoClient = require("mongodb").MongoClient;
MongoClient.connect(
  "mongodb+srv://admin:qwer1234@cluster0.5bxyw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  (error, client) => {
    //디비 접속되면 할 일
    if (error) {
      return console.log(error);
    }

    //todoapp 이라는 db로 연결
    // db = client.db("todoapp");

    //post 라는 파일(collection) 에 insertOne 한다. 저장할 데이터에는 Object 자료형이 들어간다.
    // db.collection('post').insertOne('저장할 데이터',(error,result)=>{
    //   console.log('저장완료')
    // });

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
  MongoClient.connect(
    "mongodb+srv://admin:qwer1234@cluster0.5bxyw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    (error, client) => {
      db = client.db("todoapp");
      db.collection("post").insertOne(
        { title: request.body.title, detail: request.body.detail },
        (error, result) => {
          console.log(error);
          console.log(result);
        }
      );
    }
  );
});
