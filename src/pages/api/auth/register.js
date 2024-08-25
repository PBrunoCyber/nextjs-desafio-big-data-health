// pages/api/users/add.js
import users from './users';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password, firstName, lastName } = req.body;

    const user = users.find(user => user.email === email);
    if (user) {
      res.status(400).json({ message: "Esse e-mail já existe!" })
    } else {
      const newUser = {
        id: users.length + 1, // Gera um ID único
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
      };
      users.push(newUser);
      res.status(201).json(newUser);
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}