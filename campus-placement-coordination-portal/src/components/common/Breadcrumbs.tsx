import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  if (pathnames.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex items-center gap-1.5 text-xs text-slate-500">
        <li>
          <Link
            to="/"
            className="flex items-center gap-1 hover:text-slate-900 transition-colors"
          >
            <Home className="w-3.5 h-3.5 text-slate-400" />
            <span className="sr-only">Home</span>
          </Link>
        </li>

        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          const formatted = name
            .replace(/-/g, ' ')
            .replace(/\b\w/g, l => l.toUpperCase());

          return (
            <React.Fragment key={name}>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <li>
                {isLast ? (
                  <span className="font-bold text-slate-800" aria-current="page">
                    {formatted}
                  </span>
                ) : (
                  <Link
                    to={routeTo}
                    className="hover:text-slate-900 transition-colors font-medium text-slate-600"
                  >
                    {formatted}
                  </Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};
