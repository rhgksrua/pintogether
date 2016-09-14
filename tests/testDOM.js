'use strict';

import jsdom from 'jsdom';

const jsdomModule = (markup) => {
  if (typeof document !== 'undefined') return;
  const DOM = jsdom.jsdom;
  global.document = jsdom(markup || '');
  global.window = doument.parentWindow;
  global.navigator = {
    userAgent: 'node.js',
  };
};
