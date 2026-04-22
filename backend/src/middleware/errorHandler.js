export function notFoundHandler(req, res, next) {
  if (res.headersSent) {
    return next();
  }
  return res.status(404).json({ message: `Route not found: ${req.originalUrl}` });
}

export function errorHandler(err, _req, res, _next) {
  console.error("Unhandled server error:", err);

  if (res.headersSent) {
    return;
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  res.status(statusCode).json({ message });
}
