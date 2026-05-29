const form = document.querySelector(".diagnosis-form");
const resultArea = document.querySelector("#result-area");
const affiliateSection = document.querySelector("#affiliate-section");
const popularJumpSection = document.querySelector("#popular-jump-section");
const popularJumpButton = document.querySelector("#popular-jump-button");
const popularBuildsSection = document.querySelector("#popular-builds");
const affiliateButtons = {
  bto: document.querySelector("#affiliate-bto"),
  amazon: document.querySelector("#affiliate-amazon"),
  rakuten: document.querySelector("#affiliate-rakuten"),
  monitor: document.querySelector("#affiliate-monitor"),
};

const affiliateLinks = {
  bto: "",
  amazonParts: "",
  rakutenParts: "",
  monitor: "",
};

const affiliateFallbackLinks = {
  bto: "https://www.dospara.co.jp/TC30",
  amazonParts: "https://www.amazon.co.jp/s?k=グラフィックボード",
  rakutenParts: "https://search.rakuten.co.jp/search/mall/グラフィックボード/",
  monitor: "https://www.amazon.co.jp/s?k=ゲーミングモニター",
};

const gpuAffiliateLinks = [
  {
    match: ["rtx 3050"],
    amazon: "https://amzn.to/4unpTv3",
  },
  {
    match: ["rtx 3060"],
    exclude: ["rtx 3060 ti"],
    amazon: "https://amzn.to/4vfHO7x",
  },
  {
    match: ["rtx 4060 ti"],
    amazon: "https://amzn.to/49wDhoR",
  },
  {
    match: ["rtx 4060"],
    exclude: ["rtx 4060 ti"],
    amazon: "https://amzn.to/4wYIVdm",
  },
  {
    match: ["rtx 4070"],
    exclude: ["rtx 4070 super", "rtx 4070 ti super"],
    amazon: "https://amzn.to/4vhVmzx",
  },
  {
    match: ["rtx 4070 super"],
    amazon: "https://amzn.to/4nTl5vy",
  },
  {
    match: ["rtx 4080"],
    exclude: ["rtx 4080 super"],
    amazon: "https://amzn.to/4dDK7vf",
  },
  {
    match: ["rtx 4080 super"],
    amazon: "https://amzn.to/4u0bDI7",
  },
  {
    match: ["rtx 5060"],
    exclude: ["rtx 5060 ti"],
    amazon: "https://amzn.to/42YIO41",
  },
  {
    match: ["rtx 5060 ti"],
    amazon: "https://amzn.to/4wXYAtA",
  },
  {
    match: ["rtx 5070"],
    exclude: ["rtx 5070 ti"],
    amazon: "https://amzn.to/49u0cRO",
  },
  {
    match: ["rtx 5070 ti"],
    amazon: "https://amzn.to/4wTXy1G",
  },
  {
    match: ["rtx 5080"],
    amazon: "https://amzn.to/4uJYm7S",
  },
  {
    match: ["rx 9060 xt"],
    amazon: "https://amzn.to/4dX3w9t",
  },
  {
    match: ["rx 7800 xt"],
    amazon: "https://amzn.to/3RxIK8V",
  },
  {
    match: ["rx 7600"],
    exclude: ["rx 7600 xt"],
    amazon: "https://amzn.to/4uzVPwZ",
  },
  {
    match: ["rx 7700 xt"],
    amazon: "https://amzn.to/432paUQ",
  },
  {
    match: ["rx 9070"],
    exclude: ["rx 9070 xt"],
    amazon: "https://amzn.to/3RSnbQl",
  },
  {
    match: ["rx 9070 xt"],
    amazon: "https://amzn.to/3Q5xL69",
  },
];

const gpuPerformanceProfiles = [
  {
    match: ["rtx 3050"],
    fps: {
      fhd: { apex: "90-120", valorant: "220-300", fortnite: "80-110", minecraft: "180-260" },
      wqhd: { apex: "60-85", valorant: "170-240", fortnite: "55-80", minecraft: "130-200" },
      "4k": { apex: "35-50", valorant: "100-150", fortnite: "30-45", minecraft: "75-120" },
    },
    capabilities: ["FHDゲーム向き", "軽めの動画編集OK", "普段使い快適"],
    recommendedResolution: "FHD / 1080p",
    psu: "550W",
  },
  {
    match: ["rtx 3060", "rx 6600"],
    fps: {
      fhd: { apex: "120-160", valorant: "280-380", fortnite: "100-140", minecraft: "220-320" },
      wqhd: { apex: "80-115", valorant: "210-300", fortnite: "70-100", minecraft: "160-240" },
      "4k": { apex: "45-65", valorant: "130-190", fortnite: "40-60", minecraft: "95-150" },
    },
    capabilities: ["FHD 144fpsゲーム可能", "WQHD入門", "動画編集OK"],
    recommendedResolution: "FHD / 1080p",
    psu: "550W",
  },
  {
    match: ["rtx 5060", "rx 9060 xt", "rtx 4060 ti", "rx 7600 xt", "rtx 4060", "rx 7600"],
    fps: {
      fhd: { apex: "150-210", valorant: "330-450", fortnite: "130-180", minecraft: "260-380" },
      wqhd: { apex: "105-150", valorant: "260-360", fortnite: "90-130", minecraft: "200-300" },
      "4k": { apex: "60-85", valorant: "160-240", fortnite: "50-75", minecraft: "120-190" },
    },
    capabilities: ["FHD 144fpsゲーム可能", "WQHD快適", "配信可能", "動画編集OK"],
    recommendedResolution: "FHD-WQHD / 1080p-1440p",
    psu: "600W",
  },
  {
    match: ["rtx 5060 ti", "rtx 5070", "rx 9070 xt", "rx 9070", "rtx 4070 ti super", "rtx 4070 super", "rtx 4070", "rx 7800 xt", "rx 7700 xt"],
    fps: {
      fhd: { apex: "220-300", valorant: "420-550", fortnite: "180-240", minecraft: "340-500" },
      wqhd: { apex: "160-230", valorant: "330-460", fortnite: "135-190", minecraft: "260-390" },
      "4k": { apex: "95-140", valorant: "220-320", fortnite: "80-120", minecraft: "170-270" },
    },
    capabilities: ["FHD 240fpsクラス", "WQHD快適", "4K入門", "配信可能", "動画編集OK"],
    recommendedResolution: "WQHD / 1440p",
    psu: "700W",
  },
  {
    match: ["rtx 5080", "rtx 5070 ti", "rtx 4080 super"],
    fps: {
      fhd: { apex: "260-360", valorant: "500-650", fortnite: "220-300", minecraft: "420-620" },
      wqhd: { apex: "210-300", valorant: "420-560", fortnite: "175-250", minecraft: "330-500" },
      "4k": { apex: "140-200", valorant: "290-420", fortnite: "115-170", minecraft: "230-360" },
    },
    capabilities: ["FHD 240fps以上", "WQHD高fps快適", "4Kゲーム可能", "配信可能", "動画編集OK"],
    recommendedResolution: "WQHD-4K / 1440p-2160p",
    psu: "750W",
  },
];

const defaultPerformanceProfile = {
  fps: {
    fhd: { apex: "90-140", valorant: "200-320", fortnite: "80-130", minecraft: "160-260" },
    wqhd: { apex: "65-100", valorant: "160-260", fortnite: "55-90", minecraft: "120-210" },
    "4k": { apex: "40-65", valorant: "100-180", fortnite: "35-60", minecraft: "80-140" },
  },
  capabilities: ["FHDゲーム可能", "普段使い快適", "軽めの制作作業OK"],
  recommendedResolution: "FHD / 1080p",
  psu: "550W",
};

const gameLabels = {
  apex: "Apex",
  valorant: "VALORANT",
  fortnite: "Fortnite",
  minecraft: "Minecraft",
};

let builds = [];

function setupAffiliateLinks() {
  affiliateButtons.bto.href = getAffiliateUrl(affiliateLinks.bto, affiliateFallbackLinks.bto);
  affiliateButtons.amazon.href = getAffiliateUrl(
    affiliateLinks.amazonParts,
    affiliateFallbackLinks.amazonParts
  );
  affiliateButtons.rakuten.href = getAffiliateUrl(
    affiliateLinks.rakutenParts,
    affiliateFallbackLinks.rakutenParts
  );
  affiliateButtons.monitor.href = getAffiliateUrl(affiliateLinks.monitor, affiliateFallbackLinks.monitor);
}

function updateAffiliateLinksForBuild(build) {
  const normalizedGpu = normalizeText(build.gpu);
  const gpuLink = gpuAffiliateLinks.find((link) => {
    const isMatched = link.match.some((keyword) => normalizedGpu.includes(keyword));
    const isExcluded = link.exclude?.some((keyword) => normalizedGpu.includes(keyword));
    return isMatched && !isExcluded;
  });

  affiliateButtons.bto.href = getAffiliateUrl(gpuLink?.bto || affiliateLinks.bto, affiliateFallbackLinks.bto);
  affiliateButtons.amazon.href = getAffiliateUrl(
    gpuLink?.amazon || affiliateLinks.amazonParts,
    affiliateFallbackLinks.amazonParts
  );
  affiliateButtons.rakuten.href = getAffiliateUrl(
    gpuLink?.rakuten || affiliateLinks.rakutenParts,
    affiliateFallbackLinks.rakutenParts
  );
  affiliateButtons.monitor.href = getAffiliateUrl(
    gpuLink?.monitor || affiliateLinks.monitor,
    affiliateFallbackLinks.monitor
  );
}

function toggleAffiliateSection(isVisible) {
  affiliateSection.classList.toggle("hidden", !isVisible);
  popularJumpSection.classList.toggle("hidden", !isVisible);
}

function getAffiliateUrl(url, fallbackUrl) {
  if (!url || url === "#" || url.includes("example.com")) {
    return fallbackUrl;
  }

  return url;
}

function normalizeText(value) {
  return value.toLowerCase().replace(/\s+/g, " ").trim();
}

function getPerformanceProfile(gpu) {
  const normalizedGpu = normalizeText(gpu);
  return (
    gpuPerformanceProfiles.find((profile) =>
      profile.match.some((keyword) => normalizedGpu.includes(keyword))
    ) || defaultPerformanceProfile
  );
}

function getResolutionLabel(resolution) {
  const labels = {
    fhd: "FHD / 1080p",
    wqhd: "WQHD / 1440p",
    "4k": "4K / 2160p",
  };

  return labels[resolution] || "FHD / 1080p";
}

function createGpuGuideUrl(gpu) {
  return `https://sippo79.github.io/gpu-guide/?gpu=${encodeURIComponent(gpu)}`;
}

function renderFpsItems(fpsByGame) {
  return Object.entries(gameLabels)
    .map(([key, label]) => {
      const fps = fpsByGame[key] || "-";
      return `
        <li class="fps-item">
          <span class="fps-game">${label}</span>
          <strong>${fps}<small>fps</small></strong>
        </li>
      `;
    })
    .join("");
}

function renderCapabilityItems(capabilities) {
  return capabilities
    .map((capability) => `<li>${capability}</li>`)
    .join("");
}

async function loadBuilds() {
  const response = await fetch("builds.json");
  builds = await response.json();
}

setupAffiliateLinks();
toggleAffiliateSection(false);
loadBuilds();

popularJumpButton.addEventListener("click", () => {
  popularBuildsSection.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
});

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
    toggleAffiliateSection(false);
    return;
  }

  const result = builds.find((build) => {
    return (
      build.budget === budget &&
      build.usage === usage &&
      build.resolution === resolution
    );
  });

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

    toggleAffiliateSection(false);
    return;
  }

  const performanceProfile = getPerformanceProfile(result.gpu);
  const fpsByGame =
    performanceProfile.fps[resolution] || performanceProfile.fps.fhd || defaultPerformanceProfile.fps.fhd;
  const selectedResolutionLabel = getResolutionLabel(resolution);
  const gpuGuideUrl = createGpuGuideUrl(result.gpu);
  updateAffiliateLinksForBuild(result);

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

      <div class="result-insights">
        <div class="result-metrics">
          <div class="metric-card">
            <span>推奨解像度</span>
            <strong>${performanceProfile.recommendedResolution}</strong>
            <small>選択条件: ${selectedResolutionLabel}</small>
          </div>
          <div class="metric-card">
            <span>推奨電源容量</span>
            <strong>${performanceProfile.psu}</strong>
            <small>余裕を見た目安です</small>
          </div>
        </div>

        <section class="result-panel">
          <div class="result-panel-heading">
            <p class="result-label">Estimated FPS</p>
            <h4>主要ゲームの想定fps</h4>
            <span>目安</span>
          </div>
          <ul class="fps-grid">
            ${renderFpsItems(fpsByGame)}
          </ul>
        </section>

        <section class="result-panel">
          <div class="result-panel-heading">
            <p class="result-label">Can Do</p>
            <h4>このPCでできること</h4>
          </div>
          <ul class="capability-list">
            ${renderCapabilityItems(performanceProfile.capabilities)}
          </ul>
        </section>

        <a class="gpu-detail-button" href="${gpuGuideUrl}" target="_blank" rel="noopener">
          GPU詳細ページを見る
        </a>
      </div>
    </div>
  `;

  toggleAffiliateSection(true);
});
