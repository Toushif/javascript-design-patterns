// The Facade Pattern
// When we put up a facade, we present an outward appearance to the world which may conceal a very different reality. This was the inspiration for the name behind the next pattern we're going to review - the Facade pattern. This pattern provides a convenient higher-level interface to a larger body of code, hiding its true underlying complexity. Think of it as simplifying the API being presented to other developers, something which almost always improves usability.

// Facades are a structural pattern which can often be seen in JavaScript libraries like jQuery where, although an implementation may support methods with a wide range of behaviors, only a "facade" or limited abstraction of these methods is presented to the public for use.

// This allows us to interact with the Facade directly rather than the subsystem behind the scenes. Whenever we use jQuery's $(el).css() or $(el).animate() methods, we're actually using a Facade - the simpler public interface that avoids us having to manually call the many internal methods in jQuery core required to get some behavior working. This also avoids the need to manually interact with DOM APIs and maintain state variables.

// The jQuery core methods should be considered intermediate abstractions. The more immediate burden to developers is the DOM API and facades are what make the jQuery library so easy to use.

// To build on what we've learned, the Facade pattern both simplifies the interface of a class and it also decouples the class from the code that utilizes it. This gives us the ability to indirectly interact with subsystems in a way that can sometimes be less prone to error than accessing the subsystem directly. A Facade's advantages include ease of use and often a small size-footprint in implementing the pattern.

// Let’s take a look at the pattern in action. This is an unoptimized code example, but here we're utilizing a Facade to simplify an interface for listening to events cross-browser. We do this by creating a common method that can be used in one’s code which does the task of checking for the existence of features so that it can provide a safe and cross-browser compatible solution.

var addMyEvent = function (el, ev, fn) {
    if (el.addEventListener) {
        el.addEventListener(ev, fn, false);
    } else if (el.attachEvent) {
        el.attachEvent("on" + ev, fn);
    } else {
        el["on" + ev] = fn;
    }
};

//  In a similar manner, we're all familiar with jQuery's $(document).ready(..). Internally, this is actually being powered by a method called bindReady(), which is doing this:
/* Pseudo-code */
const bindReady = function () {
    if (document.addEventListener) {
        // Use the handy event callback
        document.addEventListener("DOMContentLoaded", DOMContentLoaded, false);

        // A fallback to window.onload, that will always work
        window.addEventListener("load", jQuery.ready, false);

        // If IE event model is used
    } else if (document.attachEvent) {
        document.attachEvent("onreadystatechange", DOMContentLoaded);

        // A fallback to window.onload, that will always work
        window.attachEvent("onload", jQuery.ready);
    }
};

// This is another example of a Facade, where the rest of the world simply uses the limited interface exposed by $(document).ready(..) and the more complex implementation powering it is kept hidden from sight.

// Facades don't just have to be used on their own, however. They can also be integrated with other patterns such as the Module pattern. As we can see below, our instance of the module patterns contains a number of methods which have been privately defined. A Facade is then used to supply a much simpler API to accessing these methods:

var module = (function () {
    var _private = {
        i: 5,
        get: function () {
            console.log("current value:" + this.i);
        },
        set: function (val) {
            this.i = val;
        },
        run: function () {
            console.log("running");
        },
        jump: function () {
            console.log("jumping");
        },
    };

    return {
        facade: function (args) {
            _private.set(args.val);
            _private.get();
            if (args.run) {
                _private.run();
            }
        },
    };
})();

// Outputs: "current value: 10" and "running"
module.facade({ run: true, val: 10 });

// In this example, calling module.facade() will actually trigger a set of private behavior within the module, but again, the user isn't concerned with this. we've made it much easier for them to consume a feature without needing to worry about implementation-level details.

// Notes on abstraction
// Facades generally have few disadvantages, but one concern worth noting is performance. Namely, one must determine whether there is an implicit cost to the abstraction a Facade offers to our implementation and if so, whether this cost is justifiable. Going back to the jQuery library, most of us are aware that both getElementById("identifier") and $("#identifier") can be used to query an element on a page by its ID.

// Did you know however that getElementById() on its own is significantly faster by a high order of magnitude? Take a look at this jsPerf test to see results on a per-browser level: http://jsperf.com/getelementbyid-vs-jquery-id. Now of course, we have to keep in mind that jQuery (and Sizzle - its selector engine) are doing a lot more behind the scenes to optimize our query (and that a jQuery object, not just a DOM node is returned).

// The challenge with this particular Facade is that in order to provide an elegant selector function capable of accepting and parsing multiple types of queries, there is an implicit cost of abstraction. The user isn't required to access jQuery.getById("identifier") or jQuery.getByClass("identifier") and so on. That said, the trade-off in performance has been tested in practice over the years and given the success of jQuery, a simple Facade actually worked out very well for the team.

// When using the pattern, try to be aware of any performance costs involved and make a call on whether they are worth the level of abstraction offered.

// The Factory Pattern
// The Factory pattern is another creational pattern concerned with the notion of creating objects. Where it differs from the other patterns in its category is that it doesn't explicitly require us to use a constructor. Instead, a Factory can provide a generic interface for creating objects, where we can specify the type of factory object we wish to be created.

// Imagine that we have a UI factory where we are asked to create a type of UI component. Rather than creating this component directly using the new operator or via another creational constructor, we ask a Factory object for a new component instead. We inform the Factory what type of object is required (e.g "Button", "Panel") and it instantiates this, returning it to us for use.

// This is particularly useful if the object creation process is relatively complex, e.g. if it strongly depends on dynamic factors or application configuration.

// Examples of this pattern can be found in UI libraries such as ExtJS where the methods for creating objects or components may be further subclassed.

// The following is an example that builds upon our previous snippets using the Constructor pattern logic to define cars. It demonstrates how a Vehicle Factory may be implemented using the Factory pattern:

// Types.js - Constructors used behind the scenes

// A constructor for defining new cars
function Car(options) {
    // some defaults
    this.doors = options.doors || 4;
    this.state = options.state || "brand new";
    this.color = options.color || "silver";
}

// A constructor for defining new trucks
function Truck(options) {
    this.state = options.state || "used";
    this.wheelSize = options.wheelSize || "large";
    this.color = options.color || "blue";
}

// FactoryExample.js

// Define a skeleton vehicle factory
function VehicleFactory() {}

// Define the prototypes and utilities for this factory

// Our default vehicleClass is Car
VehicleFactory.prototype.vehicleClass = Car;

// Our Factory method for creating new Vehicle instances
VehicleFactory.prototype.createVehicle = function (options) {
    switch (options.vehicleType) {
        case "car":
            this.vehicleClass = Car;
            break;
        case "truck":
            this.vehicleClass = Truck;
            break;
        //defaults to VehicleFactory.prototype.vehicleClass (Car)
    }

    return new this.vehicleClass(options);
};

// Create an instance of our factory that makes cars
var carFactory = new VehicleFactory();
var car = carFactory.createVehicle({
    vehicleType: "car",
    color: "yellow",
    doors: 6,
});

// Test to confirm our car was created using the vehicleClass/prototype Car

// Outputs: true
console.log(car instanceof Car);

// Outputs: Car object of color "yellow", doors: 6 in a "brand new" state
console.log(car);

//   Approach #1: Modify a VehicleFactory instance to use the Truck class

var movingTruck = carFactory.createVehicle({
    vehicleType: "truck",
    state: "like new",
    color: "red",
    wheelSize: "small",
});

// Test to confirm our truck was created with the vehicleClass/prototype Truck

// Outputs: true
console.log(movingTruck instanceof Truck);

// Outputs: Truck object of color "red", a "like new" state
// and a "small" wheelSize
console.log(movingTruck);

// Approach #2: Subclass VehicleFactory to create a factory class that builds Trucks

function TruckFactory() {}
TruckFactory.prototype = new VehicleFactory();
TruckFactory.prototype.vehicleClass = Truck;

var truckFactory = new TruckFactory();
var myBigTruck = truckFactory.createVehicle({
    state: "omg..so bad.",
    color: "pink",
    wheelSize: "so big",
});

// Confirms that myBigTruck was created with the prototype Truck
// Outputs: true
console.log(myBigTruck instanceof Truck);

// Outputs: Truck object with the color "pink", wheelSize "so big"
// and state "omg. so bad"
console.log(myBigTruck);

// When To Use The Factory Pattern
// The Factory pattern can be especially useful when applied to the following situations:

// When our object or component setup involves a high level of complexity
// When we need to easily generate different instances of objects depending on the environment we are in
// When we're working with many small objects or components that share the same properties
// When composing objects with instances of other objects that need only satisfy an API contract (aka, duck typing) to work. This is useful for decoupling.

// When Not To Use The Factory Pattern
// When applied to the wrong type of problem, this pattern can introduce an unnecessarily great deal of complexity to an application. Unless providing an interface for object creation is a design goal for the library or framework we are writing, I would suggest sticking to explicit constructors to avoid the unnecessary overhead.

// Due to the fact that the process of object creation is effectively abstracted behind an interface, this can also introduce problems with unit testing depending on just how complex this process might be.

// Abstract Factories
// It is also useful to be aware of the Abstract Factory pattern, which aims to encapsulate a group of individual factories with a common goal. It separates the details of implementation of a set of objects from their general usage.

// An Abstract Factory should be used where a system must be independent from the way the objects it creates are generated or it needs to work with multiple types of objects.

// An example which is both simple and easier to understand is a vehicle factory, which defines ways to get or register vehicles types. The abstract factory can be named abstractVehicleFactory. The Abstract factory will allow the definition of types of vehicle like "car" or "truck" and concrete factories will implement only classes that fulfill the vehicle contract (e.g Vehicle.prototype.drive and Vehicle.prototype.breakDown).

var abstractVehicleFactory = (function () {
    // Storage for our vehicle types
    var types = {};

    return {
        getVehicle: function (type, customizations) {
            var Vehicle = types[type];

            return Vehicle ? new Vehicle(customizations) : null;
        },

        registerVehicle: function (type, Vehicle) {
            var proto = Vehicle.prototype;

            // only register classes that fulfill the vehicle contract
            if (proto.drive && proto.breakDown) {
                types[type] = Vehicle;
            }

            return abstractVehicleFactory;
        },
    };
})();

// Usage:

abstractVehicleFactory.registerVehicle("car", Car);
abstractVehicleFactory.registerVehicle("truck", Truck);

// Instantiate a new car based on the abstract vehicle type
var car = abstractVehicleFactory.getVehicle("car", {
    color: "lime green",
    state: "like new",
});

// Instantiate a new truck in a similar manner
var truck = abstractVehicleFactory.getVehicle("truck", {
    wheelSize: "medium",
    color: "neon yellow",
});
