const parseMiddleware = (req, res, next) => {
    console.log("🔍 Middleware Content-Type:", req.headers["content-type"]);

    if (req.headers["content-type"] === "application/x-www-form-urlencoded") {
            next();
    }
    let rawData = Buffer.alloc(0);

    req.on("data", (chunk) => {
        rawData = Buffer.concat([rawData, chunk]);
    });

    req.on("end", () => {
        req.rawBody = rawData.toString();
        console.log("🚀 ~ req.on ~ req.rawBody:", req.rawBody)
        try {
            req.body = JSON.parse(req.rawBody);
        } catch (error) {
            console.log("⚠️ Error al parsear JSON. Se guardará como texto.");
            req.body = { raw: req.rawBody };
        }
        next();
    });

    req.on("error", (err) => {
        console.error("Error al recibir datos:", err);
        res.status(400).send("Error al recibir datos");
    });
};

module.exports = parseMiddleware;
