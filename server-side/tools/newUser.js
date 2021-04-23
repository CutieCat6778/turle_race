const user = class User {
    constructor(data){
        this._id = data.id;
        this.matches = {
            wins: 0,
            loses: 0
        };
        this.money = 0;
        this.player = {
            level: 0,
            exp: 0
        },
        this.info = data.info
    }
}

module.exports = user;