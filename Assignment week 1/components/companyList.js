import { fetchCompanyData } from "../services/api.js";

export class CompanyList {
    constructor() {
        this.container = document.createElement("div");
        this.container.className = "w-full max-w-lg mx-auto p-4 bg-white dark:bg-gray-800 shadow-lg rounded-lg mt-6"; // Add mt-6 to create the gap

        this.button = document.createElement("button");
        this.button.textContent = "Fetch Company Data";
        this.button.className = "w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-300 transition duration-300 animate__animated animate__pulse animate__infinite";
        this.button.addEventListener("click", () => this.loadCompanyData());

        this.overlay = document.createElement("div");
        this.overlay.className = "fixed inset-0 hidden";

        this.loading = document.createElement("div");
        this.loading.className = "hidden w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50";

        this.list = document.createElement("ul");
        this.list.className = "mt-4 space-y-2";
    }

    async loadCompanyData() {
        this.overlay.classList.remove("hidden");
        this.loading.classList.remove("hidden");

        try {
            const companies = await fetchCompanyData();
            this.list.innerHTML = companies.map(company => `
                <li class="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md border border-gray-300 dark:border-gray-600">
                    <p class="text-lg font-semibold">${company.name}</p>
                    <p class="text-sm text-gray-600 dark:text-gray-300">${company.email}</p>
                </li>
            `).join("");
        } catch (error) {
            this.list.innerHTML = `<li class="text-red-600 font-semibold">Error fetching companies</li>`;
        } finally {
            this.overlay.classList.add("hidden");
            this.loading.classList.add("hidden");
        }
    }

    render(parent) {
        this.container.appendChild(this.button);
        this.container.appendChild(this.list);
        parent.appendChild(this.overlay);
        parent.appendChild(this.loading);
        parent.appendChild(this.container);
    }
}
