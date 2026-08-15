/**
 * 身心障礙衛教與學習成效評量追蹤系統 (Assessment & Progress Analytics App)
 * 具備完整自訂文字/標題編輯、分頁獨立列印、0~5分評分與 ISP 質性報告生成
 */

// 1. Initial State & Domain Constants
const DEFAULT_APP_CONFIG = {
  mainTitle: "身心障礙衛教與學習成效評量追蹤系統",
  subTitle: "116年度小作所／日照中心健康自立能力階梯評量與 ISP 成效統計",
  orgName: "身心障礙日間服務中心"
};

const DEFAULT_INDICATORS = {
  Q1: {
    tabName: "🧼 第一季 (Q1)：健康衛生與日常照護 (1~3月)",
    title: "第一季 (1~3月)：健康衛生與日常照護",
    items: [
      "能說出需要洗手的時機（如飯前、便後、擤鼻涕後等）",
      "能正確執行內外夾弓大立腕洗手步驟",
      "能將雙手搓洗至乾淨並以流動水沖洗乾淨",
      "能正確拿取牙刷及牙膏並擠出適當量",
      "能維持適當角度（貝氏刷牙法）刷牙",
      "能依序清潔牙齒各區域（內側、外側、咬合面）",
      "能用流動水清潔傷口及周圍髒污",
      "能正確撕開並使用OK繃／透氣膠帶包紮傷口",
      "止鼻血時能保持頭部微前傾並正確加壓止血",
      "止血或傷口護理時，能知道何時需尋求支持者協助"
    ]
  },
  Q2: {
    tabName: "🥗 第二季 (Q2)：健康飲食與身體監測 (4~6月)",
    title: "第二季 (4~6月)：健康飲食與身體監測",
    items: [
      "能分辨紅（少吃）、黃（適量）、綠（天天吃）燈食物",
      "能從菜單或實物中挑選澱粉類（全穀雜糧）食物",
      "能挑選蛋白質（蛋豆魚肉）食物",
      "能主動選擇或夾取蔬菜類食物",
      "能依據均衡飲食原則組合一份完整餐點",
      "能正確操作額溫槍並對準額頭量測",
      "能正確配戴壓脈帶並操作電子血壓計",
      "能脫鞋站穩量測體重並正確讀取數值",
      "能正確夾好血氧機並保持靜止量測",
      "能看懂自己的健康數據並說出異常時需注意的地方"
    ]
  },
  Q3: {
    tabName: "🚨 第三季 (Q3)：緊急事故與健康安全 (7~9月)",
    title: "第三季 (7~9月)：緊急事故與健康安全",
    items: [
      "能辨識活動區域周遭的危險物品（剪刀、熱水等）",
      "遇到緊急或意外狀況時能立即停止原本手邊活動",
      "遇到他人跌倒或發作能協助移開周遭危險物品",
      "能知道同儕癲癇發作時「不可強行壓制或塞東西入嘴」",
      "能聽從指示維持現場安全與通風環境",
      "發生意外事件時能知道需要立刻尋求成人/支持者協助",
      "遇到危急事件時能大聲呼救或通知他人",
      "能說出或指出緊急電話「119」",
      "能清楚說出自己的姓名、所在位置等基本報案資訊",
      "遇到自己無法處理的情況能主動向外界求助"
    ]
  },
  Q4: {
    tabName: "🗣️ 第四季 (Q4)：身體自主與自我倡議 (10~12月)",
    title: "第四季 (10~12月)：身體自主與健康自我倡議",
    items: [
      "能辨識並察覺自己的身體出現不舒服或異常",
      "能準確指出或觸摸自己不舒服的身體部位",
      "能用言語或圖卡表達疼痛（如刺痛、悶痛）或不適感受",
      "能知道身體不適時需第一時間告知支持者或家屬",
      "能說出或指出需要尋求的醫療協助（如看醫生、吃藥）",
      "能正確選擇適合的日用／夜用型衛生用品",
      "能正確完成衛生用品的黏貼與更換完整流程",
      "能妥善包裝並丟棄使用過的衛生用品至垃圾桶",
      "就醫看診時能回答醫師的基本問診問題",
      "能主動向醫師或支持者提出自己的健康疑問"
    ]
  }
};

const SCORE_LEVELS = [
  { score: 5, label: "獨立", desc: "可獨立完成", color: "#15803d" },
  { score: 4, label: "口語", desc: "口語提示", color: "#2563eb" },
  { score: 3, label: "肢體", desc: "肢體協助", color: "#d97706" },
  { score: 2, label: "部分", desc: "部分協助", color: "#ea580c" },
  { score: 1, label: "大量", desc: "大量協助", color: "#dc2626" },
  { score: 0, label: "無法", desc: "無法完成", color: "#991b1b" }
];

const DEFAULT_LEARNERS = [
  {
    id: "S01",
    name: "宇彤",
    notes: "洗手步驟良好，傷口包紮需口語提醒",
    scores: {
      Q1: {
        pre: [3, 3, 2, 3, 2, 3, 3, 3, 3, 3],  // 28
        mid: [4, 4, 3, 4, 3, 4, 3, 4, 3, 4],  // 36
        post: [4, 5, 4, 4, 4, 4, 4, 5, 4, 4]  // 42
      },
      Q2: {
        pre: [3, 3, 3, 3, 3, 3, 3, 3, 3, 4],
        mid: [4, 4, 3, 4, 3, 4, 4, 4, 4, 4],
        post: [4, 5, 4, 5, 4, 5, 4, 5, 4, 4]
      },
      Q3: {
        pre: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        mid: [4, 4, 3, 4, 4, 4, 4, 4, 4, 4],
        post: [4, 5, 4, 5, 4, 4, 5, 4, 4, 4]
      },
      Q4: {
        pre: [3, 3, 3, 3, 3, 3, 3, 3, 4, 4],
        mid: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
        post: [5, 5, 4, 5, 4, 5, 4, 4, 5, 4]
      }
    }
  },
  {
    id: "S02",
    name: "育萱",
    notes: "學習動力高，各項操作皆能迅速掌握",
    scores: {
      Q1: {
        pre: [4, 3, 3, 4, 3, 4, 4, 3, 3, 4],  // 35
        mid: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4],  // 40
        post: [5, 5, 4, 5, 4, 5, 5, 4, 4, 5]  // 46
      },
      Q2: {
        pre: [4, 4, 3, 4, 3, 4, 4, 4, 3, 3],
        mid: [5, 4, 4, 4, 4, 5, 4, 5, 4, 4],
        post: [5, 5, 5, 5, 4, 5, 5, 5, 4, 4]
      },
      Q3: {
        pre: [4, 3, 3, 4, 3, 4, 3, 4, 3, 3],
        mid: [4, 4, 4, 5, 4, 5, 4, 5, 4, 4],
        post: [5, 5, 4, 5, 5, 5, 4, 5, 4, 4]
      },
      Q4: {
        pre: [4, 4, 4, 4, 3, 4, 4, 4, 3, 4],
        mid: [5, 5, 4, 5, 4, 5, 4, 5, 4, 5],
        post: [5, 5, 5, 5, 5, 5, 4, 5, 5, 4]
      }
    }
  },
  {
    id: "S03",
    name: "高齊",
    notes: "初測需較多示範，經結構化教學進步幅度最大",
    scores: {
      Q1: {
        pre: [3, 2, 2, 3, 2, 2, 3, 3, 2, 3],  // 25
        mid: [3, 3, 3, 3, 3, 4, 3, 3, 3, 4],  // 32
        post: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4]  // 40
      },
      Q2: {
        pre: [3, 2, 3, 2, 3, 3, 2, 3, 3, 3],
        mid: [4, 3, 4, 3, 4, 4, 3, 4, 4, 4],
        post: [4, 4, 4, 4, 4, 5, 4, 5, 4, 4]
      },
      Q3: {
        pre: [3, 2, 2, 3, 3, 3, 2, 3, 2, 3],
        mid: [4, 3, 4, 4, 4, 4, 3, 4, 3, 4],
        post: [4, 4, 4, 5, 4, 4, 4, 5, 3, 4]
      },
      Q4: {
        pre: [3, 3, 3, 3, 2, 3, 3, 3, 3, 3],
        mid: [4, 4, 4, 4, 3, 4, 4, 4, 4, 4],
        post: [4, 5, 4, 5, 4, 4, 4, 4, 5, 4]
      }
    }
  },
  {
    id: "S04",
    name: "芷嫻",
    notes: "操作細膩，健康自我表達能力持續增強",
    scores: {
      Q1: {
        pre: [3, 3, 3, 3, 3, 3, 4, 3, 3, 4],  // 32
        mid: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4],  // 40
        post: [5, 4, 4, 4, 5, 4, 4, 4, 5, 5]  // 44
      },
      Q2: {
        pre: [4, 3, 3, 3, 4, 3, 4, 3, 3, 4],
        mid: [4, 4, 4, 4, 4, 4, 5, 4, 4, 4],
        post: [5, 5, 4, 4, 5, 5, 5, 4, 4, 5]
      },
      Q3: {
        pre: [3, 3, 3, 4, 3, 4, 3, 3, 3, 4],
        mid: [4, 4, 4, 4, 4, 5, 4, 4, 4, 4],
        post: [5, 5, 4, 5, 4, 5, 4, 4, 4, 5]
      },
      Q4: {
        pre: [4, 4, 3, 4, 3, 3, 4, 3, 3, 4],
        mid: [4, 4, 4, 5, 4, 4, 5, 4, 4, 5],
        post: [5, 5, 4, 5, 4, 5, 5, 4, 5, 5]
      }
    }
  },
  {
    id: "S05",
    name: "志豪",
    notes: "需要實體教具輔助理解，口語提示反應良好",
    scores: {
      Q1: {
        pre: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],  // 20
        mid: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],  // 30
        post: [4, 3, 3, 4, 3, 4, 3, 4, 3, 4]  // 35
      },
      Q2: {
        pre: [2, 2, 3, 2, 2, 3, 2, 3, 2, 3],
        mid: [3, 3, 3, 3, 3, 4, 3, 4, 3, 3],
        post: [4, 4, 4, 3, 3, 4, 4, 4, 3, 4]
      },
      Q3: {
        pre: [2, 2, 2, 3, 2, 2, 2, 3, 2, 2],
        mid: [3, 3, 3, 4, 3, 3, 3, 4, 3, 3],
        post: [4, 4, 3, 4, 3, 4, 3, 4, 3, 4]
      },
      Q4: {
        pre: [2, 2, 2, 2, 2, 2, 2, 3, 2, 3],
        mid: [3, 3, 3, 3, 3, 3, 4, 4, 3, 3],
        post: [4, 4, 3, 4, 3, 4, 4, 4, 3, 4]
      }
    }
  },
  {
    id: "S06",
    name: "雅婷",
    notes: "基礎良好，能協助同儕進行步驟練習",
    scores: {
      Q1: {
        pre: [4, 4, 3, 3, 4, 3, 4, 3, 4, 4],  // 36
        mid: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4],  // 40
        post: [5, 5, 4, 4, 5, 4, 5, 4, 5, 5]  // 46
      },
      Q2: {
        pre: [4, 4, 3, 4, 3, 4, 4, 4, 4, 4],
        mid: [5, 4, 4, 4, 4, 5, 4, 5, 4, 4],
        post: [5, 5, 5, 4, 5, 5, 5, 5, 4, 5]
      },
      Q3: {
        pre: [4, 3, 4, 4, 3, 4, 4, 4, 4, 4],
        mid: [5, 4, 4, 5, 4, 5, 4, 5, 4, 5],
        post: [5, 5, 5, 5, 4, 5, 5, 5, 4, 5]
      },
      Q4: {
        pre: [4, 4, 4, 4, 3, 4, 4, 4, 4, 4],
        mid: [5, 5, 4, 5, 4, 5, 5, 5, 4, 5],
        post: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5]
      }
    }
  }
];

// App State
let state = {
  config: JSON.parse(JSON.stringify(DEFAULT_APP_CONFIG)),
  currentQuarter: "Q1",
  currentLearnerId: "S01",
  currentStage: "pre", // 'pre', 'mid', 'post'
  activeTab: "tab-scoring",
  learners: [],
  indicators: {}
};

// Charts cache
let charts = {};

// 2. Storage Helpers
function loadData() {
  const savedConfig = localStorage.getItem("assessment_config");
  const savedLearners = localStorage.getItem("assessment_learners");
  const savedIndicators = localStorage.getItem("assessment_indicators");

  if (savedConfig) {
    try {
      state.config = { ...DEFAULT_APP_CONFIG, ...JSON.parse(savedConfig) };
    } catch (e) {
      state.config = JSON.parse(JSON.stringify(DEFAULT_APP_CONFIG));
    }
  } else {
    state.config = JSON.parse(JSON.stringify(DEFAULT_APP_CONFIG));
  }

  if (savedLearners) {
    try {
      state.learners = JSON.parse(savedLearners);
    } catch (e) {
      state.learners = JSON.parse(JSON.stringify(DEFAULT_LEARNERS));
    }
  } else {
    state.learners = JSON.parse(JSON.stringify(DEFAULT_LEARNERS));
  }

  if (savedIndicators) {
    try {
      state.indicators = JSON.parse(savedIndicators);
    } catch (e) {
      state.indicators = JSON.parse(JSON.stringify(DEFAULT_INDICATORS));
    }
  } else {
    state.indicators = JSON.parse(JSON.stringify(DEFAULT_INDICATORS));
  }

  if (!state.learners.find(l => l.id === state.currentLearnerId) && state.learners.length > 0) {
    state.currentLearnerId = state.learners[0].id;
  }

  applyAppConfig();
}

function saveData() {
  localStorage.setItem("assessment_config", JSON.stringify(state.config));
  localStorage.setItem("assessment_learners", JSON.stringify(state.learners));
  localStorage.setItem("assessment_indicators", JSON.stringify(state.indicators));
}

function applyAppConfig() {
  document.getElementById("appMainTitle").innerText = state.config.mainTitle;
  document.getElementById("appSubTitle").innerText = state.config.subTitle;
  document.getElementById("printDocTitle").innerText = state.config.mainTitle;
  document.getElementById("printDocSubTitle").innerText = state.config.subTitle;
  document.getElementById("printMetaOrg").innerText = state.config.orgName;

  // Apply tab names
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
    return { name: "獨立自主階段", badgeClass: "ind", icon: "🟢", desc: "可獨立完成，達到完全自立水準" };
  } else if (avgScore >= 3.5) {
    return { name: "口語提示階段", badgeClass: "oral", icon: "🔵", desc: "口語提醒即可完成，基本自立達標" };
  } else if (avgScore >= 2.0) {
    return { name: "肢體/部分協助", badgeClass: "phys", icon: "🟡", desc: "需肢體引導或關鍵步驟協助" };
  } else {
    return { name: "大量協助階段", badgeClass: "much", icon: "🟠", desc: "需密集示範與大部分代為操作" };
  }
}

function calculateLearnerQuarterStats(learner, quarter) {
  const qScores = learner.scores?.[quarter] || {
    pre: [0,0,0,0,0,0,0,0,0,0],
    mid: [0,0,0,0,0,0,0,0,0,0],
    post: [0,0,0,0,0,0,0,0,0,0]
  };

  const sumPre = qScores.pre.reduce((a, b) => a + b, 0);
  const sumMid = qScores.mid.reduce((a, b) => a + b, 0);
  const sumPost = qScores.post.reduce((a, b) => a + b, 0);

  const avgPre = (sumPre / 10).toFixed(1);
  const avgMid = (sumMid / 10).toFixed(1);
  const avgPost = (sumPost / 10).toFixed(1);

  const achievePre = ((sumPre / 50) * 100).toFixed(1);
  const achieveMid = ((sumMid / 50) * 100).toFixed(1);
  const achievePost = ((sumPost / 50) * 100).toFixed(1);

  const growthScore = sumPost - sumPre;
  const growthRate = sumPre > 0 
    ? ((growthScore / sumPre) * 100).toFixed(1)
    : ((growthScore / 50) * 100).toFixed(1);
  const growthPoints = (achievePost - achievePre).toFixed(1);

  const currentStageInfo = getStageInfo(parseFloat(avgPost));

  return {
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

// Top KPI Cards
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

  let totalPost = 0;
  let totalGrowth = 0;
  let totalGrowthRate = 0;
  let passCount = 0;

  state.learners.forEach(l => {
    const stats = calculateLearnerQuarterStats(l, quarter);
    totalPost += stats.sumPost;
    totalGrowth += stats.growthScore;
    totalGrowthRate += stats.growthRate;
    if (stats.avgPost >= 3.5) {
      passCount++;
    }
  });

  const avgPost = (totalPost / count).toFixed(1);
  const avgAchieve = ((avgPost / 50) * 100).toFixed(1);
  const avgGrowth = (totalGrowth / count).toFixed(1);
  const avgGrowthRate = (totalGrowthRate / count).toFixed(1);
  const passRate = ((passCount / count) * 100).toFixed(1);

  document.getElementById("kpiAvgPostScore").innerText = `${avgPost} 分`;
  document.getElementById("kpiAvgAchievement").innerText = `達成率 ${avgAchieve}% (滿分50)`;
  document.getElementById("kpiAvgGrowthScore").innerText = `${avgGrowth >= 0 ? '+' : ''}${avgGrowth} 分`;
  document.getElementById("kpiAvgGrowthRate").innerText = `平均進步率 ${avgGrowthRate >= 0 ? '+' : ''}${avgGrowthRate}%`;
  document.getElementById("kpiPassRate").innerText = `${passRate} %`;
  document.getElementById("kpiPassCount").innerText = `${passCount} / ${count} 人達標`;
}

// Render Learner Quick Bar (with Edit Learner buttons)
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
        <span>👤</span> ${l.name} <small style="opacity:0.85">(${stats.sumPost}分)</small>
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

// Render Scoring Matrix with inline ✏️ edit button for each indicator
function renderScoringMatrix() {
  const quarter = state.currentQuarter;
  const qData = state.indicators[quarter];
  const learner = state.learners.find(l => l.id === state.currentLearnerId);
  const container = document.getElementById("indicatorScoringList");
  container.innerHTML = "";

  document.getElementById("scoringQuarterTitle").innerText = `${qData.title} - 實作評量`;

  if (!learner) {
    container.innerHTML = `<div style="padding:2rem; text-align:center; color:var(--text-muted);">請先新增或選擇學員</div>`;
    return;
  }

  if (!learner.scores) learner.scores = {};
  if (!learner.scores[quarter]) {
    learner.scores[quarter] = {
      pre: [0,0,0,0,0,0,0,0,0,0],
      mid: [0,0,0,0,0,0,0,0,0,0],
      post: [0,0,0,0,0,0,0,0,0,0]
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
          <small>${lvl.label}</small>
        </button>
      `;
    });

    row.innerHTML = `
      <div class="indicator-num">${idx + 1}</div>
      <div class="indicator-desc">
        <div style="display:flex; align-items:center; justify-content:space-between; gap:0.5rem;">
          <span>${itemText}</span>
          <button class="btn-edit-dark btn-edit-ind-inline" data-idx="${idx}" title="編輯此題指標描述" style="flex-shrink:0;">✏️ 編輯</button>
        </div>
      </div>
      <div class="score-selector">${btnHtml}</div>
    `;

    // Click score buttons
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

    // Inline edit indicator
    row.querySelector(".btn-edit-ind-inline")?.addEventListener("click", () => {
      openIndicatorModal(idx, itemText);
    });

    container.appendChild(row);
  });
}

// Update Current Learner Banner
function updateBanner() {
  const learner = state.learners.find(l => l.id === state.currentLearnerId);
  if (!learner) return;

  const quarter = state.currentQuarter;
  const stage = state.currentStage;
  const stageLabels = { pre: "前測基準 (第1月)", mid: "課堂月檢核 (第2月)", post: "後測驗收 (第3月)" };

  const stats = calculateLearnerQuarterStats(learner, quarter);
  const currentScores = learner.scores[quarter][stage];
  const total = currentScores.reduce((a, b) => a + b, 0);
  const avg = (total / 10).toFixed(1);

  document.getElementById("bannerLearnerName").innerText = learner.name;
  document.getElementById("bannerStageName").innerText = `當前：${stageLabels[stage]}`;
  document.getElementById("bannerTotalScore").innerText = total;
  document.getElementById("bannerAvgScore").innerText = avg;

  const badge = document.getElementById("bannerStageBadge");
  badge.className = `stage-badge ${stats.stageInfo.badgeClass}`;
  badge.innerText = `${stats.stageInfo.icon} ${stats.stageInfo.name}`;

  document.getElementById("bannerGrowthDiff").innerText = 
    `後測進步：${stats.growthScore >= 0 ? '+' : ''}${stats.growthScore} 分 (${stats.growthRate >= 0 ? '+' : ''}${stats.growthRate}%)`;
}

// Render Progress Summary Table
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
      <td><span class="score-pill" style="background:#f1f5f9;">${stats.sumPre}</span></td>
      <td><span class="score-pill" style="background:#f1f5f9;">${stats.sumMid}</span></td>
      <td><strong class="score-pill" style="background:#dbeafe; color:#1e40af;">${stats.sumPost}</strong></td>
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

  // Render Class Average Row in Footer
  const n = filtered.length;
  const avgPre = (sumPreTotal / n).toFixed(1);
  const avgMid = (sumMidTotal / n).toFixed(1);
  const avgPost = (sumPostTotal / n).toFixed(1);
  const avgInd = (avgPost / 10).toFixed(1);
  const avgAchieve = ((avgPost / 50) * 100).toFixed(1);
  const avgGrowth = (sumGrowthScore / n).toFixed(1);
  const avgGrowthRate = (sumGrowthRate / n).toFixed(1);
  const avgGrowthPts = (sumGrowthPts / n).toFixed(1);

  tfoot.innerHTML = `
    <tr style="background:#1e3a8a; color:#ffffff; font-weight:700;">
      <td style="color:#ffffff;">全體平均常模</td>
      <td style="color:#ffffff;">${avgPre}</td>
      <td style="color:#ffffff;">${avgMid}</td>
      <td style="color:#93c5fd; font-size:1rem;">${avgPost}</td>
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

// Render ISP Qualitative Narrative Cards
function renderIspCards() {
  const container = document.getElementById("ispListContainer");
  container.innerHTML = "";

  const quarter = state.currentQuarter;
  const qTitle = state.indicators[quarter].title;

  state.learners.forEach(l => {
    const stats = calculateLearnerQuarterStats(l, quarter);

    // Generate smart text
    let narrative = "";
    if (stats.avgPost >= 4.5) {
      narrative = `【優異自立達標】${l.name}在${qTitle}中表現卓越，前測基準為${stats.sumPre}分（達成率${stats.achievePre}%），經本季結構化教學與情境演練，後測得分提升至${stats.sumPost}分（達成率${stats.achievePost}%，進步+${stats.growthScore}分，進步率${stats.growthRate}%）。各項步驟均已達到獨立完成水準（平均${stats.avgPost}分），日常操作無需提示，並能主動協助同儕示範。`;
    } else if (stats.avgPost >= 3.5) {
      narrative = `【基本自立達標】${l.name}在${qTitle}中展現顯著進步，前測得分為${stats.sumPre}分，經3個月階梯教學與分級提示支持，後測成績成長至${stats.sumPost}分（進步分數+${stats.growthScore}分，進步率${stats.growthRate}%，達成率提升${stats.growthPoints}個百分點）。目前各項關鍵步驟在支持者提供口語提醒下均能正確完成（平均${stats.avgPost}分），已具備基本生活自立能力。`;
    } else if (stats.avgPost >= 2.0) {
      narrative = `【操作進階引導】${l.name}在${qTitle}中前測為${stats.sumPre}分，透過課堂實物操作練習與視覺結構引導，後測提升至${stats.sumPost}分（進步+${stats.growthScore}分）。目前處於『肢體/部分協助階段』（平均${stats.avgPost}分），建議後續持續針對弱項步驟進行動作拆解練習，逐步褪除肢體協助。`;
    } else {
      narrative = `【基礎探索建立】${l.name}在${qTitle}中目前前測${stats.sumPre}分、後測${stats.sumPost}分，處於『大量協助與探索階段』。後續支持策略著重於營造安全操作動機、提供多感官教具與密集陪伴示範。`;
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
        showToast(`已複製 ${l.name} 的 ISP 質性評語！`, "success");
      });
    });

    container.appendChild(card);
  });
}

// Render Indicators Management
function renderIndicatorsManager() {
  const container = document.getElementById("indicatorsManageContainer");
  const quarter = state.currentQuarter;
  const qData = state.indicators[quarter];
  container.innerHTML = "";

  const wrap = document.createElement("div");
  wrap.innerHTML = `
    <div style="margin-bottom:1rem; font-weight:700; font-size:1.05rem; color:var(--primary);">
      當前編輯：${qData.title} (共 10 項指標)
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
  const preScores = learners.map(l => calculateLearnerQuarterStats(l, quarter).sumPre);
  const midScores = learners.map(l => calculateLearnerQuarterStats(l, quarter).sumMid);
  const postScores = learners.map(l => calculateLearnerQuarterStats(l, quarter).sumPost);

  // 1. Pre vs Mid vs Post Bar Chart
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
          { label: "3. 後測 (第3月)", data: postScores, backgroundColor: "#1e40af" }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { beginAtZero: true, max: 50, title: { display: true, text: "總分 (滿分50)" } }
        }
      }
    });
  }

  // 2. 10 Indicators Radar Chart
  const ctxRadar = document.getElementById("chartIndicatorRadar")?.getContext("2d");
  if (ctxRadar) {
    if (charts.radar) charts.radar.destroy();
    const indLabels = state.indicators[quarter].items.map((_, i) => `指標 ${i + 1}`);
    
    const preIndAvgs = [];
    const postIndAvgs = [];
    for (let i = 0; i < 10; i++) {
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
          { label: "全體後測平均", data: postIndAvgs, borderColor: "#0d9488", backgroundColor: "rgba(13, 148, 136, 0.25)" }
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

  // 3. Annual Q1~Q4 Growth Trend Line Chart
  const ctxTrend = document.getElementById("chartAnnualTrend")?.getContext("2d");
  if (ctxTrend) {
    if (charts.trend) charts.trend.destroy();
    const qLabels = ["Q1前測", "Q1後測", "Q2前測", "Q2後測", "Q3前測", "Q3後測", "Q4前測", "Q4後測"];
    
    const datasets = learners.map((l, i) => {
      const colors = ["#1e40af", "#0d9488", "#d97706", "#dc2626", "#7c3aed", "#ec4899"];
      const color = colors[i % colors.length];
      const data = [
        calculateLearnerQuarterStats(l, "Q1").sumPre, calculateLearnerQuarterStats(l, "Q1").sumPost,
        calculateLearnerQuarterStats(l, "Q2").sumPre, calculateLearnerQuarterStats(l, "Q2").sumPost,
        calculateLearnerQuarterStats(l, "Q3").sumPre, calculateLearnerQuarterStats(l, "Q3").sumPost,
        calculateLearnerQuarterStats(l, "Q4").sumPre, calculateLearnerQuarterStats(l, "Q4").sumPost
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
          y: { min: 0, max: 50, title: { display: true, text: "得分 (滿分50)" } }
        }
      }
    });
  }

  // 4. Stage Distribution Pie Chart
  const ctxPie = document.getElementById("chartStagePie")?.getContext("2d");
  if (ctxPie) {
    if (charts.pie) charts.pie.destroy();
    let stageCounts = { "獨立自主 (4.5~5.0)": 0, "口語提示 (3.5~4.4)": 0, "肢體/部分協助 (2.0~3.4)": 0, "大量協助 (0.0~1.9)": 0 };
    learners.forEach(l => {
      const stats = calculateLearnerQuarterStats(l, quarter);
      if (stats.avgPost >= 4.5) stageCounts["獨立自主 (4.5~5.0)"]++;
      else if (stats.avgPost >= 3.5) stageCounts["口語提示 (3.5~4.4)"]++;
      else if (stats.avgPost >= 2.0) stageCounts["肢體/部分協助 (2.0~3.4)"]++;
      else stageCounts["大量協助 (0.0~1.9)"]++;
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

// Modals: Learner Add/Edit
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
    idInput.value = `S${String(state.learners.length + 1).padStart(2, '0')}`;
    notesInput.value = "";
  }

  modal.classList.add("show");
}

function closeLearnerModal() {
  document.getElementById("learnerModal").classList.remove("show");
}

// Modals: App Title Edit
function openEditTitleModal() {
  document.getElementById("inputAppMainTitle").value = state.config.mainTitle;
  document.getElementById("inputAppSubTitle").value = state.config.subTitle;
  document.getElementById("inputAppOrgName").value = state.config.orgName;
  document.getElementById("editTitleModal").classList.add("show");
}

function closeEditTitleModal() {
  document.getElementById("editTitleModal").classList.remove("show");
}

// Modals: Quarter Theme Edit
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

// Modals: Single Indicator Edit
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
  // Update print metadata
  const q = state.currentQuarter;
  const qTitle = state.indicators[q].title;
  const today = new Date();
  const dateStr = `民國 ${today.getFullYear() - 1911} 年 ${today.getMonth() + 1} 月 ${today.getDate()} 日`;

  const learner = state.learners.find(l => l.id === state.currentLearnerId);
  const stageLabels = { pre: "第1個月：前測基準", mid: "第2個月：課堂平時/月檢核", post: "第3個月：後測驗收" };

  if (targetTabId === "tab-scoring" && learner) {
    const stats = calculateLearnerQuarterStats(learner, q);
    document.getElementById("printMetaQuarter").innerHTML = `
      <strong>評量學員：</strong><span style="font-size:11pt; font-weight:bold; color:#1e40af;">${learner.name} (${learner.id})</span> &nbsp;|&nbsp; 
      <strong>評量階段：</strong>${stageLabels[state.currentStage]} &nbsp;|&nbsp; 
      <strong>總分：</strong>${learner.scores[q][state.currentStage].reduce((a,b)=>a+b, 0)} / 50 分 &nbsp;|&nbsp;
      <strong>當前階段：</strong>${stats.stageInfo.icon} ${stats.stageInfo.name}
    `;
  } else if (targetTabId === "tab-progress-table") {
    document.getElementById("printMetaQuarter").innerHTML = `
      <strong>報表類型：</strong>全體學員四季學習成效分析總表 &nbsp;|&nbsp; 
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

// Export CSV Function
function exportDataCSV() {
  const quarter = state.currentQuarter;
  const qData = state.indicators[quarter];
  let csvContent = "\uFEFF";
  csvContent += `116年度衛教學習成效評量表 - ${qData.title}\n`;
  csvContent += "學員姓名,評量階段,指標1,指標2,指標3,指標4,指標5,指標6,指標7,指標8,指標9,指標10,總得分(滿分50),指標平均(0~5),學習階段,達成率(%),進步分數,進步率(%)\n";

  state.learners.forEach(l => {
    const stats = calculateLearnerQuarterStats(l, quarter);
    const qScores = l.scores[quarter];
    csvContent += `"${l.name}","1.前測",${qScores.pre.join(",")},${stats.sumPre},${stats.avgPre},"-",${stats.achievePre}%,"-","-"\n`;
    csvContent += `"${l.name}","2.課堂",${qScores.mid.join(",")},${stats.sumMid},${stats.avgMid},"-",${stats.achieveMid}%,"-","-"\n`;
    csvContent += `"${l.name}","3.後測",${qScores.post.join(",")},${stats.sumPost},${stats.avgPost},"${stats.stageInfo.name}",${stats.achievePost}%,${stats.growthScore >= 0 ? '+' : ''}${stats.growthScore},${stats.growthRate >= 0 ? '+' : ''}${stats.growthRate}%\n`;
  });

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `116年度衛教評量統計_${quarter}_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast("已成功匯出 CSV 試算表（支援 Excel 繁體中文開啟）", "success");
}

// 8. Global Events Attachment
function attachEvents() {
  // Tab Switcher
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      switchTab(btn.getAttribute("data-tab"));
    });
  });

  // Quarter Buttons
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
      updateCharts();
    });
  });

  // Stage Switcher
  document.querySelectorAll(".stage-step-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".stage-step-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.currentStage = btn.getAttribute("data-stage");
      renderScoringMatrix();
      updateBanner();
    });
  });

  // Search & Filter
  document.getElementById("filterLearnerInput")?.addEventListener("input", renderProgressTable);
  document.getElementById("filterStageSelect")?.addEventListener("change", renderProgressTable);

  // Quick fill sample
  document.getElementById("btnQuickFillSample")?.addEventListener("click", () => {
    const learner = state.learners.find(l => l.id === state.currentLearnerId);
    if (!learner) return;
    const quarter = state.currentQuarter;
    const stage = state.currentStage;
    if (stage === "pre") learner.scores[quarter].pre = [3, 3, 2, 3, 2, 3, 3, 3, 2, 3];
    else if (stage === "mid") learner.scores[quarter].mid = [4, 4, 3, 4, 3, 4, 4, 4, 3, 4];
    else learner.scores[quarter].post = [5, 4, 4, 4, 4, 5, 4, 5, 4, 4];
    saveData();
    renderScoringMatrix();
    updateBanner();
    updateKpiCards();
    renderProgressTable();
    renderIspCards();
    updateCharts();
    showToast("已快速填入標準範例評分", "info");
  });

  // Edit App Title Trigger
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
    closeEditTitleModal();
    showToast("系統標題與機構資訊已更新！", "success");
  });

  // Edit Quarter Theme Trigger
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
    closeEditQuarterModal();
    showToast("季度主題名稱已更新！", "success");
  });

  // Edit Single Indicator Modal Events
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
    updateCharts();
    closeIndicatorModal();
    showToast(`指標 ${idx + 1} 修改成功！`, "success");
  });

  // Learner Modal Events (Add / Edit)
  document.getElementById("btnAddNewLearner")?.addEventListener("click", () => openLearnerModal());
  document.getElementById("btnCloseLearnerModal")?.addEventListener("click", closeLearnerModal);
  document.getElementById("btnCancelLearnerModal")?.addEventListener("click", closeLearnerModal);
  document.getElementById("btnSaveLearnerModal")?.addEventListener("click", () => {
    const hiddenId = document.getElementById("editLearnerIdHidden").value;
    const name = document.getElementById("learnerModalName").value.trim();
    const newId = document.getElementById("learnerModalId").value.trim() || `S${String(state.learners.length + 1).padStart(2, '0')}`;
    const notes = document.getElementById("learnerModalNotes").value.trim();

    if (!name) {
      alert("請輸入學員姓名！");
      return;
    }

    if (hiddenId) {
      // Editing existing learner
      const existing = state.learners.find(l => l.id === hiddenId);
      if (existing) {
        existing.name = name;
        existing.notes = notes;
        showToast(`已更新學員資料：${name}`, "success");
      }
    } else {
      // Add new learner
      const newLearner = {
        id: newId,
        name: name,
        notes: notes,
        scores: {
          Q1: { pre: [2,2,2,2,2,2,2,2,2,2], mid: [3,3,3,3,3,3,3,3,3,3], post: [4,4,4,4,4,4,4,4,4,4] },
          Q2: { pre: [2,2,2,2,2,2,2,2,2,2], mid: [3,3,3,3,3,3,3,3,3,3], post: [4,4,4,4,4,4,4,4,4,4] },
          Q3: { pre: [2,2,2,2,2,2,2,2,2,2], mid: [3,3,3,3,3,3,3,3,3,3], post: [4,4,4,4,4,4,4,4,4,4] },
          Q4: { pre: [2,2,2,2,2,2,2,2,2,2], mid: [3,3,3,3,3,3,3,3,3,3], post: [4,4,4,4,4,4,4,4,4,4] }
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

  // Reset to default sample
  document.getElementById("btnResetDefaultData")?.addEventListener("click", () => {
    if (confirm("確定要將所有數據還原至手冊預設範例（含宇彤等學員示範分數）嗎？")) {
      state.config = JSON.parse(JSON.stringify(DEFAULT_APP_CONFIG));
      state.learners = JSON.parse(JSON.stringify(DEFAULT_LEARNERS));
      state.indicators = JSON.parse(JSON.stringify(DEFAULT_INDICATORS));
      state.currentLearnerId = "S01";
      saveData();
      applyAppConfig();
      renderLearnerChips();
      renderScoringMatrix();
      updateBanner();
      updateKpiCards();
      renderProgressTable();
      renderIspCards();
      renderIndicatorsManager();
      updateCharts();
      showToast("已成功還原預設示範資料！", "success");
    }
  });

  // Clear all scores to blank
  document.getElementById("btnClearAllScores")?.addEventListener("click", () => {
    if (confirm("確定要清空所有學員的分數嗎？（將保留學員名冊，但分數全數歸零空白以供全新評分）")) {
      state.learners.forEach(l => {
        ["Q1", "Q2", "Q3", "Q4"].forEach(q => {
          l.scores[q] = {
            pre: [0,0,0,0,0,0,0,0,0,0],
            mid: [0,0,0,0,0,0,0,0,0,0],
            post: [0,0,0,0,0,0,0,0,0,0]
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

  // Download Blank Excel
  document.getElementById("btnDownloadBlankExcel")?.addEventListener("click", () => {
    const link = document.createElement("a");
    link.href = "116年度衛教與學習成效評量分析表_空白範本檔.xlsx";
    link.download = "116年度衛教與學習成效評量分析表_空白範本檔.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("已開始下載【空白 Excel 範本檔】", "success");
  });

  // Export CSV
  document.getElementById("btnExportExcel")?.addEventListener("click", exportDataCSV);

  // Dedicated Print Buttons
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
  updateCharts();
}

window.addEventListener("DOMContentLoaded", init);
