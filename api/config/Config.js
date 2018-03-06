module.exports = {
  FRONTEND_URI: process.env.FRONTEND_URI || 'http://localhost:4200/',
  SECRET: '32876qihsdh76@&#!742(*#HG&#28702y&##@^!()(&^#))jhscbd',
  MONGODB_URI: process.env.NODE_ENV === 'production' ? '' : 'mongodb://localhost:27017/ebay'
};
