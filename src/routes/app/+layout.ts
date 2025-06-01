
// src/routes/app/+layout.ts
import { roleGuard } from '$lib/guards/roleGuards';
import { routeMeta } from '$lib/config/routeMeta';
import type { LayoutLoad } from './$types';

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
export const load: LayoutLoad = async (event) => {
  // Apply role guard first
  const guardResult = await roleGuard(event, ['admin', 'manager']);
  
  // Then add meta information
  const meta = matchRoute(event.url.pathname);
  return {
    ...guardResult,
    title: meta.title ?? '',
    subtitle: meta.subtitle ?? '',
    actions: meta.actions ?? []
  };
};
