module.exports = (err, req, res, next) => {
  console.error(err.stack);
  
  res.status(err.status || 500).render('404', {
    path: req.path,
    currentLang: req.language,
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
};
