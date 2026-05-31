import { useState } from 'react';
import { submitProject } from '../services/api';

const initialValues = {
  title: '',
  studentName: '',
  studentEmail: '',
  githubUrl: '',
  technologies: '',
  description: '',
};

export default function SubmitProject() {
  const [values, setValues] = useState(initialValues);
  const [status, setStatus] = useState('');

  function update(field, value) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  async function submit(event) {
    event.preventDefault();
    setStatus('');
    try {
      const result = await submitProject({
        title: values.title,
        studentName: values.studentName,
        studentEmail: values.studentEmail,
        githubUrl: values.githubUrl,
        technologies: values.technologies,
        description: values.description,
      });
      setValues(initialValues);
      setStatus(result.message || 'Project submitted for admin approval.');
    } catch (error) {
      setStatus(error.message);
    }
  }

  return (
    <main className="page-shell">
      <div className="page-title">
        <p className="eyebrow">Innovation hub</p>
        <h1>Submit Your Project</h1>
        <p>Showcase your work. Projects are reviewed by admins before appearing in the ecosystem.</p>
      </div>
      <form className="student-submit-form" onSubmit={submit}>
        <label>
          Project title
          <input value={values.title} onChange={(event) => update('title', event.target.value)} required />
        </label>

        <label>
          Your name
          <input value={values.studentName} onChange={(event) => update('studentName', event.target.value)} required />
        </label>

        <label>
          Your email
          <input value={values.studentEmail} onChange={(event) => update('studentEmail', event.target.value)} type="email" required />
        </label>

        <label>
          GitHub repository URL
          <input value={values.githubUrl} onChange={(event) => update('githubUrl', event.target.value)} type="url" required />
        </label>

        <label>
          Key technologies
          <input value={values.technologies} onChange={(event) => update('technologies', event.target.value)} placeholder="e.g. React, Node.js, ML, IoT" />
        </label>

        <label className="wide">
          Project description
          <textarea value={values.description} onChange={(event) => update('description', event.target.value)} placeholder="Describe your project, its purpose, and impact" required />
        </label>

        {status && <p className="admin-status">{status}</p>}
        <button type="submit">Submit for approval</button>
      </form>
    </main>
  );
}
