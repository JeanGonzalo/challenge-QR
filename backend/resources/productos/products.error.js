class ProductNotFound extends Error {
    constructor(message) {
        super(message);
        this.message = message || 'Producto no existe.';
        this.status = 404;
        this.name = 'ProductNotFound';
    }
}

module.exports = {
    ProductNotFound,
}
