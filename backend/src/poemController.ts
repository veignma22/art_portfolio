import { Request, Response } from 'express';
import db from './db';

export const getPoems = (req: Request, res: Response) => {
  const poems = db.prepare(`
    SELECT poems.*, users.username 
    FROM poems JOIN users ON poems.user_id = users.id
    ORDER BY poems.timestamp DESC
  `).all();
  res.json(poems);
};

export const getPoem = (req: Request, res: Response) => {
  const poem = db.prepare(`
    SELECT poems.*, users.username 
    FROM poems JOIN users ON poems.user_id = users.id
    WHERE poems.id = ?
  `).get(req.params.id);
  res.json(poem);
};

export const createPoem = (req: any, res: Response) => {
  const { title, content } = req.body;
  db.prepare('INSERT INTO poems (title, content, user_id) VALUES (?, ?, ?)').run(title, content, req.user.id);
  res.status(201).json({ message: 'Báseň přidána' });
};

export const deletePoem = (req: any, res: Response) => {
  db.prepare('DELETE FROM poems WHERE id = ? AND user_id = ?').run(req.params.id, req.user.id);
  res.json({ message: 'Báseň smazána' });
};