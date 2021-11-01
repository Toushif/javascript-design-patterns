// Mediator Pattern - Behavioral Pattern
// We will briefly cover a pattern which is also very useful when talking about decoupled systems. When we have a scenario where multiple parts of a system need to communicate and be coordinated, perhaps a good solution would be to introduce a mediator.

// A mediator is an object which is used as a central point for communication between disparate parts of a system and handles the workflow between them. Now, it is important to stress out that it handles workflow. Why is this important?

// Because there is a large similarity with the publisher/subscriber pattern. You might ask yourself, OK, so these two patterns both help implement better communication between objects… What is the difference?

// The difference is that a mediator handles the workflow, whereas the publisher/subscriber uses something called a “fire and forget” type of communication. The publisher/subscriber is simply an event aggregator, meaning it simply takes care of firing the events and letting the correct subscribers know which events were fired. The event aggregator does not care what happens once an event was fired, which is not the case with a mediator.

// A nice example of a mediator is a wizard type of interface. Let’s say you have a large registration process for a system you have worked on. Oftentimes, when a lot of information is required from a user, it is a good practice to break this down into multiple steps.

// This way, the code will be a lot cleaner (easier to maintain) and the user isn’t overwhelmed by the amount of information which is requested just in order to finish the registration. A mediator is an object which would handle the registration steps, taking into account different possible workflows that might happen due to the fact that each user could potentially have a unique registration process.

// The obvious benefit from this design pattern is improved communication between different parts of a system, which now all communicate through the mediator and cleaner codebase.

// A downside would be that now we have introduced a single point of failure into our system, meaning if our mediator fails, the entire system could stop working.
