export const noIndex = async (req, res, next) => {
  res.header("X-Robots-Tag", "noindex");
  next();
};
