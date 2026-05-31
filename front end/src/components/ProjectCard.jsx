import { useState } from 'react';
import { addProjectComment, likeProject } from '../services/api';

export default function ProjectCard({ project }) {
  const [likes, setLikes] = useState(project.likes || 0);
  const [comments, setComments] = useState(project.comments || []);
  const [commentText, setCommentText] = useState('');
  const [status, setStatus] = useState('');

  async function handleLike() {
    try {
      setStatus('');
      const payload = await likeProject(project._id || project.id);
      setLikes(payload.data?.likes ?? likes + 1);
    } catch (error) {
      setStatus(error.message);
    }
  }

  async function handleComment(event) {
    event.preventDefault();
    if (!commentText.trim()) return;
    try {
      setStatus('');
      const payload = await addProjectComment(project._id || project.id, {
        name: 'Guest',
        message: commentText.trim(),
      });
      setComments(payload.data?.comments || [...comments, { name: 'Guest', message: commentText.trim() }]);
      setCommentText('');
    } catch (error) {
      setStatus(error.message);
    }
  }

  return (
    <article className="project-card">
      <div className="project-card-header">
        <h3>{project.title}</h3>
        <a href={project.githubUrl} target="_blank" rel="noreferrer">
          GitHub
        </a>
      </div>
      <p className="project-author">By {project.studentName || project.authorName || 'Student'}</p>
      <p>{project.description || project.summary}</p>
      <div className="project-meta">
        {project.technologies && <span>{project.technologies}</span>}
        <span>{likes} likes</span>
        <span>{comments.length} comments</span>
      </div>
      <div className="project-actions">
        <button type="button" onClick={handleLike}>Like</button>
      </div>
      <div className="project-comments">
        <strong>Recent comments</strong>
        {comments.slice(0, 2).map((comment, index) => (
          <p key={`${comment.message}-${index}`}>
            <strong>{comment.name}:</strong> {comment.message}
          </p>
        ))}
        {comments.length === 0 && <p>No comments yet. Be the first to add one.</p>}
      </div>
      <form className="project-comment-form" onSubmit={handleComment}>
        <label>
          Add a comment
          <input
            value={commentText}
            onChange={(event) => setCommentText(event.target.value)}
            placeholder="Share feedback"
          />
        </label>
        <button type="submit">Post</button>
        {status && <small className="project-status">{status}</small>}
      </form>
    </article>
  );
}
