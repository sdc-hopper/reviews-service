var faker = require('faker');
//let dbModel = require('./database.js');
//const ReviewService = require("../database-mongoose/reviews.service");

let generateSeedData = (customerCount, productCount) => {

  //customerCount = 11; //number of customers reviewing
  var count = 0;
  var allTestData = [];
  for (var j = 1; j < customerCount + 1; j++) {
    var profilePicUrl = 'https://fec-customers-bucket.s3-us-west-1.amazonaws.com/profile' + (j) + '.jpg';

    var custId = j;
    var custName = faker.name.findName();
    var custCountry = faker.address.country();
    var custProfile = profilePicUrl;

    //Generate random rating between max = 5, min = 1
    let randomRating = Math.floor(Math.random() * (5 - 1 + 1) + 1);
    //path to Amazon S3
    let imageUrl = 'https://fec-reviews-bucket.s3-us-west-1.amazonaws.com/image';


    for (var i = 0; i < productCount; i++) { //100 products
      //image generation
      let randomImageCount = Math.floor(Math.random() * Math.floor(10));
      let randomProdImages = [...Array(randomImageCount)].map(() => {
        var min1 = 1;
        var max1 = 50;
        var randomImageNum = Math.floor(Math.random() * (max1 - min1 + 1) + min1);
        return imageUrl + randomImageNum + '.jpg';
      });

      count++; //track review ID
      var min = 1;
      var max = 10;
      let randomIteration = Math.floor(Math.random() * (max - min + 1) + min);
      // product properties
      var prodId = i;
      var prodColor = faker.commerce.color();
      var prodConfig = faker.lorem.words();
      var prodCategory = 'Amazon Devices';

      let testData =
      {
        reviewId: count,
        productId: prodId,
        color: prodColor,
        configuration: prodConfig,
        //isBestSeller: true,
        category: prodCategory,
        customerId: custId,
        customerName: custName,
        customerCountry: custCountry,
        profilePicUrl: custProfile,
        title: faker.lorem.words(),
        description: faker.lorem.paragraph(),
        rating: randomRating,
        isVerifiedPurchase: faker.random.boolean(),
        isHelpfulCount: faker.random.number(),
        imageUrls: randomProdImages,
        reviewDate: faker.date.past(),
        easeToUse: Math.floor(Math.random() * (5 - 1 + 1) + 1),
        voiceRecognition: Math.floor(Math.random() * (5 - 1 + 1) + 1),
        techSupport: Math.floor(Math.random() * (5 - 1 + 1) + 1),
        valueForMoney: Math.floor(Math.random() * (5 - 1 + 1) + 1),
        qualityOfMaterial: Math.floor(Math.random() * (5 - 1 + 1) + 1),
        batteryLife: Math.floor(Math.random() * (5 - 1 + 1) + 1)
      };

      allTestData.push(testData);

    }
  }
  return allTestData;

}
//run below code to seed the Database with test data
// var testData = generateSeedData(11, 100);//11 customers, 100 products
// ReviewService.insertSeedData(testData);

var result = generateSeedData(100, 10);
console.log(result);

module.exports.generateSeedData = generateSeedData;


