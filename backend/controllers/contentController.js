import mongoose from 'mongoose';
import Achievement from '../models/Achievement.js';
import Department from '../models/Department.js';
import Event from '../models/Event.js';
import News from '../models/News.js';
import Opportunity from '../models/Opportunity.js';
import Project from '../models/Project.js';
import Research from '../models/Research.js';
import Submission from '../models/Submission.js';
import Video from '../models/Video.js';
import {
  fallbackAchievements,
  fallbackDepartments,
  fallbackEvents,
  fallbackNews,
  fallbackOpportunities,
  fallbackProjects,
  fallbackResearch,
  fallbackSubmissions,
  fallbackVideos,
} from '../data/fallbackData.js';

function send(res, data) {
  res.json({ data });
}

function requireMongo(res) {
  if (mongoose.connection.readyState === 1) return true;
  res.status(503).json({
    message: 'MongoDB is not connected. Set MONGO_URI in backend/.env and restart the server.',
  });
  return false;
}

async function findOrFallback(Model, query, fallback, sort = { createdAt: -1 }) {
  if (mongoose.connection.readyState !== 1) return fallback;
  const items = await Model.find(query).sort(sort).lean();
  return items.length ? items : fallback;
}

export async function getNews(_req, res) {
  send(res, await findOrFallback(News, {}, fallbackNews, { publishedAt: -1 }));
}

export async function getVideos(_req, res) {
  send(res, await findOrFallback(Video, {}, fallbackVideos, { publishedAt: -1 }));
}

export async function getPlacements(_req, res) {
  const items = await findOrFallback(
    Opportunity,
    { type: 'placement', approved: true },
    fallbackOpportunities.filter((item) => item.type === 'placement'),
    { postedAt: -1 },
  );
  send(res, items);
}

export async function getInternships(_req, res) {
  const items = await findOrFallback(
    Opportunity,
    { type: 'internship', approved: true },
    fallbackOpportunities.filter((item) => item.type === 'internship'),
    { postedAt: -1 },
  );
  send(res, items);
}

export async function getAchievements(_req, res) {
  const items = await findOrFallback(Achievement, { visible: true }, fallbackAchievements);
  send(res, items.map((item) => item.text || item));
}

export async function getDepartments(_req, res) {
  send(res, await findOrFallback(Department, {}, fallbackDepartments));
}

export async function getEvents(_req, res) {
  send(res, await findOrFallback(Event, {}, fallbackEvents));
}

export async function getResearch(_req, res) {
  send(res, await findOrFallback(Research, {}, fallbackResearch));
}

export async function getProjects(_req, res) {
  send(
    res,
    await findOrFallback(
      Project,
      { $or: [{ approved: true }, { approved: { $exists: false } }] },
      fallbackProjects,
      { createdAt: -1 },
    ),
  );
}

export async function createProjectSubmission(req, res) {
  if (!requireMongo(res)) return;
  const item = await Project.create({ ...req.body, approved: false, likes: 0, comments: [] });
  res.status(201).json({
    data: item,
    message: 'Your project submission is pending admin approval.',
  });
}

export async function getPendingProjects(_req, res) {
  send(res, await findOrFallback(Project, { approved: false }, [], { createdAt: -1 }));
}

export async function approveProject(req, res) {
  if (!requireMongo(res)) return;
  const item = await Project.findByIdAndUpdate(
    req.params.id,
    { approved: true },
    { new: true },
  );
  if (!item) return res.status(404).json({ message: 'Project not found.' });
  return res.json({ data: item });
}

export async function rejectProject(req, res) {
  if (!requireMongo(res)) return;
  const item = await Project.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ message: 'Project not found.' });
  return res.json({ data: item });
}

export async function addProjectComment(req, res) {
  if (!requireMongo(res)) return;
  const { name, message } = req.body;
  if (!message) return res.status(400).json({ message: 'Comment message is required.' });
  const item = await Project.findByIdAndUpdate(
    req.params.id,
    { $push: { comments: { name: name || 'Guest', message, createdAt: new Date() } } },
    { new: true },
  );
  if (!item) return res.status(404).json({ message: 'Project not found.' });
  return res.json({ data: item });
}

export async function likeProject(req, res) {
  if (!requireMongo(res)) return;
  const item = await Project.findByIdAndUpdate(
    req.params.id,
    { $inc: { likes: 1 } },
    { new: true },
  );
  if (!item) return res.status(404).json({ message: 'Project not found.' });
  return res.json({ data: item });
}

export async function getApprovedSubmissions(_req, res) {
  send(
    res,
    await findOrFallback(Submission, { status: 'approved' }, fallbackSubmissions, { createdAt: -1 }),
  );
}

export async function getPendingSubmissions(_req, res) {
  send(res, await findOrFallback(Submission, { status: 'pending' }, [], { createdAt: -1 }));
}

export async function createVideo(req, res) {
  if (!requireMongo(res)) return;
  const item = await Video.create(req.body);
  res.status(201).json({ data: item });
}

export async function createPlacement(req, res) {
  if (!requireMongo(res)) return;
  const item = await Opportunity.create({ ...req.body, type: 'placement', approved: true });
  res.status(201).json({ data: item });
}

export async function createInternship(req, res) {
  if (!requireMongo(res)) return;
  const item = await Opportunity.create({ ...req.body, type: 'internship', approved: true });
  res.status(201).json({ data: item });
}

export async function createResearch(req, res) {
  if (!requireMongo(res)) return;
  const item = await Research.create(req.body);
  res.status(201).json({ data: item });
}

export async function createDepartment(req, res) {
  if (!requireMongo(res)) return;
  const item = await Department.create(req.body);
  res.status(201).json({ data: item });
}

export async function createProject(req, res) {
  if (!requireMongo(res)) return;
  const item = await Project.create({ ...req.body, approved: true, likes: 0, comments: [] });
  res.status(201).json({ data: item });
}

export async function createAchievement(req, res) {
  if (!requireMongo(res)) return;
  const item = await Achievement.create(req.body);
  res.status(201).json({ data: item });
}

export async function createSubmission(req, res) {
  if (!requireMongo(res)) return;
  const item = await Submission.create({ ...req.body, status: 'pending' });
  res.status(201).json({
    data: item,
    message: 'Your post was submitted. It will appear after admin approval.',
  });
}

export async function approveSubmission(req, res) {
  if (!requireMongo(res)) return;
  const item = await Submission.findByIdAndUpdate(
    req.params.id,
    { status: 'approved', reviewedAt: new Date() },
    { new: true },
  );
  if (!item) return res.status(404).json({ message: 'Submission not found.' });
  return res.json({ data: item });
}

export async function rejectSubmission(req, res) {
  if (!requireMongo(res)) return;
  const item = await Submission.findByIdAndUpdate(
    req.params.id,
    { status: 'rejected', reviewedAt: new Date() },
    { new: true },
  );
  if (!item) return res.status(404).json({ message: 'Submission not found.' });
  return res.json({ data: item });
}
