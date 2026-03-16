import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import poemRoutes from './routes/poems';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/poems', poemRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'API běží!' });
});

app.listen(PORT, () => {
  console.log(`Server běží na portu ${PORT}`);
});