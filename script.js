const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playSound(type) {
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.connect(gain);
  gain.connect(audioCtx.destination);

  if (type === "hit") {
    osc.type = "triangle";
    osc.frequency.setValueAtTime(150, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.1);
  } else if (type === "correct") {
    osc.type = "sine";
    osc.frequency.setValueAtTime(300, audioCtx.currentTime);
    osc.frequency.setValueAtTime(600, audioCtx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.3);
  } else if (type === "earthquake") {
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(80, audioCtx.currentTime);
    osc.frequency.linearRampToValueAtTime(40, audioCtx.currentTime + 1.5);
    gain.gain.setValueAtTime(0.4, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 1.5);
    osc.start();
    osc.stop(audioCtx.currentTime + 1.5);
  }
}

const normalMoleSVG = `
<svg viewBox="0 0 100 100" width="100%" height="100%">
    <ellipse cx="50" cy="65" rx="35" ry="30" fill="#a67c52" stroke="#5c3a21" stroke-width="3"/>
    <circle cx="25" cy="35" r="10" fill="#a67c52" stroke="#5c3a21" stroke-width="2"/>
    <circle cx="25" cy="35" r="5" fill="#ffb6c1"/>
    <circle cx="75" cy="35" r="10" fill="#a67c52" stroke="#5c3a21" stroke-width="2"/>
    <circle cx="75" cy="35" r="5" fill="#ffb6c1"/>
    <circle cx="50" cy="45" r="28" fill="#a67c52" stroke="#5c3a21" stroke-width="3"/>
    <circle cx="38" cy="40" r="4" fill="#000"/>
    <circle cx="62" cy="40" r="4" fill="#000"/>
    <circle cx="40" cy="38" r="1.5" fill="#fff"/>
    <circle cx="64" cy="38" r="1.5" fill="#fff"/>
    <ellipse cx="50" cy="48" rx="5" ry="3" fill="#ffb6c1"/>
    <rect x="47" y="51" width="6" height="6" fill="#fff" stroke="#000" stroke-width="1"/>
    <circle cx="32" cy="48" r="4" fill="#ff6b6b" opacity="0.5"/>
    <circle cx="68" cy="48" r="4" fill="#ff6b6b" opacity="0.5"/>
</svg>`;

const minerMoleSVG = `
<svg viewBox="0 0 100 100" width="100%" height="100%">
    <ellipse cx="50" cy="65" rx="35" ry="30" fill="#a67c52" stroke="#5c3a21" stroke-width="3"/>
    <circle cx="25" cy="35" r="10" fill="#a67c52" stroke="#5c3a21" stroke-width="2"/>
    <circle cx="25" cy="35" r="5" fill="#ffb6c1"/>
    <circle cx="75" cy="35" r="10" fill="#a67c52" stroke="#5c3a21" stroke-width="2"/>
    <circle cx="75" cy="35" r="5" fill="#ffb6c1"/>
    <circle cx="50" cy="45" r="28" fill="#a67c52" stroke="#5c3a21" stroke-width="3"/>
    <circle cx="38" cy="42" r="4" fill="#000"/>
    <circle cx="62" cy="42" r="4" fill="#000"/>
    <ellipse cx="50" cy="48" rx="5" ry="3" fill="#ffb6c1"/>
    <rect x="47" y="51" width="6" height="6" fill="#fff" stroke="#000" stroke-width="1"/>
    <path d="M 20 30 Q 50 10 80 30 Z" fill="#ffd700" stroke="#b8860b" stroke-width="3"/>
    <rect x="15" y="28" width="70" height="6" rx="2" fill="#daa520"/>
    <circle cx="50" cy="22" r="7" fill="#fff" stroke="#333" stroke-width="2"/>
    <circle cx="50" cy="22" r="4" fill="#00ffff"/>
</svg>`;

const questionsStage1 = [
  {
    q: "Khi bạn đặt mục tiêu dậy sớm tập thể dục nhưng trời mưa và lạnh, hành động thể hiện ý chí tốt nhất là?",
    options: [
      "A. Ngủ tiếp, mai tập bù",
      "B. Đổi sang bài tập trong nhà 15 phút",
      "C. Lướt điện thoại cho hết buồn ngủ",
      "D. Bỏ luôn mục tiêu vì không khả thi",
    ],
    correct: 1,
  },
  {
    q: " Dấu hiệu của người có ý chí yếu là",
    options: [
      "A. Kiên trì làm việc dù gặp khó khăn",
      "B. Hay trì hoãn và đổ lỗi cho hoàn cảnh",
      "C. Hoàn thành việc dù không thích",
    ],
    correct: 0,
  },
  {
    q: "Để rèn ý chí, cách nào hiệu quả nhất?",
    options: [
      "A. Chỉ làm việc mình thích",
      "B. Chờ có cảm hứng mới làm",
      "C. Chia mục tiêu lớn thành việc nhỏ và kỷ luật làm hàng ngày",
      "D. Làm thật nhiều việc cùng một lúc",
    ],
    correct: 2,
  },
  {
    q: "Khi thất bại trong một cuộc thi quan trọng, người có ý chí sẽ:",
    options: [
      "A. Xem lại lỗi sai, rút kinh nghiệm và thử lại",
      "B. Đổ lỗi cho giám khảo không công bằng",
      "C. Nghĩ mình kém cỏi và bỏ cuộc",
    ],
    correct: 0,
  },
  {
    q: "Câu 5: Tư duy độc lập được thể hiện rõ nhất khi:",
    options: [
      "A. Luôn làm theo ý kiến số đông cho an toàn",
      "B. Có chính kiến, dám đặt câu hỏi và tự kiểm chứng thông",
      "C. Chỉ nghe theo một người mình thần tượng",
      "D. Không bao giờ lắng nghe ai",
    ],
    correct: 1,
  },
  {
    q: "Trên mạng có tin 'Uống nước chanh thải độc 100%'. Người có tư duy độc lập sẽ làm gì?",
    options: [
      "A. Làm theo ngay lập tức",
      "B. Tìm hiểu nguồn tin, hỏi ý kiến chuyên gia, đối chiếu khoa học",
      "C. Chia sẻ ngay cho bạn bè",
    ],
    correct: 1,
  },
];

const questionsStage2 = [
  {
    q: "Trong nhóm thảo luận, tất cả đều đồng ý với 1 ý kiến mà bạn thấy sai, bạn sẽ:",
    options: [
      "A. Im lặng đồng ý để hòa đồng",
      "B. Đưa ra quan điểm khác kèm lập luận và bằng chứng",
      "C. Bỏ ra ngoài không tham gia",
      "D. Chế giễu ý kiến của nhóm",
    ],
    correct: 1,
  },
  {
    q: " Đâu KHÔNG phải là tư duy độc lập?",
    options: [
      "A. Suy nghĩ phản biện",
      "B. Tự chịu trách ",
      "C. Bảo thủ, không chấp nhận góp ý đúng",
    ],
    correct: 2,
  },
  {
    q: "Công ty đổi phần mềm làm việc mới mà bạn chưa biết dùng. Cách thích ứng tốt nhất là:",
    options: [
      "A. Phàn nàn và từ chối sử dụng",
      "B. Chủ động học, hỏi đồng nghiệp và xem ",
      "C. Xin nghỉ việc",
      "D. Vẫn dùng phần mềm cũ lén lút",
    ],
    correct: 1,
  },
  {
    q: " Biểu hiện của người có khả năng thích ứng kém là:",
    options: [
      "A. Luôn lo lắng, chống đối mọi thay đổi dù nhỏ",
      "B. Linh hoạt thay đổi kế hoạch",
      "C. Nhanh chóng ổn định sau biến cố",
    ],
    correct: 0,
  },
  {
    q: "Khi kế hoạch đã chuẩn bị bị hủy do bão, người thích ứng tốt sẽ:",
    options: [
      "A. Buồn bã và trách móc cả ngày",
      "B. Nhanh chóng đổi sang hoạt động trong nhà như xem phim, chơi boardgame",
      "C. Cố chấp vẫn đi bất chấp nguy hiểm",
      "D. Đổ lỗi cho người tổ chức",
    ],
    correct: 1,
  },
  {
    q: "Câu nói nào thể hiện tư duy thích ứng?",
    options: [
      "A. Trước giờ vẫn làm thế này, không đổi",
      "B. Thay đổi là đáng sợ, nên tránh",
      "C. Không thay đổi được gió, ta thay đổi cách căng buồm",
    ],
    correct: 2,
  },
];

let currentStage = 1;
let molesCleared = 0;
let score = 0;
let currentMoleIndex = -1;
let isWaitingAnswer = false;

const startScreen = document.getElementById("start-screen");
const gameContainer = document.getElementById("game-container");
const hammer = document.getElementById("hammer");
const hitSparkle = document.getElementById("hit-sparkle");
const questionModal = document.getElementById("question-modal");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const feedbackMsg = document.getElementById("feedback-msg");
const stageBanner = document.getElementById("stage-banner");
const scoreVal = document.getElementById("score-val");
const thankYouBoard = document.getElementById("thank-you-board");
const fieldBg = document.getElementById("field-bg");

function startGame() {
  startScreen.style.opacity = "0";
  setTimeout(() => {
    startScreen.style.display = "none";
    gameContainer.classList.remove("game-hidden");
    initMoles();
  }, 500);
}

function initMoles() {
  for (let i = 0; i < 6; i++) {
    const moleEl = document.getElementById(`mole-${i}`);
    moleEl.innerHTML = currentStage === 1 ? normalMoleSVG : minerMoleSVG;
    moleEl.classList.remove("hidden", "dizzy");
  }
}

window.addEventListener("mousemove", (e) => {
  hammer.style.left = e.clientX + "px";
  hammer.style.top = e.clientY + "px";
});

window.addEventListener("mousedown", (e) => {
  if (startScreen.style.display !== "none") return;
  hammer.classList.add("swung");
  playSound("hit");

  hitSparkle.style.left = e.clientX + "px";
  hitSparkle.style.top = e.clientY + "px";
  hitSparkle.classList.add("active");
  setTimeout(() => hitSparkle.classList.remove("active"), 150);
});

window.addEventListener("mouseup", () => hammer.classList.remove("swung"));

function hitMole(index) {
  if (isWaitingAnswer) return;
  const moleEl = document.getElementById(`mole-${index}`);
  if (moleEl.classList.contains("hidden")) return;

  moleEl.classList.add("dizzy");
  currentMoleIndex = index;
  isWaitingAnswer = true;

  setTimeout(() => {
    showQuestion(molesCleared);
  }, 300);
}

function showQuestion(qIndex) {
  const qList = currentStage === 1 ? questionsStage1 : questionsStage2;
  const qData = qList[qIndex];

  questionText.innerText = qData.q;
  optionsContainer.innerHTML = "";
  feedbackMsg.innerText = "";

  qData.options.forEach((optText, idx) => {
    const btn = document.createElement("button");
    btn.className = "btn-option";
    btn.innerText = optText;
    btn.onclick = () => checkAnswer(idx, qData.correct);
    optionsContainer.appendChild(btn);
  });

  questionModal.classList.add("active");
}

function checkAnswer(selectedIndex, correctIndex) {
  if (selectedIndex === correctIndex) {
    playSound("correct");
    feedbackMsg.className = "feedback-message feedback-correct";
    feedbackMsg.innerText = "✔ CHÍNH XÁC! (+100 Điểm)";
    score += 100;
    scoreVal.innerText = score;

    setTimeout(() => {
      questionModal.classList.remove("active");
      const moleEl = document.getElementById(`mole-${currentMoleIndex}`);
      moleEl.classList.add("hidden");
      moleEl.classList.remove("dizzy");

      molesCleared++;
      updateBanner();
      isWaitingAnswer = false;

      if (molesCleared >= 6) {
        if (currentStage === 1) {
          triggerEarthquake();
        } else {
          showThankYou();
        }
      }
    }, 800);
  } else {
    feedbackMsg.className = "feedback-message feedback-wrong";
    feedbackMsg.innerText = "bạn gà quá";
  }
}

function updateBanner() {
  if (currentStage === 1) {
    stageBanner.innerText = `Vòng 1: Chuột Nông Dân (${molesCleared}/6)`;
  } else {
    stageBanner.innerText = `Vòng 2: Chuột Thợ Mỏ (${molesCleared}/6)`;
  }
}

function triggerEarthquake() {
  playSound("earthquake");
  fieldBg.classList.add("earthquake");
  stageBanner.innerText = "⚠️ CẢNH BÁO: ĐỘNG ĐẤT XUẤT HIỆN! ⚠️";

  setTimeout(() => {
    fieldBg.classList.remove("earthquake");
    currentStage = 2;
    molesCleared = 0;
    updateBanner();
    initMoles();
  }, 2800);
}

function showThankYou() {
  playSound("correct");
  stageBanner.style.display = "none";
  thankYouBoard.classList.add("show");
}
