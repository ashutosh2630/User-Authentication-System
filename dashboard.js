document.addEventListener('DOMContentLoaded', () => {

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (!currentUser || !currentUser.name || !currentUser.email) {
        window.location.href = 'login.html';
        return; 
    }

    const profileCircle = document.getElementById('profileCircle');
    const profileDropdown = document.getElementById('profileDropdown');
    const avatarInitial = document.getElementById('avatarInitial');
    const dropdownName = document.getElementById('dropdownName');
    const dropdownEmail = document.getElementById('dropdownEmail');
    const logoutBtn = document.getElementById('logoutBtn');
  
    if (dropdownName) dropdownName.textContent = currentUser.name;
    if (dropdownEmail) dropdownEmail.textContent = currentUser.email;
    if (avatarInitial) {
        avatarInitial.textContent = currentUser.name.trim().charAt(0).toUpperCase();
    }

    if (profileCircle && profileDropdown) {
        profileCircle.addEventListener('click', (e) => {
            e.stopPropagation();
            profileDropdown.classList.toggle('open');
        });

        profileDropdown.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    document.addEventListener('click', () => {
        if (profileDropdown && profileDropdown.classList.contains('open')) {
            profileDropdown.classList.remove('open');
        }
    });

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {

            localStorage.removeItem('currentUser');

            alert('You have been logged out.');
            window.location.href = 'login.html'; 
        });
    }

});