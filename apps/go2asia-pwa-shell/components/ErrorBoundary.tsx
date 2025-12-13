/**
 * Error Boundary Component
 * Компонент для обработки критических ошибок React
 */

'use client';

import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: unknown) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center max-w-md px-4">
              <h1 className="text-2xl font-bold mb-4 text-gray-900">Что-то пошло не так</h1>
              <p className="text-gray-600 mb-6">
                {this.state.error?.message || 'Произошла непредвиденная ошибка'}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg font-medium transition-colors"
              >
                Перезагрузить страницу
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}



