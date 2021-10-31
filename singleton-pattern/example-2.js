// My own singleton example

singletonFactory = (function () {
    let instance;
    class singleton {
        constructor(name) {
            if (this.constructor === singleton) {
                this.name = name;
            } else {
                throw "This is a constructor Function";
            }
        }
        static getInstance() {
            if (instance == null) {
                instance = new singleton("Toushif");
                return instance;
            }
            return instance;
        }
    }
    return Object.freeze({
        getInstance: function () {
            return singleton.getInstance();
        }
    });
})();

console.log(singletonFactory.getInstance());
console.log(singletonFactory.getInstance());
console.log(singletonFactory.getInstance());

// Always same result
