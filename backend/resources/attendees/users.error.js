class UserNotFound extends Error {
    constructor(message) {
        super(message);
        this.message = message || 'Usuario no existe.';
        this.status = 404;
        this.name = 'UserNotFound';
    }
}

module.exports = {
    UserNotFound,
}
