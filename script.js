const CONFIG = {
  partnerName: "Blanusia",
  anniversaryDate: "2023-08-09T00:00:00+02:00",
  unlockCode: "09082023",
  quizQuestion: "Gdzie była nasza pierwsza randka?",
  quizAnswers: [
    { text: "W kinie", correct: true },
    { text: "Na Księżycu", correct: false },
    { text: "W kolejce po ziemniaki", correct: false },
    { text: "W sali konferencyjnej", correct: false }
  ],
  timeline: [
    {
      date: "09.08.2023",
      title: "Zaczęliśmy być razem - Barbie",
      icon: "01",
      image: "assets/photos/start-barbie.jpg",
      text: "Ten dzień zmienił zwykły kalendarz w coś do czego chce się."
    },
    {
      date: "Pierwsze tygodnie",
      title: "Nasze pierwsze kroki razem",
      icon: "02",
      image: "assets/photos/photo-2.jpg",
      text: "Rozmowy, wiadomości i śmiech, które szybko stały się tylko nasze."
    },
    {
      date: "Pierwszy wyjazd",
      title: "Świat był trochę bardziej nasz",
      icon: "03",
      image: "assets/photos/image12.jpg",
      text: "Nie chodziło tylko o miejsce. Chodziło o to że byliśmy tam razem."
    },
    {
      date: "Codzienność",
      title: "Najładniejsze są proste chwile",
      icon: "04",
      image: "assets/photos/image11.jpg",
      text: "Zwykły dzień moze sie zmienic w cudowny tylko jesli jestes ty obok Blanusia"
    },
    {
      date: "09.08.2026",
      title: "Trzy lata razem",
      icon: "05",
      image: "assets/photos/photo-1.jpg",
      text: "Trzy lata za nami a ja nadal mam wrażenie że my dopiero zaczynamy ."
    }
  ],
  letter: `Minęły już trzy lata.

A ja nadal bardzo lubię ten moment, kiedy widzę Twój uśmiech i świat robi się spokojniejszy.

Dziękuję Ci za każdy dzień, za cierpliwość, za śmiech, za rozmowy, za przytulanie i za wszystkie małe rzeczy, których nie da się dobrze opisać, ale czuje się je od razu.

Nie obiecuję, że zawsze będzie idealnie. Obiecuję, że będę wybierał Ciebie, dbał o nas i szukał szczęścia w tych zwykłych chwilach, które z Tobą są zupełnie niezwykłe.

Kocham Cię. Dziękuję za nasze 3 lata.`,
  coupons: [
    {
      title: "Kolacja",
      text: "Wybierasz miejsce, godzinę i deser. Ja ogarniam resztę."
    },
    {
      title: "Wieczór filmowy",
      text: "Ty wybierasz film, ja robię przekąski i nie marudzę przy wyborze."
    },
    {
      title: "Masaż",
      text: "Minimum 30 minut pełnego resetu. Bez negocjacji."
    },
    {
      title: "Śniadanie do łóżka",
      text: "Wersja słodka, słona albo obie, jeśli taki będzie nastrój."
    },
    {
      title: "Randka niespodzianka",
      text: "Dostajesz tylko godzinę startu. Reszta jest tajna."
    },
    {
      title: "Dzień bez pośpiechu",
      text: "Telefony odkładamy, świat czeka, a my mamy czas."
    }
  ],
  wheelPrizes: [
    "100 buziaków",
    "Pizza i film",
    "Słodka niespodzianka",
    "20 minut przytulania",
    "Spacer za rękę",
    "Randka niespodzianka"
  ],
  memoryImages: [
    "assets/photos/memory-1.jpg",
    "assets/photos/memory-2.jpg",
    "assets/photos/memory-3.jpg",
    "assets/photos/memory-4.jpg",
    "assets/photos/memory-5.jpg",
    "assets/photos/memory-6.jpg"
  ]
};

const state = {
  completedGames: new Set(),
  heartClicks: 0,
  memoryOpen: [],
  memoryMatched: 0,
  wheelRotation: 0,
  letterTimer: null,
  audioOn: false,
  audioContext: null,
  musicNodes: []
};

const els = {};

document.addEventListener("DOMContentLoaded", () => {
  cacheElements();
  personalizeCopy();
  setupSmoothButtons();
  setupCursorHeart();
  setupTimer();
  setupTimeline();
  setupHeartGame();
  setupMemoryGame();
  setupQuiz();
  setupRangeGame();
  setupWheel();
  setupLetter();
  setupCoupons();
  setupLock();
  setupFinalButtons();
  setupMusic();
  setupBackgroundCanvas();
  setupConfettiCanvas();
  updateProgress();
});

function cacheElements() {
  els.daysTogether = document.querySelector("#days-together");
  els.timeTogether = document.querySelector("#time-together");
  els.timeline = document.querySelector("#timeline");
  els.memoryPreview = document.querySelector("#memory-preview");
  els.progressLabel = document.querySelector("#progress-label");
  els.progressFill = document.querySelector("#progress-fill");
  els.heartTap = document.querySelector("#heart-tap");
  els.heartCount = document.querySelector("#heart-count");
  els.heartMessage = document.querySelector("#heart-message");
  els.memoryBoard = document.querySelector("#memory-board");
  els.memoryMessage = document.querySelector("#memory-message");
  els.restartMemory = document.querySelector("#restart-memory");
  els.quizQuestion = document.querySelector("#quiz-question");
  els.quizOptions = document.querySelector("#quiz-options");
  els.quizMessage = document.querySelector("#quiz-message");
  els.range = document.querySelector("#love-range");
  els.rangeValue = document.querySelector("#range-value");
  els.rangeMessage = document.querySelector("#range-message");
  els.wheel = document.querySelector("#wheel");
  els.spinWheel = document.querySelector("#spin-wheel");
  els.wheelMessage = document.querySelector("#wheel-message");
  els.letterText = document.querySelector("#letter-text");
  els.writeLetter = document.querySelector("#write-letter");
  els.couponGrid = document.querySelector("#coupon-grid");
  els.unlockCode = document.querySelector("#unlock-code");
  els.unlockButton = document.querySelector("#unlock-button");
  els.lockBox = document.querySelector("#lock-box");
  els.lockMessage = document.querySelector("#lock-message");
  els.musicToggle = document.querySelector(".music-toggle");
  els.song = document.querySelector("#song");
  els.skyCanvas = document.querySelector("#sky-canvas");
  els.confettiCanvas = document.querySelector("#confetti-canvas");
}

function personalizeCopy() {
  const heroTitle = document.querySelector(".hero h1");
  if (heroTitle) {
    heroTitle.textContent = `Dla Ciebie, ${CONFIG.partnerName}`;
  }
}

function setupSmoothButtons() {
  document.querySelectorAll("[data-scroll]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelector(button.dataset.scroll)?.scrollIntoView({ behavior: "smooth", block: "start" });
      startMusicIfWanted();
    });
  });
}

function setupCursorHeart() {
  const cursor = document.querySelector(".cursor-heart");
  if (!cursor || window.matchMedia("(pointer: coarse)").matches) return;

  window.addEventListener("pointermove", (event) => {
    cursor.style.opacity = "0.9";
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
  });

  window.addEventListener("pointerleave", () => {
    cursor.style.opacity = "0";
  });
}

function setupTimer() {
  const update = () => {
    const start = new Date(CONFIG.anniversaryDate);
    const now = new Date();
    const diff = Math.max(0, now - start);
    const totalMinutes = Math.floor(diff / 60000);
    const days = Math.floor(totalMinutes / 1440);
    const hours = Math.floor((totalMinutes % 1440) / 60);
    const minutes = totalMinutes % 60;

    els.daysTogether.textContent = days.toLocaleString("pl-PL");
    els.timeTogether.textContent = `${hours} godz. i ${minutes} min. dzisiaj do kolekcji`;
  };

  update();
  window.setInterval(update, 60000);
}

function setupTimeline() {
  els.timeline.innerHTML = "";
  CONFIG.timeline.forEach((item, index) => {
    const button = document.createElement("button");
    button.className = `timeline-item${index === 0 ? " is-active" : ""}`;
    button.type = "button";
    button.innerHTML = `
      <span class="timeline-dot">${escapeHtml(item.icon)}</span>
      <span class="timeline-copy">
        <span class="timeline-date">${escapeHtml(item.date)}</span>
        <span class="timeline-title">${escapeHtml(item.title)}</span>
      </span>
    `;
    button.addEventListener("click", () => showMemory(index));
    els.timeline.appendChild(button);
  });
  showMemory(0);
}

function showMemory(index) {
  const item = CONFIG.timeline[index];
  document.querySelectorAll(".timeline-item").forEach((node, itemIndex) => {
    node.classList.toggle("is-active", itemIndex === index);
  });

  els.memoryPreview.innerHTML = `
    <img src="${escapeAttribute(item.image)}" alt="${escapeAttribute(item.title)}">
    <div>
      <p class="memory-date">${escapeHtml(item.date)}</p>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.text)}</p>
    </div>
  `;
}

function setupHeartGame() {
  els.heartTap.addEventListener("click", () => {
    startMusicIfWanted();
    if (state.completedGames.has("heart")) return;

    state.heartClicks += 1;
    els.heartCount.textContent = state.heartClicks;
    const remaining = Math.max(0, 30 - state.heartClicks);
    els.heartMessage.textContent = remaining
      ? `Jeszcze ${remaining} kliknięć.`
      : "Tak samo szybko bije mi serce, kiedy Cię widzę.";

    if (state.heartClicks >= 30) {
      completeGame("heart");
      burstFromElement(els.heartTap, 48);
    }
  });
}

function setupMemoryGame() {
  els.restartMemory.addEventListener("click", () => buildMemoryBoard());
  buildMemoryBoard();
}

function buildMemoryBoard() {
  state.memoryOpen = [];
  state.memoryMatched = 0;
  state.completedGames.delete("memory");
  els.memoryMessage.textContent = `Pary: 0 / ${CONFIG.memoryImages.length}`;
  markPanel("memory", false);

  const cards = shuffle([...CONFIG.memoryImages, ...CONFIG.memoryImages]).map((src, index) => ({
    id: `${src}-${index}`,
    src
  }));

  els.memoryBoard.innerHTML = "";
  cards.forEach((card) => {
    const button = document.createElement("button");
    button.className = "memory-card";
    button.type = "button";
    button.dataset.src = card.src;
    button.innerHTML = `
      <span class="memory-card-inner">
        <span class="memory-face memory-front">?</span>
        <span class="memory-face memory-back">
          <img src="${escapeAttribute(card.src)}" alt="Zdjęcie w grze memory">
        </span>
      </span>
    `;
    button.addEventListener("click", () => flipMemoryCard(button));
    els.memoryBoard.appendChild(button);
  });
  updateProgress();
}

function flipMemoryCard(card) {
  startMusicIfWanted();
  if (card.classList.contains("is-open") || card.classList.contains("is-matched")) return;
  if (state.memoryOpen.length >= 2) return;

  card.classList.add("is-open");
  state.memoryOpen.push(card);

  if (state.memoryOpen.length !== 2) return;

  const [first, second] = state.memoryOpen;
  const isMatch = first.dataset.src === second.dataset.src;

  if (isMatch) {
    first.classList.add("is-matched");
    second.classList.add("is-matched");
    state.memoryOpen = [];
    state.memoryMatched += 1;
    els.memoryMessage.textContent = `Pary: ${state.memoryMatched} / ${CONFIG.memoryImages.length}`;

    if (state.memoryMatched === CONFIG.memoryImages.length) {
      els.memoryMessage.textContent = "Pamiętasz nas idealnie.";
      completeGame("memory");
      burstFromElement(els.memoryBoard, 70);
    }
    return;
  }

  window.setTimeout(() => {
    first.classList.remove("is-open");
    second.classList.remove("is-open");
    state.memoryOpen = [];
  }, 760);
}

function setupQuiz() {
  els.quizQuestion.textContent = CONFIG.quizQuestion;
  els.quizOptions.innerHTML = "";

  shuffle(CONFIG.quizAnswers).forEach((answer) => {
    const button = document.createElement("button");
    button.className = "quiz-option";
    button.type = "button";
    button.textContent = answer.text;
    button.addEventListener("click", () => {
      startMusicIfWanted();
      document.querySelectorAll(".quiz-option").forEach((option) => {
        option.disabled = true;
      });

      if (answer.correct) {
        button.classList.add("is-good");
        els.quizMessage.textContent = "Idealnie. Wiedziałem, że pamiętasz.";
        completeGame("quiz");
        burstFromElement(button, 44);
      } else {
        button.classList.add("is-bad");
        els.quizMessage.textContent = "Oj... chyba musimy tam wrócić i powtórzyć randkę.";
        window.setTimeout(() => {
          document.querySelectorAll(".quiz-option").forEach((option) => {
            option.disabled = false;
            option.classList.remove("is-bad");
          });
          els.quizMessage.textContent = "Spróbuj jeszcze raz.";
        }, 1200);
      }
    });
    els.quizOptions.appendChild(button);
  });
}

function setupRangeGame() {
  els.range.addEventListener("input", () => {
    const value = Number(els.range.value);
    els.rangeValue.textContent = `${value}%`;

    if (value < 35) {
      els.rangeMessage.textContent = "To jeszcze nawet nie początek.";
    } else if (value < 75) {
      els.rangeMessage.textContent = "Coraz cieplej.";
    } else if (value < 100) {
      els.rangeMessage.textContent = "Prawie, ale dalej za mało.";
    } else {
      els.rangeMessage.textContent = "100%? To nadal za mało.";
      if (!state.completedGames.has("slider")) {
        completeGame("slider");
        burstFromElement(els.range, 42);
      }
    }
  });
}

function setupWheel() {
  els.spinWheel.addEventListener("click", () => {
    startMusicIfWanted();
    els.spinWheel.disabled = true;
    const prizeIndex = Math.floor(Math.random() * CONFIG.wheelPrizes.length);
    const segment = 360 / CONFIG.wheelPrizes.length;
    const target = 360 - prizeIndex * segment - segment / 2;
    state.wheelRotation += 1440 + target;
    els.wheel.style.transform = `rotate(${state.wheelRotation}deg)`;
    els.wheelMessage.textContent = "Kręci się...";

    window.setTimeout(() => {
      els.wheelMessage.textContent = `Wygrywasz: ${CONFIG.wheelPrizes[prizeIndex]}.`;
      els.spinWheel.disabled = false;
      if (!state.completedGames.has("wheel")) {
        completeGame("wheel");
        burstFromElement(els.wheel, 68);
      }
    }, 4200);
  });
}

function setupLetter() {
  els.writeLetter.addEventListener("click", () => {
    startMusicIfWanted();
    typeLetter();
  });
}

function typeLetter() {
  window.clearInterval(state.letterTimer);
  els.letterText.textContent = "";
  let index = 0;
  els.writeLetter.disabled = true;

  state.letterTimer = window.setInterval(() => {
    els.letterText.textContent += CONFIG.letter[index] || "";
    index += 1;

    if (index >= CONFIG.letter.length) {
      window.clearInterval(state.letterTimer);
      els.writeLetter.disabled = false;
      burstFromElement(els.letterText, 48);
    }
  }, 28);
}

function setupCoupons() {
  els.couponGrid.innerHTML = "";
  CONFIG.coupons.forEach((coupon, index) => {
    const article = document.createElement("article");
    article.className = "coupon";
    article.tabIndex = 0;
    article.innerHTML = `
      <span class="coupon-hidden">Kliknij, żeby odkryć kupon ${index + 1}</span>
      <h3>${escapeHtml(coupon.title)}</h3>
      <p>${escapeHtml(coupon.text)}</p>
    `;
    const open = () => {
      startMusicIfWanted();
      if (!article.classList.contains("is-open")) {
        article.classList.add("is-open");
        burstFromElement(article, 26);
      }
    };
    article.addEventListener("click", open);
    article.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        open();
      }
    });
    els.couponGrid.appendChild(article);
  });
}

function setupLock() {
  const tryUnlock = () => {
    startMusicIfWanted();
    const value = els.unlockCode.value.replace(/\D/g, "");
    els.unlockCode.value = value;

    if (value === CONFIG.unlockCode) {
      els.lockBox.classList.add("is-open");
      els.lockMessage.textContent = "Otworzone. Idziemy do finału.";
      burstFromElement(els.lockBox, 90);
      window.setTimeout(() => {
        document.querySelector("#final").scrollIntoView({ behavior: "smooth", block: "start" });
      }, 650);
      return;
    }

    els.lockMessage.textContent = "Jeszcze nie. Spróbuj daty 09.08.2023 zapisanej bez kropek.";
    els.lockBox.animate(
      [
        { transform: "translateX(0)" },
        { transform: "translateX(-8px)" },
        { transform: "translateX(8px)" },
        { transform: "translateX(0)" }
      ],
      { duration: 220, iterations: 1 }
    );
  };

  els.unlockButton.addEventListener("click", tryUnlock);
  els.unlockCode.addEventListener("input", () => {
    els.unlockCode.value = els.unlockCode.value.replace(/\D/g, "");
  });
  els.unlockCode.addEventListener("keydown", (event) => {
    if (event.key === "Enter") tryUnlock();
  });
}

function setupFinalButtons() {
  document.querySelectorAll(".yes-button").forEach((button) => {
    button.addEventListener("click", () => {
      startMusicIfWanted();
      showToast("No i pięknie. Zapisuję to jako oficjalne TAK.");
      fireConfetti({ x: window.innerWidth / 2, y: window.innerHeight / 2 }, 160);
    });
  });
}

function setupMusic() {
  els.musicToggle.addEventListener("click", async () => {
    state.audioOn = !state.audioOn;
    els.musicToggle.classList.toggle("is-on", state.audioOn);
    els.musicToggle.setAttribute("aria-label", state.audioOn ? "Wyłącz muzykę" : "Włącz muzykę");

    if (state.audioOn) {
      await startMusic();
    } else {
      stopMusic();
    }
  });
}

function startMusicIfWanted() {
  if (state.audioOn) {
    startMusic();
  }
}

async function startMusic() {
  try {
    if (els.song.querySelector("source")?.getAttribute("src")) {
      els.song.volume = 0.28;
      await els.song.play();
      return;
    }
  } catch (error) {
    startGeneratedMusic();
  }

  if (els.song.paused) {
    startGeneratedMusic();
  }
}

function stopMusic() {
  els.song.pause();
  stopGeneratedMusic();
}

function startGeneratedMusic() {
  if (state.audioContext) return;
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;

  const context = new AudioContext();
  const master = context.createGain();
  master.gain.value = 0.05;
  master.connect(context.destination);

  const notes = [261.63, 329.63, 392.0, 523.25, 392.0, 329.63];
  let step = 0;

  const playNote = () => {
    if (!state.audioContext) return;
    const now = context.currentTime;
    const osc = context.createOscillator();
    const gain = context.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(notes[step % notes.length], now);
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.18, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.4);
    osc.connect(gain);
    gain.connect(master);
    osc.start(now);
    osc.stop(now + 1.5);
    state.musicNodes.push(osc, gain);
    step += 1;
  };

  playNote();
  const interval = window.setInterval(playNote, 1350);
  state.audioContext = context;
  state.musicNodes.push(master, interval);
}

function stopGeneratedMusic() {
  if (!state.audioContext) return;
  state.musicNodes.forEach((node) => {
    if (typeof node === "number") {
      window.clearInterval(node);
    } else if (typeof node.stop === "function") {
      try {
        node.stop();
      } catch (error) {
        // Oscillators can already be stopped by the browser.
      }
    } else if (typeof node.disconnect === "function") {
      node.disconnect();
    }
  });
  state.audioContext.close();
  state.audioContext = null;
  state.musicNodes = [];
}

function setupBackgroundCanvas() {
  const canvas = els.skyCanvas;
  const ctx = canvas.getContext("2d");
  const hearts = [];

  const resize = () => {
    canvas.width = window.innerWidth * window.devicePixelRatio;
    canvas.height = window.innerHeight * window.devicePixelRatio;
    ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    hearts.length = 0;
    const count = Math.min(42, Math.floor(window.innerWidth / 28));
    for (let i = 0; i < count; i += 1) {
      hearts.push(makeHeart(true));
    }
  };

  const animate = () => {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    hearts.forEach((heart) => {
      heart.y -= heart.speed;
      heart.x += Math.sin((heart.y + heart.phase) * 0.015) * 0.35;
      if (heart.y < -30) Object.assign(heart, makeHeart(false));
      drawHeart(ctx, heart.x, heart.y, heart.size, heart.color, heart.alpha);
    });
    window.requestAnimationFrame(animate);
  };

  window.addEventListener("resize", resize);
  resize();
  animate();
}

function makeHeart(randomY) {
  const colors = ["#f46b93", "#ff9f7f", "#8bb8ff", "#b9eadf", "#f8c95e"];
  return {
    x: Math.random() * window.innerWidth,
    y: randomY ? Math.random() * window.innerHeight : window.innerHeight + 30,
    size: 7 + Math.random() * 14,
    speed: 0.22 + Math.random() * 0.72,
    phase: Math.random() * 1000,
    alpha: 0.12 + Math.random() * 0.22,
    color: colors[Math.floor(Math.random() * colors.length)]
  };
}

function setupConfettiCanvas() {
  window.confettiPieces = [];
  const canvas = els.confettiCanvas;
  const ctx = canvas.getContext("2d");

  const resize = () => {
    canvas.width = window.innerWidth * window.devicePixelRatio;
    canvas.height = window.innerHeight * window.devicePixelRatio;
    ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
  };

  const animate = () => {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    window.confettiPieces = window.confettiPieces.filter((piece) => piece.life > 0);
    window.confettiPieces.forEach((piece) => {
      piece.life -= 1;
      piece.x += piece.vx;
      piece.y += piece.vy;
      piece.vy += 0.08;
      piece.rotation += piece.spin;
      ctx.save();
      ctx.translate(piece.x, piece.y);
      ctx.rotate(piece.rotation);
      ctx.fillStyle = piece.color;
      ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size * 0.62);
      ctx.restore();
    });
    window.requestAnimationFrame(animate);
  };

  window.addEventListener("resize", resize);
  resize();
  animate();
}

function fireConfetti(origin, amount = 70) {
  const colors = ["#f46b93", "#ff9f7f", "#8bb8ff", "#b9eadf", "#f8c95e", "#ffffff"];
  for (let i = 0; i < amount; i += 1) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 2 + Math.random() * 7;
    window.confettiPieces.push({
      x: origin.x,
      y: origin.y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 2,
      size: 5 + Math.random() * 8,
      rotation: Math.random() * Math.PI,
      spin: -0.12 + Math.random() * 0.24,
      life: 70 + Math.random() * 70,
      color: colors[Math.floor(Math.random() * colors.length)]
    });
  }
}

function burstFromElement(element, amount) {
  const rect = element.getBoundingClientRect();
  fireConfetti(
    {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    },
    amount
  );
}

function drawHeart(ctx, x, y, size, color, alpha) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(Math.PI / 4);
  ctx.globalAlpha = alpha;
  ctx.fillStyle = color;
  ctx.fillRect(-size / 2, -size / 2, size, size);
  ctx.beginPath();
  ctx.arc(0, -size / 2, size / 2, 0, Math.PI * 2);
  ctx.arc(-size / 2, 0, size / 2, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function completeGame(gameName) {
  state.completedGames.add(gameName);
  markPanel(gameName, true);
  updateProgress();
  showToast("Zadanie zaliczone.");
}

function markPanel(gameName, complete) {
  document.querySelector(`[data-game="${gameName}"]`)?.classList.toggle("is-complete", complete);
}

function updateProgress() {
  const total = 5;
  const done = state.completedGames.size;
  els.progressLabel.textContent = `${done} / ${total}`;
  els.progressFill.style.width = `${(done / total) * 100}%`;

  if (done === total) {
    showToast("Wszystkie zadania gotowe. Kłódka już czeka.");
    fireConfetti({ x: window.innerWidth / 2, y: 120 }, 110);
  }
}

function showToast(message) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    toast.setAttribute("role", "status");
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 2200);
}

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll("`", "&#096;");
}
