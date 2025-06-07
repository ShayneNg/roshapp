
import { roleGuard } from '$lib/guards/roleGuards';

export const load = async (event) => {
  // This route is only for admin/manager - should trigger forbidden for other users
  await roleGuard(event, ['admin', 'manager']);
  
  return {
    message: 'Welcome to admin-only area!'
  };
};
