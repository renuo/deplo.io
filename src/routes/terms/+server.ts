import { redirect } from '@sveltejs/kit';

// Serve both `/terms` and `/terms/` from this endpoint so either variant
// redirects straight to the external terms page with a single 301.
export const trailingSlash = 'ignore';

export function GET() {
  redirect(301, 'https://docs.nine.ch/docs/legal-documents/general-terms-and-conditions/');
}
