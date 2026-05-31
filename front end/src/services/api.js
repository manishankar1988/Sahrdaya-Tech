import {
  achievements,
  departments,
  events,
  internships,
  news,
  placements,
  projects,
  research,
  videos,
} from '../data/fallbackData';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';
const TOKEN_KEY = 'sahrdayaTechAdminToken';

const fallback = {
  achievements,
  departments,
  events,
  internships,
  news,
  placements,
  projects,
  research,
  videos,
};

function authHeaders() {
  const token = localStorage.getItem(TOKEN_KEY);
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request(path, fallbackValue) {
  try {
    const response = await fetch(`${API_BASE}${path}`);
    if (!response.ok) throw new Error(`Request failed: ${response.status}`);
    const payload = await response.json();
    return payload.data || payload;
  } catch {
    return fallbackValue;
  }
}

export function getDashboardData() {
  return Promise.all([
    request('/news', fallback.news),
    request('/videos', fallback.videos),
    request('/placements', fallback.placements),
    request('/internships', fallback.internships),
    request('/achievements', fallback.achievements),
    request('/departments', fallback.departments),
    request('/events', fallback.events),
    request('/research', fallback.research),
    request('/projects', fallback.projects),
  ]).then(([newsData, videoData, placementData, internshipData, achievementData, departmentData, eventData, researchData, projectData]) => ({
    achievements: achievementData,
    departments: departmentData,
    events: eventData,
    internships: internshipData,
    news: newsData,
    placements: placementData,
    projects: projectData,
    research: researchData,
    videos: videoData,
  }));
}

export async function createContent(path, values) {
  const response = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(values),
  });
  const payload = await response.json();
  if (!response.ok) throw new Error(payload.message || 'Unable to save content');
  return payload.data || payload;
}

export async function runAutomaticSync() {
  const response = await fetch(`${API_BASE}/sync`, {
    method: 'POST',
    headers: authHeaders(),
  });
  const payload = await response.json();
  if (!response.ok) throw new Error(payload.message || 'Unable to run sync');
  return payload;
}

export async function loginAdmin(email, password) {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const payload = await response.json();
  if (!response.ok) throw new Error(payload.message || 'Unable to login');
  localStorage.setItem(TOKEN_KEY, payload.data.token);
  return payload.data;
}

export function logoutAdmin() {
  localStorage.removeItem(TOKEN_KEY);
}

export function isAdminLoggedIn() {
  return Boolean(localStorage.getItem(TOKEN_KEY));
}

export async function submitStudentPost(values) {
  const response = await fetch(`${API_BASE}/submissions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values),
  });
  const payload = await response.json();
  if (!response.ok) throw new Error(payload.message || 'Unable to submit post');
  return payload;
}

export async function submitProject(values) {
  const response = await fetch(`${API_BASE}/projects/submit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values),
  });
  const payload = await response.json();
  if (!response.ok) throw new Error(payload.message || 'Unable to submit project');
  return payload;
}

export async function addProjectComment(projectId, values) {
  const response = await fetch(`${API_BASE}/projects/${projectId}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values),
  });
  const payload = await response.json();
  if (!response.ok) throw new Error(payload.message || 'Unable to add comment');
  return payload;
}

export async function likeProject(projectId) {
  const response = await fetch(`${API_BASE}/projects/${projectId}/like`, {
    method: 'POST',
  });
  const payload = await response.json();
  if (!response.ok) throw new Error(payload.message || 'Unable to like project');
  return payload;
}

export async function getProjects() {
  const response = await fetch(`${API_BASE}/projects`);
  const payload = await response.json();
  if (!response.ok) throw new Error(payload.message || 'Unable to load projects');
  return payload.data || [];
}

export async function getPendingSubmissions() {
  const response = await fetch(`${API_BASE}/admin/submissions/pending`, {
    headers: authHeaders(),
  });
  const payload = await response.json();
  if (!response.ok) throw new Error(payload.message || 'Unable to load pending posts');
  return payload.data || [];
}

export async function reviewSubmission(id, action) {
  const response = await fetch(`${API_BASE}/admin/submissions/${id}/${action}`, {
    method: 'PATCH',
    headers: authHeaders(),
  });
  const payload = await response.json();
  if (!response.ok) throw new Error(payload.message || 'Unable to update submission');
  return payload.data;
}
