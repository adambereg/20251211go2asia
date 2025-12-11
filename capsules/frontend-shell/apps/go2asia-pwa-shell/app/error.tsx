'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Логирование ошибки в систему мониторинга
    console.error('Application error:', error);
  }, [error]);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Что-то пошло не так</h2>
      <p>Произошла ошибка при загрузке страницы.</p>
      {error.digest && (
        <p style={{ fontSize: '0.875rem', color: '#666' }}>
          ID ошибки: {error.digest}
        </p>
      )}
      <button
        onClick={reset}
        style={{
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          backgroundColor: '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Попробовать снова
      </button>
    </div>
  );
}

