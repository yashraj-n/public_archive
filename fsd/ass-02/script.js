document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    
    function isEmpty(value) {
        return !value || value.trim() === '';
    }

    function validateUsername() {
        const username = document.getElementById('username').value;
        if (isEmpty(username)) {
            alert('Username is required and cannot be empty or contain only spaces.');
            return false;
        }
        return true;
    }

    function validateEmail() {
        const email = document.getElementById('email').value;
        
        if (isEmpty(email)) {
            alert('Email is required and cannot be empty or contain only spaces.');
            return false;
        }
        return true;
    }

    function validatePhone() {
        const phone = document.getElementById('phone').value;
        
        if (isEmpty(phone)) {
            alert('Phone number is required and cannot be empty or contain only spaces.');
            return false;
        }
        return true;
    }

    function validatePassword() {
        const password = document.getElementById('password').value;
        
        if (isEmpty(password)) {
            alert('Password is required and cannot be empty or contain only spaces.');
            return false;
        }
        return true;
    }

    function validateConfirmPassword() {
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        if (isEmpty(confirmPassword)) {
            alert('Confirm password is required and cannot be empty or contain only spaces.');
            return false;
        } else if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return false;
        }
        return true;
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isUsernameValid = validateUsername();
        const isEmailValid = validateEmail();
        const isPhoneValid = validatePhone();
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();
        
        if (isUsernameValid && isEmailValid && isPhoneValid && isPasswordValid && isConfirmPasswordValid) {
            alert('Registration successful! All validations passed.');
        } else {
            alert('Please fix the validation errors before submitting.');
        }
    });
});