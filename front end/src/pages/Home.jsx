import AchievementTicker from '../components/AchievementTicker';
import DepartmentCard from '../components/DepartmentCard';
import Hero from '../components/Hero';
import InternshipCard from '../components/InternshipCard';
import NewsCard from '../components/NewsCard';
import PlacementCard from '../components/PlacementCard';
import ProjectCard from '../components/ProjectCard';
import VideoCard from '../components/VideoCard';

export default function Home({ data }) {
  return (
    <>
      <Hero leadStory={data.news[0]} />
      <AchievementTicker achievements={data.achievements} />

      <section className="page-section front-grid">
        <div>
          <div className="section-heading">
            <p className="eyebrow">World tech report</p>
            <h2>Latest updates for curious students</h2>
          </div>
          <div className="news-grid">
            {data.news.map((item, index) => (
              <NewsCard item={item} featured={index === 0} key={item.title} />
            ))}
          </div>
        </div>

        <aside className="student-panel">
          <h2>Today at a glance</h2>
          <p>Use this desk before class, lab, interviews, or project meetings.</p>
          <div className="quick-stats">
            <span><strong>{data.news.length}</strong> news briefs</span>
            <span><strong>{data.placements.length}</strong> placements</span>
            <span><strong>{data.internships.length}</strong> internships</span>
          </div>
        </aside>
      </section>

      <section className="page-section split-section">
        <div>
          <div className="section-heading">
            <p className="eyebrow">Career radar</p>
            <h2>Fresh placement and internship picks</h2>
          </div>
          <div className="opportunity-grid">
            {data.placements.slice(0, 2).map((placement) => (
              <PlacementCard placement={placement} key={placement.role} />
            ))}
            {data.internships.slice(0, 2).map((internship) => (
              <InternshipCard internship={internship} key={internship.role} />
            ))}
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="section-heading">
          <p className="eyebrow">Video gallery</p>
          <h2>Important tech updates on YouTube</h2>
        </div>
        <div className="video-grid compact">
          {data.videos.slice(0, 3).map((video) => (
            <VideoCard video={video} key={video.title} />
          ))}
        </div>
      </section>

      <section className="page-section">
        <div className="section-heading">
          <p className="eyebrow">Departments</p>
          <h2>Sahrdaya technology ecosystem</h2>
        </div>
        <div className="department-grid">
          {data.departments.map((department) => (
            <DepartmentCard department={department} key={department.name} />
          ))}
        </div>
      </section>

      <section className="page-section">
        <div className="section-heading">
          <p className="eyebrow">Project showcase</p>
          <h2>Student projects approved by admins</h2>
        </div>
        <div className="project-grid">
          {data.projects?.slice(0, 4).map((project) => (
            <ProjectCard project={project} key={project._id || project.title} />
          ))}
        </div>
      </section>
    </>
  );
}
