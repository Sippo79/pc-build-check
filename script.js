const form = document.querySelector(".diagnosis-form");
const resultArea = document.querySelector("#result-area");

let builds = [];

// JSON読み込み
async function loadBuilds() {
  const response = await fetch("builds.json");
  builds = await response.json();
}

loadBuilds();

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const budget = form.budget.value;
  const usage = form.usage.value;
  const resolution = form.resolution.value;

  if (!budget || !usage || !resolution) {
    resultArea.innerHTML = `
      <div class="result-card">
        <p>すべての項目を選択してください。</p>
      </div>
    `;
    return;
  }

  // 条件一致検索
  const result = builds.find((build) => {
    return (
      build.budget === budget &&
      build.usage === usage &&
      build.resolution === resolution
    );
  });

  // 見つからなかった場合
  if (!result) {
    resultArea.innerHTML = `
      <div class="result-card">
        <p class="result-label">Diagnosis Result</p>

        <h3>該当する構成がありません</h3>

        <p class="result-comment">
          条件に合う構成データを現在追加中です。
        </p>
      </div>
    `;

    return;
  }

  // 表示
  resultArea.innerHTML = `
    <div class="result-card">
      <p class="result-label">Diagnosis Result</p>

      <h3>${result.title}</h3>

      <ul class="result-specs">
        <li><span>CPU</span>${result.cpu}</li>
        <li><span>GPU</span>${result.gpu}</li>
        <li><span>RAM</span>${result.ram}</li>
        <li><span>Storage</span>${result.storage}</li>
      </ul>

      <p class="result-comment">
        ${result.comment}
      </p>
    </div>
  `;
});