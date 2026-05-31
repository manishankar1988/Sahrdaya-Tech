import { useState } from 'react';
import { submitProject, submitStudentPost } from '../services/api';

const initialValues = {
  submissionType: 'project',
  title: '',
  studentName: '',
  studentEmail: '',
  githubUrl: '',
  technologies: '',
  summary: '',
  description: '',
};

export default function Submit() {
  const [values, setValues] = useState(initialValues);
  const [status, setStatus] = useState('');

  function update(field, value) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  async function submit(event) {
    event.preventDefault();
    setStatus('');
    try {
      if (values.submissionType === 'project') {
        const result = await submitProject({
          title: values.title,
          studentName: values.studentName,
          studentEmail: values.studentEmail,
          githubUrl: values.githubUrl,
          technologies: values.technologies,
          description: values.description,
        });
        setStatus(result.message || 'Project submitted for admin approval.');
      } else {
        const result = await submitStudentPost({
          title: values.title,
          authorName: values.studentName,
          authorEmail: values.studentEmail,
          category: 'Tech Article',
          summary: values.summary,
          content: values.description,
        });
        setStatus(result.message || 'Article submitted for admin approval.');
      }
      setValues(initialValues);
    } catch (error) {
      setStatus(error.message);
    }
  }

  const isProject = values.submissionType === 'project';

  return (
    <main className="page-shell">
      <div className="page-title">
        <p className="eyebrow">Student submission</p>
        <h1>Submit a Project or Tech Article</h1>
        <p>Both projects and tech articles are reviewed by admins before publication.</p>
      </div>
      <form className="student-submit-form" onSubmit={submit}>
        <label>
          Submission type
          <select value={values.submissionType} onChange={(event) => update('submissionType', event.target.value)}>
            <option value="project">Project</option>
            <option value="article">Tech Article</option>
          </select>
        </label>

        <label>
          Title
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

        {isProject ? (
          <>
            <label>
              GitHub repository URL
              <input value={values.githubUrl} onChange={(event) => update('githubUrl', event.target.value)} type="url" required />
            </label>
            <label>
              Key technologies
              <input
                value={values.technologies}
                onChange={(event) => update('technologies', event.target.value)}
                placeholder="React, Node.js, ML, IoT"
              />
            </label>
            <label className="wide">
              Project description
              <textarea value={values.description} onChange={(event) => update('description', event.target.value)} required />
            </label>
          </>
        ) : (
          <>
            <label>
              Short summary
              <textarea value={values.summary} onChange={(event) => update('summary', event.target.value)} required />
            </label>
            <label className="wide">
              Full article
              <textarea value={values.description} onChange={(event) => update('description', event.target.value)} required />
            </label>
          </>
        )}

        {status && <p className="admin-status">{status}</p>}
        <button type="submit">Submit for approval</button>
      </form>
    </main>
  );
}
