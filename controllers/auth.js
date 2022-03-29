
module.exports = function (app, models) {
  app.get('/sign-up', (req, res) => {
    res.render('auth-signup', {});
  });
  app.get('/login', (req, res) => {
    res.render('auth-login', {});
  });

  
};
