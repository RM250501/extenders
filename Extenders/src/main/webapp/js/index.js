// エンドポイント
const ws = new WebSocket("ws://localhost:8080/Extenders/chat");

$(function() {
	// ----- 要素の取得 -----
	const pElement = document.getElementById('result-text');
	const prompt_box = document.getElementById("prompt-box");
	const submitButton = $("#submit-button");
	const messageInput = $("#response-box");
	const gameBgm = document.getElementById('game-bgm');

	// ----- 初期化 -----
	pElement.textContent = "　";
	prompt_box.value = "　";

	// ----- BGMの自動再生処理 -----
	// URLに 'autoplay=true' が含まれているかチェック
	const urlParams = new URLSearchParams(window.location.search);
	if (urlParams.get('autoplay') === 'true') {
		if(gameBgm) {
			gameBgm.loop = true; // ループ再生を有効に
			gameBgm.volume = 0.4; // 音量は0.0から1.0の間で調整
			
			// play()はユーザー操作起因でないと失敗することがあるため、Promiseを処理
			const playPromise = gameBgm.play();
			if (playPromise !== undefined) {
				playPromise.then(_ => {
					// 自動再生が成功した場合の処理
					console.log("BGMの自動再生を開始しました。");
				}).catch(error => {
					// 自動再生が失敗した場合の処理
					console.error("BGMの自動再生に失敗しました:", error);
				});
			}
		}
	}

	// ----- イベントリスナー -----
	// 「ワードを送信」ボタンのクリック処理
	submitButton.click(function() {
		console.log("送信ボタンが押されました");
		sendMessage("pr" + messageInput.val());
		messageInput.val("");
		submitButton.prop('disabled', true);
		pElement.textContent = 'みんなの回答を待っています';
	});
});

// サーバからメッセージを受信したときの処理
ws.onmessage = function(event) {
	let pElement = document.getElementById('result-text');
	switch (event.data.substring(0, 2)) {
		case "tm":
			let prompt_box = document.getElementById("prompt-box");
			prompt_box.value = event.data.substring(2);
			break;
		case "gc":
			pElement = document.getElementById('result-text');
			pElement.textContent = "GAME CLEAR";
			window.location.href = "clear.html";
			break;
		case "go":
			pElement.textContent = "GAME OVER";
			window.location.href = "gameover.html";
			break;
		default:
	}
}

// サーバにメッセージを送るためのメソッド
function sendMessage(value) {
	setTimeout(function() {
		ws.send(value);
	}, 300);
}