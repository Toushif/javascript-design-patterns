// Builder Pattern - Creational Pattern - https://github.com/WebDevSimplified/Design-Patterns/tree/master/Builder%20Pattern

// Before - without the builder pattern this is how it will look -
// For parameters which you don't know you have to pass undefined.

class Address {
    constructor(zip, street) {
        this.zip = zip;
        this.street = street;
    }
}

class User {
    constructor(name, age, phone, address) {
        this.name = name;
        this.age = age;
        this.phone = phone;
        this.address = address;
    }
}

const user = new User(
    "Bob",
    undefined,
    undefined,
    new Address("12345", "Main St.")
);

// After - using builder pattern-

class Address {
    constructor(zip, street) {
        this.zip = zip;
        this.street = street;
    }
}

class User {
    constructor(name, { age, phone = "123-456-7890", address } = {}) {
        this.name = name;
        this.age = age;
        this.phone = phone;
        this.address = address;
    }
}

let user = new User("Bob", { address: new Address("12345", "Main St.") });
