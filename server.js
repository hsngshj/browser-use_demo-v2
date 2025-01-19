import express from 'express';
import cors from 'cors';
import { exec } from 'child_process';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3004;

app.use(cors());
app.use(express.json());

app.post('/execute', (req, res) => {
  const task = req.body.task;
  exec(`python app.py "${task}"`, (error, stdout, stderr) => {
    if (error || stderr) {
      console.error('Error executing task:', error || stderr);
      return res.status(500).json({ result: 'エラーが発生しました。もう一度お試しください。' });
    }
    const data = JSON.parse(stdout);
    res.json({ result: data.result });
  });
});

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
