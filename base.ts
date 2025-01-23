// Exercise 1: Type Inference
// Create a function that takes two numbers and returns their sum
// Solution
function add(a: number, b: number): number {
    return a + b;
}

// Exercise 2: Interfaces
// Create an interface for a Person and a function that greets them
// Solution
interface Person {
    name: string;
    age: number;
    email?: string;  // Optional property
}

function greetPerson(person: Person): string {
    return `Hello ${person.name}, you are ${person.age} years old!`;
}

// Exercise 3: Generic Functions
// Create a function that works with any type of array
// Solution
function firstElement<T>(arr: T[]): T | undefined {
    return arr[0];
}

// Exercise 4: Union Types
// Create a function that accepts either a string or number ID
// Solution
type ID = string | number;

function processID(id: ID): string {
    return `Processing ID: ${id}`;
}

// Exercise 5: Type Aliases and Literal Types
// Create a type for card suits and a function to check if a card is black
// Solution

enum Cards {
    hearts = "hearts",
    diamonds = "diamonds",
    clubs = "clubs",
    spades = "spades"
}

type Suit = Cards;

function isBlackSuit(suit: Suit): boolean {
    return suit === Cards.clubs || suit === Cards.spades;
}

// Exercise 6: Classes and Access Modifiers
// Create a basic bank account class
// Solution
class BankAccount {
    private balance: number;

    constructor(initialBalance: number = 0) {
        this.balance = initialBalance;
    }

    public deposit(amount: number): void {
        if (amount > 0) {
            this.balance += amount;
        }
    }

    public getBalance(): number {
        return this.balance;
    }
}

// Exercise 7: Enums and Type Assertions
// Create an enum for user roles and a function to check permissions
// Solution
enum UserRole {
    Admin = "ADMIN",
    User = "USER",
    Guest = "GUEST"
}

function hasAdminAccess(role: UserRole): boolean {
    return role === UserRole.Admin;
}

// Exercise 8: Intersection Types
// Create types for different aspects of a product and combine them
// Solution
type Pricing = {
    price: number;
    discount?: number;
}

type Shipping = {
    weight: number;
    address: string;
}

type Product = Pricing & Shipping & {
    name: string;
    id: string;
}

// Usage examples:
const person: Person = { name: "John", age: 30 };
console.log(greetPerson(person)); // "Hello John, you are 30 years old!"

const numbers = [1, 2, 3, 4, 5];
console.log(firstElement(numbers)); // 1

const account = new BankAccount(100);
account.deposit(50);
console.log(account.getBalance()); // 150

const userRole = UserRole.Admin;
console.log(hasAdminAccess(userRole)); // true