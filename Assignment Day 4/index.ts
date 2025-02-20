//Task 1
function capitalizeWords(word: string): string {
    if (word.length === 0) {
        return "Empty string";
    } else {
        return word.toUpperCase();
    }
}

// Example usage:
console.log(capitalizeWords("hello"));
console.log(capitalizeWords(""));


// Task 2
function isValidNumber(value: unknown): boolean {
    return typeof value === "number" && !isNaN(value) && isFinite(value);
}

console.log(isValidNumber(42));
console.log(isValidNumber("42"));
console.log(isValidNumber(null));
console.log(isValidNumber(3.14));

//Task 3:
class User {
    id: number;
    name: string;
    email: string;
    isAdmin?: boolean;

    constructor(id: number, name: string, email: string, isAdmin?: boolean) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.isAdmin = isAdmin;
    }
}

function createUser(newUser: User): string {
    return `User ${newUser.name} created successfully`;
}

const user1 = new User(2022, "Razan", "Razan@gmail.com", true);
const user2 = new User(2023, "Ali", "Ali@example.com");

console.log(createUser(user1));
console.log(createUser(user2));


// Task 4
class Product {
    public name: string;
    private price: number;
    public category: string;

    constructor(name: string, price: number, category: string) {
        this.name = name;
        this.price = price;
        this.category = category;
    }

    public getDiscountedPrice(discount: number): number {
        return this.price - (this.price * discount) / 100;
    }
}

const product1 = new Product("iPhone 16", 3000, "Phone");

console.log(product1.getDiscountedPrice(10)); 

//task 5
function filterArray<T>(array: T[], predicate: (item: T) => boolean): T[] {
    return array.filter(predicate);
}


// Filtering even numbers
const numbers = [1, 2, 3, 4, 5, 6];
const evenNumbers = filterArray(numbers, (num) => num % 2 === 0);
console.log(evenNumbers); 


// Task 6
async function fetchUsers() {
    try {
      let response = await fetch("https://jsonplaceholder.typicode.com/users");
      let data = await response.json();
  
      return data.map((user: any) => ({
        id: user.id,
        name: user.name,
        email: user.email
      }));
  
    } catch (error) {
      console.log("Error fetching users:", error);
      return [];
    }
  }
  
  fetchUsers().then(users => console.log(users));
  

