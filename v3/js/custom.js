(function ($) {

  "use strict";

  // HEADER NAVIGATION TOGGLE STATE
  $('.navbar-collapse a').on('click', function(){
    $(".navbar-collapse").collapse('hide');
  });

  // Theme Toggle Logic
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    // Check local storage for theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-theme');
    }

    themeToggle.addEventListener('click', function() {
      document.body.classList.toggle('dark-theme');
      const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
      localStorage.setItem('theme', currentTheme);
    });
  }

  // Interactive France Map Logic
  const mapData = {
    paris: {
      city: "Paris",
      region: "Île-de-France",
      desc: "The capital of France, home to L'Atelier's flagship private studio. Known as the City of Light.",
      accent: "Standard French (the reference pronunciation globally).",
      slang: "'Métro, boulot, dodo' (the daily grind of subway, work, sleep)."
    },
    lyon: {
      city: "Lyon",
      region: "Auvergne-Rhône-Alpes",
      desc: "France's culinary capital, nestled at the confluence of the Rhône and Saône rivers.",
      accent: "Slight regional drawl on the 'o' vowels, historically influenced by Franco-Provençal.",
      slang: "'Un gone' (a kid/young boy)."
    },
    marseille: {
      city: "Marseille",
      region: "Provence-Alpes-Côte d'Azur",
      desc: "A vibrant port city on the Mediterranean coast, famous for its history and sunny weather.",
      accent: "Warm southern drawl, nasal vowels are fully pronounced, and silent 'e' at word ends is sounded.",
      slang: "'Dégun' (nobody/no one)."
    },
    nice: {
      city: "Nice",
      region: "Provence-Alpes-Côte d'Azur",
      desc: "The jewel of the French Riviera, famous for the Promenade des Anglais.",
      accent: "Coastal Mediterranean style, with rhythmic intonations.",
      slang: "'Issa Nissa' (Go Nice! - in Nissart dialect)."
    },
    bordeaux: {
      city: "Bordeaux",
      region: "Nouvelle-Aquitaine",
      desc: "The global wine capital, renowned for its classic architecture and flat terrain.",
      accent: "Southwestern tone, with open vowel pronunciation.",
      slang: "'Gave' (very/extremely, e.g. 'gave bien')."
    },
    strasbourg: {
      city: "Strasbourg",
      region: "Grand Est",
      desc: "The seat of the European Parliament, blending French and German cultures.",
      accent: "Alsatian French, with distinct Germanic stress on word starts.",
      slang: "'Schluck' (a sip/gulp of a drink)."
    },
    lille: {
      city: "Lille",
      region: "Hauts-de-France",
      desc: "A warm and welcoming northern metropolis, known for its Flemish architecture.",
      accent: "Ch'ti French, with softer consonant clusters.",
      slang: "'Dracher' (to rain heavily)."
    },
    toulouse: {
      city: "Toulouse",
      region: "Occitanie",
      desc: "The Pink City, center of European aerospace and southern rugby.",
      accent: "Singing Occitan accent, turning nasal vowels into vibrant ringing notes.",
      slang: "'Bouléguer' (to stir or move things around)."
    }
  };

  // Add click listeners to map path elements
  const mapPaths = document.querySelectorAll('.france-svg-map path');
  if (mapPaths.length > 0) {
    mapPaths.forEach(path => {
      path.addEventListener('click', function() {
        const cityId = this.getAttribute('id');
        if (cityId && mapData[cityId]) {
          // Highlight path
          mapPaths.forEach(p => p.classList.remove('selected'));
          this.classList.add('selected');

          // Update facts card
          const data = mapData[cityId];
          document.getElementById('fact-city-title').textContent = data.city;
          document.getElementById('fact-region-title').textContent = data.region;
          document.getElementById('fact-desc').textContent = data.desc;
          document.getElementById('fact-accent').textContent = data.accent;
          document.getElementById('fact-slang').textContent = data.slang;
        }
      });
    });
  }

  // French Music Playlist Database
  const tracks = [
    {
      title: "La Vie En Rose",
      artist: "Édith Piaf",
      duration: 185,
      lengthStr: "3:05",
      subtitles: [
        { start: 0, end: 15, fr: "♫ (Intro Instrumentale) ♫", en: "♫ (Instrumental Intro) ♫" },
        { start: 15, end: 28, fr: "Des yeux qui font baisser les miens...", en: "Eyes that make mine look down..." },
        { start: 28, end: 40, fr: "Un rire qui se perd sur sa bouche...", en: "A laugh that gets lost on his mouth..." },
        { start: 40, end: 55, fr: "Voilà le portrait sans retouche de l'homme auquel j'appartiens...", en: "Here is the untouched portrait of the man to whom I belong..." },
        { start: 55, end: 72, fr: "Quand il me prend dans ses bras, il me parle tout bas...", en: "When he takes me in his arms, he speaks to me softly..." },
        { start: 72, end: 85, fr: "Je vois la vie en rose...", en: "I see life in pink (through rose-colored glasses)..." },
        { start: 85, end: 100, fr: "Il me dit des mots d'amour, des mots de tous les jours...", en: "He tells me words of love, everyday words..." },
        { start: 100, end: 120, fr: "Et ça me fait quelque chose...", en: "And it does something to me..." },
        { start: 120, end: 185, fr: "♫ (Refrain final instrumental) ♫", en: "♫ (Final instrumental chorus) ♫" }
      ]
    },
    {
      title: "Non, Je Ne Regrette Rien",
      artist: "Édith Piaf",
      duration: 140,
      lengthStr: "2:20",
      subtitles: [
        { start: 0, end: 12, fr: "Non ! Rien de rien...", en: "No! Nothing at all..." },
        { start: 12, end: 25, fr: "Non ! Je ne regrette rien...", en: "No! I regret nothing..." },
        { start: 25, end: 45, fr: "Ni le bien qu'on m'a fait, ni le mal...", en: "Neither the good done to me, nor the bad..." },
        { start: 45, end: 70, fr: "Tout ça m'est bien égal !", en: "It's all the same to me!" },
        { start: 70, end: 100, fr: "Car ma vie, car mes joies aujourd'hui, ça commence avec toi !", en: "Because my life, because my joys today, it starts with you!" },
        { start: 100, end: 140, fr: "♫ (Outro orchestrale dramatique) ♫", en: "♫ (Dramatic orchestral outro) ♫" }
      ]
    },
    {
      title: "Dernière Danse",
      artist: "Indila",
      duration: 215,
      lengthStr: "3:35",
      subtitles: [
        { start: 0, end: 10, fr: "♫ (Intro violons rythmée) ♫", en: "♫ (Rhythmic violin intro) ♫" },
        { start: 10, end: 28, fr: "O ma douce souffrance, pourquoi s'acharner ?", en: "Oh my sweet suffering, why be so persistent?" },
        { start: 28, end: 48, fr: "Je ne suis qu'un être sans importance...", en: "I am but an insignificant being..." },
        { start: 48, end: 70, fr: "Je cours dans le vent, un peu d'amour, un brin de miel...", en: "I run in the wind, a little love, a touch of honey..." },
        { start: 70, end: 95, fr: "Et je danse, danse, danse, danse...", en: "And I dance, dance, dance, dance..." },
        { start: 95, end: 120, fr: "Dans ce bruit, je cours et j'ai peur...", en: "In this noise, I run and I am afraid..." }
      ]
    }
  ];

  let currentTrackIdx = 0;
  let isPlaying = false;
  let elapsedSeconds = 0;
  let playInterval = null;

  const playBtn = document.getElementById('play-btn');
  const playIcon = document.getElementById('play-icon');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const vinyl = document.getElementById('vinyl-disc');
  const activeTrackTitle = document.getElementById('active-track-title');
  const activeTrackArtist = document.getElementById('active-track-artist');
  const elapsedLabel = document.getElementById('elapsed-label');
  const durationLabel = document.getElementById('duration-label');
  const progressBar = document.getElementById('player-progress-bar');
  const subFr = document.getElementById('sub-fr');
  const subEn = document.getElementById('sub-en');
  const playlistItems = document.querySelectorAll('.playlist-track-item');

  function updateSubtitles() {
    const track = tracks[currentTrackIdx];
    const sub = track.subtitles.find(s => elapsedSeconds >= s.start && elapsedSeconds < s.end);
    if (sub) {
      subFr.textContent = sub.fr;
      subEn.textContent = sub.en;
    } else {
      subFr.textContent = "♫ (Musique) ♫";
      subEn.textContent = "♫ (Music) ♫";
    }
  }

  function formatTime(sec) {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  function loadTrack(idx) {
    clearInterval(playInterval);
    currentTrackIdx = idx;
    elapsedSeconds = 0;
    
    // Highlight list item
    playlistItems.forEach((item, i) => {
      if (i === idx) item.classList.add('active');
      else item.classList.remove('active');
    });

    const track = tracks[currentTrackIdx];
    if (activeTrackTitle) activeTrackTitle.textContent = track.title;
    if (activeTrackArtist) activeTrackArtist.textContent = track.artist;
    if (elapsedLabel) elapsedLabel.textContent = "0:00";
    if (durationLabel) durationLabel.textContent = track.lengthStr;
    if (progressBar) progressBar.style.width = "0%";
    
    updateSubtitles();

    if (isPlaying) {
      startInterval();
    }
  }

  function startInterval() {
    playInterval = setInterval(() => {
      const track = tracks[currentTrackIdx];
      if (elapsedSeconds < track.duration) {
        elapsedSeconds++;
        if (elapsedLabel) elapsedLabel.textContent = formatTime(elapsedSeconds);
        if (progressBar) progressBar.style.width = `${(elapsedSeconds / track.duration) * 100}%`;
        updateSubtitles();
      } else {
        // Next track
        let nextIdx = (currentTrackIdx + 1) % tracks.length;
        loadTrack(nextIdx);
      }
    }, 1000);
  }

  if (playBtn) {
    playBtn.addEventListener('click', () => {
      isPlaying = !isPlaying;
      if (isPlaying) {
        playIcon.className = "bi-pause-circle-fill";
        if (vinyl) vinyl.style.animationPlayState = 'running';
        startInterval();
      } else {
        playIcon.className = "bi-play-circle-fill";
        if (vinyl) vinyl.style.animationPlayState = 'paused';
        clearInterval(playInterval);
      }
    });

    prevBtn.addEventListener('click', () => {
      let prevIdx = currentTrackIdx - 1;
      if (prevIdx < 0) prevIdx = tracks.length - 1;
      loadTrack(prevIdx);
    });

    nextBtn.addEventListener('click', () => {
      let nextIdx = (currentTrackIdx + 1) % tracks.length;
      loadTrack(nextIdx);
    });

    playlistItems.forEach(item => {
      item.addEventListener('click', function() {
        const idx = parseInt(this.getAttribute('data-track-index'));
        loadTrack(idx);
      });
    });

    // Seek bar click
    const seekTrack = document.getElementById('player-seek-track');
    if (seekTrack) {
      seekTrack.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const clickPercent = (e.clientX - rect.left) / rect.width;
        const track = tracks[currentTrackIdx];
        elapsedSeconds = Math.floor(clickPercent * track.duration);
        if (progressBar) progressBar.style.width = `${clickPercent * 100}%`;
        if (elapsedLabel) elapsedLabel.textContent = formatTime(elapsedSeconds);
        updateSubtitles();
      });
    }
  }

  // Interactive Placement Quiz
  const quizQuestions = [
    {
      q: "Choisissez la bonne phrase :",
      options: [
        "A. Je aimes le français.",
        "B. J'aime le français.",
        "C. J'aimer le français.",
        "D. Je aimer le français."
      ],
      correct: 1, // B
      ex: "Correct! With verbs starting with vowels, the subject pronoun 'Je' contracts to 'J''."
    },
    {
      q: "Quel est le synonyme familier de 'Livre' ?",
      options: [
        "A. Un bouquin.",
        "B. Un stylo.",
        "C. Un dodo.",
        "D. Un boulot."
      ],
      correct: 0, // A
      ex: "Correct! 'Un bouquin' is popular French slang (argot) for a book."
    },
    {
      q: "Choisissez le pronom correct : 'Il donne le livre à Marie. Il ___ donne.'",
      options: [
        "A. le lui",
        "B. lui le",
        "C. la lui",
        "D. y en"
      ],
      correct: 0, // A
      ex: "Correct! The direct object pronoun 'le' (le livre) precedes the indirect pronoun 'lui' (à Marie)."
    },
    {
      q: "Que signifie l'expression 'Tomber dans les pommes' ?",
      options: [
        "A. To fall from a tree.",
        "B. To eat healthy.",
        "C. To faint/pass out.",
        "D. To fail an exam."
      ],
      correct: 2, // C
      ex: "Correct! It is a colorful idiomatic expression meaning to faint (s'évanouir)."
    }
  ];

  let currentQuestionIdx = 0;
  let quizScore = 0;
  const chatHistory = document.getElementById('chat-history');
  const optionsGrid = document.getElementById('options-grid');

  function appendChatBubble(text, sender) {
    if (!chatHistory) return;
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${sender}`;
    bubble.innerHTML = text.replace(/\n/g, '<br>');
    chatHistory.appendChild(bubble);
    chatHistory.scrollTop = chatHistory.scrollHeight;
  }

  function displayQuestion() {
    if (!optionsGrid) return;
    optionsGrid.innerHTML = '';
    if (currentQuestionIdx < quizQuestions.length) {
      const qData = quizQuestions[currentQuestionIdx];
      appendChatBubble(`<strong>Question ${currentQuestionIdx + 1}:</strong>\n${qData.q}`, 'bot');
      
      qData.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = "quiz-option-btn";
        btn.textContent = opt;
        btn.addEventListener('click', () => handleAnswerSelect(idx, btn));
        optionsGrid.appendChild(btn);
      });
    } else {
      // Quiz Finished!
      let level = "A1 (Beginner)";
      if (quizScore === 4) level = "B2 (Vantage/Upper-Intermediate)";
      else if (quizScore === 3) level = "B1 (Threshold/Intermediate)";
      else if (quizScore === 2) level = "A2 (Waystage/Elementary)";

      appendChatBubble(`<strong>Quiz Fini ! 🎉</strong>\nVotre score : ${quizScore}/${quizQuestions.length}\nNiveau CEFR recommandé : <strong>${level}</strong>.\nPierre vous suggère de réserver un cours d'évaluation gratuit pour affiner cela.`, 'bot');

      // Add enrollment suggestion button
      const ctaBtn = document.createElement('button');
      ctaBtn.className = "btn custom-btn mt-3 w-100";
      ctaBtn.textContent = "Réserver mon cours d'évaluation gratuit";
      ctaBtn.addEventListener('click', () => {
        window.location.hash = "#section_reservation";
        // Smooth scroll
        const reserveSec = document.getElementById('section_reservation');
        if (reserveSec) reserveSec.scrollIntoView({ behavior: 'smooth' });
      });
      optionsGrid.appendChild(ctaBtn);
    }
  }

  function handleAnswerSelect(selectedIdx, btnElement) {
    const qData = quizQuestions[currentQuestionIdx];
    const buttons = optionsGrid.querySelectorAll('.quiz-option-btn');
    
    // Disable all options
    buttons.forEach(btn => btn.setAttribute('disabled', 'true'));

    appendChatBubble(qData.options[selectedIdx], 'user');

    if (selectedIdx === qData.correct) {
      btnElement.classList.add('correct');
      quizScore++;
      setTimeout(() => {
        appendChatBubble(qData.ex, 'bot');
        currentQuestionIdx++;
        setTimeout(displayQuestion, 1500);
      }, 800);
    } else {
      btnElement.classList.add('wrong');
      buttons[qData.correct].classList.add('correct');
      setTimeout(() => {
        appendChatBubble(`Dommage ! La bonne réponse était la option ${String.fromCharCode(65 + qData.correct)}.\n<em>Explication : ${qData.ex}</em>`, 'bot');
        currentQuestionIdx++;
        setTimeout(displayQuestion, 2500);
      }, 800);
    }
  }

  if (chatHistory) {
    // Start Quiz
    appendChatBubble("Bonjour ! Je suis Pierre. Commençons un court test pour placer votre niveau de français. Êtes-vous prêt ?", "bot");
    const startBtn = document.createElement('button');
    startBtn.className = "btn custom-btn w-100";
    startBtn.textContent = "Commencer le test";
    if (optionsGrid) {
      startBtn.addEventListener('click', () => {
        displayQuestion();
      });
      optionsGrid.appendChild(startBtn);
    }
  }

  // Reservation Calendar Slot Scheduler
  const slotsData = {
    "15": ["09:00 - 10:00", "11:00 - 12:00", "14:00 - 15:00"],
    "16": ["10:00 - 11:00", "13:00 - 14:00", "16:00 - 17:00"],
    "17": ["09:30 - 10:30", "11:30 - 12:30", "15:00 - 16:00"],
    "20": ["08:30 - 09:30", "14:00 - 15:00", "17:00 - 18:00"],
    "21": ["10:00 - 11:00", "12:00 - 13:00", "16:30 - 17:30"]
  };

  let selectedDay = null;
  let selectedSlot = null;

  const calendarDays = document.querySelectorAll('.calendar-day-btn:not(.muted)');
  const slotsContainer = document.getElementById('slots-grid');
  const selectedDateText = document.getElementById('selected-date-text');
  const selectedTimeText = document.getElementById('selected-time-text');
  const confirmBtn = document.getElementById('confirm-reservation-btn');

  function renderSlots(day) {
    if (!slotsContainer) return;
    slotsContainer.innerHTML = '';
    selectedSlot = null;
    if (confirmBtn) confirmBtn.setAttribute('disabled', 'true');

    if (slotsData[day]) {
      slotsData[day].forEach(slot => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'slot-selection-btn';
        btn.textContent = slot;
        btn.addEventListener('click', function() {
          const activeSlots = slotsContainer.querySelectorAll('.slot-selection-btn');
          activeSlots.forEach(s => s.classList.remove('selected'));
          this.classList.add('selected');
          
          selectedSlot = slot;
          if (selectedTimeText) selectedTimeText.textContent = slot;
          if (confirmBtn) confirmBtn.removeAttribute('disabled');
        });
        slotsContainer.appendChild(btn);
      });
    } else {
      slotsContainer.innerHTML = '<p class="col-12 text-muted text-center py-3">Aucun créneau disponible pour ce jour.</p>';
    }
  }

  calendarDays.forEach(dayBtn => {
    dayBtn.addEventListener('click', function() {
      calendarDays.forEach(btn => btn.classList.remove('selected'));
      this.classList.add('selected');

      const dayVal = this.getAttribute('data-day');
      selectedDay = dayVal;
      if (selectedDateText) selectedDateText.textContent = `${dayVal} Juillet 2026`;
      if (selectedTimeText) selectedTimeText.textContent = "Sélectionnez un créneau";
      
      renderSlots(dayVal);
    });
  });

  if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      if (selectedDay && selectedSlot) {
        alert(`Félicitations ! Votre cours d'évaluation gratuit avec Pierre est réservé le ${selectedDay} Juillet 2026 à ${selectedSlot}.\nUn e-mail de confirmation et un lien Zoom ont été envoyés.`);
        // Reset
        calendarDays.forEach(btn => btn.classList.remove('selected'));
        if (slotsContainer) slotsContainer.innerHTML = '<p class="col-12 text-muted text-center py-3">Sélectionnez une date dans le calendrier pour voir les créneaux.</p>';
        if (selectedDateText) selectedDateText.textContent = "Sélectionnez une date";
        if (selectedTimeText) selectedTimeText.textContent = "Sélectionnez un créneau";
        confirmBtn.setAttribute('disabled', 'true');
      }
    });
  }

  // Student Portal Mock States
  const loginBtn = document.getElementById('portal-login-btn');
  const portalLoginForm = document.getElementById('portal-login-form');
  const studentDashboard = document.getElementById('student-dashboard-panel');
  const welcomeStudentName = document.getElementById('welcome-student-name');

  if (loginBtn) {
    loginBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = document.getElementById('student-email').value;
      if (email) {
        const studentName = email.split('@')[0];
        // Capitalize name
        const capitalized = studentName.charAt(0).toUpperCase() + studentName.slice(1);
        
        if (portalLoginForm) portalLoginForm.style.display = 'none';
        if (studentDashboard) studentDashboard.style.display = 'block';
        if (welcomeStudentName) welcomeStudentName.textContent = `Bonjour, ${capitalized} !`;
      }
    });

    // Assignment dropbox drop simulation
    const dropbox = document.getElementById('assignment-dropbox');
    if (dropbox) {
      dropbox.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropbox.style.borderColor = 'var(--primary-color)';
      });

      dropbox.addEventListener('dragleave', () => {
        dropbox.style.borderColor = 'var(--border-color)';
      });

      dropbox.addEventListener('drop', (e) => {
        e.preventDefault();
        dropbox.innerHTML = '<i class="bi-check2-circle text-success" style="font-size: 32px;"></i><p class="text-success mt-2"><strong>Devoir envoyé avec succès !</strong><br>Pierre va corriger votre devoir sous 24h.</p>';
      });

      dropbox.addEventListener('click', () => {
        // Simulate file upload
        dropbox.innerHTML = '<i class="bi-check2-circle text-success" style="font-size: 32px;"></i><p class="text-success mt-2"><strong>Devoir envoyé avec succès !</strong><br>Pierre va corriger votre devoir sous 24h.</p>';
      });
    }
  }

})(window.jQuery);
