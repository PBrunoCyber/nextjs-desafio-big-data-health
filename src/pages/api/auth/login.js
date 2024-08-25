// pages/api/login.js
import jwt from 'jsonwebtoken';
import users from './users';

const SECRET_KEY = 'mine-secret-key';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
      const payload = { id: user.id, email: user.email, role: user.role };
      
      const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1 day' });
      
      res.status(200).json({ token });
    } else {
      res.status(401).json({ message: 'Credenciais inválidas, tente novamente!' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}