import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center animate-fadeIn">
      <div className="glass-card p-12 text-center max-w-md">
        <div className="text-7xl font-black gradient-text mb-2">404</div>
        <h1 className="text-2xl font-bold mb-3">Page Not Found</h1>
        <p className="text-sm mb-8" style={{ color: 'var(--color-text-muted)' }}>
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          to="/login"
          className="btn-primary"
          style={{ display: 'inline-flex' }}
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
