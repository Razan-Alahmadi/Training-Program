export function validateForm({ companyName, crNumber, email, phone, password, confirmPassword, city, region, zipCode, businessType, terms }) {
    const errors = {};

    if (!companyName) errors.companyName = "Company Name is required.";
    if (!crNumber) errors.crNumber = "Commercial Registration Number is required.";
    
    if (!email) {
        errors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
        errors.email = "Invalid email format.";
    }

    if (!phone) {
        errors.phone = "Phone Number is required.";
    } else if (!/^\+?\d{1,4}[\s\-]?\(?\d*\)?[\s\-]?\d+([\s\-]?\d+)*$/.test(phone)) {
        errors.phone = "Invalid phone number. Please enter a valid phone number.";
    }

    if (!password) {
        errors.password = "Password is required.";
    } else if (password.length < 6) {
        errors.password = "Password must be at least 6 characters.";
    }

    if (password !== confirmPassword) {
        errors.confirmPassword = "Passwords do not match.";
    }

    if (!city) errors.city = "City is required.";
    if (!region) errors.region = "Region is required.";
    
    if (!zipCode) {
        errors.zipCode = "Zip Code is required.";
    } else if (!/^\d{5}$/.test(zipCode)) {
        errors.zipCode = "Invalid Zip Code. Must be 5 digits.";
    }

    if (!businessType) errors.businessType = "Business Type is required.";
    if (!terms) errors.terms = "You must agree to the Terms & Conditions.";

    return errors;
}
