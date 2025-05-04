// src/routes/app/+layout.ts

import { routeMeta } from '$lib/config/routeMeta';

function matchRoute(pathname: string) {
  const trimmed = pathname.replace(/\/$/, '');
  const staticMatch = routeMeta[trimmed];
  if (staticMatch) return staticMatch;

  // Try dynamic match
  for (const pattern in routeMeta) {
    if (pattern.includes('[')) {
      const regexPattern = new RegExp(
        '^' +
          pattern
            .replace(/\[.*?\]/g, '[^/]+') // [id] becomes [^/]+
            .replace(/\//g, '\\/') +
          '$'
      );
      if (regexPattern.test(trimmed)) {
        return routeMeta[pattern];
      }
    }
  }

  return {};
}

/** @type {import('./$types').LayoutLoad} */
export function load({ url }) {
  const meta = matchRoute(url.pathname);
  return {
    title: meta.title ?? '',
    subtitle: meta.subtitle ?? '',
    actions: meta.actions ?? []
  };
}
