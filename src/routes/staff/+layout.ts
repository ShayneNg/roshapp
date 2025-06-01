import type { LayoutLoad } from './$types';
import { roleGuard } from '$lib/guards/roleGuards';

export const load: LayoutLoad = async (event) => {
  return await roleGuard(event, ['staff']);
};
