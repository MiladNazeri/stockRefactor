import axios from 'axios';

const yqlURL="http://query.yahooapis.com/v1/public/yql?q=";
const dataFormat="&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";

export const QUERY_COMPANY = 'QUERY_COMPANY';

export function queryCompany(object) {
    const { symbol, startDate, endDate, buyPrice, shares, formulaItems } = object
    const realtimeQ = axios.get(`${yqlURL}select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22${symbol}%22)%0A%09%09&${dataFormat}`)
    const historicalQ = axios.get(`${yqlURL}select%20*%20from%20yahoo.finance.historicaldata%20where%20symbol%20%3D%20%22${symbol}%22%20and%20startDate%20%3D%20%22${startDate}%22%20and%20endDate%20%3D%20%22${endDate}%22${dataFormat}`)

    return {
        type: QUERY_COMPANY,
        payload: {
            realtimeQ,
            historicalQ,
            buyPrice,
            shares,
            symbol
        }
    }

}

// export function myAsyncActionCreator(data) {
//   return {
//     type: 'ACTION',
//     payload: {
//       promise: doSomethingAsyncAndReturnPromise(data),
//       data: data
//     }
//   };
// }



export function addItem(fields) {
  return {
    type: 'ADD_ITEM',
    fields,
  };
}

export function delItem(index) {
  return {
    type: 'DELETE_ITEM',
    index,
  };
}
