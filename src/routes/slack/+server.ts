import { redirect } from '@sveltejs/kit';

// Serve both `/slack` and `/slack/` from this endpoint so either variant
// redirects straight to the Slack community invite. Use a temporary redirect
// because Slack invite links expire and get rotated; a cached 301 would keep
// sending returning visitors to a dead invite.
export const trailingSlash = 'ignore';

export function GET() {
  redirect(302, 'https://join.slack.com/t/deploiocommunity/shared_invite/zt-20tb3k93m-O4NEUs0RjZYGQNQoih8zkA');
}
