import { Router } from 'express';
import {
  getAchievements,
  getDepartments,
  getEvents,
  getInternships,
  getNews,
  getPlacements,
  getProjects,
  getResearch,
  getVideos,
  createAchievement,
  createDepartment,
  createInternship,
  createPlacement,
  createProject,
  createResearch,
  createVideo,
  createProjectSubmission,
  createSubmission,
  getApprovedSubmissions,
  getPendingSubmissions,
  getPendingProjects,
  approveSubmission,
  approveProject,
  rejectSubmission,
  rejectProject,
  addProjectComment,
  likeProject,
} from '../controllers/contentController.js';
import { runInitialSync } from '../cronjobs/syncJobs.js';
import { loginAdmin } from '../controllers/authController.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

router.get('/news', getNews);
router.get('/videos', getVideos);
router.get('/placements', getPlacements);
router.get('/internships', getInternships);
router.get('/achievements', getAchievements);
router.get('/departments', getDepartments);
router.get('/events', getEvents);
router.get('/research', getResearch);
router.get('/projects', getProjects);
router.get('/submissions', getApprovedSubmissions);
router.post('/projects/submit', createProjectSubmission);
router.get('/admin/projects/pending', requireAdmin, getPendingProjects);
router.patch('/projects/:id/approve', requireAdmin, approveProject);
router.patch('/projects/:id/reject', requireAdmin, rejectProject);
router.post('/projects/:id/comments', addProjectComment);
router.post('/projects/:id/like', likeProject);

router.post('/auth/login', loginAdmin);
router.post('/submissions', createSubmission);
router.get('/admin/submissions/pending', requireAdmin, getPendingSubmissions);
router.patch('/admin/submissions/:id/approve', requireAdmin, approveSubmission);
router.patch('/admin/submissions/:id/reject', requireAdmin, rejectSubmission);

router.post('/videos', requireAdmin, createVideo);
router.post('/placements', requireAdmin, createPlacement);
router.post('/internships', requireAdmin, createInternship);
router.post('/research', requireAdmin, createResearch);
router.post('/departments', requireAdmin, createDepartment);
router.post('/projects', requireAdmin, createProject);
router.post('/achievements', requireAdmin, createAchievement);
router.post('/sync', requireAdmin, async (_req, res) => {
  await runInitialSync();
  res.json({ message: 'Automatic fetch completed for news, videos, placements, and internships.' });
});

export default router;
