//express 불러오기와 기본셋팅
const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(8080, function () {
  console.log("Hello world");
});

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

/*
REST API
웹 개발 시 API 란?
웹서버와 고객간의 소통 방법 ( 서버와 통신하는 방법 )

1. Uniform interface
- 하나의 자료는 하나의 URL
2. Client-Server 역할 구분
- 브라우저는 요청만, 서버는 응답만
3. Stateless
- 요청 1과 요청 2는 의존성이 없어야 한다.
4. Cacheable
- 서버에서 보내주는 정보들은 캐싱이 가능해야한다.(브라우저가 알아서 해줌)

*/
