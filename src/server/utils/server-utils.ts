// @ts-ignore
// eslint-disable-next-line no-unused-vars
export const handleError = (err, _req, res, _next) => {
    var statusCode = err.status || 500;
    res.status(statusCode).json(err.message);
};

// @ts-ignore
export const handleTrailingSlash = (req, res, next) => {
    const test = /\?[^]*\//.test(req.url);
    if (req.url.substr(-1) === '/' && req.url.length > 1 && !test) {
        res.redirect(301, req.url.slice(0, -1));
    }
    else
        next();
};