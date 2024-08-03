import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.get('/', (_, res) => {
  res.send('<p>Hello World!</p>');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
