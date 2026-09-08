import { createServer } from 'node:http';
import { handler } from './build/handler.js';
import { getLanguageRedirect } from './server/language.js';

const host = process.env.HOST ?? '0.0.0.0';
const port = Number.parseInt(process.env.PORT ?? '3000', 10);
const socketPath = process.env.SOCKET_PATH;

const server = createServer((request, response) => {
  const redirect = getLanguageRedirect(request);

  if (redirect) {
    response.writeHead(302, {
      location: redirect,
      vary: 'Accept-Language, Cookie',
    });
    response.end();
    return;
  }

  void Promise.resolve(
    handler(request, response, () => {
      if (!response.writableEnded) {
        response.writeHead(404);
        response.end('Not found');
      }
    }),
  ).catch((error) => {
    console.error(error);

    if (!response.headersSent) {
      response.writeHead(500);
      response.end('Internal server error');
    } else {
      response.destroy();
    }
  });
});

if (socketPath) {
  server.listen(socketPath, () => console.log(`Listening on ${socketPath}`));
} else {
  server.listen(port, host, () => console.log(`Listening on http://${host}:${port}`));
}

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => server.close());
}
