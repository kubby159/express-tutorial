//express 불러오기와 기본셋팅
const express = require("express");
const app = express();

app.listen(8080, function () {
  console.log("Hello world");
});

/*작성 예시

1.누군가가 /pet 으로 방문하면
2.pet관련된 안내문을 띄워주자

*/

app.get("/pet", function (req, res) {
  res.send("here is Pet Zone");
});
