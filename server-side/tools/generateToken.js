const generator = require('meaningful-string');

module.exports = () => {
    return generator.random({min: 15, max: 18});
}