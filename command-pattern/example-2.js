// Command Pattern - Behavioral Pattern
// The command pattern is useful in cases when we want to decouple objects executing the commands from objects issuing the commands. For example, imagine a scenario where our application is using a large number of API service calls. Then, let’s say that the API services change. We would have to modify the code wherever the APIs that changed are called.

// This would be a great place to implement an abstraction layer, which would separate the objects calling an API service from the objects which are telling them when to call the API service. This way, we avoid modification in all of the places where we have a need to call the service, but rather have to change only the objects which are making the call itself, which is only one place.

// As with any other pattern, we have to know when exactly is there a real need for such a pattern. We need to be aware of the tradeoff we are making, as we are adding an additional abstraction layer over the API calls, which will reduce performance but potentially save a lot of time when we need to modify objects executing the commands.

// the object which knows how to execute the command
var invoker = {
    add: function(x, y) {
        return x + y;
    },
    subtract: function(x, y) {
        return x - y;
    }
}

// the object which is used as an abstraction layer when
// executing commands; it represents an interface
// toward the invoker object
var manager = {
    execute: function(name, ...args) {
        if (name in invoker) {
            return invoker[name].apply(invoker, args);
        }
        return false;
    }
}

// prints 8
console.log(manager.execute("add", 3, 5));
// prints 2
console.log(manager.execute("subtract", 5, 3));