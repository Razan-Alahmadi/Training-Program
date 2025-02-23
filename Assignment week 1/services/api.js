export async function fetchCompanyData() {
    try {
        const response = await fetch("https://dummyjson.com/users");
        const data = await response.json();
        return data.users;
    } catch (error) {
        throw new Error("Failed to fetch users.");
    }
}
