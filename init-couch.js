const nano = require('nano');
const couch = nano(`http:admin:admin@127.0.0.1:5984/`);

const init = async () => {
  await couch.db.destroy('test');
  await couch.db.create('test');
  console.log('DB created!');
}

init();