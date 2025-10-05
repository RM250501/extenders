document.addEventListener('DOMContentLoaded', () => {
	const startButton = document.getElementById('startButton');

	startButton.addEventListener('click', () => {
		console.log('ゲーム開始！');
		// 次の画面に自動再生を指示するパラメータを付けて遷移
		window.location.href = 'index.html?autoplay=true';
	});
});