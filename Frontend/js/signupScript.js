document.addEventListener('DOMContentLoaded', function() {
            // Get form elements
            const signupForm = document.getElementById('signupForm');
            const firstNameInput = document.getElementById('firstName');
            const lastNameInput = document.getElementById('lastName');
            const emailInput = document.getElementById('email');
            const passwordInput = document.getElementById('password');
            const confirmPasswordInput = document.getElementById('confirmPassword');
            const passwordToggle = document.getElementById('passwordToggle');
            const confirmPasswordToggle = document.getElementById('confirmPasswordToggle');
            const agreeToTermsCheckbox = document.getElementById('agreeToTerms');
            const signupBtn = document.getElementById('signupBtn');
            const googleSignupBtn = document.getElementById('googleSignup');

            // Password visibility toggles
            function setupPasswordToggle(toggle, input) {
                toggle.addEventListener('click', function() {
                    const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
                    input.setAttribute('type', type);
                    
                    const icon = toggle.querySelector('i');
                    if (type === 'password') {
                        icon.classList.remove('fa-eye-slash');
                        icon.classList.add('fa-eye');
                    } else {
                        icon.classList.remove('fa-eye');
                        icon.classList.add('fa-eye-slash');
                    }
                });
            }

            setupPasswordToggle(passwordToggle, passwordInput);
            setupPasswordToggle(confirmPasswordToggle, confirmPasswordInput);

            // Terms checkbox handler
            agreeToTermsCheckbox.addEventListener('change', function() {
                signupBtn.disabled = !this.checked;
            });

            // Validation functions
            function validateName(name) {
                const nameRegex = /^[a-zA-Z]+$/;
                return nameRegex.test(name);
            }

            function validateEmail(email) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(email);
            }

            function validatePassword(password) {
                const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
                return passwordRegex.test(password);
            }

            function showError(input, message) {
                // Remove existing error
                const existingError = input.parentNode.querySelector('.error-message');
                if (existingError) {
                    existingError.remove();
                }

                // Add error styling
                input.style.borderColor = '#ef4444';
                
                // Create error message
                const errorDiv = document.createElement('div');
                errorDiv.className = 'error-message';
                errorDiv.textContent = message;
                
                input.parentNode.appendChild(errorDiv);
            }

            function clearError(input) {
                const existingError = input.parentNode.querySelector('.error-message');
                if (existingError) {
                    existingError.remove();
                }
                input.style.borderColor = 'rgba(255, 255, 255, 0.08)';
            }

            // Real-time validation
            firstNameInput.addEventListener('blur', function() {
                if (this.value && !validateName(this.value)) {
                    showError(this, 'First name must only contain letters');
                } else {
                    clearError(this);
                }
            });

            lastNameInput.addEventListener('blur', function() {
                if (this.value && !validateName(this.value)) {
                    showError(this, 'Last name must only contain letters');
                } else {
                    clearError(this);
                }
            });

            emailInput.addEventListener('blur', function() {
                if (this.value && !validateEmail(this.value)) {
                    showError(this, 'Please enter a valid email address');
                } else {
                    clearError(this);
                }
            });

            passwordInput.addEventListener('input', function() {
                const password = this.value;
                if (password) {
                    if (!validatePassword(password)) {
                        showError(this, 'Password must be at least 8 characters long and include one uppercase, lowercase, number, and special character');
                    } else {
                        clearError(this);
                    }
                } else {
                    clearError(this);
                }
            });

            confirmPasswordInput.addEventListener('blur', function() {
                if (this.value && this.value !== passwordInput.value) {
                    showError(this, 'Passwords do not match');
                } else {
                    clearError(this);
                }
            });

            // Form submission
            signupForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const firstName = firstNameInput.value.trim();
                const lastName = lastNameInput.value.trim();
                const email = emailInput.value.trim();
                const password = passwordInput.value;
                const confirmPassword = confirmPasswordInput.value;
                
                let isValid = true;

                // Validate first name
                if (!firstName) {
                    showError(firstNameInput, 'First name is required');
                    isValid = false;
                } else if (!validateName(firstName)) {
                    showError(firstNameInput, 'First name must only contain letters');
                    isValid = false;
                } else {
                    clearError(firstNameInput);
                }

                // Validate last name
                if (!lastName) {
                    showError(lastNameInput, 'Last name is required');
                    isValid = false;
                } else if (!validateName(lastName)) {
                    showError(lastNameInput, 'Last name must only contain letters');
                    isValid = false;
                } else {
                    clearError(lastNameInput);
                }

                // Validate email
                if (!email) {
                    showError(emailInput, 'Email is required');
                    isValid = false;
                } else if (!validateEmail(email)) {
                    showError(emailInput, 'Please enter a valid email address');
                    isValid = false;
                } else {
                    clearError(emailInput);
                }

                // Validate password
                if (!password) {
                    showError(passwordInput, 'Password is required');
                    isValid = false;
                } else if (!validatePassword(password)) {
                    showError(passwordInput, 'Password must be at least 8 characters long and include one uppercase, lowercase, number, and special character');
                    isValid = false;
                } else {
                    clearError(passwordInput);
                }

                // Validate confirm password
                if (!confirmPassword) {
                    showError(confirmPasswordInput, 'Please confirm your password');
                    isValid = false;
                } else if (password !== confirmPassword) {
                    showError(confirmPasswordInput, 'Passwords do not match');
                    isValid = false;
                } else {
                    clearError(confirmPasswordInput);
                }

                if (isValid) {
                    // Show loading state
                    const originalText = signupBtn.textContent;
                    signupBtn.textContent = 'Creating Account...';
                    signupBtn.disabled = true;

                    // Simulate API call
                    setTimeout(() => {
                        alert('Account created successfully!');
                        signupBtn.textContent = originalText;
                        signupBtn.disabled = !agreeToTermsCheckbox.checked;
                        
                        // In a real app, you would redirect to dashboard or login
                        // window.location.href = 'login.html';
                    }, 2000);
                }
            });

            // Google signup
            googleSignupBtn.addEventListener('click', function() {
                alert('Google signup clicked!');
                // In a real app, you would integrate with Google OAuth
            });

            // Input focus effects
            const inputs = document.querySelectorAll('.form-input');
            inputs.forEach(input => {
                input.addEventListener('focus', function() {
                    this.parentNode.style.transform = 'scale(1.02)';
                    this.parentNode.style.transition = 'transform 0.2s ease';
                });
                
                input.addEventListener('blur', function() {
                    this.parentNode.style.transform = 'scale(1)';
                });
            });
        });