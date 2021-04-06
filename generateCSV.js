const fs = require('fs')
const faker = require('faker');
//const { generateSeedData } = require('./database-mongoose/seeder.js');

let header = 'reviewId,productId,color,configuration,isBestSeller,category,customerId,customerName,customerCountry,profilePicUrl,title,description,rating,isVerifiedPurchase,isHelpfulCount,imageUrls,reviewDate,easeToUse,voiceRecognition,techSupport,valueForMoney,qualityOfMaterial,batteryLife';

let reviewId = 0;
let generate = (count, startingid) => {
  let lineItem = header;
  let prodId = 1000 + startingid;
  for (let i = 0; i < count; i++) {
    for (let j = 0; j < 7; j++) {
      lineItem += '\n';
      lineItem +=`${++reviewId},${prodId},${faker.commerce.color()},${faker.lorem.words()},true,'Amazon Devices',${i},${faker.name.findName()},${faker.address.state()},www.google.com,${faker.lorem.words()},${faker.lorem.words()},${j},${faker.random.boolean()},${faker.random.boolean()},${[1]},${faker.date.past()},${Math.floor(Math.random() * (5 - 1 + 1) + 1)},${Math.floor(Math.random() * (5 - 1 + 1) + 1)},${Math.floor(Math.random() * (5 - 1 + 1) + 1)},${Math.floor(Math.random() * (5 - 1 + 1) + 1)},${Math.floor(Math.random() * (5 - 1 + 1) + 1)},${Math.floor(Math.random() * (5 - 1 + 1) + 1)}`;
    }
    prodId++;
  }
  return lineItem;
}

let createFiles = async (end) => {
  const limit = 25000;
  for (let start = 0; start < end; start++) {
    let data = generate(limit, start * limit);
    fs.writeFileSync(`D://data${start}.csv`, data);
    console.log('Done with batch ', start);
  }
}

createFiles(60);

//module.exports.generator = generator;