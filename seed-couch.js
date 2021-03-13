const nano = require('nano');
const couch = nano(`http:admin:admin@127.0.0.1:5984/`);
const mockData = require('./Tests/testData.js');


const init = async () => {
  await couch.db.destroy('test');
  await couch.db.create('test');
}

// process.argv.forEach((val, index, array) => {
//   console.log(index + ': ' + val);
// });

const insertIntoDB = async (start, end) => {
  try {
    const test = couch.use('test');
    let docArray = [];
    while (start < end) {
      for (let i = 0; i < 100; i++) {
        //await test.insert({reviewId: i}, i);
        docArray.push(mockData.review);
      }
      await test.bulk({docs: docArray});
      docArray = [];
    }
  } catch(err) {
    console.log(err);
  }
}

insertIntoDB(process.argv[2], process.argv[3]);

// const seed = async () => {
//   await init();
//   let processArray = [
//     insertIntoDB(1, 100000),
//     insertIntoDB(100000, 200000),
//     insertIntoDB(200000, 300000),
//     insertIntoDB(300000, 400000),
//     insertIntoDB(400000, 500000)
//   ];
//   console.time('seed');
//   await Promise.all(processArray);
//   console.timeEnd('seed');
//   console.log(`processing is complete`);
// }

// const seed = async () => {
//   await init();
//   console.time(`seed`);
//   insertIntoDB(1, 1000);
//   insertIntoDB(1000, 2000);
//   insertIntoDB(2000, 3000);
//   insertIntoDB(3000, 4000);
//   insertIntoDB(4000, 5000);
//   console.timeEnd(`seed`);
// }

//seed();


