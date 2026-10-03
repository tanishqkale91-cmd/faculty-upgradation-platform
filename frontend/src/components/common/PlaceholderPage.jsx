/**
 * PlaceholderPage — shared component for unimplemented pages.
 * Each page imports this and passes its own title + phase label.
 */

function PlaceholderPage({ title, phase, description }) {
  return (
    <div className="p-8 animate-fadeIn">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold gradient-text mb-1">{title}</h1>
        <p className="text-sm mb-8" style={{ color: 'var(--color-text-muted)' }}>
          {description}
        </p>
        <div
          className="glass-card p-8 text-center"
        >
          <div className="text-5xl mb-4">🚧</div>
          <p className="font-semibold" style={{ color: 'var(--color-text)' }}>
            Under Construction
          </p>
          <p className="text-sm mt-2" style={{ color: 'var(--color-text-muted)' }}>
            This page will be implemented in <strong style={{ color: 'var(--color-accent)' }}>{phase}</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default PlaceholderPage;
