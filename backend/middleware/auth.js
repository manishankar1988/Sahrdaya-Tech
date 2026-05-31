import crypto from 'crypto';

function base64url(input) {
  return Buffer.from(input).toString('base64url');
}

function sign(payload) {
  const secret = process.env.JWT_SECRET || 'dev-secret';
  return crypto.createHmac('sha256', secret).update(payload).digest('base64url');
}

export function createAdminToken(admin) {
  const header = base64url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = base64url(
    JSON.stringify({
      email: admin.email,
      role: 'admin',
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 8,
    }),
  );
  return `${header}.${payload}.${sign(`${header}.${payload}`)}`;
}

export function requireAdmin(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Admin login required.' });

  const [header, payload, signature] = token.split('.');
  if (!header || !payload || !signature) {
    return res.status(401).json({ message: 'Invalid admin token.' });
  }

  const expected = sign(`${header}.${payload}`);
  if (signature !== expected) return res.status(401).json({ message: 'Invalid admin token.' });

  const decoded = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
  if (decoded.exp < Math.floor(Date.now() / 1000) || decoded.role !== 'admin') {
    return res.status(401).json({ message: 'Admin session expired.' });
  }

  req.admin = decoded;
  return next();
}
