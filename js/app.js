document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================
     1. LOADER SCREEN ANIMATION
  ========================================== */
  const loader = document.getElementById('loader');
  setTimeout(() => {
    if (loader) {
      loader.style.opacity = '0';
      setTimeout(() => {
        loader.style.display = 'none';
      }, 500);
    }
  }, 1200); // Gives time to see the Eiffel Tower animation

  /* ==========================================
     2. NAVIGATION & SINGLE PAGE ROUTING
  ========================================== */
  const navMenu = document.getElementById('nav-menu');
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navLinks = document.querySelectorAll('.nav-link');
  const views = document.querySelectorAll('.app-view');

  // Toggle Hamburger Menu
  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => {
      navMenu.classList.toggle('mobile-open');
      hamburgerBtn.classList.toggle('active');
    });
  }

  // Route function
  function showView(targetId) {
    views.forEach(view => {
      view.classList.remove('active-view');
    });
    const activeView = document.getElementById(`view-${targetId}`);
    if (activeView) {
      activeView.classList.add('active-view');
    }
    
    // Update active nav links
    navLinks.forEach(link => {
      if (link.getAttribute('data-view') === targetId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Close mobile nav
    if (navMenu) navMenu.classList.remove('mobile-open');
    if (hamburgerBtn) hamburgerBtn.classList.remove('active');

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Nav link click triggers
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetView = link.getAttribute('data-view');
      showView(targetView);
      window.location.hash = targetView;
    });
  });

  // Logo button route home
  const logoBtn = document.getElementById('logo-btn');
  if (logoBtn) {
    logoBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showView('home');
      window.location.hash = 'home';
    });
  }

  // Global button view triggers (CTA buttons)
  document.body.addEventListener('click', (e) => {
    if (e.target.classList.contains('trigger-nav')) {
      e.preventDefault();
      const targetView = e.target.getAttribute('data-target');
      showView(targetView);
      window.location.hash = targetView;
    }
  });

  // Initial Route Check from Hash
  if (window.location.hash) {
    const route = window.location.hash.substring(1);
    const validRoutes = ['home', 'about', 'courses', 'resources', 'leveltest', 'blog', 'studentzone', 'book', 'testimonials', 'contact'];
    if (validRoutes.includes(route)) {
      showView(route);
    }
  }

  /* ==========================================
     3. HERO ANIMATED TICKER (Rotate Words)
  ========================================== */
  const tickerWord = document.getElementById('ticker-word');
  const words = ['Travel', 'Exams', 'Career', 'Fun', 'Culture'];
  let currentWordIndex = 0;

  setInterval(() => {
    if (tickerWord) {
      tickerWord.style.opacity = '0';
      setTimeout(() => {
        currentWordIndex = (currentWordIndex + 1) % words.length;
        tickerWord.textContent = words[currentWordIndex];
        tickerWord.style.opacity = '1';
      }, 300);
    }
  }, 2500);

  /* ==========================================
     4. WELCOME VIDEO MODAL
  ========================================== */
  const videoTrigger = document.getElementById('intro-video-trigger');
  const videoModal = document.getElementById('video-modal');
  const videoModalClose = document.getElementById('video-modal-close');
  const videoPlayer = document.getElementById('intro-video-player');

  if (videoTrigger && videoModal) {
    videoTrigger.addEventListener('click', () => {
      videoModal.classList.remove('d-none');
      if (videoPlayer) videoPlayer.play();
    });
  }

  function closeVideoModal() {
    if (videoModal) {
      videoModal.classList.add('d-none');
      if (videoPlayer) {
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
      }
    }
  }

  if (videoModalClose) {
    videoModalClose.addEventListener('click', closeVideoModal);
  }

  if (videoModal) {
    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) closeVideoModal();
    });
  }

  /* ==========================================
     5. INTERACTIVE MAP OF FRANCE - CULTURAL FACTS
  ========================================== */
  const markers = document.querySelectorAll('.map-marker');
  const factTitle = document.getElementById('fact-city-title');
  const factDesc = document.getElementById('fact-city-desc');
  const factSpecialty = document.getElementById('fact-specialty');
  const factExpression = document.getElementById('fact-expression');

  const cityFacts = {
    'Paris': {
      desc: 'The capital of France, home to the Eiffel Tower, the Louvre, and cozy street cafes. Paris is the cultural and historical epicentre of the country.',
      specialty: 'Croissant, Macarons, Entrecôte frites',
      expression: '"Métro, boulot, dodo" (The typical routine: Metro, work, sleep)'
    },
    'Lyon': {
      desc: 'Known as the gastronomy capital of the world. Lyon features historic Renaissance districts and is famous for its "Bouchons" (traditional Lyonnais restaurants).',
      specialty: 'Quenelles de brochet, Tarte aux pralines, Salade Lyonnaise',
      expression: '"Faire un bouchon" (To get stuck in a traffic jam - or visit a tavern!)'
    },
    'Marseille': {
      desc: 'A vibrant port city in the South of France on the Mediterranean. It is famous for its sunny climate, the Vieux-Port, and coastal Calanques.',
      specialty: 'Bouillabaisse (Fish stew), Navettes de Marseille, Tapenade',
      expression: '"C\'est le oai!" (It is chaotic/messy! - Provençal slang)'
    },
    'Bordeaux': {
      desc: 'The hub of the world\'s most famous wine-growing region. Located in southwest France, it has stunning 18th-century architecture and a modern Water Mirror.',
      specialty: 'Canelés (Rum and vanilla cakes), Bordeaux wines, Oysters from Arcachon',
      expression: '"Gavé" (Very/extremely - e.g., "C\'est gavé bon")'
    },
    'Nice': {
      desc: 'A gorgeous city along the French Riviera (Côte d\'Azur) surrounded by mountains and the sea. Known for the Promenade des Anglais.',
      specialty: 'Socca (Chickpea flatbread), Salade Niçoise, Pissaladière',
      expression: '"Nissa la Bella" (Nice the Beautiful - local motto)'
    }
  };

  markers.forEach(marker => {
    marker.addEventListener('click', () => {
      // Remove active class from markers
      markers.forEach(m => m.classList.remove('active'));
      marker.classList.add('active');

      const city = marker.getAttribute('data-city');
      const data = cityFacts[city];

      if (data) {
        factTitle.innerHTML = `<i class="fa-solid fa-location-dot text-red"></i> ${city}`;
        factDesc.textContent = data.desc;
        factSpecialty.textContent = data.specialty;
        factExpression.textContent = data.expression;
      }
    });
  });

  /* ==========================================
     6. MUSIC PLAYLIST AUDIO PLAYER SIMULATION
  ========================================== */
  const playlistItems = document.querySelectorAll('.playlist-item');
  const trackTitle = document.getElementById('player-track-title');
  const trackArtist = document.getElementById('player-track-artist');
  const playPauseBtn = document.getElementById('player-play-pause');
  const progressBarFill = document.getElementById('player-bar-fill');
  const playerBarClick = document.getElementById('player-bar-click');
  const timeElapsedEl = document.getElementById('time-elapsed');
  const trackDurationEl = document.getElementById('track-duration');
  const vinylIcon = document.querySelector('.vinyl-animate');

  const tracks = [
    { title: 'La Vie En Rose', artist: 'Édith Piaf', duration: 185, lengthStr: '3:05' },
    { title: 'Non, Je Ne Regrette Rien', artist: 'Édith Piaf', duration: 144, lengthStr: '2:24' },
    { title: 'Dernière Danse', artist: 'Indila', duration: 212, lengthStr: '3:32' },
    { title: 'Sympathique', artist: 'Pink Martini', duration: 165, lengthStr: '2:45' }
  ];

  let currentTrackIndex = 0;
  let isPlaying = false;
  let audioTimerInterval = null;
  let elapsedSeconds = 0;

  function formatTime(secs) {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  }

  function loadTrack(index) {
    currentTrackIndex = index;
    const track = tracks[currentTrackIndex];
    trackTitle.textContent = track.title;
    trackArtist.textContent = track.artist;
    trackDurationEl.textContent = track.lengthStr;
    elapsedSeconds = 0;
    progressBarFill.style.width = '0%';
    timeElapsedEl.textContent = '0:00';
    
    // Highlight track list item
    playlistItems.forEach((item, idx) => {
      if (idx === index) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    if (isPlaying) {
      startPlayback();
    }
  }

  function startPlayback() {
    clearInterval(audioTimerInterval);
    audioTimerInterval = setInterval(() => {
      elapsedSeconds++;
      const currentTrack = tracks[currentTrackIndex];
      if (elapsedSeconds >= currentTrack.duration) {
        // Auto Next
        loadTrack((currentTrackIndex + 1) % tracks.length);
      } else {
        const percent = (elapsedSeconds / currentTrack.duration) * 100;
        progressBarFill.style.width = `${percent}%`;
        timeElapsedEl.textContent = formatTime(elapsedSeconds);
      }
    }, 1000);
    vinylIcon.style.animationPlayState = 'running';
  }

  function pausePlayback() {
    clearInterval(audioTimerInterval);
    vinylIcon.style.animationPlayState = 'paused';
  }

  playPauseBtn.addEventListener('click', () => {
    isPlaying = !isPlaying;
    if (isPlaying) {
      playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
      startPlayback();
    } else {
      playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
      pausePlayback();
    }
  });

  document.getElementById('player-prev').addEventListener('click', () => {
    let prev = currentTrackIndex - 1;
    if (prev < 0) prev = tracks.length - 1;
    loadTrack(prev);
  });

  document.getElementById('player-next').addEventListener('click', () => {
    loadTrack((currentTrackIndex + 1) % tracks.length);
  });

  playlistItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      loadTrack(index);
      if (!isPlaying) {
        isPlaying = true;
        playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        startPlayback();
      }
    });
  });

  // Mock Progress Bar Seek Click
  if (playerBarClick) {
    playerBarClick.addEventListener('click', (e) => {
      const rect = playerBarClick.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const totalWidth = rect.width;
      const percentage = clickX / totalWidth;
      const currentTrack = tracks[currentTrackIndex];
      
      elapsedSeconds = Math.floor(percentage * currentTrack.duration);
      progressBarFill.style.width = `${percentage * 100}%`;
      timeElapsedEl.textContent = formatTime(elapsedSeconds);
    });
  }

  /* ==========================================
     7. FRENCH LEVEL TEST (QUIZ)
  ========================================== */
  const quizBox = document.getElementById('quiz-box');
  const quizQText = document.getElementById('quiz-question-text');
  const quizOptionsList = document.getElementById('quiz-options-list');
  const quizCurrNum = document.getElementById('quiz-curr-num');
  const quizProgressFill = document.getElementById('quiz-progress-fill');
  const quizResultBox = document.getElementById('quiz-result-box');
  const resultScore = document.getElementById('result-score');
  const resultBadge = document.getElementById('result-level-badge');
  const resultDesc = document.getElementById('result-level-desc');
  const quizRetryBtn = document.getElementById('quiz-retry-btn');

  const quizQuestions = [
    {
      q: 'Comment s\'appelle la salutation standard le matin en français?',
      options: ['Bonjour', 'Bonsoir', 'Bonne nuit', 'Au revoir'],
      correct: 0
    },
    {
      q: 'Choisissez la bonne forme de verbe: "Nous ____ (parler) français."',
      options: ['parle', 'parles', 'parlons', 'parlez'],
      correct: 2
    },
    {
      q: 'Quel mot est un "faux ami" (signifie "librarian" en anglais, pas "bookstore")?',
      options: ['Librairie', 'Bibliothèque', 'Bibliothécaire', 'Écrivain'],
      correct: 2
    },
    {
      q: 'Complétez la phrase: "Si j\'avais plus de temps, je ____ en France."',
      options: ['voyagerais', 'voyageais', 'voyagerai', 'voyage'],
      correct: 0
    },
    {
      q: 'Que signifie l\'expression idiomatique "Avoir le cafard"?',
      options: ['To be highly energetic', 'To feel down or depressed', 'To eat breakfast late', 'To meet friends at a pub'],
      correct: 1
    }
  ];

  let quizIndex = 0;
  let quizScore = 0;

  function loadQuizQuestion() {
    if (quizIndex < quizQuestions.length) {
      const curr = quizQuestions[quizIndex];
      quizCurrNum.textContent = quizIndex + 1;
      quizProgressFill.style.width = `${((quizIndex + 1) / quizQuestions.length) * 100}%`;
      quizQText.textContent = curr.q;
      quizOptionsList.innerHTML = '';

      curr.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option-item';
        btn.textContent = opt;
        btn.addEventListener('click', () => handleQuizAnswer(idx, btn));
        quizOptionsList.appendChild(btn);
      });
    } else {
      showQuizResults();
    }
  }

  function handleQuizAnswer(selectedIdx, btnElement) {
    const correctIdx = quizQuestions[quizIndex].correct;
    
    // Disable all options
    const optionBtns = quizOptionsList.querySelectorAll('.quiz-option-item');
    optionBtns.forEach(btn => btn.disabled = true);

    if (selectedIdx === correctIdx) {
      btnElement.classList.add('correct');
      quizScore++;
    } else {
      btnElement.classList.add('wrong');
      optionBtns[correctIdx].classList.add('correct');
    }

    setTimeout(() => {
      quizIndex++;
      if (quizIndex < quizQuestions.length) {
        loadQuizQuestion();
      } else {
        showQuizResults();
      }
    }, 1500);
  }

  function showQuizResults() {
    quizBox.classList.add('d-none');
    quizResultBox.classList.remove('d-none');
    resultScore.textContent = quizScore;

    let badge = 'A1 - Beginner';
    let desc = 'You are at the foundation stage! We recommend starting with Monsieur Pierre\'s Beginner Course to master basic vocabulary and grammar.';
    
    if (quizScore === 3 || quizScore === 4) {
      badge = 'A2/B1 - Intermediate';
      desc = 'You have solid fundamentals! Our Active Conversation Live Cohorts will help you master fluid tenses and speaking confidence.';
    } else if (quizScore === 5) {
      badge = 'B2/C1 - Advanced';
      desc = 'Formidable! You understand complex expressions and conditionals. Join our Advanced French Mastery group to perfect your expression.';
    }

    resultBadge.textContent = badge;
    resultDesc.textContent = desc;
  }

  if (quizRetryBtn) {
    quizRetryBtn.addEventListener('click', () => {
      quizIndex = 0;
      quizScore = 0;
      quizBox.classList.remove('d-none');
      quizResultBox.classList.add('d-none');
      loadQuizQuestion();
    });
  }

  loadQuizQuestion();

  /* ==========================================
     8. BLOG FILTERING
  ========================================== */
  const blogFilterBtns = document.querySelectorAll('.blog-filter-btn');
  const blogCards = document.querySelectorAll('.blog-card');

  blogFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      blogFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');
      blogCards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ==========================================
     9. STUDENT ZONE (LOGIN & DASHBOARD MOCKS)
  ========================================== */
  const loginForm = document.getElementById('student-login-form');
  const loginBox = document.getElementById('student-login-box');
  const dashboardBox = document.getElementById('student-dashboard');
  const logoutBtn = document.getElementById('student-logout-btn');

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      loginBox.classList.add('d-none');
      dashboardBox.classList.remove('d-none');
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      dashboardBox.classList.add('d-none');
      loginBox.classList.remove('d-none');
    });
  }

  // Forum Interactive Post Simulator
  const forumInput = document.getElementById('forum-post-input');
  const forumBtn = document.getElementById('forum-post-btn');
  const forumContainer = document.getElementById('forum-posts-container');

  if (forumBtn && forumInput && forumContainer) {
    forumBtn.addEventListener('click', () => {
      const text = forumInput.value.trim();
      if (text !== '') {
        const post = document.createElement('div');
        post.className = 'forum-post';
        post.innerHTML = `
          <div class="post-header">
            <span class="post-user">Jean Dupont (You)</span>
            <span class="post-time">Just now</span>
          </div>
          <p class="post-body">${text}</p>
          <div class="post-actions">
            <button class="post-action-btn" onclick="alert('Liked post!')"><i class="fa-regular fa-thumbs-up"></i> 0 Likes</button>
          </div>
        `;
        forumContainer.prepend(post);
        forumInput.value = '';
        forumContainer.scrollTop = 0;
      }
    });
  }

  // Homework Drag-and-Drop Simulator
  const dropzone = document.getElementById('homework-dropzone');
  const fileInput = document.getElementById('homework-file-input');
  const uploadFeedback = document.getElementById('upload-feedback');

  if (dropzone && fileInput) {
    dropzone.addEventListener('click', () => fileInput.click());
    
    dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropzone.style.borderColor = 'var(--accent-color)';
    });

    dropzone.addEventListener('dragleave', () => {
      dropzone.style.borderColor = 'var(--border-color)';
    });

    dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropzone.style.borderColor = 'var(--border-color)';
      if (e.dataTransfer.files.length > 0) {
        triggerUploadFeedback();
      }
    });

    fileInput.addEventListener('change', () => {
      if (fileInput.files.length > 0) {
        triggerUploadFeedback();
      }
    });
  }

  function triggerUploadFeedback() {
    dropzone.classList.add('d-none');
    uploadFeedback.classList.remove('d-none');
    setTimeout(() => {
      // reset back after 4 seconds
      uploadFeedback.classList.add('d-none');
      dropzone.classList.remove('d-none');
    }, 4000);
  }

  /* ==========================================
     10. CALENDAR INTEGRATION & CLASS BOOKING
  ========================================== */
  const calendarDays = document.getElementById('calendar-days-container');
  const timeSlotsContainer = document.getElementById('time-slots-container');
  const slotBtns = document.querySelectorAll('.time-slot-btn');
  const summaryDatetime = document.getElementById('summary-datetime');
  const summaryClassType = document.getElementById('summary-class-type');
  const summaryPrice = document.getElementById('summary-price');
  const bookingSubmitBtn = document.getElementById('booking-submit-btn');
  const bookingCheckoutForm = document.getElementById('booking-checkout-form');
  const paymentModal = document.getElementById('payment-modal');
  const paymentModalClose = document.getElementById('payment-modal-close');
  const paymentTotalDisplay = document.getElementById('payment-total-display');
  const paymentForm = document.getElementById('payment-form');
  const paymentSuccessMsg = document.getElementById('payment-success-msg');
  const classTypesRadios = document.querySelectorAll('input[name="booking-type"]');
  const classTypeLabels = document.querySelectorAll('.booking-type-label');

  let selectedDate = null;
  let selectedTime = null;
  let selectedPrice = '$0.00';
  let selectedClassName = 'Free Consultation Lesson';

  // Generate calendar days for July 2026 (starts on a Wednesday)
  if (calendarDays) {
    const daysInMonth = 31;
    const startOffset = 3; // Wednesday starts at cell index 3 (0-Sun, 1-Mon, etc)

    // Prefill offsets
    for (let i = 0; i < startOffset; i++) {
      const spacer = document.createElement('div');
      spacer.className = 'calendar-day-btn disabled-day';
      calendarDays.appendChild(spacer);
    }

    // Generate month days
    for (let day = 1; day <= daysInMonth; day++) {
      const btn = document.createElement('button');
      btn.className = 'calendar-day-btn';
      btn.textContent = day;

      // Mock only highlighting some week days for classes (Mon, Wed, Fri)
      const cellIndex = (startOffset + day - 1) % 7;
      if (cellIndex === 1 || cellIndex === 3 || cellIndex === 5) {
        btn.classList.add('has-slots');
      }

      btn.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('.calendar-day-btn').forEach(b => b.classList.remove('selected-day'));
        btn.classList.add('selected-day');
        
        selectedDate = `July ${day}, 2026`;
        timeSlotsContainer.classList.remove('d-none');
        updateSummary();
      });

      calendarDays.appendChild(btn);
    }
  }

  // Radio button course types selector
  classTypeLabels.forEach((label, idx) => {
    label.addEventListener('click', () => {
      classTypeLabels.forEach(l => l.classList.remove('active'));
      label.classList.add('active');
      const radio = label.querySelector('input[type="radio"]');
      radio.checked = true;

      if (radio.value === 'trial') {
        selectedClassName = 'Free Consultation Lesson';
        selectedPrice = '$0.00';
      } else {
        selectedClassName = 'One-on-One French Class';
        selectedPrice = '$60.00';
      }
      updateSummary();
    });
  });

  // Time slot buttons click handler
  slotBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      slotBtns.forEach(b => b.classList.remove('selected-slot'));
      btn.classList.add('selected-slot');
      
      selectedTime = btn.textContent;
      bookingSubmitBtn.removeAttribute('disabled');
      updateSummary();
    });
  });

  function updateSummary() {
    summaryClassType.textContent = selectedClassName;
    summaryPrice.textContent = selectedPrice;
    
    if (selectedDate && selectedTime) {
      summaryDatetime.textContent = `${selectedDate} at ${selectedTime}`;
    } else if (selectedDate) {
      summaryDatetime.textContent = `${selectedDate} (Select time)`;
    } else {
      summaryDatetime.textContent = 'Not selected';
    }
  }

  // Submit appointment checkout modal popup
  if (bookingCheckoutForm) {
    bookingCheckoutForm.addEventListener('submit', (e) => {
      e.preventDefault();
      paymentTotalDisplay.textContent = selectedPrice;
      paymentModal.classList.remove('d-none');
    });
  }

  function closePaymentModal() {
    if (paymentModal) {
      paymentModal.classList.add('d-none');
      paymentSuccessMsg.classList.add('d-none');
      paymentForm.classList.remove('d-none');
      paymentForm.reset();
    }
  }

  if (paymentModalClose) {
    paymentModalClose.addEventListener('click', closePaymentModal);
  }

  // Stripe checkout form submit simulation
  if (paymentForm) {
    paymentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      paymentForm.classList.add('d-none');
      paymentSuccessMsg.classList.remove('d-none');
      
      setTimeout(() => {
        closePaymentModal();
        alert('Booking Confirmation Email Sent! Check your mailbox.');
        // reset appointment calendar selection
        selectedDate = null;
        selectedTime = null;
        slotBtns.forEach(b => b.classList.remove('selected-slot'));
        document.querySelectorAll('.calendar-day-btn').forEach(b => b.classList.remove('selected-day'));
        timeSlotsContainer.classList.add('d-none');
        bookingSubmitBtn.setAttribute('disabled', 'true');
        bookingCheckoutForm.reset();
        updateSummary();
      }, 2000);
    });
  }

  /* ==========================================
     11. TESTIMONIALS SLIDER
  ========================================== */
  const testimonialSlides = document.querySelectorAll('.testimonial-slide');
  const prevTestBtn = document.getElementById('test-prev');
  const nextTestBtn = document.getElementById('test-next');
  let currentSlideIdx = 0;

  function showSlide(index) {
    testimonialSlides.forEach(slide => slide.classList.remove('active'));
    currentSlideIdx = (index + testimonialSlides.length) % testimonialSlides.length;
    testimonialSlides[currentSlideIdx].classList.add('active');
  }

  if (prevTestBtn) {
    prevTestBtn.addEventListener('click', () => showSlide(currentSlideIdx - 1));
  }
  if (nextTestBtn) {
    nextTestBtn.addEventListener('click', () => showSlide(currentSlideIdx + 1));
  }

  /* ==========================================
     13. EXIT INTENT "WORD OF THE DAY" POPUP
  ========================================== */
  const exitModal = document.getElementById('exit-word-modal');
  const exitClose = document.getElementById('exit-word-close');
  const exitLearnMore = document.getElementById('exit-popup-learn-more');
  const wordInnerCard = document.getElementById('word-card-inner');
  const exitFrenchWord = document.getElementById('exit-french-word');

  let exitPopupTriggered = false;

  // Tiny word databases
  const wordsDatabase = [
    { word: 'Flâner', phonetics: '[flɑ.ne]', translation: 'To wander, stroll aimlessly', explanation: 'A uniquely Parisian concept of walking around the streets of Paris without any specific destination, just enjoying the architecture.', example: '“J’adore flâner dans les rues de Paris.”' },
    { word: 'Chaleureux', phonetics: '[ʃa.lœ.rø]', translation: 'Warm, welcoming', explanation: 'Used to describe a cozy room, a friendly personality, or a hospitable household.', example: '“Leur maison est très chaleureuse.”' },
    { word: 'Éphémère', phonetics: '[e.fe.mɛʁ]', translation: 'Ephemeral, fleeting', explanation: 'Used to describe things that last for a very short time, like cherry blossoms or summer vibes.', example: '“Une beauté éphémère.”' }
  ];

  // Mouse leave top edge of page triggers exit intent popup
  document.addEventListener('mouseleave', (e) => {
    if (e.clientY < 20 && !exitPopupTriggered && exitModal) {
      exitPopupTriggered = true;
      
      // Load random word
      const randWordObj = wordsDatabase[Math.floor(Math.random() * wordsDatabase.length)];
      exitFrenchWord.textContent = randWordObj.word;
      document.querySelector('.word-phonetics').textContent = randWordObj.phonetics;
      document.querySelector('.word-card-back h3').textContent = randWordObj.translation;
      document.querySelector('.word-explanation').textContent = randWordObj.explanation;
      document.querySelector('.word-example em').textContent = randWordObj.example;
      
      // Reset card rotation
      wordInnerCard.classList.remove('flipped');
      
      exitModal.classList.remove('d-none');
    }
  });

  function closeExitModal() {
    if (exitModal) exitModal.classList.add('d-none');
  }

  if (exitClose) {
    exitClose.addEventListener('click', closeExitModal);
  }

  if (exitLearnMore) {
    exitLearnMore.addEventListener('click', () => {
      closeExitModal();
      showView('leveltest');
      window.location.hash = 'leveltest';
    });
  }

  if (wordInnerCard) {
    wordInnerCard.addEventListener('click', () => {
      wordInnerCard.classList.toggle('flipped');
    });
  }

  // Course Category tabs
  const tabAll = document.getElementById('tab-all-courses');
  const tabLive = document.getElementById('tab-live-courses');
  const tabSelf = document.getElementById('tab-self-courses');
  const courseCards = document.querySelectorAll('.course-card');

  function filterCourses(category) {
    courseCards.forEach(card => {
      if (category === 'all' || card.getAttribute('data-category') === category) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  if (tabAll) {
    tabAll.addEventListener('click', () => {
      document.querySelectorAll('.course-tab-btn').forEach(btn => btn.classList.remove('active'));
      tabAll.classList.add('active');
      filterCourses('all');
    });
  }

  if (tabLive) {
    tabLive.addEventListener('click', () => {
      document.querySelectorAll('.course-tab-btn').forEach(btn => btn.classList.remove('active'));
      tabLive.classList.add('active');
      filterCourses('live');
    });
  }

  if (tabSelf) {
    tabSelf.addEventListener('click', () => {
      document.querySelectorAll('.course-tab-btn').forEach(btn => btn.classList.remove('active'));
      tabSelf.classList.add('active');
      filterCourses('self');
    });
  }

  // Contact Form Submission Mock
  const contactForm = document.getElementById('contact-form-element');
  const contactSuccess = document.getElementById('contact-success');

  if (contactForm && contactSuccess) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      contactForm.classList.add('d-none');
      contactSuccess.classList.remove('d-none');
      setTimeout(() => {
        contactSuccess.classList.add('d-none');
        contactForm.classList.remove('d-none');
        contactForm.reset();
      }, 4000);
    });
  }

  // FAQ Accordion Toggle
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const item = question.parentElement;
      const answer = item.querySelector('.faq-answer');
      const isActive = item.classList.contains('active');

      // Close all other items
      document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('active');
        i.querySelector('.faq-answer').style.maxHeight = null;
      });

      if (!isActive) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // Night Mode Theme Toggle
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const body = document.body;

  // Check LocalStorage preference
  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-theme');
    if (themeToggleBtn) themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      body.classList.toggle('dark-theme');
      if (body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
        themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
      } else {
        localStorage.setItem('theme', 'light');
        themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
      }
    });
  }

});
