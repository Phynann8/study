// public/js/auth.js

/**
 * Authentication management for Khmer Code
 */
const Auth = {
    user: null,
    mode: 'login', // 'login' or 'signup'

    async init() {
        // Listen for auth state changes
        const { data: { subscription } } = window.supabaseClient.auth.onAuthStateChange((event, session) => {
            this.user = session?.user ?? null;
            this.updateUI();
            if (this.user) {
                this.syncProgressFromCloud();
            }
        });

        // Initial session check
        const { data: { session } } = await window.supabaseClient.auth.getSession();
        this.user = session?.user ?? null;
        this.updateUI();
    },

    async signUp(email, password) {
        const { data, error } = await window.supabaseClient.auth.signUp({
            email,
            password,
        });
        if (error) throw error;
        return data;
    },

    async signIn(email, password) {
        const { data, error } = await window.supabaseClient.auth.signInWithPassword({
            email,
            password,
        });
        if (error) throw error;
        return data;
    },

    async signOut() {
        const { error } = await window.supabaseClient.auth.signOut();
        if (error) throw error;
        window.location.reload();
    },

    updateUI() {
        const authContainer = document.getElementById('auth-nav-container');
        if (!authContainer) return;

        if (this.user) {
            authContainer.innerHTML = `
                <span class="user-email" style="margin-right:10px; font-size:0.8rem; opacity:0.8;">${this.user.email}</span>
                <button onclick="Auth.signOut()" class="btn-logout" style="background:none; border:1px solid #fff; color:#fff; border-radius:5px; padding:2px 10px; cursor:pointer;">Logout</button>
            `;
        } else {
            authContainer.innerHTML = `
                <button onclick="showAuthModal('login')" class="btn-login" style="background:rgba(255,255,255,0.2); border:1px solid #fff; color:#fff; border-radius:5px; padding:2px 10px; cursor:pointer;">Login</button>
            `;
        }
    },

    async syncProgressToCloud() {
        if (!this.user) return;

        const xp = localStorage.getItem('khmer_code_xp') || 0;
        const level = localStorage.getItem('khmer_code_level') || 1;
        const completed = localStorage.getItem('completed_lessons') || '[]';

        const { error } = await window.supabaseClient
            .from('profiles')
            .upsert({
                id: this.user.id,
                email: this.user.email,
                xp: parseInt(xp),
                level: parseInt(level),
                completed_lessons: JSON.parse(completed),
                updated_at: new Date()
            });

        if (error) console.error('Error syncing to cloud:', error);
    },

    async syncProgressFromCloud() {
        if (!this.user) return;

        const { data, error } = await window.supabaseClient
            .from('profiles')
            .select('*')
            .eq('id', this.user.id)
            .single();

        if (error && error.code !== 'PGRST116') {
            console.error('Error fetching profile:', error);
            return;
        }

        if (data) {
            localStorage.setItem('khmer_code_xp', data.xp);
            localStorage.setItem('khmer_code_level', data.level);
            localStorage.setItem('completed_lessons', JSON.stringify(data.completed_lessons));

            if (window.updateXPDisplay) window.updateXPDisplay();
        } else {
            this.syncProgressToCloud();
        }
    }
};

// Global helpers for Modal UI
function showAuthModal(mode) {
    Auth.mode = mode;
    const modal = document.getElementById('auth-modal');
    const title = document.getElementById('modal-title');
    const toggleLink = document.getElementById('modal-toggle-link');
    const submitBtn = document.getElementById('modal-submit-btn');

    if (mode === 'login') {
        title.innerText = 'Login';
        submitBtn.innerText = 'Login';
        toggleLink.innerText = 'Need an account? Sign Up';
    } else {
        title.innerText = 'Sign Up';
        submitBtn.innerText = 'Create Account';
        toggleLink.innerText = 'Already have an account? Login';
    }

    modal.style.display = 'block';
}

function toggleAuthMode() {
    showAuthModal(Auth.mode === 'login' ? 'signup' : 'login');
}

async function handleAuthSubmit() {
    const email = document.getElementById('auth-email').value;
    const password = document.getElementById('auth-password').value;
    const submitBtn = document.getElementById('modal-submit-btn');

    if (!email || !password) {
        alert("Please fill in both fields.");
        return;
    }

    submitBtn.disabled = true;
    submitBtn.innerText = 'Processing...';

    try {
        if (Auth.mode === 'login') {
            await Auth.signIn(email, password);
            document.getElementById('auth-modal').style.display = 'none';
        } else {
            await Auth.signUp(email, password);
            alert("Success! Check your email for verification.");
            document.getElementById('auth-modal').style.display = 'none';
        }
    } catch (err) {
        alert("Error: " + err.message);
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerText = Auth.mode === 'login' ? 'Login' : 'Create Account';
    }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => Auth.init());
window.Auth = Auth;
