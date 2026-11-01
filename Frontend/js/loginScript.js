document.addEventListener('DOMContentLoaded', function() {
      const passwordInput = document.getElementById('password');
      const passwordToggle = document.getElementById('passwordToggle');
      const signinForm = document.getElementById('signinForm');
      const googleSigninBtn = document.getElementById('googleSignin');

      // Toggle password visibility
      passwordToggle.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        const icon = passwordToggle.querySelector('i');
        icon.classList.toggle('fa-eye');
        icon.classList.toggle('fa-eye-slash');
      });

      // Sign In submit
      signinForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value.trim();
        const password = passwordInput.value;
        if (!email || !password) {
          alert('Please fill in all required fields.');
          return;
        }
        // Simulate API
        alert('Signed in successfully!');
        // window.location.href = 'dashboard.html';
      });

      // Google sign in demo
      googleSigninBtn.addEventListener('click', function() {
        alert('Google sign-in clicked! ');
      });
    });