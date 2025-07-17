document.addEventListener("DOMContentLoaded", () => {
  const kotobaEl = document.getElementById("kotoba");
  const openBtn = document.getElementById("openBox");
  const messageEl = document.getElementById("message");
  const tweetBtn = document.getElementById("tweetBtn"); // ← ツイートボタン取得

  // チェック用: 今日の日付
  const today = new Date().toISOString().split("T")[0];
  const opened = localStorage.getItem("kotoba_opened");

  if (opened === today) {
    kotobaEl.textContent = "もう今日のことばは閉じられました。";
    openBtn.style.display = "none";
    if (tweetBtn) tweetBtn.style.display = "none"; // ← ボタンも非表示に
  }

  openBtn.addEventListener("click", () => {
    fetch("kotoba.json")
      .then((res) => res.json())
      .then((data) => {
        const randomIndex = Math.floor(Math.random() * data.length);
        const kotoba = data[randomIndex];
        kotobaEl.textContent = kotoba;
        localStorage.setItem("kotoba_opened", today);
        openBtn.style.display = "none";
        messageEl.textContent = "また明日、秘密のことばをどうぞ。";

        // 🐦 ツイートリンクを設定
        if (tweetBtn) {
          const tweetText = encodeURIComponent(`今日の秘密のことばは「${kotoba}」`);
          const tweetUrl = encodeURIComponent("https://humandoll26.github.io/kotobabako/"); // 
          const tweetHashtags = "秘密のことば箱";

          tweetBtn.href = `https://twitter.com/intent/tweet?text=${tweetText}&url=${tweetUrl}&hashtags=${tweetHashtags}`;
          tweetBtn.style.display = "inline-block";
        }
      })
      .catch((err) => {
        kotobaEl.textContent = "ことばを開けませんでした。";
        if (tweetBtn) tweetBtn.style.display = "none";
      });
  });
});
