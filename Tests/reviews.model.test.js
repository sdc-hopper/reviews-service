import "regenerator-runtime/runtime";// ReferenceError: regeneratorRuntime is not defined
var mongoose = require("mongoose");
var mongoDB = 'mongodb://localhost/CustomerReviews_Test';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const Reviews = require("../database-mongoose/reviews.model");

const ReviewsModel = Reviews.ReviewsModel;
xdescribe("Reviews model test", () => {
  beforeAll(async () => {
    await ReviewsModel.remove({}); //remove all the documents from the collection before everything
  });

  afterEach(async () => {
    await ReviewsModel.remove({}); //remove all the document from the collection after each test
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("Has a model", () => {
    expect(ReviewsModel).toBeDefined();
  });

  xdescribe("Saves a review", () => {
    it("saves review", async () => {
      const mockReview = new ReviewsModel(
        {
          reviewId: 249249,
          productId: 100200,
          color: 'blue',
          configuration: 'element.configuration',
          isBestSeller: true,
          category: 'element.category',
          customerId: 1,
          customerName: 'element.customerName',
          cutomerCountry: 'USA',
          profilePicUrl: 'https://fec-customers-bucket.s3-us-west-1.amazonaws.com/profile1.jpg',
          title: 'echo speaker',
          description: 'element.description',
          rating: 4,
          isVerifiedPurchase: true,
          isHelpfulCount: 444,
          imageUrlId: ['https://fec-reviews-bucket.s3-us-west-1.amazonaws.com/image49.jpg'],
          reviewDate: '2020-08-07T07:03:26.682Z',
          easeToUse: 4,
          voiceRecognition: 4,
          techSupport: 5,
          valueForMoney: 5,
          qualityOfMaterial: 5,
          batteryLife: 4
        });

      await mockReview.save();
      const insertedReview = await ReviewsModel.findOne({ reviewId: 249249 });
      const actual = insertedReview.title;
      //console.log('actual: ', actual);
      const expected = 'echo speaker';
      expect(actual).toEqual(expected);

    });
  });

  xdescribe("updates review", () => {
    it("updates a review", async () => {
      const mockReview = new ReviewsModel(
        {
          reviewId: 249249,
          productId: 100200,
          color: 'blue',
          configuration: 'element.configuration',
          isBestSeller: true,
          category: 'element.category',
          customerId: 1,
          customerName: 'element.customerName',
          cutomerCountry: 'USA',
          profilePicUrl: 'https://fec-customers-bucket.s3-us-west-1.amazonaws.com/profile1.jpg',
          title: 'echo speaker',
          description: 'element.description',
          rating: 4,
          isVerifiedPurchase: true,
          isHelpfulCount: 444,
          imageUrlId: ['https://fec-reviews-bucket.s3-us-west-1.amazonaws.com/image49.jpg'],
          reviewDate: '2020-08-07T07:03:26.682Z',
          easeToUse: 4,
          voiceRecognition: 4,
          techSupport: 5,
          valueForMoney: 5,
          qualityOfMaterial: 5,
          batteryLife: 4
        });

      await mockReview.save();
      mockReview.configuration = 'echo voice configuration';
      const updatedReview = await mockReview.save();

      const expected = 'echo voice configuration';
      const actual = updatedReview.configuration;
      expect(actual).toEqual(expected);

    });

  });
});
