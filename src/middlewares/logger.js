const logger = (req, res, next) => {
    console.log(`Ruta accedida: ${req.method} ${req.url}`);
    next();
};

module.exports = logger;
