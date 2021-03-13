import "regenerator-runtime/runtime";
// var mongoose = require("mongoose");
// var mongoDB = 'mongodb://localhost/CustomerReviews_Test';
// mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const Reviews = require("../database-mongoose/reviews.model");
const Service = require("../database-mongoose/reviews.service");
const SeedData = require("../database-mongoose/seeder");

const ReviewsModel = Reviews.ReviewsModel;

xdescribe("Reviews module test", () => {
  beforeAll(async () => {
    await ReviewsModel.remove({});
  });

  afterEach(async () => {
    await ReviewsModel.remove({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("has Review service module", () => {
    expect(Service).toBeDefined();

  });

  describe("Test insertSeedData", () => {
    xit("Inserts data", async () => {
      const mockReview = [{
        reviewId: 1005,
        productId: 1005,
        color: 'black',
        configuration: 'Alexa auto sense temp 1005',
        isBestSeller: true,
        category: 'element.category',
        customerId: 1,
        customerName: 'element.customerName',
        cutomerCountry: 'USA',
        profilePicUrl: 'https://fec-customers-bucket.s3-us-west-1.amazonaws.com/profile1.jpg',
        title: 'element.title',
        description: 'element.description',
        rating: 4,
        isVerifiedPurchase: true,
        isHelpfulCount: 444,
        imageUrls: ['https://fec-reviews-bucket.s3-us-west-1.amazonaws.com/image49.jpg'],
        reviewDate: '2020-08-07T07:03:26.682Z',
        easeToUse: 4,
        voiceRecognition: 4,
        techSupport: 5,
        valueForMoney: 5,
        qualityOfMaterial: 5,
        batteryLife: 4
      }];

      await Service.insertSeedData(mockReview);
      const insertedReview = await ReviewsModel.findOne({ reviewId: 1005 });
      const actual = insertedReview.configuration;
      //console.log('actual: ', actual);
      const expected = 'Alexa auto sense temp 1005';
      expect(actual).toEqual(expected);

      // Service.insertSeedData(mockReview)
      //   .then((result) => {
      //     return new Promise((resolve, reject) => {
      //       ReviewsModel.findOne({ reviewId: 1002 }, (err, res) => {
      //         if (err) {
      //           reject(err);
      //           return;
      //         }
      //         console.log('res: ', res);
      //         resolve(res);
      //       });

      //     })
      //   })
      //   .then(insertedReview => {
      //     console.log('insertedReview: ', insertedReview);
      //     const actual = insertedReview.configuration;
      //     console.log('actual: ', actual);
      //     const expected = 'Alexa auto sense temp 1004';
      //     expect(actual).toEqual(expected);
      //   })
      //   .catch(err => console.log(err));

    });
  });


});
