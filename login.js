document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('#login-form');
    const nameInput = document.querySelector('#name-input');
    const emailInput = document.querySelector('#email-input');
    const passwordInput = document.querySelector('#password-input');
    const formMessage = document.querySelector('#form-message');

    // अगर पहले से यूजर लॉगिन है, तो सीधे डैशबोर्ड भेजें
    if (localStorage.getItem('currentUser')) {
        window.location.href = 'dashboard.html';
        return;
    }

    // SHA-256 हैशिंग फंक्शन
    async function hashPassword(plainTextPassword) {
        const msgBuffer = new TextEncoder().encode(plainTextPassword);
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }

    function showMessage(message, state) {
        if (formMessage) {
            formMessage.textContent = message;
            formMessage.className = `form-message ${state}`;
        } else {
            alert(message);
        }
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const enteredName = nameInput ? nameInput.value.trim() : '';
            const enteredEmail = emailInput ? emailInput.value.trim() : '';
            const enteredPassword = passwordInput ? passwordInput.value : '';

            // खाली फ़ील्ड चेक
            if (!enteredName || !enteredEmail || !enteredPassword) {
                showMessage('Please enter name, email, and password.', 'error');
                return;
            }

            // रजिस्टर्ड डेटा लोकल स्टोरेज से निकालें
            const savedName = localStorage.getItem('userName');
            const savedEmail = localStorage.getItem('userEmail');
            const savedPassword = localStorage.getItem('userPassword');

            if (!savedEmail || !savedPassword) {
                showMessage('No account found. Please sign up first.', 'error');
                return;
            }

            // पासवर्ड का हैश निकालें
            const enteredHashedPassword = await hashPassword(enteredPassword);

            // डिटेल्स मैच करें
            if (
                enteredName === savedName &&
                enteredEmail === savedEmail &&
                enteredHashedPassword === savedPassword
            ) {
                // 👇 यहाँ एक्टिव सेशन (currentUser) बनेगा 👇
                const sessionData = {
                    name: savedName,
                    email: savedEmail
                };
                localStorage.setItem('currentUser', JSON.stringify(sessionData));

                showMessage('Login successful! Redirecting...', 'success');

                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 800);
            } else {
                showMessage('Invalid name, email, or password.', 'error');
            }
        });
    }
});