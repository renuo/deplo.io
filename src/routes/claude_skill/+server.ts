import { redirect } from '@sveltejs/kit';

export function GET() {
	redirect(301, 'https://github.com/ninech/deploio-skills');
}
