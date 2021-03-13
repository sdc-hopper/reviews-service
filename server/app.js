const express = require('express');
// var expressStaticGzip = require('express-static-gzip');
let app = express();
const bodyParser = require('body-parser');
const db = require('../database-mongoose/reviews.service');
var cors = require('cors');

app.get('*.js', (req, res, next) => {
  if (req.header('Accept-Encoding').includes('br')) {
    req.url = req.url + '.br';
    res.set('Content-Encoding', 'br');
    res.set('Content-Type', 'application/javascript; charset=UTF-8');

  }
  next();
});

app.use(cors());
app.use(express.static(__dirname + '/../public'));
app.use(express.static(__dirname + '/../public/dist'));
app.use('/:id', express.static(__dirname + '/../public/dist'));
app.use('/:id', express.static(__dirname + '/../public'));

// app.use('/', expressStaticGzip(path.join(__dirname), {
//   enableBrotli: true
//  }));

//app.use(express.static('client/dist'));
app.use(express.static(__dirname + '/../client'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.get('/Reviews/getReviews/:productId', (req, res) => {

  let prodId = req.params; //{id: "5"}
  //console.log('getReviews :', prodId);
  db.getReviews(parseInt(prodId.productId))
    .then(results => {
      if (results.length > 0) {
        //console.log('results :', results);
        res.status(200).send(results);
      } else {
        var reviews = [];
        res.status(404).send(reviews);

      }

    })
    .catch(err => console.log('err: ', err));
});

app.get('/Reviews/getReviewSummary/:productId', (req, res) => {
  let prodId = req.params; //{id: "5"}
  // console.log('review summary get called :', prodId);
  // console.log('body: ', req.body);
  // console.log('params:', req.params);
  db.getReviewSummary(parseInt(prodId.productId))
    .then(results => {
      //console.log(results);
      if (results) {
        res.status(200).send(results);
      } else {
        var reviewSummary = [];
        res.status(404).send(reviewSummary);

      }
    })
    .catch(err => console.log('err: ', err));
});

// to test using postman: http://localhost:4006/Reviews/getReviewSummary/1001
app.post('/Reviews/getReviewSummary/:productId', (req, res) => {
  let prodId = req.params; //{id: "5"}
  // console.log('review summary post called :', prodId);
  // console.log('body: ', req.body);
  // console.log('params:', req.params);
  db.getReviewSummary(parseInt(prodId.productId))
    .then(results => {
      //console.log(results);
      if (results) {
        res.status(200).send(results);
      } else {
        var reviewSummary = [];
        res.status(404).send(results);

      }
    })
    .catch(err => console.log('err: ', err));
});

app.get('/Reviews/getReviewsByFeature/:productId', (req, res) => {
  let prodId = req.params; //{id: "5"}
  //console.log('review feature :', prodId);
  db.getReviewsByFeature(parseInt(prodId.productId))
    .then(results => {
      if (results) {
        res.status(200).send(results);
      } else {
        var reviewsByFeature = [];
        res.status(404).send(reviewsByFeature);

      }
    })
    .catch(err => console.log('err: ', err));
});

app.get('/Reviews/getReviewExcerpts/:productId', (req, res) => {
  let prodId = req.params; //{id: "5"}
  db.getReviewExcerpts(parseInt(prodId.productId))
    .then(results => {
      if (results) {
        res.status(200).send(results);
      } else {
        var excerpts = [];
        res.status(404).send(excerpts);

      }
    })
    .catch(err => console.log('err: ', err));
});

app.post('/Reviews/getReviewExcerpts/:productId', (req, res) => {
  // console.log('review excepts post called')
  // console.log('body: ', req.body);
  // console.log('params:', req.params);
  let prodId = req.params; //{id: "5"}
  db.getReviewExcerpts(parseInt(prodId.productId))
    .then(results => {
      if (results) {
        res.status(200).send(results);
      } else {
        var excerpts = [];
        res.status(404).send(excerpts);

      }
    })
    .catch(err => console.log('err: ', err));
});

//filter reviews based on phrase provided
app.get('/Reviews/searchReviews', (req, res) => {

  let productId = req.query.productId;
  let searchString = req.query.searchText;
  db.getSearchResults(productId, searchString)
    .then(results => {
      if (results) {
        res.status(200).send(results);
      } else {
        res.status(404).send([]);
      }
    })
    .catch(err => console.log('err :', err));

});

//incrementHelpfulCount
app.post('/Reviews/incrementHelpfulCount/:reviewId', (req, res) => {
  //console.log('req params: ', req.params.reviewId);
  db.incrementHelpfulCount(parseInt(req.params.reviewId))
    .then(results => {
      if (results) {
        res.status(200).send(results);
      } else {
        res.status(404).send('Issue found in incrementHelpfulCount');
      }
    })

})

// CRUD //

app.get(`/Reviews/:reviewId`, async (req, res) => {
  let review = await db.getReview(req.params.reviewId);
  if (review !== null) {
    res.status(200).send(review);
  }
  res.status(404).send();
});

app.post(`/Reviews`, async (req, res) => {
  let reviewId = await db.createReview(req.body);
  res.status(201).send(reviewId);
});

app.put(`/Reviews`, async (req, res) => {
  let result = await db.updateReview(req.body);
  res.status(201).send(result);
});

app.delete(`/Reviews`, async (req, res) => {
  let result = await db.deleteReview(req.body);
  res.status(201).send(result);
});

module.exports = app;