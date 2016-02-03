import React, { Component } from 'react';
// import DatePicker from 'react-datepicker';
// import moment from 'moment';
// import 'react-datepicker/dist/react-datepicker.css';
// import Stock from '../../components/stock';
// import Stock2 from '../../components/stock2';
// import ResultsView from '../../components/resultsView';
import { reduxForm } from 'redux-form';
import { queryCompany } from '../actions/index.js'
import { reset } from 'redux-form';

class StockEnter extends Component {
  constructor(props) {
      super(props);
      this.state = {
          line_items: [
              { title: null, buyPrice: null, shares: null, apiHistoricalResponse: null, apiRealTimeResponse: null}
          ],

          startDate: null,
          startDateFormat: null,
          endDate: null,
          endDateFormat: null,
      }
    }

  onSubmit(props) {
    console.log("onSubmit props:", props)
    this.props.queryCompany(props)
    this.props.dispatch(reset('PostNewStock'));

  }

  render () {
    const { fields: {symbol, startDate, endDate, shares, buyPrice }, handleSubmit } = this.props;

    return (
      <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
        <h3>Enter Symbol, Start Date, End Date, Total Shares and Buy Price</h3>

        <div className={`form-group ${symbol.touched && symbol.invalid ? 'has-danger': ''}`}>
          <label>Symbol</label>
          <input type="text" className="form-control" {...symbol} />
          <div className="text-help">
              {symbol.touched ? symbol.error : ''}
          </div>
        </div>

        <div className={`form-group ${startDate.touched && startDate.invalid ? 'has-danger': ''}`}>
          <label>Date Start</label>
          <input type="date" className="form-control" {...startDate } />
          <div className="text-help">
              {startDate.touched ? startDate.error : ''}
          </div>
        </div>

        <div className={`form-group ${endDate.touched && endDate.invalid ? 'has-danger': ''}`}>
          <label>Date End</label>
          <input type="date" className="form-control" {...endDate } />
          <div className="text-help">
              {endDate.touched ? endDate.error : ''}
          </div>
        </div>

        <div className={`form-group ${shares.touched && shares.invalid ? 'has-danger': ''}`}>
          <label>Shares</label>
          <input type="number" className="form-control" {...shares } />
          <div className="text-help">
              {shares.touched ? shares.error : ''}
          </div>
        </div>

        <div className={`form-group ${buyPrice.touched && buyPrice.invalid ? 'has-danger': ''}`}>
          <label>Buy Price</label>
          <input type="number" className="form-control" {...buyPrice } />
          <div className="text-help">
              {buyPrice.touched ? buyPrice.error : ''}
          </div>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    );
  }
}

function validate(values) {
    const errors = {};

    if (!values.symbol) {
        errors.symbol = 'Enter a Symbol';
    }
    if (!values.startDate) {
        errors.startDate = 'Enter a Start Date';
    }
    if (!values.endDate) {
        errors.endDate = 'Enter endDate';
    }
    if (!values.shares) {
        errors.shares = 'Enter Shares';
    }
    if (!values.buyPrice) {
        errors.buyPrice = 'Enter a Buy Price';
    }

    return errors;
}


export default reduxForm({
    form: 'PostNewStock',
    fields: ['symbol', 'startDate', 'endDate', 'shares', 'buyPrice'],
    validate: validate

}, null, { queryCompany } )(StockEnter);

