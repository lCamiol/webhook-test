const parseMiddleware = (req, res, next) => {
    console.log("🔍 Middleware Content-Type:", req.headers["content-type"]);

    // Si el contenido es x-www-form-urlencoded, dejamos que Express lo manej
    if (req.headers["content-type"] === "application/x-www-form-urlencoded") {
        return next();
    }

    if (req.headers["content-type"] !== "application/json") {
        let rawData = "";
        req.on("data", (chunk) => {
            rawData += chunk;
        });
        req.on("end", () => {
            try {
                req.body = JSON.parse(rawData);
            } catch (error) {
                req.body = rawData; // Guarda como string si no es JSON válido
            }
            next();
        });
    } else {
        next();
    }
};

module.exports = parseMiddleware;