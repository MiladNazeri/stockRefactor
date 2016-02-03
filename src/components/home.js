import React, { Component } from 'react';
// import DatePicker from 'react-datepicker';
// import moment from 'moment';
// import 'react-datepicker/dist/react-datepicker.css';
// import Stock from '../../components/stock';
// import Stock2 from '../../components/stock2';
import ResultsView from './resultsView';
import StockEnter from './stockEnter.js'
import { connect } from 'react-redux';

class Home extends Component {
  componentWillMount() {
    console.log("Component Will mount")
  }
  componentDidMount() {
    console.log("Component Did mount")
  }

  constructor(props) {
      super(props);
      this.state = {
        formula_items: [
            { percentage: 6, days: 2, },
            { percentage: 4, days: 4, },
            { percentage: 2, days: 6, },
            { percentage: -10, days: 10 }
        ],
      }

  }

  valueChecker(buyPrice, lowPrice, highPrice, percentage){
      let multiplyPercentage = (100 + percentage) * .01;
      let buyPriceAfterPercentage = buyPrice * multiplyPercentage;
      if (multiplyPercentage > 1) {
          if (lowPrice < buyPriceAfterPercentage && buyPriceAfterPercentage > highPrice ){
              return ["Held", "Share price:$"+buyPriceAfterPercentage.toFixed(2), "Difference:$"+(buyPriceAfterPercentage-buyPrice).toFixed(2)].join("-")
          }
          if (lowPrice < buyPriceAfterPercentage && buyPriceAfterPercentage <= highPrice ){
              return ["Sold", "Share price:$"+buyPriceAfterPercentage.toFixed(2), "Difference:$"+(buyPriceAfterPercentage-buyPrice).toFixed(2)].join("-")
          }
          if (lowPrice >= buyPriceAfterPercentage){
              return ["Sold", "Share price:$"+buyPriceAfterPercentage.toFixed(2), "Difference:$"+(buyPriceAfterPercentage-buyPrice).toFixed(2)].join("-")
          }
      }
      if (multiplyPercentage < 1) {
          if (lowPrice < buyPriceAfterPercentage){
              return ["Sold", "Share price:$"+buyPriceAfterPercentage.toFixed(2), "Difference:$"+(buyPriceAfterPercentage-buyPrice).toFixed(2)].join("-")
          }
          if (lowPrice > buyPriceAfterPercentage){
              return ["Held", "Share price:$"+buyPriceAfterPercentage.toFixed(2), "Difference:$"+(buyPriceAfterPercentage-buyPrice).toFixed(2)].join("-")
          }
      }
  }


  render () {
    console.log("companies props:", this.props.companies)
    return (
      <div>
        <StockEnter />
        {this.props.companies ?
        this.props.companies.map( (company)=>{
          <ResultsView
          key={company.realtimeQ.data.query.results.quote.name}
          formula_items={this.state.formula_items}
          apiHistoricalResponse={company.historicalq.data.query.results.quote}
          valueChecker={this.valueChecker.bind(this)}
          shares={company.shares}
          buyPrice={company.buyPrice}
          name={company.realtimeQ.data.query.results.quote.name}
          bidRealtime={company.realtimeQ.data.query.results.quote.BidRealtime}
          EarningsShare={company.realtimeQ.data.query.results.quote.EarningsShare}
          FiftydayMovingAverage={company.realtimeQ.data.query.results.quote.PercentChangeFromFiftydayMovingAverage}
          PercentChangeFromFiftydayMovingAverage={company.realtimeQ.data.query.results.quote.FiftydayMovingAverage} />
        }) : ''
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
    return { companies: state.queryCompanies};
}

export default connect(mapStateToProps)(Home);


