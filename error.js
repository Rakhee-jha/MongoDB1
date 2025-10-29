export function errorHandler(err, req, res, next) {
  console.error("❌", err);
  const status =
    err.status ||
    (err.name === "ValidationError" ? 400 :
     err.name === "CastError" ? 400 : 500);

  res.status(status).json({
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack })
  });
}
