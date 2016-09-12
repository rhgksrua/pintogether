'use strict';

import server from './server';

const port = 3000 || process.env.PORT;

server.listen(port, () => {
  console.log(`localhost://${port}`);
});
