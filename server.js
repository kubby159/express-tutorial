//express 불러오기와 기본셋팅
const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

let db;
const MongoClient = require("mongodb").MongoClient;
app.set("view engine", "ejs");

//서버에게 static 파일을 보관하기 위해 public 폴더를 쓴다고 말해주는 것
app.use("/public", express.static("public"));

MongoClient.connect(
  "mongodb+srv://admin:qwer1234@cluster0.5bxyw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  (error, client) => {
    //디비 접속되면 할 일
    if (error) {
      return console.log(error);
    }

    //todoapp 이라는 db로 연결
    db = client.db("todoapp");

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

//데이터 list
//서버에서 ejs 파일로 보내는 법
app.get("/list", (request, response) => {
  db.collection("post")
    .find()
    .toArray((error, result) => response.render("list.ejs", { posts: result }));
});

app.post("/add", function (요청, 응답) {
  응답.send("전송완료");
  db.collection("counter").findOne({ name: "게시물갯수" }, (error, result) => {
    //1. counter collection에서  게시물 개수를 가지고 오면
    let totalPosts = result.totalPost;
    //2. 게시물 개수를  post collection 디비에 저장한다.
    db.collection("post").insertOne(
      { _id: totalPosts + 1, 제목: 요청.body.title, 날짜: 요청.body.detail },
      () => {
        db.collection("counter").updateOne(
          { name: "게시물갯수" },
          { $inc: { totalPost: 1 } },
          (error, result) => {
            console.log("수정완료");
          }
        );
      }
    );
  });
});

app.delete("/delete", (request, response) => {
  //요청 시 보낸 데이터를 찾기 위해서 request.body 이용
  console.log(request.body);
  request.body._id = parseInt(request.body._id);
  db.collection("post").deleteOne(request.body, (error, result) => {
    console.log("삭제완료");
    //응답코드 200을 보내주세요.

    response.status(200).send({ message: "성공했어요" });
  });
});

app.get("/detail/:id", (request, response) => {
  db.collection("post").findOne(
    { _id: parseInt(request.params.id) },
    (error, result) => {
      console.log(result);
      response.render("detail.ejs", { data: result });
    }
  );
});
