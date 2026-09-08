import type { Handle } from '@sveltejs/kit';
import { i18n } from '$lib/i18n';
import { getLanguageRedirect } from '../server/language.js';

const handleParaglide: Handle = i18n.handle();

export const handle: Handle = ({ event, resolve }) => {
  const location = getLanguageRedirect({
    headers: Object.fromEntries(event.request.headers),
    method: event.request.method,
    url: `${event.url.pathname}${event.url.search}`,
  });

  if (location) {
    return new Response(undefined, {
      status: 302,
      headers: {
        location,
        vary: 'Accept-Language, Cookie',
      },
    });
  }

  return handleParaglide({ event, resolve });
};
