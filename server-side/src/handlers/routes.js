const { readdirSync } = require("fs")

module.exports = async(app) => {
    const routes = await readdirSync('./src/routes/');
    for (let route of routes) {
        const file = require(`../routes/${route}`);
        const routeName = route.replace('.js', '').split("_").join('/');
        app.use(routeName, file);
    }
}