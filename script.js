const signupForm = document.querySelector('#signup-form');
const nameInput = document.querySelector('#name-input');
const emailInput = document.querySelector('#email-input');
const passwordInput = document.querySelector('#password-input');
const confirmPasswordInput = document.querySelector('#confirm-password-input');
const formMessage = document.querySelector('#form-message');

async function hashPassword(plainTextPassword) {
    const msgBuffer = new TextEncoder().encode(plainTextPassword);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

signupForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    formMessage.className = 'form-message';

    if (!nameInput.value.trim()) {
        showMessage('Please enter your name.', 'error');
        nameInput.focus();
        return;
    }

    if (!emailInput.value.trim()) {
        showMessage('Please enter your email.', 'error');
        emailInput.focus();
        return;
    } else if (localStorage.getItem('userEmail') === emailInput.value.trim()) {
        showMessage('This email is already registered. Please use another one or login.', 'error');
        emailInput.focus();
        return;
    }

    if (!passwordInput.value.trim()) {
        showMessage('Please enter your password.', 'error');
        passwordInput.focus();
        return;
    }

    if (confirmPasswordInput.value !== passwordInput.value) {
        showMessage('Passwords do not match.', 'error');
        confirmPasswordInput.focus();
        return;
    }

    
    const hashedPassword = await hashPassword(passwordInput.value);

    localStorage.setItem('userName', nameInput.value.trim());
    localStorage.setItem('userEmail', emailInput.value.trim());
    localStorage.setItem('userPassword', hashedPassword);

    showMessage('Account created successfully! Redirecting to login...', 'success');

    setTimeout(() => {
        window.location.href = 'login.html'; 
    }, 1500);
});

function showMessage(message, state) {
    formMessage.textContent = message;
    formMessage.classList.add(state);
}