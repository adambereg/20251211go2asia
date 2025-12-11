export function CountrySkeleton() {
  return (
    <div style={{ padding: '1rem' }}>
      <div
        style={{
          height: '2rem',
          width: '75%',
          backgroundColor: '#e5e7eb',
          borderRadius: '4px',
          marginBottom: '1rem',
          animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        }}
      />
      <div
        style={{
          height: '1rem',
          width: '100%',
          backgroundColor: '#e5e7eb',
          borderRadius: '4px',
          marginBottom: '0.5rem',
          animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        }}
      />
      <div
        style={{
          height: '1rem',
          width: '83%',
          backgroundColor: '#e5e7eb',
          borderRadius: '4px',
          animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        }}
      />
      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
}

