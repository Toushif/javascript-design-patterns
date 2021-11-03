// Builder Pattern - Creational Pattern - https://www.dofactory.com/javascript/design-patterns/builder

// he Builder pattern allows a client to construct a complex object by specifying the type and content only. Construction details are hidden from the client entirely.

// The most common motivation for using Builder is to simplify client code that creates complex objects. The client can still direct the steps taken by the Builder without knowing how the actual work is accomplished. Builders frequently encapsulate construction of Composite objects (another GoF design pattern) because the procedures involved are often repetitive and complex.

// Usually it is the last step that returns the newly created object which makes it easy for a Builder to participate in fluent interfaces in which multiple method calls, separated by dot operators, are chained together (note: fluent interfaces are implementation of the Chaining Pattern as presented in the Modern patterns section).

// The objects participating in this pattern are:

// Director -- In example code: Shop
// constructs products by using the Builder's multistep interface
// Builder -- not used in JavaScript
// declares a multistep interface for creating a complex product
// ConcreteBuilder -- In example code: CarBuilder, TruckBuilder
// implements the multistep Builder interface
// maintains the product through the assembly process
// offers the ability to retrieve the newly created product
// Products -- In example code: Car, Truck
// represents the complex objects being assembled

// The AbstractBuilder is not used because JavaScript does not support abstract classes. However, the different Builders must implement the same multistep interface for the Director to be able to step through the assembly process

// The JavaScript code has a Shop (the Director) and two builder objects: CarBuilder and TruckBuilder. The Shop's construct method accepts a Builder instance which it then takes through a series of assembly steps: step1 and step2. The Builder's get method returns the newly assembled products (Car objects and Truck objects).

// The client has control over the actual object construction process by offering different builders to the Shop.

function Shop() {
    this.construct = function (builder) {
        builder.step1();
        builder.step2();
        return builder.get();
    };
}

function CarBuilder() {
    this.car = null;

    this.step1 = function () {
        this.car = new Car();
    };

    this.step2 = function () {
        this.car.addParts();
    };

    this.get = function () {
        return this.car;
    };
}

function TruckBuilder() {
    this.truck = null;

    this.step1 = function () {
        this.truck = new Truck();
    };

    this.step2 = function () {
        this.truck.addParts();
    };

    this.get = function () {
        return this.truck;
    };
}

function Car() {
    this.doors = 0;

    this.addParts = function () {
        this.doors = 4;
    };

    this.say = function () {
        console.log("I am a " + this.doors + "-door car");
    };
}

function Truck() {
    this.doors = 0;

    this.addParts = function () {
        this.doors = 2;
    };

    this.say = function () {
        console.log("I am a " + this.doors + "-door truck");
    };
}

function run() {
    var shop = new Shop();
    var carBuilder = new CarBuilder();
    var truckBuilder = new TruckBuilder();
    var car = shop.construct(carBuilder);
    var truck = shop.construct(truckBuilder);

    car.say();
    truck.say();
}

run()