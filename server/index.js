import { createApp } from './app.js';

const port = Number(process.env.PORT ?? 3000);
createApp().listen(port, process.env.HOST ?? '127.0.0.1', () => {
  console.info('Bug Refinery listening on port ' + port);
});
