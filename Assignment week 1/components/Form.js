import { validateForm } from "../utils/validation.js";

export class Form {
    constructor() {
        this.form = document.createElement("form");
        this.form.className = "bg-white shadow-md rounded-lg p-8 w-full animate__animated animate__fadeIn";

        this.form.innerHTML = `
            <h2 class="text-2xl font-bold text-center mb-6">Permit Requester Registration</h2>

            <div class="mb-4">
                <label class="block text-gray-700 font-bold">Company Name:</label>
                <input type="text" id="companyName" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400">
                <span class="text-red-500 text-sm" id="companyNameError"></span>
            </div>

            <div class="mb-4">
                <label class="block text-gray-700 font-bold">Commercial Registration Number:</label>
                <input type="text" id="crNumber" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400">
                <span class="text-red-500 text-sm" id="crNumberError"></span>
            </div>

            <div class="mb-4">
                <label class="block text-gray-700 font-bold">Email:</label>
                <input type="email" id="email" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400">
                <span class="text-red-500 text-sm" id="emailError"></span>
            </div>

            <div class="mb-4">
                <label class="block text-gray-700 font-bold">Phone Number:</label>
                <input type="tel" id="phone" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400">
                <span class="text-red-500 text-sm" id="phoneError"></span>
            </div>

            <div class="mb-4">
                <label class="block text-gray-700 font-bold">Password:</label>
                <input type="password" id="password" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400">
                <span class="text-red-500 text-sm" id="passwordError"></span>
            </div>

            <div class="mb-4">
                <label class="block text-gray-700 font-bold">Confirm Password:</label>
                <input type="password" id="confirmPassword" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400">
                <span class="text-red-500 text-sm" id="confirmPasswordError"></span>
            </div>

            <div class="mb-4">
                <label class="block text-gray-700 font-bold">City:</label>
                <input type="text" id="city" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400">
                <span class="text-red-500 text-sm" id="cityError"></span>
            </div>

            <div class="mb-4">
                <label class="block text-gray-700 font-bold">Region:</label>
                <input type="text" id="region" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400">
                <span class="text-red-500 text-sm" id="regionError"></span>
            </div>

            <div class="mb-4">
                <label class="block text-gray-700 font-bold">Zip Code:</label>
                <input type="text" id="zipCode" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400">
                <span class="text-red-500 text-sm" id="zipCodeError"></span>
            </div>

            <div class="mb-4">
                <label class="block text-gray-700 font-bold">Business Type:</label>
                <select id="businessType" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400">
                    <option value="">Select Business Type</option>
                    <option value="retail">Retail</option>
                    <option value="wholesale">Wholesale</option>
                    <option value="manufacturing">Manufacturing</option>
                    <option value="services">Services</option>
                </select>
                <span class="text-red-500 text-sm" id="businessTypeError"></span>
            </div>

            <div class="mb-4">
                <label class="flex items-center">
                    <input type="checkbox" id="terms" class="mr-2">
                    <span class="text-gray-700 font-bold">I agree to the Terms & Conditions</span>
                </label>
                <span class="text-red-500 text-sm" id="termsError"></span>
            </div>

            <button type="submit" class="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-300 transition duration-300 animate__animated animate__pulse animate__infinite">
                Register
            </button>
        `;

        this.form.addEventListener("submit", this.handleSubmit.bind(this));
    }

    handleSubmit(event) {
        event.preventDefault();
        const formData = {
            companyName: document.getElementById("companyName").value.trim(),
            crNumber: document.getElementById("crNumber").value.trim(),
            email: document.getElementById("email").value.trim(),
            phone: document.getElementById("phone").value.trim(),
            password: document.getElementById("password").value,
            confirmPassword: document.getElementById("confirmPassword").value,
            city: document.getElementById("city").value.trim(),
            region: document.getElementById("region").value.trim(),
            zipCode: document.getElementById("zipCode").value.trim(),
            businessType: document.getElementById("businessType").value,
            terms: document.getElementById("terms").checked
        };

        const errors = validateForm(formData);

        Object.keys(errors).forEach(field => {
            document.getElementById(`${field}Error`).textContent = errors[field] || "";
        });

        if (Object.keys(errors).length === 0) {
            alert("Registration successful!");
            localStorage.setItem("user", JSON.stringify(formData));
        }
    }

    render(parent) {
        parent.appendChild(this.form);
    }
}
