//express 불러오기와 기본셋팅
const express = require("express");
const app = express();

app.listen(8080, function () {
  console.log("Hello world");
});

app.get("/pet", function (request, response) {
  response.send("펫용품 쇼핑할 수 있는 사이트입니다.");
});
