import React from "react";
import ReviewsCustomerImages from './ReviewsCustomerImages.jsx';
import ReviewsPhrases from './ReviewsPhrases.jsx';
import ReviewsFromUs from './ReviewsFromUS.jsx';
import ErrorBoundary from './ErrorBoundary.jsx';
import ReviewsPopup from './ReviewsPopUp.jsx';
// import axios from 'axios';
//import "./style.css";

class Reviews extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      productId: 1005,
      reviews: [],
      phrases: [],
      customerImages: [],
      filteredReviews: []
    };
    this.getCustomerReviews = this.getCustomerReviews.bind(this);
    this.getReviewExcerpt = this.getReviewExcerpt.bind(this);
    this.searchCustomerReviews = this.searchCustomerReviews.bind(this);
    this.incrementHelpfulCount = this.incrementHelpfulCount.bind(this);

  }

  componentDidMount() {
    this.getCustomerReviews(this.props.productId);
    this.getReviewExcerpt(this.props.productId);

  }

  incrementHelpfulCount(event, reviewId) {
    //update db and get latest
    //console.log('addHelpfulCount before reviewId:', reviewId)
    //axios.post(`http://localhost:4006/Reviews/incrementHelpfulCount/${reviewId}`)
    axios.post(`/Reviews/incrementHelpfulCount/${reviewId}`)
      .then(results => {
        //console.log(results);
        this.getCustomerReviews(this.props.productId);
      })
      .catch(err => console.log('addHelpfulCount err :', err))

  }

  getCustomerReviews(productId) {
    //console.log('getCustomerReviews:', productId);
    //return axios.get(`http://localhost:4006/Reviews/getReviews/${productId}`)
    return axios.get(`/Reviews/getReviews/${productId}`)
      .then(results => {
        //console.log('Review query results: ', results);
        this.setState({
          reviews: results.data,
          filteredReviews: results.data
        });
        //update filtered review for readMore tracking at review level
        //insert readMoreSelected : true
        var filteredreviews = this.state.filteredReviews;
        for (var i = 0; i < filteredreviews.length; i++) {
          filteredreviews[i]['readMoreSelected'] = true;
        }
        //console.log('filteredreviews: ', filteredreviews);

      })
      .catch(err => console.log('getCustomerReviews Error: ', err))

  }

  searchCustomerReviews(event, searchString) {
    event.preventDefault();
    console.log('The button was clicked.');
    const params = {
      productId: this.props.productId,
      searchText: searchString
    };
    //return axios.get('http://localhost:4006/Reviews/searchReviews', { params })
    return axios.get('/Reviews/getReviews', { params })
      .then(results => {
        console.log('searchCustomerReviews results: ', results);
        this.setState({
          filteredReviews: results.data
        });
      })
      .catch(err => console.log('searchCustomerReviews Error:', err))

  }

  getReviewExcerpt(productId) {
    //return axios.get(`http://localhost:4006/Reviews/getReviewExcerpts/${productId}`)
    return axios.get(`/Reviews/getReviewExcerpts/${productId}`)
      .then(wordsArray => {
        //console.log('Review phrases results: ', wordsArray);
        this.setState({
          phrases: wordsArray.data

        });
      })
      .catch(err => console.log('getReviewExcerpt Error: ', err))

  }

  render() {

    return (
      <div>
        {/* <ErrorBoundary> */}
        <ReviewsCustomerImages reviews={this.state.reviews} />
        {/* </ErrorBoundary> */}

        <ReviewsPhrases phrases={this.state.phrases} searchCustomerReviews={this.searchCustomerReviews} />
        <ReviewsFromUs reviews={this.state.filteredReviews} incrementHelpfulCount={this.incrementHelpfulCount} />

      </div>
    );
  }
}

export default Reviews;