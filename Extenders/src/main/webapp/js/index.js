// エンドポイント
const ws = new WebSocket("wss://74.220.48.1:8080/Extenders/chat");

$(function () {
  const pElement = document.getElementById("result-text");
  pElement.textContent = "　";
  let prompt_box = document.getElementById("prompt-box");
  prompt_box.value = "　";

  $("#submit-button").click(function () {
    console.log("送信ボタンが押されました");
    let messageInput = document.getElementById("response-box");
    sendMessage("pr" + messageInput.value);
    messageInput.value = "";
    document.getElementById("submit-button").disabled = true;
    const pElement = document.getElementById("result-text");
    pElement.textContent = "みんなの回答を待っています";
  });
});

// サーバからメッセージを受信したときの処理
ws.onmessage = function (event) {
  let pElement = document.getElementById("result-text");

  switch (event.data.substring(0, 2)) {
    case "tm":
      let prompt_box = document.getElementById("prompt-box");
      prompt_box.value = event.data.substring(2);
      break;
    case "gc":
      pElement = document.getElementById("result-text");
      pElement.textContent = "GAME CLEAR";
      window.location.href = "clear.html";
      break;
    case "go":
      pElement.textContent = "GAME OVER";
      window.location.href = "gameover.html";
      break;
    default:
  }
};

// サーバにメッセージを送るためのメソッド
function sendMessage(value) {
  setTimeout(function () {
    ws.send(value);
  }, 300);
}
