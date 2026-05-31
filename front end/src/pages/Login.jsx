import { useState } from 'react';
import { loginAdmin } from '../services/api';

export default function Login() {
  const [email, setEmail] = useState('admin@sahrdaya.ac.in');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');

  async function submit(event) {
    event.preventDefault();
    setStatus('');
    try {
      await loginAdmin(email, password);
      window.location.hash = '#/admin';
    } catch (error) {
      setStatus(error.message);
    }
  }

  return (
    <main className="auth-shell">
      <form className="auth-card" onSubmit={submit}>
        <p className="eyebrow">Admin access</p>
        <h1>Login</h1>
        <label>
          Email
          <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" />
        </label>
        <label>
          Password
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter admin password"
            type="password"
          />
        </label>
        {status && <p className="form-message">{status}</p>}
        <button type="submit">Login as admin</button>
      </form>
    </main>
  );
}
