/**
 * 終身學習領域 四季主題課程規劃與學習檢核追蹤系統
 * 瑞翔社區日間作業所 (116年度標準)
 */

// 1. Initial State & Domain Constants
const DEFAULT_LIFELONG_CONFIG = {
  mainTitle: "116年度 終身學習領域 四季主題課程規劃與學習檢核表",
  subTitle: "財團法人天主教嘉義教區附設雲林縣私立華聖家園_瑞翔社區日間作業所",
  orgName: "瑞翔社區日間作業所"
};

const DEFAULT_LIFELONG_INDICATORS = {
  Q1: {
    tabName: "🧭 第一季 (Q1)：生活常規、作息適應與自我倡議 (1~3月)",
    title: "第一季 (1~3月)：生活常規、作息適應與自我倡議",
    items: [
      "能辨識小作所每日作息、週課表與停班停課資訊（如週六日休息、看新聞確認颱風假）",
      "理解作業活動與獎勵金制度之關聯（知道認真代工/手作可獲取獎勵金用於社區購物）",
      "能主動表達個人身心需求、身體不適或善用意見箱與支持者/社工溝通傾訴"
    ]
  },
  Q2: {
    tabName: "🧹 第二季 (Q2)：居家清潔維護與家電用電安全 (4~6月)",
    title: "第二季 (4~6月)：居家清潔維護與家電用電安全",
    items: [
      "掌握正確拔插頭技巧（握住插頭本體拔除，嚴禁直接拉扯電線）與線材束帶收納",
      "能辨識用電危險（插座過載堆疊、插頭未插到底、電線脫皮破損立即通報拔除）",
      "辨識廚房高溫熱源（電陶爐發紅面板會燙傷不可碰觸）與高耗能電器插座安全",
      "熟練「麻花式」低處擰抹布技巧，並能使用掃帚將垃圾確實掃入地面目標框內"
    ]
  },
  Q3: {
    tabName: "🚨 第三季 (Q3)：全方位防災應變與用路安全 (7~9月)",
    title: "第三季 (7~9月)：全方位防災應變（地震、火災、水災）與用路安全",
    items: [
      "熟練地震避難口訣「趴下、掩護、穩住（躲、遮、抓）」，確實躲入桌下抓穩桌腳",
      "能於非桌區（如作業區玻璃旁）迅速遠離玻璃、尋找柱子避難，睡覺時以枕頭護頭",
      "聽聞火警警報迅速關閉教室門、用毛巾塞門縫防煙，並確實往陽台/室外避難",
      "能正確操作滅火器四步驟「拉（插梢）、瞄（火源根部）、壓（握把）、掃（左右掃射）」",
      "能辨識用路危險（路邊車輛遮蔽視線、無號誌路口、保持行走動線通暢）"
    ]
  },
  Q4: {
    tabName: "🛒 第四季 (Q4)：食品安全守則與生活消費管理 (10~12月)",
    title: "第四季 (10~12月)：食品安全守則、期限判讀與生活消費管理",
    items: [
      "能於包裝上找出「EXP」、「有效日期」或「保存期限」標籤位置",
      "能對照月曆比對當日日期，正確判斷食品或用品是否過期，過期主動丟棄不食用",
      "掌握油鍋起火應變三步驟（1關瓦斯、2蓋鍋蓋、3靜置冷卻，嚴禁潑水）",
      "練習日常生活購物金錢清點（如辨識百元/千元鈔、核對找零）並養成收納習慣"
    ]
  }
};

const SCORE_LEVELS = [
  { score: 5, label: "獨立 (+)", desc: "可獨立完成", color: "#15803d" },
  { score: 4, label: "口語 (V)", desc: "口語提醒即可完成", color: "#2563eb" },
  { score: 3, label: "肢協 (P)", desc: "部分肢體協助", color: "#d97706" },
  { score: 2, label: "部分", desc: "部分步驟需支持者協助", color: "#ea580c" },
  { score: 1, label: "未學 (-)", desc: "尚未學會 / 大量協助", color: "#dc2626" },
  { score: 0, label: "無法", desc: "無法完成 / 拒絕配合", color: "#991b1b" }
];

const DEFAULT_LIFELONG_LEARNERS = [
  {
    id: "L01",
    name: "宇彤",
    notes: "生活作息適應良好，防災應變時需口語提示穩住",
    scores: {
      Q1: { pre: [3, 3, 3], mid: [4, 4, 4], post: [5, 4, 5] },
      Q2: { pre: [3, 3, 2, 3], mid: [4, 4, 3, 4], post: [5, 4, 4, 5] },
      Q3: { pre: [3, 3, 3, 3, 3], mid: [4, 4, 4, 4, 4], post: [5, 4, 5, 4, 4] },
      Q4: { pre: [3, 3, 3, 3], mid: [4, 4, 4, 4], post: [5, 5, 4, 4] }
    }
  },
  {
    id: "L02",
    name: "育萱",
    notes: "用電安全與食品保存期限判讀能力極佳，能主動示範",
    scores: {
      Q1: { pre: [4, 4, 4], mid: [4, 5, 5], post: [5, 5, 5] },
      Q2: { pre: [4, 4, 3, 4], mid: [5, 5, 4, 5], post: [5, 5, 5, 5] },
      Q3: { pre: [4, 4, 4, 4, 4], mid: [5, 5, 5, 5, 4], post: [5, 5, 5, 5, 5] },
      Q4: { pre: [4, 4, 4, 4], mid: [5, 5, 5, 5], post: [5, 5, 5, 5] }
    }
  },
  {
    id: "L03",
    name: "高齊",
    notes: "初測需較多示範，經工作分析與情境演練後進步顯著",
    scores: {
      Q1: { pre: [2, 2, 2], mid: [3, 3, 4], post: [4, 4, 4] },
      Q2: { pre: [2, 2, 2, 3], mid: [3, 3, 3, 4], post: [4, 4, 4, 4] },
      Q3: { pre: [2, 2, 2, 2, 3], mid: [3, 3, 3, 4, 3], post: [4, 4, 4, 4, 4] },
      Q4: { pre: [2, 2, 3, 2], mid: [3, 4, 3, 3], post: [4, 4, 4, 4] }
    }
  },
  {
    id: "L04",
    name: "芷嫻",
    notes: "清潔操作與金錢清點細膩，能確實依步驟執行",
    scores: {
      Q1: { pre: [3, 3, 4], mid: [4, 4, 4], post: [5, 4, 5] },
      Q2: { pre: [3, 3, 3, 4], mid: [4, 4, 4, 5], post: [5, 5, 4, 5] },
      Q3: { pre: [3, 3, 4, 3, 4], mid: [4, 4, 5, 4, 4], post: [5, 5, 5, 4, 5] },
      Q4: { pre: [3, 4, 3, 4], mid: [4, 4, 4, 5], post: [5, 5, 4, 5] }
    }
  }
];

// App State
let state = {
  config: JSON.parse(JSON.stringify(DEFAULT_LIFELONG_CONFIG)),
  currentQuarter: "Q1",
  currentLearnerId: "L01",
  currentStage: "pre", // 'pre', 'mid', 'post'
  activeTab: "tab-scoring",
  learners: [],
  indicators: {}
};

let charts = {};

// 2. Storage Helpers
function loadData() {
  const savedConfig = localStorage.getItem("lifelong_config");
  const savedLearners = localStorage.getItem("lifelong_learners");
  const savedIndicators = localStorage.getItem("lifelong_indicators");

  if (savedConfig) {
    try {
      state.config = { ...DEFAULT_LIFELONG_CONFIG, ...JSON.parse(savedConfig) };
    } catch (e) {
      state.config = JSON.parse(JSON.stringify(DEFAULT_LIFELONG_CONFIG));
    }
  } else {
    state.config = JSON.parse(JSON.stringify(DEFAULT_LIFELONG_CONFIG));
  }

  if (savedLearners) {
    try {
      state.learners = JSON.parse(savedLearners);
    } catch (e) {
      state.learners = JSON.parse(JSON.stringify(DEFAULT_LIFELONG_LEARNERS));
    }
  } else {
    state.learners = JSON.parse(JSON.stringify(DEFAULT_LIFELONG_LEARNERS));
  }

  if (savedIndicators) {
    try {
      state.indicators = JSON.parse(savedIndicators);
    } catch (e) {
      state.indicators = JSON.parse(JSON.stringify(DEFAULT_LIFELONG_INDICATORS));
    }
  } else {
    state.indicators = JSON.parse(JSON.stringify(DEFAULT_LIFELONG_INDICATORS));
  }

  if (!state.learners.find(l => l.id === state.currentLearnerId) && state.learners.length > 0) {
    state.currentLearnerId = state.learners[0].id;
  }

  applyAppConfig();
}

function saveData() {
  localStorage.setItem("lifelong_config", JSON.stringify(state.config));
  localStorage.setItem("lifelong_learners", JSON.stringify(state.learners));
  localStorage.setItem("lifelong_indicators", JSON.stringify(state.indicators));
}

function applyAppConfig() {
  document.getElementById("appMainTitle").innerText = state.config.mainTitle;
  document.getElementById("appSubTitle").innerText = state.config.subTitle;
  document.getElementById("printDocTitle").innerText = state.config.mainTitle;
  document.getElementById("printDocSubTitle").innerText = state.config.subTitle;
  document.getElementById("printMetaOrg").innerText = state.config.orgName;

  ["Q1", "Q2", "Q3", "Q4"].forEach(q => {
    const span = document.getElementById(`seasonTabName_${q}`);
    if (span && state.indicators[q]) {
      span.innerText = state.indicators[q].tabName || state.indicators[q].title;
    }
  });
}

// 3. Calculation & Stage Helpers
function getStageInfo(avgScore) {
  if (avgScore >= 4.5) {
    return { name: "獨立完成 (+)", badgeClass: "ind", icon: "🟢", desc: "可獨立完成，達到完全自立水準" };
  } else if (avgScore >= 3.5) {
    return { name: "口語提醒 (V)", badgeClass: "oral", icon: "🔵", desc: "口語提醒即可完成，基本自立達標" };
  } else if (avgScore >= 2.0) {
    return { name: "肢體/部分協助 (P)", badgeClass: "phys", icon: "🟡", desc: "需肢體引導或關鍵步驟協助" };
  } else {
    return { name: "尚未學會 / 大量 (-)", badgeClass: "much", icon: "🟠", desc: "尚未學會，需密集示範與引導" };
  }
}

function calculateLearnerQuarterStats(learner, quarter) {
  const qData = state.indicators[quarter];
  const itemCount = qData ? qData.items.length : 4;
  const maxScore = itemCount * 5;

  const defaultScores = Array(itemCount).fill(0);
  const qScores = learner.scores?.[quarter] || {
    pre: [...defaultScores],
    mid: [...defaultScores],
    post: [...defaultScores]
  };

  const sumPre = qScores.pre.slice(0, itemCount).reduce((a, b) => a + b, 0);
  const sumMid = qScores.mid.slice(0, itemCount).reduce((a, b) => a + b, 0);
  const sumPost = qScores.post.slice(0, itemCount).reduce((a, b) => a + b, 0);

  const avgPre = itemCount > 0 ? (sumPre / itemCount).toFixed(1) : 0;
  const avgMid = itemCount > 0 ? (sumMid / itemCount).toFixed(1) : 0;
  const avgPost = itemCount > 0 ? (sumPost / itemCount).toFixed(1) : 0;

  const achievePre = maxScore > 0 ? ((sumPre / maxScore) * 100).toFixed(1) : 0;
  const achieveMid = maxScore > 0 ? ((sumMid / maxScore) * 100).toFixed(1) : 0;
  const achievePost = maxScore > 0 ? ((sumPost / maxScore) * 100).toFixed(1) : 0;

  const growthScore = sumPost - sumPre;
  const growthRate = sumPre > 0 
    ? ((growthScore / sumPre) * 100).toFixed(1)
    : (maxScore > 0 ? ((growthScore / maxScore) * 100).toFixed(1) : 0);
  const growthPoints = (achievePost - achievePre).toFixed(1);

  const currentStageInfo = getStageInfo(parseFloat(avgPost));

  return {
    itemCount, maxScore,
    sumPre, sumMid, sumPost,
    avgPre: parseFloat(avgPre), avgMid: parseFloat(avgMid), avgPost: parseFloat(avgPost),
    achievePre: parseFloat(achievePre), achieveMid: parseFloat(achieveMid), achievePost: parseFloat(achievePost),
    growthScore,
    growthRate: parseFloat(growthRate),
    growthPoints: parseFloat(growthPoints),
    stageInfo: currentStageInfo
  };
}

// 4. Toast Notification
function showToast(message, type = "info") {
  const container = document.getElementById("toastContainer");
  const toast = document.createElement("div");
  toast.className = "toast";
  const icon = type === "success" ? "✅" : (type === "error" ? "⚠️" : "ℹ️");
  toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// 5. UI Render Functions
function updateKpiCards() {
  const quarter = state.currentQuarter;
  const count = state.learners.length;
  document.getElementById("kpiLearnerCount").innerText = `${count} 人`;

  if (count === 0) {
    document.getElementById("kpiAvgPostScore").innerText = "0 分";
    document.getElementById("kpiAvgAchievement").innerText = "達成率 0%";
    document.getElementById("kpiAvgGrowthScore").innerText = "0 分";
    document.getElementById("kpiAvgGrowthRate").innerText = "平均進步率 0%";
    document.getElementById("kpiPassRate").innerText = "0 %";
    document.getElementById("kpiPassCount").innerText = "0 / 0 人達標";
    return;
  }

  let totalPostAvg = 0;
  let totalGrowthAvg = 0;
  let totalGrowthRate = 0;
  let passCount = 0;

  state.learners.forEach(l => {
    const stats = calculateLearnerQuarterStats(l, quarter);
    totalPostAvg += stats.avgPost;
    totalGrowthAvg += (stats.avgPost - stats.avgPre);
    totalGrowthRate += stats.growthRate;
    if (stats.avgPost >= 3.5) {
      passCount++;
    }
  });

  const avgPost = (totalPostAvg / count).toFixed(1);
  const avgAchieve = ((avgPost / 5.0) * 100).toFixed(1);
  const avgGrowth = (totalGrowthAvg / count).toFixed(1);
  const avgGrowthRate = (totalGrowthRate / count).toFixed(1);
  const passRate = ((passCount / count) * 100).toFixed(1);

  document.getElementById("kpiAvgPostScore").innerText = `${avgPost} 分`;
  document.getElementById("kpiAvgAchievement").innerText = `達成率 ${avgAchieve}% (滿分5.0)`;
  document.getElementById("kpiAvgGrowthScore").innerText = `${avgGrowth >= 0 ? '+' : ''}${avgGrowth} 分`;
  document.getElementById("kpiAvgGrowthRate").innerText = `平均進步率 ${avgGrowthRate >= 0 ? '+' : ''}${avgGrowthRate}%`;
  document.getElementById("kpiPassRate").innerText = `${passRate} %`;
  document.getElementById("kpiPassCount").innerText = `${passCount} / ${count} 人達標`;
}

function renderLearnerChips() {
  const container = document.getElementById("learnerQuickBar");
  container.innerHTML = "";

  state.learners.forEach(l => {
    const isAct = l.id === state.currentLearnerId;
    const group = document.createElement("div");
    group.className = `learner-chip-group ${isAct ? "active" : ""}`;
    const stats = calculateLearnerQuarterStats(l, state.currentQuarter);

    group.innerHTML = `
      <button class="btn-chip-main" data-id="${l.id}">
        <span>👤</span> ${l.name} <small style="opacity:0.85">(${stats.avgPost}分)</small>
      </button>
      <button class="btn-edit-chip btn-open-edit-learner" data-id="${l.id}" title="編輯學員資料">✏️</button>
    `;

    group.querySelector(".btn-chip-main").addEventListener("click", () => {
      state.currentLearnerId = l.id;
      renderLearnerChips();
      renderScoringMatrix();
      updateBanner();
    });

    group.querySelector(".btn-open-edit-learner").addEventListener("click", (e) => {
      e.stopPropagation();
      openLearnerModal(l);
    });

    container.appendChild(group);
  });
}

function renderScoringMatrix() {
  const quarter = state.currentQuarter;
  const qData = state.indicators[quarter];
  const learner = state.learners.find(l => l.id === state.currentLearnerId);
  const container = document.getElementById("indicatorScoringList");
  container.innerHTML = "";

  document.getElementById("scoringQuarterTitle").innerText = `${qData.title} - 學習檢核`;

  if (!learner) {
    container.innerHTML = `<div style="padding:2rem; text-align:center; color:var(--text-muted);">請先新增或選擇學員</div>`;
    return;
  }

  const itemCount = qData.items.length;
  if (!learner.scores) learner.scores = {};
  if (!learner.scores[quarter]) {
    learner.scores[quarter] = {
      pre: Array(itemCount).fill(0),
      mid: Array(itemCount).fill(0),
      post: Array(itemCount).fill(0)
    };
  }

  const currentScores = learner.scores[quarter][state.currentStage];

  qData.items.forEach((itemText, idx) => {
    const currentScore = currentScores[idx] !== undefined ? currentScores[idx] : 0;
    const row = document.createElement("div");
    row.className = "indicator-row";

    let btnHtml = "";
    SCORE_LEVELS.forEach(lvl => {
      const isActive = currentScore === lvl.score;
      btnHtml += `
        <button class="score-btn ${isActive ? 'active' : ''}" data-score="${lvl.score}" data-idx="${idx}" title="${lvl.desc}">
          ${lvl.score}
          <small>${lvl.label.split(' ')[0]}</small>
        </button>
      `;
    });

    row.innerHTML = `
      <div class="indicator-num">${idx + 1}</div>
      <div class="indicator-desc">
        <div style="display:flex; align-items:center; justify-content:space-between; gap:0.5rem;">
          <span>${itemText}</span>
          <button class="btn-edit-dark btn-edit-ind-inline" data-idx="${idx}" title="編輯此題工作分析指標" style="flex-shrink:0;">✏️ 編輯</button>
        </div>
      </div>
      <div class="score-selector">${btnHtml}</div>
    `;

    row.querySelectorAll(".score-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const scoreVal = parseInt(btn.getAttribute("data-score"), 10);
        const itemIdx = parseInt(btn.getAttribute("data-idx"), 10);
        learner.scores[quarter][state.currentStage][itemIdx] = scoreVal;
        saveData();
        renderScoringMatrix();
        updateBanner();
        updateKpiCards();
        renderProgressTable();
        renderIspCards();
        updateCharts();
      });
    });

    row.querySelector(".btn-edit-ind-inline")?.addEventListener("click", () => {
      openIndicatorModal(idx, itemText);
    });

    container.appendChild(row);
  });
}

function updateBanner() {
  const learner = state.learners.find(l => l.id === state.currentLearnerId);
  if (!learner) return;

  const quarter = state.currentQuarter;
  const stage = state.currentStage;
  const stageLabels = { pre: "前測基準 (第1月)", mid: "課堂月檢核 (第2月)", post: "後測驗收 (第3月)" };

  const stats = calculateLearnerQuarterStats(learner, quarter);
  const currentScores = learner.scores[quarter][stage] || [];
  const total = currentScores.slice(0, stats.itemCount).reduce((a, b) => a + b, 0);
  const avg = stats.itemCount > 0 ? (total / stats.itemCount).toFixed(1) : 0;

  document.getElementById("bannerLearnerName").innerText = learner.name;
  document.getElementById("bannerStageName").innerText = `當前：${stageLabels[stage]}`;
  document.getElementById("bannerTotalScore").innerText = `${total} / ${stats.maxScore}`;
  document.getElementById("bannerAvgScore").innerText = avg;

  const badge = document.getElementById("bannerStageBadge");
  badge.className = `stage-badge ${stats.stageInfo.badgeClass}`;
  badge.innerText = `${stats.stageInfo.icon} ${stats.stageInfo.name}`;

  document.getElementById("bannerGrowthDiff").innerText = 
    `後測進步：${stats.growthScore >= 0 ? '+' : ''}${stats.growthScore} 分 (${stats.growthRate >= 0 ? '+' : ''}${stats.growthRate}%)`;
}

function renderProgressTable() {
  const tbody = document.getElementById("progressTableBody");
  const tfoot = document.getElementById("progressTableFoot");
  tbody.innerHTML = "";
  tfoot.innerHTML = "";

  const quarter = state.currentQuarter;
  const searchTxt = (document.getElementById("filterLearnerInput")?.value || "").trim().toLowerCase();
  const filterStage = document.getElementById("filterStageSelect")?.value || "ALL";

  let filtered = state.learners.filter(l => {
    if (searchTxt && !l.name.toLowerCase().includes(searchTxt)) return false;
    const stats = calculateLearnerQuarterStats(l, quarter);
    if (filterStage === "IND" && stats.avgPost < 4.5) return false;
    if (filterStage === "ORAL" && (stats.avgPost < 3.5 || stats.avgPost >= 4.5)) return false;
    if (filterStage === "PHYS" && (stats.avgPost < 2.0 || stats.avgPost >= 3.5)) return false;
    if (filterStage === "MUCH" && stats.avgPost >= 2.0) return false;
    return true;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="11" style="padding:2rem; color:var(--text-muted);">無符合條件之學員評量資料</td></tr>`;
    return;
  }

  let sumPreTotal = 0, sumMidTotal = 0, sumPostTotal = 0;
  let sumGrowthScore = 0, sumGrowthRate = 0, sumGrowthPts = 0;

  filtered.forEach(l => {
    const stats = calculateLearnerQuarterStats(l, quarter);
    sumPreTotal += stats.sumPre;
    sumMidTotal += stats.sumMid;
    sumPostTotal += stats.sumPost;
    sumGrowthScore += stats.growthScore;
    sumGrowthRate += stats.growthRate;
    sumGrowthPts += stats.growthPoints;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><strong>${l.name}</strong></td>
      <td><span class="score-pill" style="background:#f1f5f9;">${stats.sumPre} / ${stats.maxScore}</span></td>
      <td><span class="score-pill" style="background:#f1f5f9;">${stats.sumMid} / ${stats.maxScore}</span></td>
      <td><strong class="score-pill" style="background:#e0e7ff; color:#4338ca;">${stats.sumPost} / ${stats.maxScore}</strong></td>
      <td>${stats.avgPost}</td>
      <td>${stats.achievePost}%</td>
      <td><span class="stage-badge ${stats.stageInfo.badgeClass}">${stats.stageInfo.icon} ${stats.stageInfo.name}</span></td>
      <td><span class="improvement-tag ${stats.growthScore < 0 ? 'neg' : ''}">${stats.growthScore >= 0 ? '+' : ''}${stats.growthScore}</span></td>
      <td><span class="improvement-tag ${stats.growthRate < 0 ? 'neg' : ''}">${stats.growthRate >= 0 ? '+' : ''}${stats.growthRate}%</span></td>
      <td><span class="improvement-tag ${stats.growthPoints < 0 ? 'neg' : ''}">${stats.growthPoints >= 0 ? '+' : ''}${stats.growthPoints}%pt</span></td>
      <td class="no-print" style="white-space:nowrap;">
        <button class="btn btn-outline btn-sm btn-quick-grade" data-id="${l.id}">評量</button>
        <button class="btn btn-outline btn-sm btn-table-edit-learner" data-id="${l.id}">✏️ 編輯</button>
      </td>
    `;

    tr.querySelector(".btn-quick-grade").addEventListener("click", () => {
      state.currentLearnerId = l.id;
      switchTab("tab-scoring");
      renderLearnerChips();
      renderScoringMatrix();
      updateBanner();
    });

    tr.querySelector(".btn-table-edit-learner").addEventListener("click", () => {
      openLearnerModal(l);
    });

    tbody.appendChild(tr);
  });

  const n = filtered.length;
  const avgPre = (sumPreTotal / n).toFixed(1);
  const avgMid = (sumMidTotal / n).toFixed(1);
  const avgPost = (sumPostTotal / n).toFixed(1);
  const sampleStats = calculateLearnerQuarterStats(filtered[0], quarter);
  const avgInd = sampleStats.itemCount > 0 ? (avgPost / sampleStats.itemCount).toFixed(1) : 0;
  const avgAchieve = sampleStats.maxScore > 0 ? ((avgPost / sampleStats.maxScore) * 100).toFixed(1) : 0;
  const avgGrowth = (sumGrowthScore / n).toFixed(1);
  const avgGrowthRate = (sumGrowthRate / n).toFixed(1);
  const avgGrowthPts = (sumGrowthPts / n).toFixed(1);

  tfoot.innerHTML = `
    <tr style="background:#312e81; color:#ffffff; font-weight:700;">
      <td style="color:#ffffff;">全體平均常模</td>
      <td style="color:#ffffff;">${avgPre}</td>
      <td style="color:#ffffff;">${avgMid}</td>
      <td style="color:#a5b4fc; font-size:1rem;">${avgPost}</td>
      <td style="color:#ffffff;">${avgInd}</td>
      <td style="color:#ffffff;">${avgAchieve}%</td>
      <td style="color:#ffffff;">-</td>
      <td style="color:#86efac;">${avgGrowth >= 0 ? '+' : ''}${avgGrowth}</td>
      <td style="color:#86efac;">${avgGrowthRate >= 0 ? '+' : ''}${avgGrowthRate}%</td>
      <td style="color:#86efac;">${avgGrowthPts >= 0 ? '+' : ''}${avgGrowthPts}%pt</td>
      <td style="color:#ffffff;" class="no-print">-</td>
    </tr>
  `;
}

function renderIspCards() {
  const container = document.getElementById("ispListContainer");
  container.innerHTML = "";

  const quarter = state.currentQuarter;
  const qTitle = state.indicators[quarter].title;

  state.learners.forEach(l => {
    const stats = calculateLearnerQuarterStats(l, quarter);

    let narrative = "";
    if (stats.avgPost >= 4.5) {
      narrative = `【優異自立達標】${l.name}在終身學習『${qTitle}』課程中表現卓越，前測基準為${stats.sumPre}分（達成率${stats.achievePre}%），經本季密集訓練與情境演練，後測成長至${stats.sumPost}分（達成率${stats.achievePost}%，進步+${stats.growthScore}分，進步率${stats.growthRate}%）。各項工作分析檢核步驟均已達到獨立完成水準（平均${stats.avgPost}分），無需口語提醒即可自主執行，並能主動協助同儕。`;
    } else if (stats.avgPost >= 3.5) {
      narrative = `【基本自立達標】${l.name}在終身學習『${qTitle}』中展現穩定成長，前測為${stats.sumPre}分，經3個月階梯教學與提示引導，後測成績成長至${stats.sumPost}分（進步+${stats.growthScore}分，進步率${stats.growthRate}%）。目前關鍵操作在支持者給予口語提醒下即可順利完成（平均${stats.avgPost}分），已具備良好生活與常規適應能力。`;
    } else if (stats.avgPost >= 2.0) {
      narrative = `【步驟進階引導】${l.name}在終身學習『${qTitle}』中前測為${stats.sumPre}分，後測提升至${stats.sumPost}分（進步+${stats.growthScore}分）。目前處於『部分肢體協助階段』（平均${stats.avgPost}分），後續將持續針對關鍵弱項進行工作分析拆解與重覆操作練習。`;
    } else {
      narrative = `【基礎習慣養成】${l.name}在『${qTitle}』中目前處於『尚未學會 / 大量引導階段』。後續教學重點在於建立操作興趣、提供高結構化視覺教具與個別化密集陪伴。`;
    }

    const card = document.createElement("div");
    card.className = "content-card";
    card.style.marginBottom = "0";
    card.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
        <div>
          <strong style="font-size:1.1rem;">${l.name}</strong>
          <span style="color:var(--text-muted); margin-left:0.5rem;">(${qTitle.split('：')[1] || qTitle})</span>
        </div>
        <div style="display:flex; gap:0.5rem; align-items:center;">
          <span class="stage-badge ${stats.stageInfo.badgeClass}">${stats.stageInfo.icon} ${stats.stageInfo.name}</span>
          <button class="btn btn-outline btn-sm btn-copy-isp" data-name="${l.name}">📋 複製評語</button>
        </div>
      </div>
      <div style="font-size:0.85rem; color:var(--text-muted); margin-bottom:0.5rem;">
        分數軌跡：前測 ${stats.sumPre} 分 ➔ 課堂 ${stats.sumMid} 分 ➔ 後測 ${stats.sumPost} 分 | 進步：<strong>+${stats.growthScore} 分</strong> (+${stats.growthRate}%)
      </div>
      <div class="isp-box">
        <textarea class="isp-textarea" id="ispText_${l.id}">${narrative}</textarea>
      </div>
    `;

    card.querySelector(".btn-copy-isp").addEventListener("click", () => {
      const txt = document.getElementById(`ispText_${l.id}`).value;
      navigator.clipboard.writeText(txt).then(() => {
        showToast(`已複製 ${l.name} 的終身學習 ISP 質性評語！`, "success");
      });
    });

    container.appendChild(card);
  });
}

function renderIndicatorsManager() {
  const container = document.getElementById("indicatorsManageContainer");
  const quarter = state.currentQuarter;
  const qData = state.indicators[quarter];
  container.innerHTML = "";

  const wrap = document.createElement("div");
  wrap.innerHTML = `
    <div style="margin-bottom:1rem; font-weight:700; font-size:1.05rem; color:var(--primary);">
      當前編輯：${qData.title} (共 ${qData.items.length} 項工作分析指標)
    </div>
  `;

  qData.items.forEach((item, idx) => {
    const row = document.createElement("div");
    row.className = "form-group";
    row.style.display = "flex";
    row.style.gap = "0.75rem";
    row.style.alignItems = "center";
    row.innerHTML = `
      <span style="width:70px; font-weight:700; font-size:0.9rem;">指標 ${idx + 1}</span>
      <input type="text" class="form-control ind-edit-input" data-idx="${idx}" value="${item}">
    `;
    wrap.appendChild(row);
  });

  const saveBtn = document.createElement("button");
  saveBtn.className = "btn btn-primary";
  saveBtn.innerText = "💾 儲存所有指標修改";
  saveBtn.addEventListener("click", () => {
    wrap.querySelectorAll(".ind-edit-input").forEach(input => {
      const i = parseInt(input.getAttribute("data-idx"), 10);
      state.indicators[quarter].items[i] = input.value;
    });
    saveData();
    renderScoringMatrix();
    updateCharts();
    showToast("指標項目儲存成功！", "success");
  });

  wrap.appendChild(saveBtn);
  container.appendChild(wrap);
}

// 6. Interactive Visual Charts
function updateCharts() {
  const quarter = state.currentQuarter;
  const learners = state.learners;
  if (learners.length === 0) return;

  const names = learners.map(l => l.name);
  const preScores = learners.map(l => calculateLearnerQuarterStats(l, quarter).avgPre);
  const midScores = learners.map(l => calculateLearnerQuarterStats(l, quarter).avgMid);
  const postScores = learners.map(l => calculateLearnerQuarterStats(l, quarter).avgPost);

  // 1. Bar Chart
  const ctxBar = document.getElementById("chartPrePostBar")?.getContext("2d");
  if (ctxBar) {
    if (charts.bar) charts.bar.destroy();
    charts.bar = new Chart(ctxBar, {
      type: "bar",
      data: {
        labels: names,
        datasets: [
          { label: "1. 前測 (第1月)", data: preScores, backgroundColor: "#94a3b8" },
          { label: "2. 課堂月檢核 (第2月)", data: midScores, backgroundColor: "#38bdf8" },
          { label: "3. 後測 (第3月)", data: postScores, backgroundColor: "#4338ca" }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { beginAtZero: true, max: 5.0, title: { display: true, text: "指標平均分 (滿分5.0)" } }
        }
      }
    });
  }

  // 2. Radar Chart
  const ctxRadar = document.getElementById("chartIndicatorRadar")?.getContext("2d");
  if (ctxRadar) {
    if (charts.radar) charts.radar.destroy();
    const indLabels = state.indicators[quarter].items.map((_, i) => `指標 ${i + 1}`);
    const itemCount = state.indicators[quarter].items.length;
    
    const preIndAvgs = [];
    const postIndAvgs = [];
    for (let i = 0; i < itemCount; i++) {
      let sumPre = 0, sumPost = 0;
      learners.forEach(l => {
        sumPre += (l.scores[quarter]?.pre[i] || 0);
        sumPost += (l.scores[quarter]?.post[i] || 0);
      });
      preIndAvgs.push((sumPre / learners.length).toFixed(2));
      postIndAvgs.push((sumPost / learners.length).toFixed(2));
    }

    charts.radar = new Chart(ctxRadar, {
      type: "radar",
      data: {
        labels: indLabels,
        datasets: [
          { label: "全體前測平均", data: preIndAvgs, borderColor: "#94a3b8", backgroundColor: "rgba(148, 163, 184, 0.2)" },
          { label: "全體後測平均", data: postIndAvgs, borderColor: "#4338ca", backgroundColor: "rgba(67, 56, 202, 0.25)" }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: { min: 0, max: 5, ticks: { stepSize: 1 } }
        }
      }
    });
  }

  // 3. Annual Trend Line Chart
  const ctxTrend = document.getElementById("chartAnnualTrend")?.getContext("2d");
  if (ctxTrend) {
    if (charts.trend) charts.trend.destroy();
    const qLabels = ["Q1前測", "Q1後測", "Q2前測", "Q2後測", "Q3前測", "Q3後測", "Q4前測", "Q4後測"];
    
    const datasets = learners.map((l, i) => {
      const colors = ["#4338ca", "#0284c7", "#d97706", "#dc2626", "#7c3aed", "#ec4899"];
      const color = colors[i % colors.length];
      const data = [
        calculateLearnerQuarterStats(l, "Q1").avgPre, calculateLearnerQuarterStats(l, "Q1").avgPost,
        calculateLearnerQuarterStats(l, "Q2").avgPre, calculateLearnerQuarterStats(l, "Q2").avgPost,
        calculateLearnerQuarterStats(l, "Q3").avgPre, calculateLearnerQuarterStats(l, "Q3").avgPost,
        calculateLearnerQuarterStats(l, "Q4").avgPre, calculateLearnerQuarterStats(l, "Q4").avgPost
      ];
      return {
        label: l.name,
        data: data,
        borderColor: color,
        backgroundColor: color,
        tension: 0.2,
        fill: false
      };
    });

    charts.trend = new Chart(ctxTrend, {
      type: "line",
      data: { labels: qLabels, datasets: datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { min: 0, max: 5, title: { display: true, text: "指標平均分 (0~5)" } }
        }
      }
    });
  }

  // 4. Stage Distribution Pie Chart
  const ctxPie = document.getElementById("chartStagePie")?.getContext("2d");
  if (ctxPie) {
    if (charts.pie) charts.pie.destroy();
    let stageCounts = { "獨立完成 (4.5~5.0)": 0, "口語提醒 (3.5~4.4)": 0, "肢體/部分協助 (2.0~3.4)": 0, "尚未學會/大量 (0.0~1.9)": 0 };
    learners.forEach(l => {
      const stats = calculateLearnerQuarterStats(l, quarter);
      if (stats.avgPost >= 4.5) stageCounts["獨立完成 (4.5~5.0)"]++;
      else if (stats.avgPost >= 3.5) stageCounts["口語提醒 (3.5~4.4)"]++;
      else if (stats.avgPost >= 2.0) stageCounts["肢體/部分協助 (2.0~3.4)"]++;
      else stageCounts["尚未學會/大量 (0.0~1.9)"]++;
    });

    charts.pie = new Chart(ctxPie, {
      type: "doughnut",
      data: {
        labels: Object.keys(stageCounts),
        datasets: [{
          data: Object.values(stageCounts),
          backgroundColor: ["#15803d", "#2563eb", "#d97706", "#dc2626"]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }
}

// 7. Navigation & Modals Logic
function switchTab(tabId) {
  state.activeTab = tabId;
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.classList.toggle("active", btn.getAttribute("data-tab") === tabId);
  });
  document.querySelectorAll(".tab-panel").forEach(panel => {
    panel.classList.toggle("active", panel.id === tabId);
  });

  if (tabId === "tab-charts") {
    setTimeout(updateCharts, 50);
  }
}

function openLearnerModal(learner = null) {
  const modal = document.getElementById("learnerModal");
  const title = document.getElementById("learnerModalTitle");
  const hiddenId = document.getElementById("editLearnerIdHidden");
  const nameInput = document.getElementById("learnerModalName");
  const idInput = document.getElementById("learnerModalId");
  const notesInput = document.getElementById("learnerModalNotes");

  if (learner) {
    title.innerText = `✏️ 編輯學員：${learner.name}`;
    hiddenId.value = learner.id;
    nameInput.value = learner.name;
    idInput.value = learner.id;
    notesInput.value = learner.notes || "";
  } else {
    title.innerText = `➕ 新增評量學員`;
    hiddenId.value = "";
    nameInput.value = "";
    idInput.value = `L${String(state.learners.length + 1).padStart(2, '0')}`;
    notesInput.value = "";
  }

  modal.classList.add("show");
}

function closeLearnerModal() {
  document.getElementById("learnerModal").classList.remove("show");
}

function openEditTitleModal() {
  document.getElementById("inputAppMainTitle").value = state.config.mainTitle;
  document.getElementById("inputAppSubTitle").value = state.config.subTitle;
  document.getElementById("inputAppOrgName").value = state.config.orgName;
  document.getElementById("editTitleModal").classList.add("show");
}

function closeEditTitleModal() {
  document.getElementById("editTitleModal").classList.remove("show");
}

function openEditQuarterModal() {
  const q = state.currentQuarter;
  const qData = state.indicators[q];
  document.getElementById("editQuarterModalTitle").innerText = `✏️ 編輯 ${q} 季度主題名稱`;
  document.getElementById("inputQuarterThemeTitle").value = qData.title;
  document.getElementById("inputQuarterShortTab").value = qData.tabName || qData.title;
  document.getElementById("editQuarterModal").classList.add("show");
}

function closeEditQuarterModal() {
  document.getElementById("editQuarterModal").classList.remove("show");
}

function openIndicatorModal(idx, currentText) {
  document.getElementById("editIndicatorModalTitle").innerText = `✏️ 編輯第 ${idx + 1} 項檢核指標`;
  document.getElementById("editIndicatorIdxHidden").value = idx;
  document.getElementById("inputIndicatorText").value = currentText;
  document.getElementById("editIndicatorModal").classList.add("show");
}

function closeIndicatorModal() {
  document.getElementById("editIndicatorModal").classList.remove("show");
}

// Print Handler Function
function triggerPrint(targetTabId = null) {
  const q = state.currentQuarter;
  const qTitle = state.indicators[q].title;
  const today = new Date();
  const dateStr = `民國 ${today.getFullYear() - 1911} 年 ${today.getMonth() + 1} 月 ${today.getDate()} 日`;

  const learner = state.learners.find(l => l.id === state.currentLearnerId);
  const stageLabels = { pre: "第1個月：前測基準", mid: "第2個月：課堂平時/月檢核", post: "第3個月：後測驗收" };

  if (targetTabId === "tab-scoring" && learner) {
    const stats = calculateLearnerQuarterStats(learner, q);
    document.getElementById("printMetaQuarter").innerHTML = `
      <strong>評量學員：</strong><span style="font-size:11pt; font-weight:bold; color:#4338ca;">${learner.name} (${learner.id})</span> &nbsp;|&nbsp; 
      <strong>評量階段：</strong>${stageLabels[state.currentStage]} &nbsp;|&nbsp; 
      <strong>總分：</strong>${learner.scores[q][state.currentStage].slice(0, stats.itemCount).reduce((a,b)=>a+b, 0)} / ${stats.maxScore} 分 (平均 ${stats.avgPost} 分) &nbsp;|&nbsp;
      <strong>當前自立階段：</strong>${stats.stageInfo.icon} ${stats.stageInfo.name}
    `;
  } else if (targetTabId === "tab-progress-table") {
    document.getElementById("printMetaQuarter").innerHTML = `
      <strong>報表類型：</strong>全體學員終身學習四季成效分析總表 &nbsp;|&nbsp; 
      <strong>季度：</strong>${qTitle}
    `;
  } else {
    document.getElementById("printMetaQuarter").innerText = qTitle;
  }

  document.getElementById("printMetaDate").innerText = dateStr;
  document.getElementById("printMetaOrg").innerText = state.config.orgName;

  document.querySelectorAll(".tab-panel").forEach(p => p.classList.remove("print-active"));
  if (targetTabId) {
    const target = document.getElementById(targetTabId);
    if (target) target.classList.add("print-active");
  } else {
    const currentActive = document.querySelector(".tab-panel.active");
    if (currentActive) currentActive.classList.add("print-active");
  }

  window.print();
}

function exportDataCSV() {
  const quarter = state.currentQuarter;
  const qData = state.indicators[quarter];
  let csvContent = "\uFEFF";
  csvContent += `116年度終身學習四季主題檢核表 - ${qData.title}\n`;
  csvContent += `學員姓名,評量階段,${qData.items.map((_, i) => `指標${i+1}`).join(",")},總得分,指標平均(0~5),學習階段,達成率(%),進步分數,進步率(%)\n`;

  state.learners.forEach(l => {
    const stats = calculateLearnerQuarterStats(l, quarter);
    const qScores = l.scores[quarter];
    const preArr = qScores.pre.slice(0, stats.itemCount);
    const midArr = qScores.mid.slice(0, stats.itemCount);
    const postArr = qScores.post.slice(0, stats.itemCount);

    csvContent += `"${l.name}","1.前測",${preArr.join(",")},${stats.sumPre},${stats.avgPre},"-",${stats.achievePre}%,"-","-"\n`;
    csvContent += `"${l.name}","2.課堂",${midArr.join(",")},${stats.sumMid},${stats.avgMid},"-",${stats.achieveMid}%,"-","-"\n`;
    csvContent += `"${l.name}","3.後測",${postArr.join(",")},${stats.sumPost},${stats.avgPost},"${stats.stageInfo.name}",${stats.achievePost}%,${stats.growthScore >= 0 ? '+' : ''}${stats.growthScore},${stats.growthRate >= 0 ? '+' : ''}${stats.growthRate}%\n`;
  });

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `116年度終身學習評量_${quarter}_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast("已成功匯出 CSV 試算表（支援 Excel 繁體中文開啟）", "success");
}

function renderBlankSheet() {
  const container = document.getElementById("blankSheetContainer");
  if (!container) return;
  const quarter = state.currentQuarter;
  const qData = state.indicators[quarter];

  let itemsHtml = "";
  qData.items.forEach((itemText, idx) => {
    let scoreBoxes = "";
    SCORE_LEVELS.forEach(lvl => {
      scoreBoxes += `
        <div class="blank-score-box">
          <span>${lvl.score}</span>
          <span class="score-lbl">${lvl.label.split(' ')[0]}</span>
        </div>
      `;
    });

    itemsHtml += `
      <div class="blank-ind-row">
        <div class="blank-ind-num">${idx + 1}</div>
        <div class="blank-ind-desc">${itemText}</div>
        <div class="blank-score-group">${scoreBoxes}</div>
      </div>
    `;
  });

  container.innerHTML = `
    <div class="blank-doc-header">
      <div class="blank-org-title">${state.config.subTitle}</div>
      <div class="blank-main-title">${state.config.mainTitle}</div>
      <div class="blank-theme-title">${qData.title} - 實施評量表</div>
    </div>

    <div class="blank-meta-grid">
      <div><strong>評量學員姓名：</strong>___________________</div>
      <div><strong>評量階段：</strong>【 □ 第1月：前測基準 　□ 第2月：課堂平時 　□ 第3月：後測驗收 】</div>
      <div><strong>評量日期：</strong>民國 ______ 年 ______ 月 ______ 日</div>
    </div>

    <div class="blank-standard-bar">
      <strong>【提示等級評分標準】</strong>
      <span>5:獨立完成(＋)</span> ｜ 
      <span>4:口語提醒(Ｖ)</span> ｜ 
      <span>3:部分肢體協助(Ｐ)</span> ｜ 
      <span>2:部分協助</span> ｜ 
      <span>1:尚未學會(－)</span> ｜ 
      <span>0:無法配合</span>
    </div>

    <div class="blank-indicators-list">
      ${itemsHtml}
    </div>

    <div class="blank-summary-box">
      <div class="blank-summary-row">
        <div><strong>總得分：</strong>_______ / ${qData.items.length * 5} 分</div>
        <div><strong>指標平均：</strong>_______ 分 (滿分 5.0)</div>
        <div><strong>自立階段判定：</strong>
          【 □ 🟢 獨立 (4.5~5.0) 　□ 🔵 口語 (3.5~4.4) 　□ 🟡 肢協/部分 (2.0~3.4) 　□ 🟠 未學 (0~1.9) 】
        </div>
      </div>
      <div style="margin-top: 0.6rem;">
        <strong>個別化支持策略與課堂觀察紀錄：</strong>
        <div style="border-bottom: 1px dashed #cbd5e1; height: 24px; margin-top: 4px;"></div>
        <div style="border-bottom: 1px dashed #cbd5e1; height: 24px; margin-top: 4px;"></div>
      </div>
    </div>

    <div class="blank-signature-row">
      <div>教保員 / 評量者簽章：____________________</div>
      <div>專業督導簽章：____________________</div>
      <div>機構主管核閱：____________________</div>
    </div>
  `;
}

// 8. Global Events Attachment
function attachEvents() {
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const tabId = btn.getAttribute("data-tab");
      switchTab(tabId);
      if (tabId === "tab-blank-sheet") {
        renderBlankSheet();
      }
    });
  });

  document.querySelectorAll(".season-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".season-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.currentQuarter = btn.getAttribute("data-quarter");
      renderLearnerChips();
      renderScoringMatrix();
      updateBanner();
      updateKpiCards();
      renderProgressTable();
      renderIspCards();
      renderIndicatorsManager();
      renderBlankSheet();
      updateCharts();
    });
  });

  document.querySelectorAll(".stage-step-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".stage-step-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.currentStage = btn.getAttribute("data-stage");
      renderScoringMatrix();
      updateBanner();
    });
  });

  document.getElementById("filterLearnerInput")?.addEventListener("input", renderProgressTable);
  document.getElementById("filterStageSelect")?.addEventListener("change", renderProgressTable);

  document.getElementById("btnQuickFillSample")?.addEventListener("click", () => {
    const learner = state.learners.find(l => l.id === state.currentLearnerId);
    if (!learner) return;
    const quarter = state.currentQuarter;
    const stage = state.currentStage;
    const n = state.indicators[quarter].items.length;

    if (stage === "pre") learner.scores[quarter].pre = Array(n).fill(3);
    else if (stage === "mid") learner.scores[quarter].mid = Array(n).fill(4);
    else learner.scores[quarter].post = Array(n).fill(5);

    saveData();
    renderScoringMatrix();
    updateBanner();
    updateKpiCards();
    renderProgressTable();
    renderIspCards();
    updateCharts();
    showToast("已快速填入標準示範評分", "info");
  });

  document.getElementById("btnEditAppTitle")?.addEventListener("click", openEditTitleModal);
  document.getElementById("btnCloseEditTitleModal")?.addEventListener("click", closeEditTitleModal);
  document.getElementById("btnCancelEditTitle")?.addEventListener("click", closeEditTitleModal);
  document.getElementById("btnSaveEditTitle")?.addEventListener("click", () => {
    const mainTitle = document.getElementById("inputAppMainTitle").value.trim();
    const subTitle = document.getElementById("inputAppSubTitle").value.trim();
    const orgName = document.getElementById("inputAppOrgName").value.trim();
    if (!mainTitle) {
      alert("主標題不可為空！");
      return;
    }
    state.config.mainTitle = mainTitle;
    state.config.subTitle = subTitle;
    state.config.orgName = orgName;
    saveData();
    applyAppConfig();
    renderBlankSheet();
    closeEditTitleModal();
    showToast("系統標題與機構資訊已更新！", "success");
  });

  document.getElementById("btnEditQuarterTheme")?.addEventListener("click", openEditQuarterModal);
  document.getElementById("btnEditCurrentQuarterDirect")?.addEventListener("click", openEditQuarterModal);
  document.getElementById("btnCloseEditQuarterModal")?.addEventListener("click", closeEditQuarterModal);
  document.getElementById("btnCancelEditQuarter")?.addEventListener("click", closeEditQuarterModal);
  document.getElementById("btnSaveEditQuarter")?.addEventListener("click", () => {
    const q = state.currentQuarter;
    const titleVal = document.getElementById("inputQuarterThemeTitle").value.trim();
    const tabVal = document.getElementById("inputQuarterShortTab").value.trim();
    if (!titleVal) {
      alert("主題名稱不可為空！");
      return;
    }
    state.indicators[q].title = titleVal;
    state.indicators[q].tabName = tabVal || titleVal;
    saveData();
    applyAppConfig();
    renderScoringMatrix();
    renderProgressTable();
    renderIspCards();
    renderIndicatorsManager();
    renderBlankSheet();
    closeEditQuarterModal();
    showToast("季度主題名稱已更新！", "success");
  });

  document.getElementById("btnCloseEditIndicatorModal")?.addEventListener("click", closeIndicatorModal);
  document.getElementById("btnCancelEditIndicator")?.addEventListener("click", closeIndicatorModal);
  document.getElementById("btnSaveEditIndicator")?.addEventListener("click", () => {
    const idx = parseInt(document.getElementById("editIndicatorIdxHidden").value, 10);
    const newText = document.getElementById("inputIndicatorText").value.trim();
    if (!newText) {
      alert("指標內容不可為空！");
      return;
    }
    state.indicators[state.currentQuarter].items[idx] = newText;
    saveData();
    renderScoringMatrix();
    renderIndicatorsManager();
    renderBlankSheet();
    updateCharts();
    closeIndicatorModal();
    showToast(`指標 ${idx + 1} 修改成功！`, "success");
  });

  document.getElementById("btnAddNewLearner")?.addEventListener("click", () => openLearnerModal());
  document.getElementById("btnCloseLearnerModal")?.addEventListener("click", closeLearnerModal);
  document.getElementById("btnCancelLearnerModal")?.addEventListener("click", closeLearnerModal);
  document.getElementById("btnSaveLearnerModal")?.addEventListener("click", () => {
    const hiddenId = document.getElementById("editLearnerIdHidden").value;
    const name = document.getElementById("learnerModalName").value.trim();
    const newId = document.getElementById("learnerModalId").value.trim() || `L${String(state.learners.length + 1).padStart(2, '0')}`;
    const notes = document.getElementById("learnerModalNotes").value.trim();

    if (!name) {
      alert("請輸入學員姓名！");
      return;
    }

    if (hiddenId) {
      const existing = state.learners.find(l => l.id === hiddenId);
      if (existing) {
        existing.name = name;
        existing.notes = notes;
        showToast(`已更新學員資料：${name}`, "success");
      }
    } else {
      const newLearner = {
        id: newId,
        name: name,
        notes: notes,
        scores: {
          Q1: { pre: [2,2,2], mid: [3,3,3], post: [4,4,4] },
          Q2: { pre: [2,2,2,2], mid: [3,3,3,3], post: [4,4,4,4] },
          Q3: { pre: [2,2,2,2,2], mid: [3,3,3,3,3], post: [4,4,4,4,4] },
          Q4: { pre: [2,2,2,2], mid: [3,3,3,3], post: [4,4,4,4] }
        }
      };
      state.learners.push(newLearner);
      state.currentLearnerId = newId;
      showToast(`成功新增學員：${name}`, "success");
    }

    saveData();
    closeLearnerModal();
    renderLearnerChips();
    renderScoringMatrix();
    updateBanner();
    updateKpiCards();
    renderProgressTable();
    renderIspCards();
    updateCharts();
  });

  document.getElementById("btnResetDefaultData")?.addEventListener("click", () => {
    if (confirm("確定要將所有數據還原至手冊預設範例（含宇彤、育萱、高齊、芷嫻等示範分數）嗎？")) {
      state.config = JSON.parse(JSON.stringify(DEFAULT_LIFELONG_CONFIG));
      state.learners = JSON.parse(JSON.stringify(DEFAULT_LIFELONG_LEARNERS));
      state.indicators = JSON.parse(JSON.stringify(DEFAULT_LIFELONG_INDICATORS));
      state.currentLearnerId = "L01";
      saveData();
      applyAppConfig();
      renderLearnerChips();
      renderScoringMatrix();
      updateBanner();
      updateKpiCards();
      renderProgressTable();
      renderIspCards();
      renderIndicatorsManager();
      renderBlankSheet();
      updateCharts();
      showToast("已成功還原預設示範資料！", "success");
    }
  });

  document.getElementById("btnClearAllScores")?.addEventListener("click", () => {
    if (confirm("確定要清空所有學員的分數嗎？（將保留學員名冊，但分數全數歸零空白以供全新評分）")) {
      state.learners.forEach(l => {
        ["Q1", "Q2", "Q3", "Q4"].forEach(q => {
          const count = state.indicators[q].items.length;
          l.scores[q] = {
            pre: Array(count).fill(0),
            mid: Array(count).fill(0),
            post: Array(count).fill(0)
          };
        });
      });
      saveData();
      renderLearnerChips();
      renderScoringMatrix();
      updateBanner();
      updateKpiCards();
      renderProgressTable();
      renderIspCards();
      updateCharts();
      showToast("已成功清空所有分數，可開始全新打分！", "success");
    }
  });

  document.getElementById("btnPrintBlankTemplateDirect")?.addEventListener("click", () => {
    switchTab("tab-blank-sheet");
    renderBlankSheet();
    setTimeout(() => triggerPrint("tab-blank-sheet"), 100);
  });

  document.getElementById("btnOpenBlankTabToolbar")?.addEventListener("click", () => {
    switchTab("tab-blank-sheet");
    renderBlankSheet();
  });

  document.getElementById("btnPrintBlankSheetFromTab1")?.addEventListener("click", () => {
    switchTab("tab-blank-sheet");
    renderBlankSheet();
    setTimeout(() => triggerPrint("tab-blank-sheet"), 100);
  });

  document.getElementById("btnPrintBlankSheetDirect")?.addEventListener("click", () => {
    triggerPrint("tab-blank-sheet");
  });

  document.getElementById("btnExportExcel")?.addEventListener("click", exportDataCSV);

  document.getElementById("btnPrintReport")?.addEventListener("click", () => triggerPrint());
  document.getElementById("btnPrintScoringSheet")?.addEventListener("click", () => triggerPrint("tab-scoring"));
  document.getElementById("btnPrintSummaryTable")?.addEventListener("click", () => triggerPrint("tab-progress-table"));
  document.getElementById("btnPrintCharts")?.addEventListener("click", () => triggerPrint("tab-charts"));
  document.getElementById("btnPrintIspReport")?.addEventListener("click", () => triggerPrint("tab-isp"));
  document.getElementById("btnPrintBlankSheet")?.addEventListener("click", () => triggerPrint("tab-indicators"));
}

// 9. Initialization
function init() {
  loadData();
  attachEvents();
  renderLearnerChips();
  renderScoringMatrix();
  updateBanner();
  updateKpiCards();
  renderProgressTable();
  renderIspCards();
  renderIndicatorsManager();
  renderBlankSheet();
  updateCharts();
}

window.addEventListener("DOMContentLoaded", init);
