const parseMiddleware = (req, res, next) => {
    console.log("🔍 Middleware Content-Type:", req.headers["content-type"]);

    // Si el contenido es x-www-form-urlencoded, dejamos que Express lo maneje
    if (req.headers["content-type"] === "application/x-www-form-urlencoded") {
        return next();
    }

    let rawData = "";
    
    req.on("data", (chunk) => {
        rawData += chunk;
    });

    req.on("end", () => {
        try {
            if (req.headers["content-type"] === "application/json") {
                req.body = JSON.parse(rawData);
            } else {
                req.body = rawData;  // Si el formato es desconocido, lo guarda como string
            }
        } catch (error) {
            req.body = {};  // Si hay un error, se mantiene vacío
        }
        
        console.log("📥 Parsed Body:", req.body);
        next();
    });
};

module.exports = parseMiddleware;