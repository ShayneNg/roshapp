
import { redirect } from '@sveltejs/kit';

export const load = ({ locals }) => {
  // This route should always redirect to forbidden to trigger the flash message flow
  throw redirect(302, '/forbidden');
};
