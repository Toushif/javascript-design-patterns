// Observer Pattern - https://www.toptal.com/javascript/comprehensive-guide-javascript-design-patterns
// This example is more of a publisher/subscriber pattern varitaion of the Observer pattern

// The observer pattern is a very useful tool when we have a scenario where we need to improve the communication between disparate parts of our system in an optimized way. It promotes loose coupling between objects.

// There are various versions of this pattern, but in its most basic form, we have two main parts of the pattern. The first is a subject and the second is observers.

// A subject handles all of the operations regarding a certain topic that the observers subscribe to. These operations subscribe an observer to a certain topic, unsubscribe an observer from a certain topic, and notify observers about a certain topic when an event is published.

// However, there is a variation of this pattern called the publisher/subscriber pattern, which I am going to use as an example in this section. The main difference between a classical observer pattern and the publisher/subscriber pattern is that publisher/subscriber promotes even more loose coupling then the observer pattern does.

// In the observer pattern, the subject holds the references to the subscribed observers and calls methods directly from the objects themselves whereas, in the publisher/subscriber pattern, we have channels, which serve as a communication bridge between a subscriber and a publisher. The publisher fires an event and simply executes the callback function sent for that event.

// I am going to display a short example of the publisher/subscriber pattern, but for those interested, a classic observer pattern example can be easily found online.

var publisherSubscriber = {};

// we send in a container object which will handle the subscriptions and publishings
(function (container) {
    // the id represents a unique subscription id to a topic
    var id = 0;

    // we subscribe to a specific topic by sending in
    // a callback function to be executed on event firing
    container.subscribe = function (topic, f) {
        if (!(topic in container)) {
            container[topic] = [];
        }

        container[topic].push({
            id: ++id,
            callback: f,
        });

        return id;
    };

    // each subscription has its own unique ID, which we use
    // to remove a subscriber from a certain topic
    container.unsubscribe = function (topic, id) {
        var subscribers = [];
        for (var subscriber of container[topic]) {
            if (subscriber.id !== id) {
                subscribers.push(subscriber);
            }
        }
        container[topic] = subscribers;
    };

    container.publish = function (topic, data) {
        for (var subscriber of container[topic]) {
            // when executing a callback, it is usually helpful to read
            // the documentation to know which arguments will be
            // passed to our callbacks by the object firing the event
            subscriber.callback(data);
        }
    };
})(publisherSubscriber);

var subscriptionID1 = publisherSubscriber.subscribe(
    "mouseClicked",
    function (data) {
        console.log(
            "I am Bob's callback function for a mouse clicked event and this is my event data: " +
                JSON.stringify(data)
        );
    }
);

var subscriptionID2 = publisherSubscriber.subscribe(
    "mouseHovered",
    function (data) {
        console.log(
            "I am Bob's callback function for a hovered mouse event and this is my event data: " +
                JSON.stringify(data)
        );
    }
);

var subscriptionID3 = publisherSubscriber.subscribe(
    "mouseClicked",
    function (data) {
        console.log(
            "I am Alice's callback function for a mouse clicked event and this is my event data: " +
                JSON.stringify(data)
        );
    }
);

// NOTE: after publishing an event with its data, all of the
// subscribed callbacks will execute and will receive
// a data object from the object firing the event
// there are 3 console.logs executed
publisherSubscriber.publish("mouseClicked", { data: "data1" });
publisherSubscriber.publish("mouseHovered", { data: "data2" });

// we unsubscribe from an event by removing the subscription ID
publisherSubscriber.unsubscribe("mouseClicked", subscriptionID3);

// there are 2 console.logs executed
publisherSubscriber.publish("mouseClicked", { data: "data1" });
publisherSubscriber.publish("mouseHovered", { data: "data2" });

// This design pattern is useful in situations when we need to perform multiple operations on a single event being fired. Imagine you have a scenario where we need to make multiple AJAX calls to a back-end service and then perform other AJAX calls depending on the result. You would have to nest the AJAX calls one within the other, possibly entering into a situation known as callback hell. Using the publisher/subscriber pattern is a much more elegant solution.

// A downside to using this pattern is difficult testing of various parts of our system. There is no elegant way for us to know whether or not the subscribing parts of the system are behaving as expected.
