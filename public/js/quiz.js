class QuizEngine {
    constructor(config) {
        this.questions = config.questions;
        this.nextLessonUrl = config.nextLessonUrl;
        this.lessonId = config.lessonId;
        this.containerId = config.containerId || 'quiz-container';
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.hasPassed = false;

        this.init();
    }

    init() {
        const container = document.getElementById(this.containerId);
        if (!container) return;

        container.innerHTML = `
            <div class="quiz-card">
                <div class="quiz-header">
                    <h3>🧠 កម្រងសំណួរ (Pop Quiz)</h3>
                    <p>ឆ្លើយត្រូវទាំងអស់ដើម្បីទៅមេរៀនបន្ទាប់!</p>
                </div>
                <div id="quiz-content"></div>
                <div id="quiz-feedback" class="quiz-feedback" style="display:none;"></div>
                <button id="quiz-btn-action" class="btn quiz-btn" style="margin-top: 20px;">Check Answer</button>
            </div>
            <div id="quiz-success" style="display:none; text-align:center; margin-top:20px;">
                <h3 style="color:#27ae60;">🎉 ឆ្លើយត្រូវទាំងអស់! (Correct)</h3>
                <p>អ្នកទទួលបាន +30 XP</p>
                <a href="${this.nextLessonUrl}" class="btn next-btn" style="background:#27ae60;">មេរៀនបន្ទាប់ ></a>
            </div>
        `;

        this.renderQuestion();

        document.getElementById('quiz-btn-action').addEventListener('click', () => this.handleAction());
    }

    renderQuestion() {
        if (this.currentQuestionIndex >= this.questions.length) {
            this.showResults();
            return;
        }

        const q = this.questions[this.currentQuestionIndex];
        const content = document.getElementById('quiz-content');
        const feedback = document.getElementById('quiz-feedback');
        const btn = document.getElementById('quiz-btn-action');

        feedback.style.display = 'none';
        btn.innerText = "Check Answer";
        btn.onclick = () => this.checkAnswer();

        let optionsHtml = q.options.map((opt, idx) => `
            <div class="quiz-option" onclick="selectOption(this, ${idx})">
                <span class="opt-label">${String.fromCharCode(65 + idx)}</span> ${opt}
            </div>
        `).join('');

        content.innerHTML = `
            <div class="question-text">
                <span class="q-num">សំណួរទី ${this.currentQuestionIndex + 1}/${this.questions.length}:</span>
                ${q.question}
            </div>
            <div class="options-grid">
                ${optionsHtml}
            </div>
        `;

        window.selectOption = (el, idx) => {
            document.querySelectorAll('.quiz-option').forEach(d => d.classList.remove('selected'));
            el.classList.add('selected');
            this.selectedOptionIndex = idx;
        };
    }

    checkAnswer() {
        if (this.selectedOptionIndex === undefined) return;

        const q = this.questions[this.currentQuestionIndex];
        const feedback = document.getElementById('quiz-feedback');
        const btn = document.getElementById('quiz-btn-action');

        if (this.selectedOptionIndex === q.correct) {
            // Correct
            feedback.innerHTML = `<div class="feedback-correct">✅ ត្រឹមត្រូវ! (Correct)</div>`;
            feedback.style.display = 'block';
            playSound('xp'); // Assuming exists in script.js

            // Advance
            btn.innerText = "Next Question";
            btn.onclick = () => {
                this.currentQuestionIndex++;
                this.selectedOptionIndex = undefined;
                this.renderQuestion();
            };
        } else {
            // Wrong
            feedback.innerHTML = `<div class="feedback-wrong">❌ មិនត្រឹមត្រូវទេ។ សាកម្តងទៀត! (Wrong)</div>`;
            feedback.style.display = 'block';
            playSound('error'); // Need to handle if not exists
        }
    }

    showResults() {
        document.querySelector('.quiz-card').style.display = 'none';
        const successDiv = document.getElementById('quiz-success');
        successDiv.style.display = 'block';

        // Award XP
        if (window.addXP) {
            // Only award if not already completed (logic handled in script.js usually, but we enable it here)
            window.addXP(30);
            if (window.markLessonComplete) window.markLessonComplete(this.lessonId);
        }
    }
}
