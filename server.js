const { app } = require('./src/app');
const { PORT } = require('./src/config/environment');

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
