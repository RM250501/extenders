document.addEventListener('DOMContentLoaded', () => {
    // --- 要素の取得 ---
    const gameOverBGM = document.getElementById('gameOverBGM');
    const buttonClickSFX = document.getElementById('buttonClickSFX');
    const retryButton = document.querySelector('.retry-button');
    const titleButton = document.querySelector('.title-button');
    const resultsOverlay = document.getElementById('results-overlay');
    const showResultsButton = document.getElementById('showResultsButton');

    // --- 「結果を見る」ボタンの処理 ---
    showResultsButton.addEventListener('click', () => {
        // BGMを再生
        gameOverBGM.volume = 0.6;
        gameOverBGM.loop = false;
        gameOverBGM.play().catch(error => {
            console.log("BGMの再生に失敗しました:", error);
        });

        // 効果音を再生
        buttonClickSFX.currentTime = 0;
        buttonClickSFX.volume = 0.8;
        buttonClickSFX.play();

        // 結果オーバーレイを非表示にする
        resultsOverlay.style.display = 'none';
    }, { once: true }); // このイベントは一度だけ実行

    // --- ゲームオーバー画面のボタン処理 ---
    const handleButtonClick = (redirectUrl) => {
        buttonClickSFX.currentTime = 0;
        buttonClickSFX.volume = 0.8;
        buttonClickSFX.play();
        // 効果音が鳴り終わるのを待ってからページ遷移
        setTimeout(() => {
            window.location.href = redirectUrl;
        }, 300);
    };

    retryButton.addEventListener('click', (e) => {
        e.preventDefault(); // デフォルトのonclickを一旦無効化
        handleButtonClick('index.html');
    });

    titleButton.addEventListener('click', (e) => {
        e.preventDefault(); // デフォルトのonclickを一旦無効化
        handleButtonClick('title.html');
    });
});