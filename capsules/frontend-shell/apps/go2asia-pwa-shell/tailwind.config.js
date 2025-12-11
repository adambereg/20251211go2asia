/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './modules/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // ========================================
      // COLORS - Полная палитра Go2Asia
      // ========================================
      colors: {
        // Основной бренд (Sky Blue)
        brand: {
          DEFAULT: '#0EA5E9', // sky-600
          hover: '#0284C7', // sky-700
          light: '#7DD3FC', // sky-300
          lighter: '#E0F2FE', // sky-100
        },

        // Модульные градиенты (start/end для градиентов)
        module: {
          atlas: {
            from: '#0EA5E9', // sky-500
            to: '#0284C7', // sky-600
          },
          pulse: {
            from: '#0EA5E9',
            to: '#0284C7',
          },
          blog: {
            from: '#0EA5E9',
            to: '#0284C7',
          },
          guru: {
            from: '#0EA5E9',
            to: '#0284C7',
          },
          space: {
            from: '#0EA5E9',
            to: '#0284C7',
          },
          rielt: {
            from: '#10B981', // emerald-500
            to: '#059669', // emerald-600
          },
          quest: {
            from: '#8B5CF6', // purple-500
            to: '#7C3AED', // purple-600
          },
          rf: {
            from: '#3B82F6', // blue-500
            to: '#2563EB', // blue-600
          },
          connect: {
            from: '#F59E0B', // amber-500
            to: '#D97706', // amber-600
          },
          partner: {
            from: '#F97316', // orange-500
            to: '#EA580C', // orange-600
          },
        },

        // Системные цвета
        system: {
          success: '#10B981', // emerald-500
          warning: '#F59E0B', // amber-500
          error: '#EF4444', // red-500
          info: '#3B82F6', // blue-500
        },

        // Feature card backgrounds (для ecosystem features)
        feature: {
          community: {
            from: '#EFF6FF', // blue-50
            to: '#ECFEFF', // cyan-50
            border: '#BFDBFE', // blue-200
            text: '#2563EB', // blue-600
          },
          teams: {
            from: '#FAF5FF', // purple-50
            to: '#FDF2F8', // pink-50
            border: '#E9D5FF', // purple-200
            text: '#9333EA', // purple-600
          },
          rf: {
            from: '#ECFDF5', // emerald-50
            to: '#F0FDFA', // teal-50
            border: '#A7F3D0', // emerald-200
            text: '#059669', // emerald-600
          },
          referral: {
            from: '#FFFBEB', // amber-50
            to: '#FFEDD5', // orange-50
            border: '#FED7AA', // amber-200
            text: '#D97706', // amber-600
          },
          rewards: {
            from: '#EEF2FF', // indigo-50
            to: '#DBEAFE', // blue-50
            border: '#C7D2FE', // indigo-200
            text: '#4F46E5', // indigo-600
          },
          quests: {
            from: '#FFF1F2', // rose-50
            to: '#FCE7F3', // pink-50
            border: '#FECDD3', // rose-200
            text: '#E11D48', // rose-600
          },
        },
      },

      // ========================================
      // TYPOGRAPHY - Шрифты и размеры
      // ========================================
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'system-ui', 'sans-serif'],
      },

      fontSize: {
        // Стандартные размеры Tailwind (соответствуют спецификации прототипа)
        'xs': ['0.75rem', { lineHeight: '1rem' }], // 12px - Tiny
        'sm': ['0.875rem', { lineHeight: '1.25rem' }], // 14px - Small mobile / Base mobile
        'base': ['1rem', { lineHeight: '1.5rem' }], // 16px - Base desktop / Nav
        'lg': ['1.125rem', { lineHeight: '1.75rem' }], // 18px - Large mobile / H4 mobile
        'xl': ['1.25rem', { lineHeight: '1.75rem' }], // 20px - Large desktop / H3 mobile / H4 desktop
        '2xl': ['1.5rem', { lineHeight: '2rem' }], // 24px - H2 mobile / H3 desktop
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px - H1 mobile / H2 desktop
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }], // 36px - H1 tablet
        '5xl': ['3rem', { lineHeight: '1.2' }], // 48px - H1 desktop

        // ⚠️ ВНИМАНИЕ: Дефолтные размеры Tailwind (text-3xl, text-4xl, text-5xl и т.д.)
        // ЗАПРЕЩЕНО использовать напрямую для заголовков!
        // Используйте типографические токены: text-h1, text-h2, text-h3, text-body, text-small

        // Типографические токены (соответствуют прототипу Bolt.New)
        // Использование: text-h1, text-h2, text-h3, text-body, text-small
        'h1': ['1.875rem', { lineHeight: '2.25rem' }], // 30px mobile (base)
        'h2': ['1.5rem', { lineHeight: '2rem' }], // 24px mobile (base)
        'h3': ['1.25rem', { lineHeight: '1.75rem' }], // 20px mobile (base)
        'body': ['1rem', { lineHeight: '1.5rem' }], // 16px
        'small': ['0.875rem', { lineHeight: '1.25rem' }], // 14px mobile (base)

        // Кастомные размеры (для справки, не использовать напрямую)
        'h1-mobile': ['1.875rem', { lineHeight: '2.25rem', fontWeight: '700' }], // 30px
        'h1-tablet': ['2.25rem', { lineHeight: '2.5rem', fontWeight: '700' }], // 36px
        'h1-desktop': ['3rem', { lineHeight: '1.2', fontWeight: '700' }], // 48px

        'h2-mobile': ['1.5rem', { lineHeight: '2rem', fontWeight: '700' }], // 24px
        'h2-desktop': ['1.875rem', { lineHeight: '2.25rem', fontWeight: '700' }], // 30px

        'h3-mobile': ['1.25rem', { lineHeight: '1.75rem', fontWeight: '700' }], // 20px
        'h3-desktop': ['1.5rem', { lineHeight: '2rem', fontWeight: '700' }], // 24px

        'h4-mobile': ['1.125rem', { lineHeight: '1.75rem', fontWeight: '700' }], // 18px
        'h4-desktop': ['1.25rem', { lineHeight: '1.75rem', fontWeight: '700' }], // 20px

        // Размеры текста
        'large-mobile': ['1.125rem', { lineHeight: '1.75rem' }], // 18px
        'large-desktop': ['1.25rem', { lineHeight: '1.75rem' }], // 20px

        'base-mobile': ['0.875rem', { lineHeight: '1.25rem' }], // 14px
        'base-desktop': ['1rem', { lineHeight: '1.5rem' }], // 16px

        'small-mobile': ['0.75rem', { lineHeight: '1rem' }], // 12px
        'small-desktop': ['0.875rem', { lineHeight: '1.25rem' }], // 14px
      },

      fontWeight: {
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },

      lineHeight: {
        heading: '1.2',
        body: '1.5',
        relaxed: '1.75',
      },

      // ========================================
      // SPACING - Отступы и размеры
      // ========================================
      spacing: {
        '18': '4.5rem', // 72px
        '88': '22rem', // 352px
        '128': '32rem', // 512px
      },

      // ========================================
      // BORDER RADIUS - Скругления
      // ========================================
      borderRadius: {
        'sm': '0.5rem', // 8px (rounded-lg)
        'md': '0.75rem', // 12px (rounded-xl)
        'lg': '1rem', // 16px (rounded-2xl)
        'xl': '1.5rem', // 24px
      },

      // ========================================
      // SHADOWS - Тени
      // ========================================
      boxShadow: {
        'card': '0 1px 2px rgba(15, 23, 42, 0.05)',
        'card-hover': '0 10px 15px -3px rgba(15, 23, 42, 0.1), 0 4px 6px -2px rgba(15, 23, 42, 0.05)',
        'lift': '0 10px 15px -3px rgba(15, 23, 42, 0.1), 0 4px 6px -2px rgba(15, 23, 42, 0.05)',
        'xl-hover': '0 20px 25px -5px rgba(15, 23, 42, 0.1), 0 10px 10px -5px rgba(15, 23, 42, 0.04)',
      },

      // ========================================
      // TRANSITIONS - Анимации
      // ========================================
      transitionDuration: {
        DEFAULT: '200ms',
        '250': '250ms',
        '350': '350ms',
      },

      transitionTimingFunction: {
        DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },

      // ========================================
      // Z-INDEX - Слои
      // ========================================
      zIndex: {
        'appbar': '50',
        'modal': '50',
        'dropdown': '40',
        'overlay': '30',
      },

      // ========================================
      // BACKDROP BLUR
      // ========================================
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        DEFAULT: '8px',
        md: '12px',
        lg: '16px',
      },

      // ========================================
      // OPACITY
      // ========================================
      opacity: {
        '15': '0.15',
        '25': '0.25',
        '35': '0.35',
        '85': '0.85',
        '95': '0.95',
      },

      // ========================================
      // MAX WIDTH - Контейнеры
      // ========================================
      maxWidth: {
        'container': '80rem', // 1280px (max-w-7xl)
      },

      // ========================================
      // CONTAINER - Настройки контейнера
      // ========================================
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem', // 16px
          sm: '1.5rem', // 24px
          lg: '2rem', // 32px
        },
      },

      // ========================================
      // SCREENS - Breakpoints (явно указаны)
      // ========================================
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },

      // ========================================
      // STROKE WIDTH - Толщина обводки иконок
      // ========================================
      strokeWidth: {
        '2.5': '2.5',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
