import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../src/db';

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  db.prepare('INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)').run(username, email, hash);
  res.json({ message: 'Účet vytvořen' });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email) as any;
  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) return res.json({ error: 'Špatné heslo' });
  const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET as string, { expiresIn: '7d' });
  res.json({ token, username: user.username, id: user.id });
};