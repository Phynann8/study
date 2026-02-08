// Existing contact form code (if any) remains unchanged
document.addEventListener('DOMContentLoaded', function () {
  const prevButton = document.querySelector(".prev-btn");
  const nextButton = document.querySelector(".next-btn");
  const doneButton = document.querySelector(".done-btn");

  if (prevButton) {
    prevButton.addEventListener("click", function () {
      window.history.back();
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", function () {
      const nextPage = this.getAttribute("data-next");
      if (nextPage) {
        window.location.href = nextPage;
      }
    });
  }

  if (doneButton) {
    doneButton.addEventListener("click", function () {
      window.location.href = "../csharp-lesson.html";
    });
  }
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      document.getElementById('formResponse').innerText = 'Thank you for your message!';
      contactForm.reset();
    });
  }
});

// Toggle function for dropdown
// Toggle function for dropdown
function toggleDropdown(header) {
  // Find the parent module-card
  const card = header.closest('.module-card');
  const content = header.nextElementSibling;

  if (content.style.display === "block") {
    content.style.display = "none";
    header.querySelector('.dropdown-arrow').innerHTML = "&#9660;"; // Down Arrow
  } else {
    content.style.display = "block";
    header.querySelector('.dropdown-arrow').innerHTML = "&#9650;"; // Up Arrow
  }
}

// --- Translations System ---
window.translations = {
  en: {
    nav_home: "Home",
    nav_lessons: "Lessons",
    nav_playground: "Playground",
    nav_leaderboard: "Leaderboard",
    nav_talent: "Talent",
    nav_mentors: "Mentors",
    hero_title: "Welcome to Khmer Code",
    hero_subtitle: "Learn C# and Web Development in your own language.",
    btn_learn_more: "Learn More",
    section_topics: "Explore Topics",
    topic_csharp: "C# Programming",
    topic_db: "Database System",
    topic_english: "English",
    topic_design: "Graphic Design",
    topic_dsa: "Data Structure & Algorithm",
    feat_mobile_title: "Mobile First",
    feat_mobile_desc: "Learn anywhere, anytime. Perfectly optimized for small screens.",
    feat_khmer_title: "Khmer Language",
    feat_khmer_desc: "Localized content so you can learn in your native language.",
    feat_pwa_title: "PWA Enabled",
    feat_pwa_desc: "Offline access to lessons even when you don't have internet.",
    footer_rights: "© 2025 Khmer Code. All Rights Reserved."
  },
  km: {
    nav_home: "ទំព័រដើម",
    nav_lessons: "មេរៀន",
    nav_playground: "កន្លែងសាកល្បង",
    nav_leaderboard: "តារាងពិន្ទុ",
    nav_talent: "ទីផ្សារការងារ",
    nav_mentors: "អ្នកណែនាំ",
    hero_title: "ស្វាគមន៍មកកាន់ Khmer Code",
    hero_subtitle: "រៀនសរសេរកម្មវិធី C# និង Web ជាភាសាខ្មែរ។",
    btn_learn_more: "ស្វែងយល់បន្ថែម",
    section_topics: "ស្វែងរកប្រធានបទ",
    topic_csharp: "ការសរសេរកម្មវិធី C#",
    topic_db: "ប្រព័ន្ធមូលដ្ឋានទិន្នន័យ",
    topic_english: "ភាសាអង់គ្លេស",
    topic_design: "ការរចនាក្រាហ្វិក",
    topic_dsa: "រចនាសម្ព័ន្ធទិន្នន័យ និងក្បួនដោះស្រាយ",
    feat_mobile_title: "ទូរស័ព្ទដៃជាចម្បង",
    feat_mobile_desc: "រៀនបានគ្រប់ទីកន្លែង គ្រប់ពេលវេលា។ ប្រសិទ្ធភាពខ្ពស់សម្រាប់អេក្រង់តូច។",
    feat_khmer_title: "ភាសាខ្មែរ",
    feat_khmer_desc: "មាតិកាដែលបានបកប្រែ ដូច្នេះអ្នកអាចរៀនជាភាសាកំណើតរបស់អ្នក។",
    feat_pwa_title: "អាចប្រើ Offline បាន",
    feat_pwa_desc: "ចូលរៀនបានទោះបីជាមិនមានអ៊ីនធឺណិតក៏ដោយ។",
    footer_rights: "© ២០២៥ Khmer Code. រក្សាសិទ្ធិគ្រប់យ៉ាង។"
  }
};

document.addEventListener('DOMContentLoaded', function () {
  // --- Language Switching Logic ---
  const langToggle = document.getElementById('lang-toggle');

  function setLanguage(lang) {
    if (!window.translations || !window.translations[lang]) return;

    // Update all protected text
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (window.translations[lang][key]) {
        el.textContent = window.translations[lang][key];
      }
    });

    // Save preference
    localStorage.setItem('lang', lang);

    // Update Button Text
    if (langToggle) {
      langToggle.textContent = lang === 'en' ? 'ខ្មែរ' : 'English';
      // Optional: Change font based on lang if needed specifically for button
    }

    // Update Body class for specific font overrides if needed
    if (lang === 'km') {
      document.body.style.fontFamily = "'Battambang', 'Poppins', sans-serif";
    } else {
      document.body.style.fontFamily = "'Poppins', 'Battambang', sans-serif";
    }
  }

  if (langToggle) {
    langToggle.addEventListener('click', () => {
      const currentLang = localStorage.getItem('lang') || 'en';
      const newLang = currentLang === 'en' ? 'km' : 'en';
      setLanguage(newLang);
    });
  }

  // Set initial language
  const savedLang = localStorage.getItem('lang') || 'en';
  setLanguage(savedLang);

  // --- End Language Logic ---

  // --- Gamification System (XP & Leveling) ---
  const XP_KEY = 'khmer_code_xp';
  const LEVEL_KEY = 'khmer_code_level';

  function getXP() {
    return parseInt(localStorage.getItem(XP_KEY) || '0');
  }

  function getLevel() {
    return parseInt(localStorage.getItem(LEVEL_KEY) || '1');
  }

  function addXP(amount) {
    let currentXP = getXP();
    let currentLevel = getLevel();
    currentXP += amount;

    // Simple Level Up Logic: Level Up every 100 XP
    let nextLevelXP = currentLevel * 100;
    if (currentXP >= nextLevelXP) {
      currentLevel++;
      localStorage.setItem(LEVEL_KEY, currentLevel);
      alert(`🎉 អបអរសាទរ! អ្នកបានឡើងដល់ Level ${currentLevel}!`);
      playSound('level');
    } else {
      playSound('xp');
    }

    localStorage.setItem(XP_KEY, currentXP);
    updateXPDisplay();
    checkBadges(); // Check for new badges

    // Sync to Supabase Cloud if user is logged in
    if (window.Auth && window.Auth.syncProgressToCloud) {
      window.Auth.syncProgressToCloud();
    }
  }

  // --- Sound Effects System (AudioContext) ---
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  function playSound(type) {
    if (audioCtx.state === 'suspended') audioCtx.resume();

    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    if (type === 'xp') {
      // Simple Ding
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, audioCtx.currentTime + 0.1);
      gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.1);
    } else if (type === 'badge') {
      // Victory Fanfare (Major Chord)
      playNote(523.25, 0, 0.2); // C5
      playNote(659.25, 0.2, 0.4); // E5
      playNote(783.99, 0.4, 0.8); // G5
      setTimeout(() => playNote(1046.50, 0, 0.6), 600); // C6
    } else if (type === 'level') {
      // Level Up Slide
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(200, audioCtx.currentTime);
      osc.frequency.linearRampToValueAtTime(800, audioCtx.currentTime + 0.5);
      gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.5);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.5);
    } else if (type === 'error') {
      // Error Buzz
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, audioCtx.currentTime);
      osc.frequency.linearRampToValueAtTime(100, audioCtx.currentTime + 0.3);
      gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.3);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.3);
    }
  }

  function playNote(freq, startTime, duration) {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.1, audioCtx.currentTime + startTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + startTime + duration);
    osc.start(audioCtx.currentTime + startTime);
    osc.stop(audioCtx.currentTime + startTime + duration);
  }

  function updateXPDisplay() {
    const xpDisplay = document.getElementById('xp-display');
    if (xpDisplay) {
      // Determine base path based on depth
      const pathDepth = window.location.pathname.split('/').length - 1;
      const isInSubfolder = window.location.pathname.includes('/csharp/');
      const basePath = isInSubfolder ? '../../' : '';

      // Make XP clickable to go to profile
      xpDisplay.innerHTML = `<a href="${basePath}profile.html" style="color:inherit; text-decoration:none;">Lvl ${getLevel()} | XP: ${getXP()}</a>`;
    }
  }

  // --- Badge & Lesson System ---
  function markLessonComplete(lessonId) {
    let completed = JSON.parse(localStorage.getItem('completed_lessons') || '[]');
    if (!completed.includes(lessonId)) {
      completed.push(lessonId);
      localStorage.setItem('completed_lessons', JSON.stringify(completed));
      addXP(50); // Bonus 50XP for first-time completion
      alert("មេរៀនបានបញ្ចប់! +50 XP");
    }
    checkBadges();
  }

  function checkBadges() {
    const currentXP = getXP();
    const completed = JSON.parse(localStorage.getItem('completed_lessons') || '[]');

    // Badge 1: Tech Pioneer (100 XP)
    if (currentXP >= 100 && !localStorage.getItem('badge_pioneer')) {
      localStorage.setItem('badge_pioneer', 'true');
      alert("🏆 New Badge Unlocked: Tech Pioneer! (100 XP)");
      playSound('badge');
    }

    // Badge 2: Iron Rice Bowl (Module 1 Complete)
    // Module 1 Lessons: variables, loops, logic, memory
    const module1 = ['variables', 'loops', 'logic', 'memory'];
    const hasAll = module1.every(id => completed.includes(id));

    if (hasAll && !localStorage.getItem('badge_module1')) {
      localStorage.setItem('badge_module1', 'true');
      alert("🏆 New Badge Unlocked: Iron Rice Bowl! (Module 1 Complete)");
      playSound('badge');
      addXP(200); // Big Bonus
    }

    // Badge 3: Modern Architect (Module 3 Complete)
    const module3 = ['linq', 'async', 'sql', 'module3_capstone'];
    const hasAllM3 = module3.every(id => completed.includes(id));
    if (hasAllM3 && !localStorage.getItem('badge_module3')) {
      localStorage.setItem('badge_module3', 'true');
      alert("🏆 New Badge Unlocked: Modern Architect! (Module 3 Complete)");
      playSound('badge');
      addXP(300);
    }

    // Badge 4: The Deployer (Module 4 Complete) and Graduation
    const module4 = ['aspnet', 'api', 'deployment', 'module4_capstone'];
    const hasAllM4 = module4.every(id => completed.includes(id));

    if (hasAllM4 && !localStorage.getItem('badge_module4')) {
      localStorage.setItem('badge_module4', 'true');
      alert("🏆 New Badge Unlocked: The Deployer! (Module 4 Complete)");
      playSound('badge');
      addXP(400);

      // Check for Full Graduation (Modules 1-4)
      if (hasAll && hasAllM3 && hasAllM4) {
        setTimeout(() => {
          localStorage.setItem('badge_graduate', 'true');
          alert("🎓 COURSE COMPLETE: You are now a Khmer Code Graduate! (Master Badge Unlocked)");
          playSound('badge');
          addXP(1000); // Massive Bonus
        }, 2000);
      }
    }
  }

  // Initialize UI
  updateXPDisplay();

  // Expose global
  window.addXP = addXP;
  window.markLessonComplete = markLessonComplete;
  // --- End Gamification ---

  // --- Daily Streak System ---
  const STREAK_KEY = 'khmer_code_streak';
  const LAST_CLAIM_KEY = 'khmer_code_last_claim';

  function updateStreakUI() {
    const streak = parseInt(localStorage.getItem(STREAK_KEY) || '0');
    const display = document.getElementById('streak-counter');
    if (display) display.innerText = `🔥 Streak: ${streak} ថ្ងៃ`;

    // Check if already claimed today
    const lastClaim = localStorage.getItem(LAST_CLAIM_KEY);
    const today = new Date().toDateString();
    const claimBtn = document.getElementById('claim-xp-btn');
    if (claimBtn && lastClaim === today) {
      claimBtn.innerText = "ស្អែកចាំមកយកទៀត! (Claimed)";
      claimBtn.disabled = true;
      claimBtn.style.opacity = "0.5";
      claimBtn.style.cursor = "default";
    }
  }

  window.claimDailyXP = function () {
    const today = new Date().toDateString();
    const lastClaim = localStorage.getItem(LAST_CLAIM_KEY);

    if (lastClaim === today) return;

    let streak = parseInt(localStorage.getItem(STREAK_KEY) || '0');
    const lastClaimDate = lastClaim ? new Date(lastClaim) : null;
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (lastClaimDate && lastClaimDate.toDateString() === yesterday.toDateString()) {
      streak++;
    } else if (!lastClaim) {
      streak = 1;
    } else {
      streak = 1; // Reset if missed a day
    }

    localStorage.setItem(STREAK_KEY, streak);
    localStorage.setItem(LAST_CLAIM_KEY, today);

    // Reward XP
    const bonus = 20 + (streak * 2); // More streak = more bonus
    window.addXP(bonus);
    alert(`💡 អ្នកទទួលបាន ${bonus} XP សម្រាប់ការចូលរៀនរាល់ថ្ងៃ!`);

    updateStreakUI();
  };

  updateStreakUI();
  // --- End Daily Streak ---

  // --- Kru AI (Chat Prototype) ---
  const KRU_AI_HTML = `
    <div id="kru-ai-widget">
        <div id="kru-ai-window">
            <div class="kru-header">
                Chat with Kru AI 🤖
                <span style="cursor:pointer" onclick="toggleKruAI()">✖</span>
            </div>
            <div class="kru-messages" id="kru-messages">
                <div class="message bot-msg">សួស្តី! ខ្ញុំគឺ គ្រូ AI។ សួរខ្ញុំពីមេរៀនបាន! (Hi! I am Kru AI.)</div>
            </div>
            <div class="kru-input-area">
                <input type="text" id="kru-input" placeholder="សួរអ្វីមួយ..." onkeypress="handleKruInput(event)">
                <button onclick="sendKruMessage()">➤</button>
            </div>
        </div>
        <button id="kru-ai-toggle" onclick="toggleKruAI()">💬</button>
    </div>
  `;

  // Inject Widget on Load
  document.body.insertAdjacentHTML('beforeend', KRU_AI_HTML);

  window.toggleKruAI = function () {
    document.getElementById('kru-ai-window').classList.toggle('open');
  };

  window.sendKruMessage = function () {
    const input = document.getElementById('kru-input');
    const text = input.value.trim();
    if (!text) return;

    // User Message
    addMessage(text, 'user-msg');
    input.value = '';

    // Bot Response (Prototype Logic)
    setTimeout(() => {
      const response = getBotResponse(text.toLowerCase());
      addMessage(response, 'bot-msg');
    }, 500);
  };

  window.handleKruInput = function (e) {
    if (e.key === 'Enter') sendKruMessage();
  };

  function addMessage(text, className) {
    const container = document.getElementById('kru-messages');
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${className}`;
    msgDiv.innerText = text;
    container.appendChild(msgDiv);
    container.scrollTop = container.scrollHeight;
  }

  function getBotResponse(input) {
    input = input.toLowerCase();

    // --- Module 1: Fundamentals (Rice Field) ---
    if (input.includes('variable') || input.includes('អថេរ')) {
      return "អថេរ (Variable) គឺដូចជា 'ប្រអប់'។ សម្រាប់លុយ 1000៛ យើងប្រើ 'int' (លេខ)។ សម្រាប់ឈ្មោះ យើងប្រើ 'string' (អក្សរ)។";
    }
    if (input.includes('loop') || input.includes('ជុំ')) {
      return "Loop គឺការធ្វើការងារដដែលៗ។ បើចង់ដើរ ៣ ជុំ យើងសរសេរ 'i < 3'។";
    }
    if (input.includes('logic') || input.includes('if')) {
      return "Logic (if/else) គឺការសម្រេចចិត្ត។ ឧទាហរណ៍៖ បើភ្លៀង (if rain) ត្រូវយកឆត្រ។";
    }

    // --- Module 2: OOP (Shop Owner) ---
    if (input.includes('class') || input.includes('blueprint') || input.includes('រូបមន្ត')) {
      return "Class គឺជា 'ប្លង់មេ' ឬ 'រូបមន្ត'។ វាមិនមែនជារបស់ពិតទេ គ្រាន់តែជាក្រដាស។";
    }
    if (input.includes('object') || input.includes('ឆ្នាំង')) {
      return "Object គឺជា 'របស់ពិត' ដែលបង្កើតចេញពី Class។ ឧទាហរណ៍៖ ឆ្នាំងស៊ុបនៅលើតុ គឺជា Object។";
    }
    if (input.includes('inheritance') || input.includes('មរតក')) {
      return "Inheritance គឺការទទួលយកលក្ខណៈពីឪពុកម្តាយ។ FoodItem ទទួលបាន Price ពី Item ដោយស្វ័យប្រវត្តិ។";
    }

    // --- Module 3: Modern C# (Architect) ---
    if (input.includes('linq') || input.includes('filter') || input.includes('where')) {
      return "LINQ ចម្រាញ់ទិន្នន័យដូចរើសអង្ករ។ ប្រើ '.Where()' ដើម្បីរើសយកអ្វីដែលយើងចង់បាន។";
    }
    if (input.includes('async') || input.includes('await') || input.includes('wait')) {
      return "Async អនុញ្ញាតឱ្យចុងភៅធ្វើការងារច្រើនក្នុងពេលតែមួយ។ ប្រើ 'await' ដើម្បីរង់ចាំទឹកពុះ (Task) ឲ្យចប់សិន។";
    }

    // --- Module 4: Web & Deployment (Restaurant) ---
    if (input.includes('controller') || input.includes('waiter') || input.includes('រត់តុ')) {
      return "នៅក្នុង ASP.NET, 'Controller' ដើរតួជា 'អ្នករត់តុ' ដែលចាំទទួលការកម្ម៉ង់ពីភ្ញៀវ (View)។";
    }
    if (input.includes('api') || input.includes('get') || input.includes('post')) {
      return "API គឺជាអ្នករត់តុពិសេស។ ដើម្បីមើលមឺនុយ យើងប្រើ 'GET'។ ដើម្បីកម្ម៉ង់ យើងប្រើ 'POST'។";
    }
    if (input.includes('deploy') || input.includes('docker') || input.includes('container')) {
      return "Docker គឺជា 'ប្រអប់អាហារ' ដែលវេចខ្ចប់កូដរបស់យើងដើម្បីយកទៅបើកហាង (Deploy) នៅទីណាក៏បាន។";
    }

    // --- General & Personality ---
    if (input.includes('hi') || input.includes('hello') || input.includes('សួស្តី')) {
      return "សួស្តី! ខ្ញុំគឺ គ្រូ AI។ តើអ្នកចង់សួរពីមេរៀនមួយណា? (OOP, LINQ, API?)";
    }
    if (input.includes('xp') || input.includes('level')) {
      return "អ្នកអាចទទួលបាន XP លឿនៗដោយការឆ្លើយ Quiz ក្នុងមេរៀននីមួយៗឱ្យត្រូវ!";
    }
    if (input.includes('thank') || input.includes('អរគុណ')) {
      return "មិនអីទេ! ខំប្រឹងរៀនបន្តទៀតណា៎! 🚀";
    }

    return "ខ្ញុំនៅក្មេងនៅឡើយ! សាកសួរពាក្យគន្លឹះដូចជា 'class', 'linq', 'api' ឬ 'docker' មើល៍!";
  }
  // --- End Kru AI ---

  // --- Scroll Reveal ---
  function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, { threshold: 0.1 });
    reveals.forEach(el => observer.observe(el));
  }
  initScrollReveal();

  // --- Theme Engine ---
  function setTheme(themeName) {
    document.body.classList.remove('theme-dark', 'theme-cyberpunk', 'theme-royal');
    if (themeName !== 'light') {
      document.body.classList.add(`theme-${themeName}`);
    }
    localStorage.setItem('khmer_code_theme', themeName);
  }

  // Handle Theme Selection Changes
  window.changeTheme = function (e) {
    setTheme(e.target.value);
  }

  // Initialize Theme
  const savedTheme = localStorage.getItem('khmer_code_theme') || 'light';
  setTheme(savedTheme);

  // Sync Theme Dropdown if it exists
  const themeSelect = document.getElementById('theme-select');
  if (themeSelect) themeSelect.value = savedTheme;
  // --- End Theme Engine ---

  // --- Service Worker Registration ---
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, err => {
          console.log('ServiceWorker registration failed: ', err);
        });
    });
  }
});
