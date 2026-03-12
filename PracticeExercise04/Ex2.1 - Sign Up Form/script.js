function showError(fieldId, message) {
    const inputElement = document.getElementById(fieldId);
    const formGroup = inputElement.closest('.form-group'); 
    const errorElement = formGroup.querySelector('.error-msg'); 

    errorElement.innerText = message;
    errorElement.style.display = 'block';
    
    if (inputElement.type !== 'radio' && inputElement.type !== 'checkbox') {
        inputElement.classList.add('input-error');
        inputElement.classList.remove('input-success');
    }
}

function clearError(fieldId) {
    const inputElement = document.getElementById(fieldId);
    const formGroup = inputElement.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-msg');

    errorElement.innerText = '';
    errorElement.style.display = 'none';

    if (inputElement.type !== 'radio' && inputElement.type !== 'checkbox') {
        inputElement.classList.remove('input-error');
    }
}

function validateFullname() {
    const id = 'fullname';
    const value = document.getElementById(id).value.trim();
    const regex = /^[a-zA-ZÀ-ỹ\s]+$/;

    if (value === '') {
        showError(id, 'Full name is required.'); return false;
    } else if (value.length < 3) {
        showError(id, 'Full name must be at least 3 characters long.');
        return false;
    } else if (!regex.test(value)) {
        showError(id, 'Full name can only contain letters and spaces.'); 
        return false;
    }
    return true;
}

function validateEmail() {
    const id = 'email';
    const value = document.getElementById(id).value.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (value === '') {
        showError(id, 'Email is required.'); 
        return false;
    } else if (!regex.test(value)) {
        showError(id, 'Invalid email format (e.g., name@domain.com).'); 
        return false;
    }
    return true;
}

function validatePhone() {
    const id = 'phone';
    const value = document.getElementById(id).value.trim();
    const regex = /^0[0-9]{9}$/;

    if (value === '') {
        showError(id, 'Phone number is required.'); 
        return false;
    } else if (!regex.test(value)) {
        showError(id, 'Phone number must start with 0 and be 10 digits long.'); 
        return false;
    }
    return true;
}

function validatePassword() {
    const id = 'password';
    const value = document.getElementById(id).value;
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (value === '') {
        showError(id, 'Password is required.'); 
        return false;
    } else if (!regex.test(value)) {
        showError(id, 'Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one digit.'); 
        return false;
    }
    return true;
}

function validateConfirmPassword() {
    const id = 'confirm_password';
    const passwordValue = document.getElementById('password').value;
    const confirmPasswordValue = document.getElementById(id).value;

    if (confirmPasswordValue === '') {
        showError(id, 'Please confirm your password.'); 
        return false;
    } else if (passwordValue !== confirmPasswordValue) {
        showError(id, 'Passwords do not match.'); 
        return false;
    }
    return true;
}

function validateGender() {
    const id = 'gender_male'; 
    const isChecked = document.querySelector('input[name="gender"]:checked'); 
    
    if (!isChecked) {
        showError(id, 'Please select your gender.'); return false;
    }
    return true;
}

function validateTerms() {
    const id = 'terms';
    const isChecked = document.getElementById(id).checked

    if (!isChecked) {
        showError(id, 'You must agree to the terms and conditions.');
        return false;
    }
    return true;
}

const fields = [
    { id: 'fullname', validateFn: validateFullname },
    { id: 'email', validateFn: validateEmail },
    { id: 'phone', validateFn: validatePhone },
    { id: 'password', validateFn: validatePassword },
    { id: 'confirm_password', validateFn: validateConfirmPassword }
];

fields.forEach(field => {
    const element = document.getElementById(field.id);
    element.addEventListener('blur', field.validateFn);
    element.addEventListener('input', function() {
        clearError(field.id);
    });
});

document.querySelectorAll('input[name="gender"]').forEach(radio => {
    radio.addEventListener('change', () => clearError('gender_male'));
});

document.getElementById('terms').addEventListener('change', () => clearError('terms'));

const form = document.getElementById('signup-form');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    const isFormValid = Boolean(
        validateFullname() & 
        validateEmail() & 
        validatePhone() & 
        validatePassword() & 
        validateConfirmPassword() & 
        validateGender() & 
        validateTerms()
    );

    if (isFormValid) {
        document.getElementById('form-section').style.display = 'none';

        const registeredName = document.getElementById('fullname').value.trim();
        document.getElementById('display-name').innerText = registeredName

        document.getElementById('success-message').style.display = 'block';
    }
});  

