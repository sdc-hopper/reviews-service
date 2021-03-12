import React from "react";
import SummaryRatings from './SummaryRatings.jsx';
import SummaryByFeature from './SummaryByFeature.jsx';
import SummaryReview from './SummaryReview.jsx';
// import axios from 'axios';
//import './style.css';

class Summary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: 1000,
      summaryRating: {},
      leftYlabel: ['5 star', '4 star', '3 star', '2 star', '1 star'],
      rightYlabel: [],
      ratingPercent: [],
      summaryByFeature: {}
    };

    this.getProductReviewSummary = this.getProductReviewSummary.bind(this);
    this.getProductSummaryByFeature = this.getProductSummaryByFeature.bind(this);

  }

  componentDidMount() {
    this.getProductReviewSummary(this.props.productId);
    this.getProductSummaryByFeature(this.props.productId);

  }

  //get summary ratings
  //POSTMAN test: http://localhost:4006/Reviews/getReviewSummary/1001
  //http://localhost:4006/Reviews/getReviewSummary/:productId (key productId, value 1005)
  getProductReviewSummary(productId) {
    // return axios.post(`http://localhost:4006/Reviews/getReviewSummary/${productId}`)
    return axios.post(`/Reviews/getReviewSummary/${productId}`)
      .then(result => {

        // need to refactor code below- to update API call to return array
        let rightLabel = [];
        rightLabel.push(result.data.fiveStar);
        rightLabel.push(result.data.fourStar);
        rightLabel.push(result.data.threeStar);
        rightLabel.push(result.data.twoStar);
        rightLabel.push(result.data.oneStar);

        let ratingPct = rightLabel.map(element => parseFloat(element));
        this.setState({
          summaryRating: result.data,
          ratingPercent: ratingPct,
          rightYlabel: rightLabel
        });

      })
      .then(result => {
        //   //this.getRatings(result.data);

      })
      .catch(err => console.log('error review Summary : ', err));

  };


  getProductSummaryByFeature(productId) {
    //console.log('getProductSummaryByFeature called');
    //return axios.get(`http://localhost:4006/Reviews/getReviewsByFeature/${productId}`)
    return axios.get(`/Reviews/getReviewsByFeature/${productId}`)
      .then(result => {
        this.setState({
          summaryByFeature: result.data
        });
      })
      .catch(err => console.log(err))

  };


  render() {

    return (
      <div>
        <SummaryRatings summaryRating={this.state.summaryRating} rightYlabel={this.state.rightYlabel} leftYlabel={this.state.leftYlabel} ratingPercent={this.state.ratingPercent} />
        <SummaryByFeature summaryByFeature={this.state.summaryByFeature} />
        <SummaryReview />
      </div>
    );
  }
}

export default Summary;