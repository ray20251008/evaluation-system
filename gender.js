/**
 * 性別平等教育與學習成效評量追蹤系統 (Gender Equality Progress Analytics App)
 * 比照 116 年度衛教與終身學習標準架構開發
 * 具備完整自訂文字/標題編輯、分頁獨立列印、0~5分提示等級打分與 ISP 質性報告生成
 */

const DEFAULT_GENDER_CONFIG = {
  mainTitle: "116年度 性別平等教育領域 四季主題課程規劃與學習檢核表",
  subTitle: "財團法人天主教嘉義教區附設雲林縣私立華聖家園_瑞翔社區日間作業所",
  orgName: "瑞翔社區日間作業所"
};

const DEFAULT_GENDER_INDICATORS = {
  Q1: {
    tabName: "🛡️ 第一季 (Q1)：身體界線、隱私保護與自我防衛 (1~3月)",
    title: "第一季 (1~3月)：身體界線、隱私保護與自我防衛",
    items: [
      "能正確認識身體私密部位（紅綠燈概念：泳衣覆蓋處、胸部、臀部、大腿內側、生殖器等為紅燈不可碰觸區）",
      "能分辨安全碰觸與不安全碰觸（好碰觸如禮貌握手 vs 壞碰觸如未經同意觸摸、強行擁抱）",
      "遇到令人不舒服或侵犯身體界線的碰觸時，能明確表達拒絕（如大聲說「請不要碰我」、「不行」）",
      "遭遇冒犯、騷擾或危險情境時，能迅速離開現場並向教保員/信任支持者大聲呼救與通報",
      "能尊重他人身體自主權，未經他人同意不隨意觸碰他人身體或靠得太近，保持合宜社交距離",
      "如廁、更衣或洗澡時，能主動關門或拉上浴簾，確實維護個人隱私",
      "在公共場合能維持合宜衣著整齊，不隨意在他人面前掀開衣物或暴露身體",
      "能辨識自己與同儕的個人專屬物品與隱私空間，不未經同意翻看或拿取他人私人物品",
      "遇到他人強迫脫衣或拍攝身體部位時，能堅定拒絕並立刻告訴支持者或家長",
      "當目睹同儕遭受身體冒犯或不當對待時，能主動告知教保員協助處理"
    ]
  },
  Q2: {
    tabName: "🤝 第二季 (Q2)：人際互動、情感表達與社交界線 (4~6月)",
    title: "第二季 (4~6月)：人際互動、情感表達與社交界線",
    items: [
      "能區分不同對象（陌生人、點頭之交、同儕朋友、家人）之合宜互動方式與肢體界線",
      "能用適當且合宜的方式表達對他人的喜愛或友善（如言語問好、揮手微笑，而非強行擁抱或親吻）",
      "能辨識他人的情緒反應與肢體語言（如對方皺眉、後退、抗拒、不耐煩時能及時察覺）",
      "當對方明確表達拒絕或不想互動時，能尊重對方意願並立即停止該項行為",
      "遇到人際摩擦、情感困擾或誤會時，能尋求支持者協助溝通，不以肢體衝突或言語攻擊解決",
      "學習在同儕團體中輪流發言與傾聽，不隨意打斷他人或使用貶抑性言詞",
      "與異性或同性同儕相處時，能保持互相尊重與友善互助之態度",
      "能理解「開玩笑要有分寸」，不拿他人的身材、性別特徵或外貌開玩笑",
      "能主動參與團體合作活動，並在分工中展現良好的互動禮儀",
      "遇到自己或同儕被孤立、排擠時，能主動尋求支持者協助促進良性互動"
    ]
  },
  Q3: {
    tabName: "⚖️ 第三季 (Q3)：性別平等、破除刻板印象與分工 (7~9月)",
    title: "第三季 (7~9月)：性別平等、破除刻板印象與分工合作",
    items: [
      "能理解性別無優劣之分，破除傳統性別職業與性格刻板印象（如男生可細心做代工/烹飪，女生可搬運/修繕）",
      "在小作所日常作業活動中，男女學員均能均等參與、分工合作與互相支援",
      "在環境清潔維護與家事操作中，不分性別共同承擔並確實完成指派工作",
      "認識不同性別之生理特徵與差異，並能以健康、尊重的態度看待，不嘲笑他人",
      "能依場合挑選乾淨、合宜且得體的服裝穿著，維持良好個人儀容與適當性別展現",
      "尊重每個人不同的興趣、專長與個人選擇，不因性別特質而排擠他人",
      "能理解每個人都有表達情緒的權利（如男生也可以哭泣表達悲傷、女生也可以勇敢表達意見）",
      "學習以平等的態度與不同性別同儕進行代工包裝或手作產品之分工",
      "能說出「男女平等」的核心概念並在日常生活中實踐互相尊重",
      "能在作業所會議或課堂中，支持並尊重不同性別同儕的意見與提案"
    ]
  },
  Q4: {
    tabName: "🌐 第四季 (Q4)：親密關係、網路交友與自我倡議 (10~12月)",
    title: "第四季 (10~12月)：親密關係、網路安全與性別自我倡議",
    items: [
      "理解交往與親密關係必須建立在「雙方自願、平等且彼此尊重」的基礎上，不可強迫他人",
      "具備網路交友安全意識，不隨意在通訊軟體或社群網路上傳送或索取自己與他人的私密照片",
      "遇到陌生網友提出單獨見面、借錢或可疑要求時，能第一時間告知支持者/家長，不私自赴約",
      "認識性騷擾與性侵害防治觀念，能說出求助專線（如113保護專線、110報案）或向機構提出申訴",
      "正確理解生理期照護與個人衛生保健自我管理流程（男女均具備基本保健知能）",
      "能在個別化支持會議（ISP）或日常生活中，主動表達個人在情感、身心健康與性別平權上的需求",
      "能辨識日常生活中的不友善或性別歧視言行，並能向支持者反映",
      "理解隱私權受法律保障，知道任何人都不能隨意散布或威脅公開他人私密資訊",
      "能在遇到情感挫折或被拒絕時，適當調適情緒並尊重對方的決定",
      "能主動倡議自我權益，並以友善包容的態度營造性別平等的友善環境"
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

const DEFAULT_GENDER_LEARNERS = [
  {
    id: "S01",
    name: "宇彤",
    notes: "隱私保護觀念佳，人際溝通遇爭執能主動向支持者傾訴",
    scores: {
      Q1: {
        pre: [3, 3, 2, 3, 3, 3, 3, 2, 3, 3],  // 28
        mid: [4, 4, 3, 4, 4, 4, 4, 3, 4, 4],  // 39
        post: [4, 5, 4, 4, 5, 4, 4, 4, 4, 4]  // 42
      },
      Q2: {
        pre: [3, 3, 3, 3, 3, 3, 3, 3, 3, 4],
        mid: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
        post: [5, 4, 4, 5, 4, 4, 5, 4, 4, 5]
      },
      Q3: {
        pre: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        mid: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
        post: [4, 5, 4, 4, 4, 5, 4, 4, 4, 5]
      },
      Q4: {
        pre: [3, 3, 3, 3, 3, 3, 3, 3, 3, 5],
        mid: [4, 4, 4, 4, 4, 4, 4, 4, 4, 5],
        post: [5, 4, 5, 4, 5, 4, 4, 4, 5, 5]
      }
    }
  },
  {
    id: "S02",
    name: "育萱",
    notes: "具備高度性別平權與身體界線意識，能主動示範合宜社交禮儀",
    scores: {
      Q1: {
        pre: [4, 3, 4, 3, 4, 3, 4, 3, 3, 4],  // 35
        mid: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4],  // 40
        post: [5, 5, 5, 4, 5, 4, 5, 4, 4, 5]  // 46
      },
      Q2: {
        pre: [4, 3, 4, 3, 4, 4, 3, 4, 3, 4],
        mid: [4, 4, 5, 4, 5, 4, 4, 5, 4, 5],
        post: [5, 5, 5, 5, 5, 4, 5, 4, 4, 5]
      },
      Q3: {
        pre: [4, 3, 4, 3, 3, 4, 3, 4, 3, 3],
        mid: [5, 4, 4, 4, 5, 4, 4, 5, 4, 5],
        post: [5, 5, 5, 4, 5, 4, 5, 4, 4, 5]
      },
      Q4: {
        pre: [4, 4, 4, 4, 3, 4, 3, 4, 4, 4],
        mid: [5, 5, 5, 5, 4, 5, 4, 5, 5, 5],
        post: [5, 5, 5, 5, 5, 4, 5, 4, 5, 5]
      }
    }
  },
  {
    id: "S03",
    name: "高齊",
    notes: "初測時社交界線需較多提醒，經情境演練後已能合宜互動",
    scores: {
      Q1: {
        pre: [3, 2, 2, 3, 2, 3, 3, 2, 2, 3],  // 25
        mid: [4, 3, 3, 3, 3, 4, 3, 3, 3, 4],  // 33
        post: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4]  // 40
      },
      Q2: {
        pre: [3, 2, 3, 2, 3, 3, 2, 3, 3, 3],
        mid: [4, 3, 4, 3, 4, 4, 3, 4, 3, 4],
        post: [5, 4, 4, 4, 4, 4, 4, 5, 4, 4]
      },
      Q3: {
        pre: [3, 2, 2, 3, 2, 3, 3, 2, 3, 3],
        mid: [4, 3, 4, 3, 4, 4, 3, 4, 3, 4],
        post: [4, 4, 5, 4, 4, 4, 4, 4, 4, 4]
      },
      Q4: {
        pre: [3, 3, 3, 3, 2, 3, 3, 3, 3, 3],
        mid: [4, 4, 4, 4, 3, 4, 4, 4, 4, 4],
        post: [5, 4, 4, 4, 4, 4, 5, 4, 4, 5]
      }
    }
  },
  {
    id: "S04",
    name: "芷嫻",
    notes: "人際相處細膩有禮，網路交友與防詐觀念清楚",
    scores: {
      Q1: {
        pre: [3, 3, 3, 3, 4, 3, 3, 3, 3, 4],  // 32
        mid: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4],  // 40
        post: [5, 4, 4, 5, 5, 4, 4, 5, 4, 4]  // 44
      },
      Q2: {
        pre: [3, 3, 4, 3, 4, 3, 4, 3, 3, 4],
        mid: [4, 4, 5, 4, 5, 4, 5, 4, 4, 5],
        post: [5, 5, 5, 4, 5, 4, 5, 4, 4, 5]
      },
      Q3: {
        pre: [3, 3, 3, 3, 4, 3, 4, 3, 3, 4],
        mid: [4, 4, 4, 4, 5, 4, 5, 4, 4, 5],
        post: [5, 4, 5, 4, 5, 4, 5, 4, 4, 5]
      },
      Q4: {
        pre: [4, 3, 4, 3, 4, 3, 4, 3, 3, 4],
        mid: [4, 4, 5, 4, 5, 4, 5, 4, 4, 5],
        post: [5, 5, 5, 4, 5, 4, 5, 5, 4, 5]
      }
    }
  },
  {
    id: "S05",
    name: "志豪",
    notes: "自我防衛與呼救反應敏銳，需持續增強性別分工意識",
    scores: {
      Q1: {
        pre: [2, 2, 2, 3, 2, 2, 2, 2, 2, 3],  // 22
        mid: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],  // 30
        post: [4, 3, 4, 4, 3, 4, 3, 3, 3, 4]  // 35
      },
      Q2: {
        pre: [2, 2, 3, 2, 2, 3, 2, 2, 3, 3],
        mid: [3, 3, 4, 3, 3, 4, 3, 3, 4, 4],
        post: [4, 4, 4, 4, 4, 4, 3, 4, 4, 4]
      },
      Q3: {
        pre: [2, 2, 2, 3, 2, 3, 2, 2, 3, 3],
        mid: [3, 3, 4, 3, 3, 4, 3, 3, 4, 4],
        post: [4, 3, 4, 4, 4, 4, 4, 3, 4, 4]
      },
      Q4: {
        pre: [2, 2, 3, 2, 2, 3, 3, 2, 3, 3],
        mid: [3, 3, 4, 3, 3, 4, 4, 3, 4, 4],
        post: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4]
      }
    }
  },
  {
    id: "S06",
    name: "雅婷",
    notes: "整體性別平等知能表現優異，能擔任課堂分組小組長",
    scores: {
      Q1: {
        pre: [4, 3, 4, 3, 4, 4, 3, 4, 3, 4],  // 36
        mid: [4, 4, 5, 4, 5, 4, 4, 5, 4, 5],  // 44
        post: [5, 5, 5, 4, 5, 5, 4, 5, 4, 4]  // 46
      },
      Q2: {
        pre: [4, 4, 4, 4, 3, 4, 4, 4, 3, 4],
        mid: [5, 5, 5, 5, 4, 5, 5, 5, 4, 5],
        post: [5, 5, 5, 5, 5, 5, 5, 5, 4, 5]
      },
      Q3: {
        pre: [4, 4, 4, 4, 4, 4, 4, 4, 3, 4],
        mid: [5, 5, 5, 5, 5, 5, 5, 5, 4, 5],
        post: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5]
      },
      Q4: {
        pre: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
        mid: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
        post: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5]
      }
    }
  }
];

// App State
let state = {
  config: JSON.parse(JSON.stringify(DEFAULT_GENDER_CONFIG)),
  currentQuarter: "Q1",
  currentLearnerId: "S01",
  currentStage: "pre", // 'pre', 'mid', 'post'
  activeTab: "tab-scoring",
  learners: [],
  indicators: {}
};

let chartInstances = {};

// 2. Storage Helpers
function loadData() {
  const savedConfig = localStorage.getItem("gender_v4_config");
  const savedLearners = localStorage.getItem("gender_v4_learners");
  const savedIndicators = localStorage.getItem("gender_v4_indicators");

  if (savedConfig) {
    try {
      state.config = { ...DEFAULT_GENDER_CONFIG, ...JSON.parse(savedConfig) };
    } catch (e) {
      state.config = JSON.parse(JSON.stringify(DEFAULT_GENDER_CONFIG));
    }
  } else {
    state.config = JSON.parse(JSON.stringify(DEFAULT_GENDER_CONFIG));
  }

  if (savedLearners) {
    try {
      state.learners = JSON.parse(savedLearners);
    } catch (e) {
      state.learners = JSON.parse(JSON.stringify(DEFAULT_GENDER_LEARNERS));
    }
  } else {
    state.learners = JSON.parse(JSON.stringify(DEFAULT_GENDER_LEARNERS));
  }

  if (savedIndicators) {
    try {
      state.indicators = JSON.parse(savedIndicators);
    } catch (e) {
      state.indicators = JSON.parse(JSON.stringify(DEFAULT_GENDER_INDICATORS));
    }
  } else {
    state.indicators = JSON.parse(JSON.stringify(DEFAULT_GENDER_INDICATORS));
  }
}

function saveData() {
  localStorage.setItem("gender_v4_config", JSON.stringify(state.config));
  localStorage.setItem("gender_v4_learners", JSON.stringify(state.learners));
  localStorage.setItem("gender_v4_indicators", JSON.stringify(state.indicators));
}

// 3. Calculation & Assessment Helpers
function getStageLevel(avgScore) {
  if (avgScore >= 4.5) {
    return { name: "獨立自主階段", badgeClass: "ind", desc: "不需要任何提示，能主動且正確無誤地完成完整步驟", code: "IND", symbol: "🟢" };
  } else if (avgScore >= 3.5) {
    return { name: "口語提示階段 (自立達標)", badgeClass: "oral", desc: "支持者給予口頭提醒即可正確完成", code: "ORAL", symbol: "🔵" };
  } else if (avgScore >= 2.5) {
    return { name: "肢體協助階段", badgeClass: "phys", desc: "需要肢體引導或輕碰示範才能完成", code: "PHYS", symbol: "🟡" };
  } else if (avgScore >= 2.0) {
    return { name: "部分協助階段", badgeClass: "part", desc: "需支持者協助操作超過一半步驟才能完成", code: "PART", symbol: "🟠" };
  } else if (avgScore >= 1.0) {
    return { name: "大量協助階段", badgeClass: "much", desc: "大部分步驟由支持者代為操作", code: "MUCH", symbol: "🔴" };
  } else {
    return { name: "引導探索階段", badgeClass: "none", desc: "即使提供大量協助仍無法完成或拒絕配合", code: "NONE", symbol: "⬛" };
  }
}

function getCurrentLearner() {
  return state.learners.find(l => l.id === state.currentLearnerId) || state.learners[0];
}

function getCurrentIndicators() {
  return (state.indicators[state.currentQuarter] && state.indicators[state.currentQuarter].items) || [];
}

function ensureLearnerQuarterScores(learner, quarter) {
  if (!learner.scores) learner.scores = {};
  if (!learner.scores[quarter]) {
    learner.scores[quarter] = { pre: [], mid: [], post: [] };
  }
  const count = (state.indicators[quarter] && state.indicators[quarter].items) ? state.indicators[quarter].items.length : 10;
  ['pre', 'mid', 'post'].forEach(st => {
    if (!Array.isArray(learner.scores[quarter][st])) {
      learner.scores[quarter][st] = [];
    }
    while (learner.scores[quarter][st].length < count) {
      learner.scores[quarter][st].push(3);
    }
    if (learner.scores[quarter][st].length > count) {
      learner.scores[quarter][st] = learner.scores[quarter][st].slice(0, count);
    }
  });
}

function calculateLearnerStats(learner, quarter = state.currentQuarter) {
  ensureLearnerQuarterScores(learner, quarter);
  const qData = learner.scores[quarter];
  const itemsCount = (state.indicators[quarter] && state.indicators[quarter].items) ? state.indicators[quarter].items.length : 10;
  const maxScore = itemsCount * 5;

  const preSum = qData.pre.reduce((a, b) => a + (Number(b) || 0), 0);
  const midSum = qData.mid.reduce((a, b) => a + (Number(b) || 0), 0);
  const postSum = qData.post.reduce((a, b) => a + (Number(b) || 0), 0);

  const preAvg = itemsCount > 0 ? (preSum / itemsCount) : 0;
  const midAvg = itemsCount > 0 ? (midSum / itemsCount) : 0;
  const postAvg = itemsCount > 0 ? (postSum / itemsCount) : 0;

  const preRate = maxScore > 0 ? (preSum / maxScore) * 100 : 0;
  const postRate = maxScore > 0 ? (postSum / maxScore) * 100 : 0;

  const growthScore = postSum - preSum;
  const growthRate = preSum > 0 ? ((growthScore / preSum) * 100) : 0;
  const growthPoints = postRate - preRate;

  const currentSum = qData[state.currentStage].reduce((a, b) => a + (Number(b) || 0), 0);
  const currentAvg = itemsCount > 0 ? (currentSum / itemsCount) : 0;

  return {
    preSum, midSum, postSum,
    preAvg: Number(preAvg.toFixed(1)),
    midAvg: Number(midAvg.toFixed(1)),
    postAvg: Number(postAvg.toFixed(1)),
    preRate: Number(preRate.toFixed(1)),
    postRate: Number(postRate.toFixed(1)),
    growthScore,
    growthRate: Number(growthRate.toFixed(1)),
    growthPoints: Number(growthPoints.toFixed(1)),
    currentSum,
    currentAvg: Number(currentAvg.toFixed(1)),
    stageLevel: getStageLevel(postAvg),
    currentStageLevel: getStageLevel(currentAvg),
    maxScore,
    itemsCount
  };
}

// 4. UI Rendering Functions
function updateAppHeader() {
  document.getElementById("appMainTitle").textContent = state.config.mainTitle;
  document.getElementById("appSubTitle").textContent = state.config.subTitle;
  document.getElementById("printDocTitle").textContent = state.config.mainTitle;
  document.getElementById("printDocSubTitle").textContent = state.config.subTitle;
  document.getElementById("printMetaOrg").textContent = state.config.orgName;

  const blankDocOrg = document.getElementById("blankDocOrgTitle");
  if (blankDocOrg) blankDocOrg.textContent = state.config.subTitle;
  const blankDocMain = document.getElementById("blankDocMainTitle");
  if (blankDocMain) blankDocMain.textContent = state.config.mainTitle;

  const qInfo = state.indicators[state.currentQuarter];
  if (qInfo) {
    document.getElementById("printMetaQuarter").textContent = qInfo.title;
    document.getElementById("scoringQuarterTitle").textContent = `${qInfo.title} - 實作評量`;
    const blankThemeTitle = document.getElementById("blankThemeTitle");
    if (blankThemeTitle) blankThemeTitle.textContent = `${qInfo.title} - 實施評量表`;
  }
}

function updateQuarterTabs() {
  document.querySelectorAll("#seasonSelector .season-btn").forEach(btn => {
    const q = btn.getAttribute("data-quarter");
    if (q === state.currentQuarter) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
    const span = btn.querySelector("span");
    if (span && state.indicators[q]) {
      span.textContent = state.indicators[q].tabName;
    }
  });
}

function renderKPICards() {
  const total = state.learners.length;
  document.getElementById("kpiLearnerCount").textContent = `${total} 人`;

  if (total === 0) {
    document.getElementById("kpiAvgPostScore").textContent = "0.0 分";
    document.getElementById("kpiAvgAchievement").textContent = "達成率 0.0%";
    document.getElementById("kpiAvgGrowthScore").textContent = "+0.0 分";
    document.getElementById("kpiAvgGrowthRate").textContent = "平均進步率 +0.0%";
    document.getElementById("kpiPassRate").textContent = "0 %";
    document.getElementById("kpiPassCount").textContent = "0 / 0 人達標";
    return;
  }

  let sumPost = 0;
  let sumGrowth = 0;
  let sumGrowthRate = 0;
  let passCount = 0;

  state.learners.forEach(l => {
    const stats = calculateLearnerStats(l, state.currentQuarter);
    sumPost += stats.postSum;
    sumGrowth += stats.growthScore;
    sumGrowthRate += stats.growthRate;
    if (stats.postAvg >= 3.5) passCount++;
  });

  const avgPost = (sumPost / total).toFixed(1);
  const maxScore = (state.indicators[state.currentQuarter]?.items?.length || 10) * 5;
  const achievementRate = ((Number(avgPost) / (maxScore || 50)) * 100).toFixed(1);
  const avgGrowth = (sumGrowth / total).toFixed(1);
  const avgGrowthRate = (sumGrowthRate / total).toFixed(1);
  const passRate = ((passCount / total) * 100).toFixed(0);

  document.getElementById("kpiAvgPostScore").textContent = `${avgPost} 分`;
  document.getElementById("kpiAvgAchievement").textContent = `達成率 ${achievementRate}% (滿分${maxScore})`;
  document.getElementById("kpiAvgGrowthScore").textContent = `${Number(avgGrowth) >= 0 ? '+' : ''}${avgGrowth} 分`;
  document.getElementById("kpiAvgGrowthRate").textContent = `平均進步率 ${Number(avgGrowthRate) >= 0 ? '+' : ''}${avgGrowthRate}%`;
  document.getElementById("kpiPassRate").textContent = `${passRate} %`;
  document.getElementById("kpiPassCount").textContent = `${passCount} / ${total} 人達標`;
}

function renderLearnerQuickChips() {
  const container = document.getElementById("learnerQuickBar");
  container.innerHTML = "";

  state.learners.forEach(learner => {
    const stats = calculateLearnerStats(learner, state.currentQuarter);
    const chip = document.createElement("button");
    chip.className = `learner-chip ${learner.id === state.currentLearnerId ? 'active' : ''}`;
    chip.innerHTML = `
      <span>👤 ${learner.name} (${stats.postSum}分)</span>
      <span class="chip-edit-icon" title="編輯此學員">✏️</span>
    `;

    chip.addEventListener("click", (e) => {
      if (e.target.classList.contains("chip-edit-icon")) {
        openEditLearnerModal(learner.id);
      } else {
        state.currentLearnerId = learner.id;
        renderLearnerQuickChips();
        renderIndicatorScoringList();
        renderCurrentLearnerBanner();
      }
    });

    container.appendChild(chip);
  });
}

function renderIndicatorScoringList() {
  const learner = getCurrentLearner();
  if (!learner) return;

  ensureLearnerQuarterScores(learner, state.currentQuarter);
  const indicators = getCurrentIndicators();
  const scores = learner.scores[state.currentQuarter][state.currentStage];

  const container = document.getElementById("indicatorScoringList");
  container.innerHTML = "";

  indicators.forEach((text, idx) => {
    const currentScore = scores[idx] !== undefined ? scores[idx] : 3;
    const row = document.createElement("div");
    row.className = "indicator-row";

    let btnsHtml = "";
    SCORE_LEVELS.forEach(lvl => {
      const isActive = currentScore === lvl.score;
      btnsHtml += `
        <button class="score-btn score-${lvl.score} ${isActive ? 'active' : ''}" 
                onclick="setScore(${idx}, ${lvl.score})"
                title="${lvl.desc}">
          <span class="num">${lvl.score}</span>
          <span class="label">${lvl.label}</span>
        </button>
      `;
    });

    row.innerHTML = `
      <div class="indicator-left">
        <div class="indicator-index">${idx + 1}</div>
        <div class="indicator-text">${text}</div>
      </div>
      <div class="indicator-right">
        <button class="btn-edit-dark" style="margin-right: 0.5rem;" onclick="openEditIndicatorModal(${idx})" title="編輯此指標文字">✏️ 編輯</button>
        <div class="score-btn-group">
          ${btnsHtml}
        </div>
      </div>
    `;

    container.appendChild(row);
  });

  renderCurrentLearnerBanner();
}

function setScore(indicatorIdx, score) {
  const learner = getCurrentLearner();
  if (!learner) return;

  ensureLearnerQuarterScores(learner, state.currentQuarter);
  learner.scores[state.currentQuarter][state.currentStage][indicatorIdx] = score;

  saveData();
  renderIndicatorScoringList();
  renderLearnerQuickChips();
  renderKPICards();
  renderSummaryTable();
  showToast(`已儲存【${learner.name}】第 ${indicatorIdx + 1} 題分數為 ${score} 分`);
}

function renderCurrentLearnerBanner() {
  const learner = getCurrentLearner();
  if (!learner) return;

  const stats = calculateLearnerStats(learner, state.currentQuarter);
  const stageLabels = { pre: "前測階段 (第1月)", mid: "課堂平時/月檢核 (第2月)", post: "後測驗收 (第3月)" };

  document.getElementById("bannerLearnerName").textContent = learner.name;
  document.getElementById("bannerStageName").textContent = `當前：${stageLabels[state.currentStage]}`;
  document.getElementById("bannerTotalScore").textContent = stats.currentSum;
  document.getElementById("bannerAvgScore").textContent = stats.currentAvg;

  const badge = document.getElementById("bannerStageBadge");
  badge.className = `stage-badge ${stats.stageLevel.badgeClass}`;
  badge.textContent = `${stats.stageLevel.symbol} ${stats.stageLevel.name}`;

  document.getElementById("bannerGrowthDiff").textContent = `後測進步：${stats.growthScore >= 0 ? '+' : ''}${stats.growthScore} 分 (${stats.growthRate >= 0 ? '+' : ''}${stats.growthRate}%)`;
}

function renderSummaryTable() {
  const tbody = document.getElementById("progressTableBody");
  const tfoot = document.getElementById("progressTableFoot");
  if (!tbody || !tfoot) return;

  tbody.innerHTML = "";

  const filterText = (document.getElementById("filterLearnerInput")?.value || "").trim().toLowerCase();
  const filterStage = document.getElementById("filterStageSelect")?.value || "ALL";

  let sumPre = 0, sumMid = 0, sumPost = 0, sumAvg = 0, sumRate = 0, sumGrowth = 0, sumGrowthRate = 0, sumGrowthPts = 0;
  let count = 0;

  state.learners.forEach(learner => {
    const stats = calculateLearnerStats(learner, state.currentQuarter);

    if (filterText && !learner.name.toLowerCase().includes(filterText)) return;
    if (filterStage !== "ALL") {
      if (filterStage === "IND" && stats.postAvg < 4.5) return;
      if (filterStage === "ORAL" && (stats.postAvg < 3.5 || stats.postAvg >= 4.5)) return;
      if (filterStage === "PHYS" && (stats.postAvg < 2.0 || stats.postAvg >= 3.5)) return;
      if (filterStage === "MUCH" && stats.postAvg >= 2.0) return;
    }

    sumPre += stats.preSum;
    sumMid += stats.midSum;
    sumPost += stats.postSum;
    sumAvg += stats.postAvg;
    sumRate += stats.postRate;
    sumGrowth += stats.growthScore;
    sumGrowthRate += stats.growthRate;
    sumGrowthPts += stats.growthPoints;
    count++;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><strong>${learner.name}</strong></td>
      <td>${stats.preSum}</td>
      <td>${stats.midSum}</td>
      <td><strong style="color: var(--primary);">${stats.postSum}</strong></td>
      <td><strong>${stats.postAvg}</strong></td>
      <td>${stats.postRate}%</td>
      <td><span class="stage-badge ${stats.stageLevel.badgeClass}">${stats.stageLevel.symbol} ${stats.stageLevel.name.split(' ')[0]}</span></td>
      <td style="color: ${stats.growthScore >= 0 ? 'var(--success)' : 'var(--danger)'}; font-weight: 700;">${stats.growthScore >= 0 ? '+' : ''}${stats.growthScore}</td>
      <td>${stats.growthRate >= 0 ? '+' : ''}${stats.growthRate}%</td>
      <td>${stats.growthPoints >= 0 ? '+' : ''}${stats.growthPoints} pt</td>
      <td class="no-print">
        <button class="btn btn-outline btn-sm" onclick="switchToLearnerScoring('${learner.id}')">✏️ 評分</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  if (count > 0) {
    tfoot.innerHTML = `
      <tr>
        <td>全班平均 (共 ${count} 人)</td>
        <td>${(sumPre / count).toFixed(1)}</td>
        <td>${(sumMid / count).toFixed(1)}</td>
        <td><strong style="color: var(--primary);">${(sumPost / count).toFixed(1)}</strong></td>
        <td><strong>${(sumAvg / count).toFixed(1)}</strong></td>
        <td>${(sumRate / count).toFixed(1)}%</td>
        <td>-</td>
        <td style="color: var(--success);">${(sumGrowth / count) >= 0 ? '+' : ''}${(sumGrowth / count).toFixed(1)}</td>
        <td>${(sumGrowthRate / count) >= 0 ? '+' : ''}${(sumGrowthRate / count).toFixed(1)}%</td>
        <td>${(sumGrowthPts / count) >= 0 ? '+' : ''}${(sumGrowthPts / count).toFixed(1)} pt</td>
        <td class="no-print">-</td>
      </tr>
    `;
  } else {
    tbody.innerHTML = `<tr><td colspan="11" style="text-align: center; color: var(--text-muted); padding: 2rem;">無符合篩選條件的學員資料</td></tr>`;
    tfoot.innerHTML = "";
  }
}

function switchToLearnerScoring(learnerId) {
  state.currentLearnerId = learnerId;
  switchTab("tab-scoring");
  renderLearnerQuickChips();
  renderIndicatorScoringList();
}

// 5. Chart.js Visualization
function renderCharts() {
  const names = state.learners.map(l => l.name);
  const preScores = state.learners.map(l => calculateLearnerStats(l, state.currentQuarter).preSum);
  const midScores = state.learners.map(l => calculateLearnerStats(l, state.currentQuarter).midSum);
  const postScores = state.learners.map(l => calculateLearnerStats(l, state.currentQuarter).postSum);

  // 1. Pre vs Mid vs Post Bar Chart
  const ctxBar = document.getElementById("chartPrePostBar")?.getContext("2d");
  if (ctxBar) {
    if (chartInstances.bar) chartInstances.bar.destroy();
    chartInstances.bar = new Chart(ctxBar, {
      type: "bar",
      data: {
        labels: names,
        datasets: [
          { label: "1. 前測基準", data: preScores, backgroundColor: "#94a3b8", borderRadius: 4 },
          { label: "2. 課堂月檢核", data: midScores, backgroundColor: "#7c3aed", borderRadius: 4 },
          { label: "3. 後測驗收", data: postScores, backgroundColor: "#be185d", borderRadius: 4 }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { beginAtZero: true, suggestedMax: 50, title: { display: true, text: "總分 (滿分50)" } }
        }
      }
    });
  }

  // 2. 10 Indicators Radar Chart
  const ctxRadar = document.getElementById("chartIndicatorRadar")?.getContext("2d");
  if (ctxRadar) {
    const count = (state.indicators[state.currentQuarter]?.items?.length || 10);
    const radarLabels = Array.from({ length: count }, (_, i) => `指標 ${i + 1}`);

    const preIndAverages = Array.from({ length: count }, (_, i) => {
      let sum = 0;
      state.learners.forEach(l => {
        ensureLearnerQuarterScores(l, state.currentQuarter);
        sum += (l.scores[state.currentQuarter].pre[i] || 0);
      });
      return state.learners.length > 0 ? Number((sum / state.learners.length).toFixed(1)) : 0;
    });

    const postIndAverages = Array.from({ length: count }, (_, i) => {
      let sum = 0;
      state.learners.forEach(l => {
        ensureLearnerQuarterScores(l, state.currentQuarter);
        sum += (l.scores[state.currentQuarter].post[i] || 0);
      });
      return state.learners.length > 0 ? Number((sum / state.learners.length).toFixed(1)) : 0;
    });

    if (chartInstances.radar) chartInstances.radar.destroy();
    chartInstances.radar = new Chart(ctxRadar, {
      type: "radar",
      data: {
        labels: radarLabels,
        datasets: [
          {
            label: "全班前測均分",
            data: preIndAverages,
            backgroundColor: "rgba(148, 163, 184, 0.2)",
            borderColor: "#94a3b8",
            pointBackgroundColor: "#94a3b8"
          },
          {
            label: "全班後測均分",
            data: postIndAverages,
            backgroundColor: "rgba(190, 24, 93, 0.25)",
            borderColor: "#be185d",
            pointBackgroundColor: "#be185d"
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: { suggestedMin: 0, suggestedMax: 5, ticks: { stepSize: 1 } }
        }
      }
    });
  }

  // 3. Annual Trend Line Chart
  const ctxTrend = document.getElementById("chartAnnualTrend")?.getContext("2d");
  if (ctxTrend) {
    const quarters = ["Q1 (1~3月)", "Q2 (4~6月)", "Q3 (7~9月)", "Q4 (10~12月)"];
    const colors = ["#9d174d", "#7c3aed", "#0d9488", "#d97706", "#2563eb", "#ec4899"];

    const datasets = state.learners.map((learner, idx) => {
      const data = ["Q1", "Q2", "Q3", "Q4"].map(q => {
        return calculateLearnerStats(learner, q).postSum;
      });
      const color = colors[idx % colors.length];
      return {
        label: learner.name,
        data: data,
        borderColor: color,
        backgroundColor: color,
        tension: 0.25,
        fill: false,
        pointRadius: 5
      };
    });

    if (chartInstances.trend) chartInstances.trend.destroy();
    chartInstances.trend = new Chart(ctxTrend, {
      type: "line",
      data: { labels: quarters, datasets: datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { beginAtZero: true, suggestedMax: 50, title: { display: true, text: "季度後測得分 (滿分50)" } }
        }
      }
    });
  }

  // 4. Stage Distribution Doughnut Chart
  const ctxPie = document.getElementById("chartStagePie")?.getContext("2d");
  if (ctxPie) {
    let indCount = 0, oralCount = 0, physCount = 0, muchCount = 0;
    state.learners.forEach(l => {
      const stats = calculateLearnerStats(l, state.currentQuarter);
      if (stats.postAvg >= 4.5) indCount++;
      else if (stats.postAvg >= 3.5) oralCount++;
      else if (stats.postAvg >= 2.0) physCount++;
      else muchCount++;
    });

    if (chartInstances.pie) chartInstances.pie.destroy();
    chartInstances.pie = new Chart(ctxPie, {
      type: "doughnut",
      data: {
        labels: ["🟢 獨立自主 (4.5~5.0)", "🔵 口語提示 (3.5~4.4)", "🟡 肢體/部分協助 (2.0~3.4)", "🔴 大量協助 (0.0~1.9)"],
        datasets: [{
          data: [indCount, oralCount, physCount, muchCount],
          backgroundColor: ["#15803d", "#2563eb", "#d97706", "#dc2626"],
          borderWidth: 2,
          borderColor: "#ffffff"
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: "bottom" }
        }
      }
    });
  }
}

// 6. ISP Narrative Generator
function renderISPReports() {
  const container = document.getElementById("ispListContainer");
  if (!container) return;

  container.innerHTML = "";
  const qInfo = state.indicators[state.currentQuarter] || { title: "性別平等主題" };

  state.learners.forEach(learner => {
    const stats = calculateLearnerStats(learner, state.currentQuarter);
    const qTitle = qInfo.title.split('：')[1] || qInfo.title;

    let narrative = `【${state.config.orgName} 116年度 ISP 個別化支持計畫成效紀錄】\n`;
    narrative += `學員姓名：${learner.name}　　評量季度：${qInfo.title}\n\n`;
    narrative += `一、量化成效指標：\n`;
    narrative += `• 前測基準得分：${stats.preSum} 分（達成率 ${stats.preRate}%，指標平均 ${stats.preAvg} 分）\n`;
    narrative += `• 課堂月檢核得分：${stats.midSum} 分（指標平均 ${stats.midAvg} 分）\n`;
    narrative += `• 季後測驗收得分：${stats.postSum} 分（達成率 ${stats.postRate}%，指標平均 ${stats.postAvg} 分）\n`;
    narrative += `• 進步幅度：總分提升 +${stats.growthScore} 分，進步率達 ${stats.growthRate}%（成長 ${stats.growthPoints} 個百分點）。\n\n`;

    narrative += `二、質性轉變與學習自立能力判定：\n`;
    if (stats.postAvg >= 4.5) {
      narrative += `${learner.name}在「${qTitle}」之學習表現極為優異，後測平均達 ${stats.postAvg} 分，已晉升為【獨立自主階段】。能主動辨識身體界線與尊重他人隱私，在人際社交互動中展現成熟禮儀，無需支持者額外口語提示即可自立完成所有步驟。`;
    } else if (stats.postAvg >= 3.5) {
      narrative += `${learner.name}在「${qTitle}」之學習成效顯著提升，前測得分 ${stats.preSum} 分經結構化情境演練後測提升至 ${stats.postSum} 分，目前達到【口語提示階段（符合基本生活自立達標標準）】。遇到複雜社交與自我保護情境時，僅需教保員給予關鍵字口頭提醒即可正確應對。`;
    } else if (stats.postAvg >= 2.5) {
      narrative += `${learner.name}在「${qTitle}」持續穩定進步中，目前處於【肢體協助階段】。在多數日常常規中已具備基礎認知，但在特定防衛與界線辨識關鍵環節仍需教保員給予適時肢體引導與輔具圖卡支持。`;
    } else {
      narrative += `${learner.name}在「${qTitle}」目前處於【初學引導與探索階段】。後續將結合個別化多感官教材與一對一密集支持，逐步建立自我保護與社交安全觀念。`;
    }

    if (learner.notes) {
      narrative += `\n\n三、個別觀察與支持備註：\n${learner.notes}`;
    }

    const card = document.createElement("div");
    card.className = "isp-learner-card";
    card.innerHTML = `
      <div class="isp-header">
        <div>
          <strong style="font-size: 1.05rem;">👤 ${learner.name}</strong>
          <span style="margin-left: 0.5rem; color: var(--text-muted); font-size: 0.85rem;">後測：${stats.postSum}分 (${stats.stageLevel.name})</span>
        </div>
        <button class="btn btn-outline btn-sm" onclick="copyIspText(this)">📋 複製評語</button>
      </div>
      <div class="isp-body" contenteditable="true">${narrative}</div>
    `;

    container.appendChild(card);
  });
}

function copyIspText(btn) {
  const body = btn.closest(".isp-learner-card").querySelector(".isp-body");
  if (body) {
    navigator.clipboard.writeText(body.innerText).then(() => {
      showToast("📋 ISP 評語已成功複製至剪貼簿！");
    });
  }
}

// 7. Indicator Customization & Standards
function renderIndicatorsManager() {
  const container = document.getElementById("indicatorsManageContainer");
  if (!container) return;

  container.innerHTML = "";
  const qInfo = state.indicators[state.currentQuarter] || { items: [] };

  const list = document.createElement("div");
  list.className = "indicator-list";

  qInfo.items.forEach((item, idx) => {
    const row = document.createElement("div");
    row.className = "indicator-row";
    row.innerHTML = `
      <div class="indicator-left">
        <div class="indicator-index">${idx + 1}</div>
        <div class="indicator-text">${item}</div>
      </div>
      <div class="indicator-right">
        <button class="btn btn-outline btn-sm" onclick="openEditIndicatorModal(${idx})">✏️ 修改內容</button>
      </div>
    `;
    list.appendChild(row);
  });

  container.appendChild(list);
}

// 8. Blank Paper Evaluation Sheet
function renderBlankPaperSheet() {
  const qInfo = state.indicators[state.currentQuarter] || { title: "性別平等主題", items: [] };
  const container = document.getElementById("blankIndicatorsListContainer");
  if (!container) return;

  container.innerHTML = "";

  qInfo.items.forEach((item, idx) => {
    const row = document.createElement("div");
    row.className = "blank-ind-row";
    row.innerHTML = `
      <div class="blank-ind-num">${idx + 1}</div>
      <div class="blank-ind-desc">${item}</div>
      <div class="blank-score-group">
        <div class="blank-score-box"><span>5</span><span class="score-lbl">獨立</span></div>
        <div class="blank-score-box"><span>4</span><span class="score-lbl">口語</span></div>
        <div class="blank-score-box"><span>3</span><span class="score-lbl">肢協</span></div>
        <div class="blank-score-box"><span>2</span><span class="score-lbl">部分</span></div>
        <div class="blank-score-box"><span>1</span><span class="score-lbl">未學</span></div>
        <div class="blank-score-box"><span>0</span><span class="score-lbl">無法</span></div>
      </div>
    `;
    container.appendChild(row);
  });
}

function openBlankSheetView(triggerPrint) {
  switchTab("tab-blank-sheet");
  renderBlankPaperSheet();
  if (triggerPrint) {
    setTimeout(() => { window.print(); }, 250);
  }
}

// 9. Data Import / Export & Sample Helpers
function exportDataToCsv() {
  let csv = "\uFEFF"; // UTF-8 BOM
  csv += `學員姓名,評量季度,前測總分,前測達成率(%),課堂月檢核,後測總分,後測達成率(%),進步分數,進步率(%),成長百分點(pt),學習自立階段\n`;

  state.learners.forEach(l => {
    const stats = calculateLearnerStats(l, state.currentQuarter);
    csv += `"${l.name}","${state.currentQuarter}",${stats.preSum},${stats.preRate}%,${stats.midSum},${stats.postSum},${stats.postRate}%,${stats.growthScore},${stats.growthRate}%,${stats.growthPoints},"${stats.stageLevel.name}"\n`;
  });

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `116年度性別平等評量_${state.currentQuarter}_成效分析表.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function quickFillSampleScores() {
  if (!confirm("確定要將當前學員與全班數據帶入示範分數嗎？")) return;
  state.learners = JSON.parse(JSON.stringify(DEFAULT_GENDER_LEARNERS));
  saveData();
  refreshAllViews();
  showToast("⚡ 已成功帶入手冊標準示範分數！");
}

// 10. Modals Management
function openEditLearnerModal(learnerId = null) {
  const modal = document.getElementById("learnerModal");
  if (!modal) return;

  if (learnerId) {
    const learner = state.learners.find(l => l.id === learnerId);
    if (learner) {
      document.getElementById("learnerModalTitle").textContent = "✏️ 編輯學員資料";
      document.getElementById("editLearnerIdHidden").value = learner.id;
      document.getElementById("learnerModalName").value = learner.name;
      document.getElementById("learnerModalId").value = learner.id;
      document.getElementById("learnerModalNotes").value = learner.notes || "";
    }
  } else {
    document.getElementById("learnerModalTitle").textContent = "➕ 新增評量學員";
    document.getElementById("editLearnerIdHidden").value = "";
    document.getElementById("learnerModalName").value = "";
    document.getElementById("learnerModalId").value = `S0${state.learners.length + 1}`;
    document.getElementById("learnerModalNotes").value = "";
  }

  modal.classList.add("active");
}

function closeLearnerModal() {
  document.getElementById("learnerModal")?.classList.remove("active");
}

function saveLearnerModal() {
  const name = document.getElementById("learnerModalName").value.trim();
  const id = document.getElementById("learnerModalId").value.trim() || `S0${state.learners.length + 1}`;
  const notes = document.getElementById("learnerModalNotes").value.trim();
  const editId = document.getElementById("editLearnerIdHidden").value;

  if (!name) {
    alert("請輸入學員姓名！");
    return;
  }

  if (editId) {
    const learner = state.learners.find(l => l.id === editId);
    if (learner) {
      learner.name = name;
      learner.id = id;
      learner.notes = notes;
    }
  } else {
    const newLearner = {
      id: id,
      name: name,
      notes: notes,
      scores: {
        Q1: { pre: [3,3,3,3,3,3,3,3,3,3], mid: [4,4,4,4,4,4,4,4,4,4], post: [4,4,5,4,4,4,5,4,4,4] },
        Q2: { pre: [3,3,3,3,3,3,3,3,3,3], mid: [4,4,4,4,4,4,4,4,4,4], post: [4,5,4,4,4,5,4,4,4,5] },
        Q3: { pre: [3,3,3,3,3,3,3,3,3,3], mid: [4,4,4,4,4,4,4,4,4,4], post: [4,4,4,5,4,4,4,5,4,4] },
        Q4: { pre: [3,3,3,3,3,3,3,3,3,3], mid: [4,4,4,4,4,4,4,4,4,4], post: [5,4,4,4,5,4,4,4,5,4] }
      }
    };
    state.learners.push(newLearner);
    state.currentLearnerId = id;
  }

  saveData();
  closeLearnerModal();
  refreshAllViews();
  showToast(`已儲存學員【${name}】資料`);
}

function openEditTitleModal() {
  document.getElementById("inputAppMainTitle").value = state.config.mainTitle;
  document.getElementById("inputAppSubTitle").value = state.config.subTitle;
  document.getElementById("inputAppOrgName").value = state.config.orgName;
  document.getElementById("editTitleModal")?.classList.add("active");
}

function saveEditTitleModal() {
  state.config.mainTitle = document.getElementById("inputAppMainTitle").value.trim() || DEFAULT_GENDER_CONFIG.mainTitle;
  state.config.subTitle = document.getElementById("inputAppSubTitle").value.trim() || DEFAULT_GENDER_CONFIG.subTitle;
  state.config.orgName = document.getElementById("inputAppOrgName").value.trim() || DEFAULT_GENDER_CONFIG.orgName;

  saveData();
  document.getElementById("editTitleModal")?.classList.remove("active");
  updateAppHeader();
  showToast("已更新系統標題與機構資訊！");
}

function openEditQuarterModal() {
  const qInfo = state.indicators[state.currentQuarter];
  if (qInfo) {
    document.getElementById("inputQuarterThemeTitle").value = qInfo.title;
    document.getElementById("inputQuarterShortTab").value = qInfo.tabName;
    document.getElementById("editQuarterModal")?.classList.add("active");
  }
}

function saveEditQuarterModal() {
  const title = document.getElementById("inputQuarterThemeTitle").value.trim();
  const tabName = document.getElementById("inputQuarterShortTab").value.trim();

  if (state.indicators[state.currentQuarter]) {
    if (title) state.indicators[state.currentQuarter].title = title;
    if (tabName) state.indicators[state.currentQuarter].tabName = tabName;
    saveData();
  }

  document.getElementById("editQuarterModal")?.classList.remove("active");
  updateQuarterTabs();
  updateAppHeader();
  renderBlankPaperSheet();
  showToast("已更新當前季度主題名稱！");
}

function openEditIndicatorModal(idx) {
  const items = getCurrentIndicators();
  if (items[idx] !== undefined) {
    document.getElementById("editIndicatorIdxHidden").value = idx;
    document.getElementById("lblIndicatorNum").textContent = `指標項目 ${idx + 1} 內容描述 *`;
    document.getElementById("inputIndicatorText").value = items[idx];
    document.getElementById("editIndicatorModal")?.classList.add("active");
  }
}

function saveEditIndicatorModal() {
  const idx = Number(document.getElementById("editIndicatorIdxHidden").value);
  const text = document.getElementById("inputIndicatorText").value.trim();

  if (text && state.indicators[state.currentQuarter]) {
    state.indicators[state.currentQuarter].items[idx] = text;
    saveData();
    renderIndicatorScoringList();
    renderIndicatorsManager();
    renderBlankPaperSheet();
    showToast(`已更新第 ${idx + 1} 項檢核指標`);
  }

  document.getElementById("editIndicatorModal")?.classList.remove("active");
}

// 11. Tab Switching & Toast Notifications
function switchTab(tabId) {
  state.activeTab = tabId;
  document.querySelectorAll(".view-tabs .tab-btn").forEach(btn => {
    if (btn.getAttribute("data-tab") === tabId) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  document.querySelectorAll(".tab-panel").forEach(panel => {
    if (panel.id === tabId) {
      panel.classList.add("active");
    } else {
      panel.classList.remove("active");
    }
  });

  if (tabId === "tab-progress-table") {
    renderSummaryTable();
  } else if (tabId === "tab-charts") {
    setTimeout(renderCharts, 50);
  } else if (tabId === "tab-isp") {
    renderISPReports();
  } else if (tabId === "tab-indicators") {
    renderIndicatorsManager();
  } else if (tabId === "tab-blank-sheet") {
    renderBlankPaperSheet();
  }
}

function showToast(msg) {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "toast-msg";
  toast.textContent = msg;
  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 2500);
}

function refreshAllViews() {
  updateAppHeader();
  updateQuarterTabs();
  renderKPICards();
  renderLearnerQuickChips();
  renderIndicatorScoringList();
  renderSummaryTable();
  renderBlankPaperSheet();
  if (state.activeTab === "tab-charts") renderCharts();
  if (state.activeTab === "tab-isp") renderISPReports();
  if (state.activeTab === "tab-indicators") renderIndicatorsManager();
}

// 12. Initialization & Event Binding
function bindEvents() {
  // Navigation Tabs
  document.querySelectorAll(".view-tabs .tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      switchTab(btn.getAttribute("data-tab"));
    });
  });

  // Season / Quarter Selector
  document.querySelectorAll("#seasonSelector .season-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      state.currentQuarter = btn.getAttribute("data-quarter");
      refreshAllViews();
    });
  });

  // Stage Stepper Buttons (Month 1, 2, 3)
  document.querySelectorAll(".stage-step-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".stage-step-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.currentStage = btn.getAttribute("data-stage");
      renderIndicatorScoringList();
    });
  });

  // Top Header Buttons
  document.getElementById("btnAddNewLearner")?.addEventListener("click", () => openEditLearnerModal());
  document.getElementById("btnEditAppTitle")?.addEventListener("click", openEditTitleModal);
  document.getElementById("btnEditQuarterTheme")?.addEventListener("click", openEditQuarterModal);
  document.getElementById("btnEditCurrentQuarterDirect")?.addEventListener("click", openEditQuarterModal);

  // Clear & Reset
  document.getElementById("btnClearAllScores")?.addEventListener("click", () => {
    if (!confirm("⚠️ 確定要清空所有學員的評分數據嗎？")) return;
    state.learners.forEach(l => {
      ['Q1', 'Q2', 'Q3', 'Q4'].forEach(q => {
        l.scores[q] = { pre: [], mid: [], post: [] };
      });
    });
    saveData();
    refreshAllViews();
    showToast("已清空所有學員評分紀錄");
  });

  document.getElementById("btnResetDefaultData")?.addEventListener("click", () => {
    if (!confirm("確定要將所有數據還原為系統初始手冊範例嗎？")) return;
    state.config = JSON.parse(JSON.stringify(DEFAULT_GENDER_CONFIG));
    state.learners = JSON.parse(JSON.stringify(DEFAULT_GENDER_LEARNERS));
    state.indicators = JSON.parse(JSON.stringify(DEFAULT_GENDER_INDICATORS));
    saveData();
    refreshAllViews();
    showToast("已成功還原至手冊範例數據！");
  });

  // Quick Action Buttons
  document.getElementById("btnQuickFillSample")?.addEventListener("click", quickFillSampleScores);
  document.getElementById("btnExportExcel")?.addEventListener("click", exportDataToCsv);
  document.getElementById("btnPrintReport")?.addEventListener("click", () => window.print());
  document.getElementById("btnPrintScoringSheet")?.addEventListener("click", () => window.print());
  document.getElementById("btnPrintSummaryTable")?.addEventListener("click", () => window.print());
  document.getElementById("btnPrintCharts")?.addEventListener("click", () => window.print());
  document.getElementById("btnPrintIspReport")?.addEventListener("click", () => window.print());
  document.getElementById("btnPrintBlankSheet")?.addEventListener("click", () => openBlankSheetView(true));
  document.getElementById("btnPrintBlankSheetFromTab1")?.addEventListener("click", () => openBlankSheetView(true));
  document.getElementById("btnPrintBlankSheetDirect")?.addEventListener("click", () => window.print());

  // Filter Table Events
  document.getElementById("filterLearnerInput")?.addEventListener("input", renderSummaryTable);
  document.getElementById("filterStageSelect")?.addEventListener("change", renderSummaryTable);

  // Modals Event Listeners
  document.getElementById("btnCloseLearnerModal")?.addEventListener("click", closeLearnerModal);
  document.getElementById("btnCancelLearnerModal")?.addEventListener("click", closeLearnerModal);
  document.getElementById("btnSaveLearnerModal")?.addEventListener("click", saveLearnerModal);

  document.getElementById("btnCloseEditTitleModal")?.addEventListener("click", () => document.getElementById("editTitleModal")?.classList.remove("active"));
  document.getElementById("btnCancelEditTitle")?.addEventListener("click", () => document.getElementById("editTitleModal")?.classList.remove("active"));
  document.getElementById("btnSaveEditTitle")?.addEventListener("click", saveEditTitleModal);

  document.getElementById("btnCloseEditQuarterModal")?.addEventListener("click", () => document.getElementById("editQuarterModal")?.classList.remove("active"));
  document.getElementById("btnCancelEditQuarter")?.addEventListener("click", () => document.getElementById("editQuarterModal")?.classList.remove("active"));
  document.getElementById("btnSaveEditQuarter")?.addEventListener("click", saveEditQuarterModal);

  document.getElementById("btnCloseEditIndicatorModal")?.addEventListener("click", () => document.getElementById("editIndicatorModal")?.classList.remove("active"));
  document.getElementById("btnCancelEditIndicator")?.addEventListener("click", () => document.getElementById("editIndicatorModal")?.classList.remove("active"));
  document.getElementById("btnSaveEditIndicator")?.addEventListener("click", saveEditIndicatorModal);
}

// App Bootstrapping
window.addEventListener("DOMContentLoaded", () => {
  loadData();
  bindEvents();
  refreshAllViews();
});
