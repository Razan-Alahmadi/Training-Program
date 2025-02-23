import { fetchCompanyData } from "../services/api.js";
import { validateForm } from "../utils/validation.js";

export class Form {
    constructor() {
        this.form = document.createElement("form");
        this.form.className = "dark:bg-gray-800 bg-white shadow-md rounded-lg p-8 w-full animate__animated animate__fadeIn";

        this.form.innerHTML =
            `<h2 class="dark:text-white text-2xl font-bold text-center mb-6">Permit Requester Registration</h2>

            <div class="dark:text-white mb-4">
                <label class="dark:text-white block text-gray-700 font-bold">Company Name:</label>
                <input type="text" id="companyName" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400">
                <span class="text-red-500 text-sm" id="companyNameError"></span>
            </div>

            <div class="dark:text-white mb-4">
                <label class="dark:text-white block text-gray-700 font-bold">Commercial Registration Number:</label>
                <input type="text" id="crNumber" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400">
                <span class="text-red-500 text-sm" id="crNumberError"></span>
            </div>

            <div class="dark:text-white mb-4">
                <label class="dark:text-white block text-gray-700 font-bold">Email:</label>
                <input type="email" id="email" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400">
                <span class="text-red-500 text-sm" id="emailError"></span>
            </div>

            <div class="dark:text-white mb-4">
                <label class="dark:text-white block text-gray-700 font-bold">Phone Number:</label>
                <input type="tel" id="phone" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400">
                <span class="text-red-500 text-sm" id="phoneError"></span>
            </div>

            <div class="dark:text-white mb-4">
                <label class="dark:text-white block text-gray-700 font-bold">Password:</label>
                <input type="password" id="password" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400">
                <span class="text-red-500 text-sm" id="passwordError"></span>
            </div>

            <div class="dark:text-white mb-4">
                <label class="dark:text-white block text-gray-700 font-bold">Confirm Password:</label>
                <input type="password" id="confirmPassword" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400">
                <span class="text-red-500 text-sm" id="confirmPasswordError"></span>
            </div>

            <div class="dark:text-white mb-4">
                <label class="dark:text-white block text-gray-700 font-bold">City:</label>
                <input type="text" id="city" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400">
                <span class="text-red-500 text-sm" id="cityError"></span>
            </div>

            <div class="dark:text-white mb-4">
                <label class="dark:text-white block text-gray-700 font-bold">Region:</label>
                <input type="text" id="region" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400">
                <span class="text-red-500 text-sm" id="regionError"></span>
            </div>

            <div class="dark:text-white mb-4">
                <label class="dark:text-white block text-gray-700 font-bold">Zip Code:</label>
                <input type="text" id="zipCode" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400">
                <span class="text-red-500 text-sm" id="zipCodeError"></span>
            </div>

            <div class="dark:text-white mb-4">
                <label class="dark:text-white block text-gray-700 font-bold">Business Type:</label>
                <select id="businessType" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400">
                    <option class="dark:text-gray-200 dark:text-white" value="">Select Business Type</option>
                    <option class="dark:text-gray-200 dark:text-white" value="retail">Retail</option>
                    <option class="dark:text-gray-200 dark:text-white" value="wholesale">Wholesale</option>
                    <option class="dark:text-gray-200 dark:text-white" value="manufacturing">Manufacturing</option>
                    <option class="dark:text-gray-200 dark:text-white" value="services">Services</option>
                </select>
                <span class="text-red-500 text-sm" id="businessTypeError"></span>
            </div>

            <div class="dark:text-white mb-4">
                <label class="dark:text-white flex items-center">
                    <input type="checkbox" id="terms" class="mr-2">
                    <span class="dark:text-white text-gray-700 font-bold">I agree to the Terms & Conditions</span>
                </label>
                <span class="text-red-500 text-sm" id="termsError"></span>
            </div>

            <button type="submit" class="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-300 transition duration-300 animate__animated animate__pulse animate__infinite">
                Register
            </button>
        `;

        this.overlay = document.createElement("div");
        this.overlay.className = "overlay";

        this.spinner = document.createElement("div");
        this.spinner.className = "loading";

        this.overlay.appendChild(this.spinner);
        document.body.appendChild(this.overlay);

        this.populateForm();
        this.form.addEventListener("submit", this.handleSubmit.bind(this));
    }

    showSpinner() {
        this.overlay.style.display = "block";
    }

    hideSpinner() {
        this.overlay.style.display = "none";
    }

    async populateForm() {
        try {
            this.showSpinner();
            const users = await fetchCompanyData();
            const randomUser = users[Math.floor(Math.random() * users.length)];

            document.getElementById("companyName").value = randomUser.company?.name || "";
            document.getElementById("crNumber").value = randomUser.bank?.cardNumber || "";
            document.getElementById("email").value = randomUser.email || "";
            document.getElementById("phone").value = randomUser.phone || "";
            document.getElementById("city").value = randomUser.address?.city || "";
            document.getElementById("region").value = randomUser.address?.state || "";
            document.getElementById("zipCode").value = randomUser.address?.postalCode || "";

            this.hideSpinner();
        } catch (error) {
            console.error("Error fetching user data:", error);
            this.hideSpinner();
        }
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
            terms: document.getElementById("terms").checked,
        };

        const errors = validateForm(formData);
        this.clearErrors();

        if (Object.keys(errors).length > 0) {
            this.showErrors(errors);
            return;
        }

        console.log("Form submitted successfully!", formData);
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Form submission response:', data);
            })
            .catch(error => {
                console.error('Error submitting form:', error);
            });
    }
    clearErrors() {
        const errorFields = this.form.querySelectorAll("span.text-red-500");
        errorFields.forEach(field => (field.textContent = ""));
    }

    showErrors(errors) {
        Object.keys(errors).forEach(key => {
            const errorElement = document.getElementById(`${key}Error`);
            if (errorElement) {
                errorElement.textContent = errors[key];
            }
        });
    }

    render(parent) {
        parent.appendChild(this.form);
    }
}
