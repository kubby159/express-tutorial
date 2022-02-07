//express 불러오기와 기본셋팅
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.listen(8080, function () {
  console.log("Hello world");
});

/*작성 예시

1.누군가가 /pet 으로 방문하면
2.pet관련된 안내문을 띄워주자

*/
// GET
app.get("/pet", function (req, res) {
  res.send("here is Pet Zone");
});

app.get("/beauty", function (req, res) {
  res.send("뷰티용품 사세요!");
});

app.get("/", function (req, res) {
  //해당 파일을 보내줌.
  res.sendFile(__dirname + "/index.html");
});

app.get("/write", function (req, res) {
  res.sendFile(__dirname + "/write.html");
});

// POST
//add.post('경로', 콜백함수)

app.post("/add", function (req, res) {
  //res.send로 보내면 req에 저장됨.
  res.send("전송완료");
  console.log(req.body);
});
