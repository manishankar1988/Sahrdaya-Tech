const navItems = [
  ['Home', '#/'],
  ['News', '#/news'],
  ['Videos', '#/videos'],
  ['Placements', '#/placements'],
  ['Internships', '#/internships'],
  ['Research', '#/research'],
  ['Events', '#/events'],
  ['Projects', '#/submit/project'],
  ['Articles', '#/submit/article'],
  ['Admin', '#/admin'],
];

export default function Navbar({ currentPath }) {
  return (
    <header className="site-header">
      <a className="brand" href="#/" aria-label="Sahrdaya Tech home">
        <span className="brand-mark">
          <img src="/logo.webp" alt="Sahrdaya logo" />
        </span>
        <span>
          <strong>Sahrdaya Tech</strong>
          <small>Student tech desk</small>
        </span>
      </a>
      <nav className="nav-links" aria-label="Main navigation">
        {navItems.map(([label, href]) => (
          <a className={currentPath === href.slice(1) ? 'active' : ''} href={href} key={label}>
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}
