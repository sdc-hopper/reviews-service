const Reviews = require("../database-mongoose/reviews.model");
let dbModel = require('./database.js');
const ReviewsModel = Reviews.ReviewsModel;

let insertSeedData = (arrayOfObjects) => {
  //delete model to remove data
  // ReviewsModel.remove({}, function (err) {
  //   console.log('collection removed')
  // });

  return ReviewsModel.insertMany(arrayOfObjects)
    .then((result) => console.log("Data inserted"))
    .catch(err => console.log(err));


};

// /Reviews/getReviews/:productId
let getReviews = (productId) => {
  const query = { productId: productId };
  const limit = 100;// 100 reviews limit
  const sort = { isHelpfulCount: -1 };
  return ReviewsModel.find(query).limit(limit).sort(sort)
    .select({
      reviewId: 1,
      rating: 1,
      productId: 1,
      color: 1,
      configuration: 1,
      category: 1,
      isBestSeller: 1,
      customerId: 1,
      customerName: 1,
      customerCountry: 1,
      title: 1,
      description: 1,
      isHelpfulCount: 1,
      isVerifiedPurchase: 1,
      imageUrls: 1,
      profilePicUrl: 1,
      reviewDate: 1
    })
    .catch(err => console.log(err))

};

// /Reviews/getReviewSummary/:productId

let getReviewSummary = (productId) => {
  let countByReviews = [];
  //get count of customer review grouped by ratings (1,2,3,4,5)
  return ReviewsModel.aggregate([
    {
      $match: { productId: { $eq: productId } }
    },
    {
      $group: {
        _id: '$rating',
        reviewCount: { $sum: 1 }
      }
    }
  ])
    .then(result => {
      countByReviews = result;
      //get average rating and total count of ratings for a product
      return ReviewsModel.aggregate(
        [
          {
            $match: { productId: { $eq: productId } }
          },
          {
            $group:
            {
              _id: '$productId',
              avgRating: { $avg: "$rating" },
              totalRatings: { $sum: 1 }
            }
          }
        ]
      )

    })
    .then(ratingsByCustomer => {
      //console.log('ratingsByCustomer : ', ratingsByCustomer);
      //calculate the customer rating count in % and save data in object to return
      var reviewSummary = {
        averageRating: ratingsByCustomer[0] ? ratingsByCustomer[0].avgRating.toFixed(2) : 0,
        totalRatings: ratingsByCustomer[0] ? ratingsByCustomer[0].totalRatings : 0,
        fiveStar: (countByReviews.find(obj => obj._id === 5) ? ((countByReviews.find(obj => obj._id === 5).reviewCount) / ratingsByCustomer[0].totalRatings * 100).toFixed(2).concat('%') : '0%'),
        fourStar: (countByReviews.find(obj => obj._id === 4) ? ((countByReviews.find(obj => obj._id === 4).reviewCount) / ratingsByCustomer[0].totalRatings * 100).toFixed(2).concat('%') : '0%'),
        threeStar: (countByReviews.find(obj => obj._id === 3) ? ((countByReviews.find(obj => obj._id === 3).reviewCount) / ratingsByCustomer[0].totalRatings * 100).toFixed(2).concat('%') : '0%'),
        twoStar: (countByReviews.find(obj => obj._id === 2) ? ((countByReviews.find(obj => obj._id === 2).reviewCount) / ratingsByCustomer[0].totalRatings * 100).toFixed(2).concat('%') : '0%'),
        oneStar: (countByReviews.find(obj => obj._id === 1) ? ((countByReviews.find(obj => obj._id === 1).reviewCount) / ratingsByCustomer[0].totalRatings * 100).toFixed(2).concat('%') : '0%')
      };

      var promiseSummary = new Promise((resolve, reject) => {
        resolve(reviewSummary)
      });
      return promiseSummary;

    })
    .catch(err => console.log('err :', err))
};

// /Reviews/getReviewsByFeature/:productId
//get average value of the features
let getReviewsByFeature = (productId) => {
  return ReviewsModel.aggregate([
    {
      $match: { productId: { $eq: productId } }
    },
    {
      $group: {
        _id: '$productId',
        easeToUseAvg: { $avg: "$easeToUse" },
        voiceRecognitionAvg: { $avg: "$voiceRecognition" },
        techSupport: { $avg: "$techSupport" },
        valueForMoney: { $avg: "$valueForMoney" },
        qualityOfMaterial: { $avg: "$qualityOfMaterial" },
        batteryLife: { $avg: "$batteryLife" }

      }
    }
  ])
    .then(result => {
      var reviewsByFeature = {
        easeToUse: result[0] ? result[0].easeToUseAvg.toFixed(1) : 0,
        voiceRecognition: result[0] ? result[0].voiceRecognitionAvg.toFixed(1) : 0,
        techSupport: result[0] ? result[0].techSupport.toFixed(1) : 0,
        valueForMoney: result[0] ? result[0].valueForMoney.toFixed(1) : 0,
        qualityOfMaterial: result[0] ? result[0].qualityOfMaterial.toFixed(1) : 0,
        batteryLife: result[0] ? result[0].batteryLife.toFixed(1) : 0

      };

      var reviewfeaturesPromise = new Promise((resolve, reject) => {
        resolve(reviewsByFeature)
      })
      return reviewfeaturesPromise;
    })
    .catch(err => console.log(err))

};

// /Reviews/getReviewExcerpts/:productId
let getReviewExcerpts = (productId) => {
  //sort by most helpful reviews
  //pick first 2 words
  return ReviewsModel.
    find({ productId: productId }).
    limit(12).
    sort({ isHelpfulCount: -1 }).
    select({ description: 1 })
    .then(result => {
      return Promise.all(result.map(element => element.description.split(' ').slice(0, 2).join(' ')));

    })
    .catch(err => console.log(err))

};

let getSearchResults = (productId, searchString) => {

  return ReviewsModel.

    find({ productId: productId, description: { $regex: '.*' + searchString + '.*' } }).
    limit(12).
    sort({ isHelpfulCount: -1 }).
    select({
      reviewId: 1,
      rating: 1,
      productId: 1,
      color: 1,
      configuration: 1,
      category: 1,
      isBestSeller: 1,
      customerId: 1,
      customerName: 1,
      customerCountry: 1,
      title: 1,
      description: 1,
      isHelpfulCount: 1,
      isVerifiedPurchase: 1,
      imageUrls: 1,
      profilePicUrl: 1,
      reviewDate: 1
    })
    .then(results => {
      //console.log(results);
      var resultsPromise = new Promise((resolve, reject) => {
        resolve(results)
      })
      return resultsPromise;

    })
    .catch(err => console.log(err))

}

let incrementHelpfulCount = (reviewId) => {
  return ReviewsModel.updateOne({ reviewId: reviewId }, { $inc: { 'isHelpfulCount': 1 } })
    .then(results => {
      var resultsPromise = new Promise((resolve, reject) => { resolve(results) })
      return resultsPromise;
    })
    .catch(err => console.log(err))

}

// CRUD Operations //

const getReview = (reviewId) => {
  return ReviewsModel.findOne({reviewId})
  .then((result) => {
    return new Promise((resolve, reject) => {
      resolve(result);
    });
  });
}

const createReview = (review) => {
  let newReview = new ReviewsModel(review);
  return newReview.save()
  .then((result) => {
    return new Promise((resolve, reject) => {
      resolve(result);
    });
  })
  .catch((error) => {
    return new Promise((resolve, reject) => {
      reject(error);
    });
  });
}

const updateReview = (review) => {
  return ReviewsModel.updateOne({reviewId: review.reviewId}, review)
  .then((result) => {
    return new Promise((resolve, reject) => {
      resolve(result);
    });
  });
}

const deleteReview = (review) => {
  return ReviewsModel.deleteOne({reviewId: review.reviewId})
  .then((result) => {
    return new Promise((resolve, reject) => {
      resolve(result);
    });
  });
}

module.exports.insertSeedData = insertSeedData;
module.exports.getReviews = getReviews;
module.exports.getReviewSummary = getReviewSummary;
module.exports.getReviewExcerpts = getReviewExcerpts;
module.exports.getReviewsByFeature = getReviewsByFeature;
module.exports.getSearchResults = getSearchResults;
module.exports.incrementHelpfulCount = incrementHelpfulCount;
module.exports.createReview = createReview;
module.exports.updateReview = updateReview;
module.exports.deleteReview = deleteReview;
module.exports.getReview = getReview;