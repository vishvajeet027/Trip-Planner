import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  if (pathnames.length === 0) return null;

  return (
    <nav className="flex items-center space-x-2 text-xs font-semibold text-slate-500 dark:text-slate-400 my-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 flex items-center space-x-1">
        <Home className="w-3.5 h-3.5" />
        <span>Home</span>
      </Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const formatted = name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

        return (
          <React.Fragment key={name}>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            {isLast ? (
              <span className="text-blue-600 dark:text-blue-400 font-bold">{formatted}</span>
            ) : (
              <Link to={routeTo} className="hover:text-blue-600 dark:hover:text-blue-400">
                {formatted}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
