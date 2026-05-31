import { useState } from 'react';
import { submitStudentPost } from '../services/api';

const initialValues = {
  title: '',
  authorName: '',
  authorEmail: '',
  summary: '',
  content: '',
};

export default function SubmitArticle() {
  const [values, setValues] = useState(initialValues);
  const [status, setStatus] = useState('');

  function update(field, value) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  async function submit(event) {
    event.preventDefault();
    setStatus('');
    try {
      const result = await submitStudentPost({
        title: values.title,
        authorName: values.authorName,
        authorEmail: values.authorEmail,
        category: 'Tech Article',
        summary: values.summary,
        content: values.content,
      });
      setValues(initialValues);
      setStatus(result.message || 'Article submitted for admin approval.');
    } catch (error) {
      setStatus(error.message);
    }
  }

  return (
    <main className="page-shell">
      <div className="page-title">
        <p className="eyebrow">Tech insights</p>
        <h1>Submit a Tech Article</h1>
        <p>Share your knowledge. Articles are reviewed by admins before publication.</p>
      </div>
      <form className="student-submit-form" onSubmit={submit}>
        <label>
          Article title
          <input value={values.title} onChange={(event) => update('title', event.target.value)} required />
        </label>

        <label>
          Your name
          <input value={values.authorName} onChange={(event) => update('authorName', event.target.value)} required />
        </label>

        <label>
          Your email
          <input value={values.authorEmail} onChange={(event) => update('authorEmail', event.target.value)} type="email" required />
        </label>

        <label className="wide">
          Short summary
          <textarea value={values.summary} onChange={(event) => update('summary', event.target.value)} placeholder="Key takeaways in 1-2 sentences" required />
        </label>

        <label className="wide">
          Full article
          <textarea value={values.content} onChange={(event) => update('content', event.target.value)} placeholder="Write your complete article here" required />
        </label>

        {status && <p className="admin-status">{status}</p>}
        <button type="submit">Submit for approval</button>
      </form>
    </main>
  );
}
