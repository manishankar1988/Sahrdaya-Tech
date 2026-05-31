import { createAdminToken } from '../middleware/auth.js';

export function loginAdmin(req, res) {
  const { email, password } = req.body;
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@sahrdaya.ac.in';
  const adminPassword = process.env.ADMIN_PASSWORD || 'change-this-password';

  if (email !== adminEmail || password !== adminPassword) {
    return res.status(401).json({ message: 'Invalid admin credentials.' });
  }

  return res.json({
    data: {
      token: createAdminToken({ email }),
      admin: { email },
    },
  });
}
