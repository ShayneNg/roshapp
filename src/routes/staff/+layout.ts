import type { LayoutLoad } from './$types';
import { roleGuard } from '$lib/guards/roleGuard';

export const load: LayoutLoad = async (event) => {
  return await roleGuard(event, ['staff']);
};
