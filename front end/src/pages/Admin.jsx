import { useEffect, useState } from 'react';
import { useSahrdayaTech } from '../context/AppContext';
import {
  createContent,
  getPendingSubmissions,
  isAdminLoggedIn,
  logoutAdmin,
  reviewSubmission,
  runAutomaticSync,
} from '../services/api';

const initialForms = {
  video: {
    title: '',
    channel: '',
    topic: 'Tech update',
    embedUrl: '',
    url: '',
  },
  placement: {
    role: '',
    company: '',
    location: '',
    type: 'Campus hiring',
    skills: '',
    applyUrl: '',
  },
  internship: {
    role: '',
    company: '',
    location: '',
    duration: '',
    stipend: 'Paid',
    skills: '',
    applyUrl: '',
  },
  research: {
    title: '',
    area: '',
    mentor: '',
  },
  department: {
    name: '',
    focus: '',
    stats: '',
  },
  project: {
    title: '',
    department: '',
    description: '',
    year: new Date().getFullYear().toString(),
    students: '',
    mentor: '',
  },
  achievement: {
    text: '',
    visible: true,
  },
};

const formConfig = [
  {
    id: 'video',
    title: 'Add YouTube video',
    endpoint: '/videos',
    fields: ['title', 'channel', 'topic', 'embedUrl', 'url'],
  },
  {
    id: 'placement',
    title: 'Add placement detail',
    endpoint: '/placements',
    fields: ['role', 'company', 'location', 'type', 'skills', 'applyUrl'],
  },
  {
    id: 'internship',
    title: 'Add internship detail',
    endpoint: '/internships',
    fields: ['role', 'company', 'location', 'duration', 'stipend', 'skills', 'applyUrl'],
  },
  {
    id: 'research',
    title: 'Add research detail',
    endpoint: '/research',
    fields: ['title', 'area', 'mentor'],
  },
  {
    id: 'department',
    title: 'Add department detail',
    endpoint: '/departments',
    fields: ['name', 'focus', 'stats'],
  },
  {
    id: 'project',
    title: 'Add department project',
    endpoint: '/projects',
    fields: ['title', 'department', 'description', 'year', 'students', 'mentor'],
  },
  {
    id: 'achievement',
    title: 'Add achievement ticker item',
    endpoint: '/achievements',
    fields: ['text'],
  },
];

function labelFor(field) {
  return field.replace(/([A-Z])/g, ' $1').replace(/^./, (letter) => letter.toUpperCase());
}

function normalizeValues(id, values) {
  const payload = { ...values };
  if (payload.skills) {
    payload.skills = payload.skills.split(',').map((skill) => skill.trim()).filter(Boolean);
  }
  if (payload.students) {
    payload.students = payload.students.split(',').map((student) => student.trim()).filter(Boolean);
  }
  if (id === 'video' && payload.url && !payload.embedUrl) {
    const videoId = payload.url.split('v=')[1]?.split('&')[0] || payload.url.split('/').pop();
    payload.embedUrl = `https://www.youtube.com/embed/${videoId}`;
  }
  return payload;
}

function AdminForm({ config, values, onChange, onSubmit, busy }) {
  return (
    <form className="admin-form" onSubmit={(event) => onSubmit(event, config)}>
      <h2>{config.title}</h2>
      <div className="admin-form-grid">
        {config.fields.map((field) => (
          <label className={field === 'description' || field === 'focus' || field === 'text' ? 'wide' : ''} key={field}>
            {labelFor(field)}
            {field === 'description' || field === 'focus' || field === 'text' ? (
              <textarea
                value={values[field]}
                onChange={(event) => onChange(config.id, field, event.target.value)}
                required
              />
            ) : (
              <input
                value={values[field]}
                onChange={(event) => onChange(config.id, field, event.target.value)}
                required={field !== 'students' && field !== 'mentor'}
              />
            )}
          </label>
        ))}
      </div>
      <button disabled={busy} type="submit">{busy ? 'Saving...' : 'Save to MongoDB'}</button>
    </form>
  );
}

export default function Admin({ data }) {
  const { refresh } = useSahrdayaTech();
  const [loggedIn, setLoggedIn] = useState(isAdminLoggedIn());
  const [forms, setForms] = useState(initialForms);
  const [pendingPosts, setPendingPosts] = useState([]);
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState('');

  useEffect(() => {
    if (!loggedIn) return;
    getPendingSubmissions()
      .then(setPendingPosts)
      .catch((error) => setStatus(error.message));
  }, [loggedIn]);

  if (!loggedIn) {
    return (
      <main className="page-shell">
        <div className="page-title">
          <p className="eyebrow">Admin locked</p>
          <h1>Login Required</h1>
          <p>Only admins can add, approve, or sync content.</p>
        </div>
        <a className="primary-link-button" href="#/login">Go to admin login</a>
      </main>
    );
  }

  function updateForm(formId, field, value) {
    setForms((current) => ({
      ...current,
      [formId]: {
        ...current[formId],
        [field]: value,
      },
    }));
  }

  async function submitForm(event, config) {
    event.preventDefault();
    setBusy(config.id);
    setStatus('');
    try {
      await createContent(config.endpoint, normalizeValues(config.id, forms[config.id]));
      setForms((current) => ({ ...current, [config.id]: initialForms[config.id] }));
      await refresh();
      setStatus(`${config.title} saved successfully.`);
    } catch (error) {
      setStatus(error.message);
    } finally {
      setBusy('');
    }
  }

  async function syncNow() {
    setBusy('sync');
    setStatus('');
    try {
      const result = await runAutomaticSync();
      await refresh();
      setStatus(result.message || 'Automatic fetch completed.');
    } catch (error) {
      setStatus(error.message);
    } finally {
      setBusy('');
    }
  }

  async function reviewPost(id, action) {
    setBusy(id);
    setStatus('');
    try {
      await reviewSubmission(id, action);
      setPendingPosts((current) => current.filter((post) => post._id !== id));
      setStatus(`Student post ${action === 'approve' ? 'approved' : 'rejected'}.`);
    } catch (error) {
      setStatus(error.message);
    } finally {
      setBusy('');
    }
  }

  function logout() {
    logoutAdmin();
    setLoggedIn(false);
    window.location.hash = '#/login';
  }

  return (
    <main className="page-shell">
      <div className="page-title admin-title-row">
        <div>
          <p className="eyebrow">Admin desk</p>
          <h1>Content Controls</h1>
          <p>Add campus content manually or run automatic daily fetch jobs on demand.</p>
        </div>
        <button className="sync-button" disabled={busy === 'sync'} onClick={syncNow} type="button">
          {busy === 'sync' ? 'Fetching...' : 'Run automatic fetch'}
        </button>
        <button className="sync-button secondary-sync" onClick={logout} type="button">Logout</button>
      </div>

      {status && <p className="admin-status">{status}</p>}

      <div className="admin-grid">
        <article>
          <span>{data.news.length}</span>
          <h2>News items</h2>
          <p>Fetched daily from global technology feeds.</p>
        </article>
        <article>
          <span>{data.videos.length}</span>
          <h2>YouTube videos</h2>
          <p>Synced daily and editable through the form below.</p>
        </article>
        <article>
          <span>{data.placements.length + data.internships.length}</span>
          <h2>Career posts</h2>
          <p>Placement and internship details can be added manually.</p>
        </article>
        <article>
          <span>{data.research.length}</span>
          <h2>Research</h2>
          <p>Research and department project details are ready for MongoDB.</p>
        </article>
      </div>

      <section className="admin-forms">
        {formConfig.map((config) => (
          <AdminForm
            busy={busy === config.id}
            config={config}
            key={config.id}
            onChange={updateForm}
            onSubmit={submitForm}
            values={forms[config.id]}
          />
        ))}
      </section>

      <section className="pending-section">
        <div className="section-heading">
          <p className="eyebrow">Approval queue</p>
          <h2>Student articles and posts</h2>
        </div>
        <div className="pending-list">
          {pendingPosts.length === 0 ? (
            <article>
              <h3>No pending posts</h3>
              <p>Student submissions will appear here before publishing.</p>
            </article>
          ) : (
            pendingPosts.map((post) => (
              <article key={post._id}>
                <span>{post.category}</span>
                <h3>{post.title}</h3>
                <p>{post.summary}</p>
                <small>{post.authorName} · {post.authorEmail}</small>
                <div className="review-actions">
                  <button disabled={busy === post._id} onClick={() => reviewPost(post._id, 'approve')} type="button">
                    Approve
                  </button>
                  <button disabled={busy === post._id} onClick={() => reviewPost(post._id, 'reject')} type="button">
                    Reject
                  </button>
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
