import { createServer, Server } from 'http';
import * as fs from 'fs';

/**
 * We need to create temporary server
 * to serve static assets during tests
 */
export function createMockServer(): Server {
  return createServer(async (req, res) => {
    const { url } = req;
    const path = `${__dirname}/../../static${url}`;
    const stat = fs.statSync(path);

    res.writeHead(200, {
      'Content-Length': stat.size,
    });

    const readStream = fs.createReadStream(path);
    readStream.pipe(res);
  }).listen(9000);
}
