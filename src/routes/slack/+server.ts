import { redirect } from '@sveltejs/kit';

export const trailingSlash = 'ignore';

export function GET() {
  redirect(302, 'https://join.slack.com/t/deploiocommunity/shared_invite/zt-20tb3k93m-O4NEUs0RjZYGQNQoih8zkA');
}
