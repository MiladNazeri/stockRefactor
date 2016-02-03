import React, {Component} from 'react';

class ResultsView extends React.Component {
    render(){
        var { formula_items,apiHistoricalResponse, valueChecker, shares, buyPrice, name, bidRealtime, EarningsShare, FiftydayMovingAverage, line_items,PercentChangeFromFiftydayMovingAverage } = this.props;
        var cellStyle = null;
        var perShare = null;
        return(
            <div>

                <table className="table table-bordered" style={{width:"70%", marginTop:"5%"}}>
                    <thead>
                        <tr>
                            <th width="20%">Name:</th>
                            <th width="20%">Real Time Bid:</th>
                            <th width="20%">Earnings Share:</th>
                            <th width="20%">Fifty day Moving Average:</th>
                            <th width="20%">Percent Change From Fifty day Moving Average:</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <p>{name}</p>
                            </td>
                            <td>
                                <p>{bidRealtime}</p>
                            </td>
                            <td>
                                <p>{EarningsShare}</p>
                            </td>
                            <td>
                                <p>{FiftydayMovingAverage}</p>
                            </td>
                            <td>
                                <p>{PercentChangeFromFiftydayMovingAverage}</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Day: </th>
                            <th>Date: </th>
                            <th>Open:</th>
                            <th>Close:</th>
                            <th>High:</th>
                            <th>Low:</th>
                            <th>Volume:</th>
                            {formula_items &&
                                formula_items.map( (item, index) => {
                                return (<th key={index}>{item.percentage+"%"}</th>)

                                }
                                )}
                        </tr>
                    </thead>
                    <tbody>
                        {apiHistoricalResponse.map( (date, index) => {
                            return(
                                <tr key={index}>
                                    <td><p>{index+1}</p></td>
                                    <td><p>{date.Date}</p></td>
                                    <td><p>{date.Open}</p></td>
                                    <td><p>{date.Close}</p></td>
                                    <td><p>{date.High}</p></td>
                                    <td><p>{date.Low}</p></td>
                                    <td><p>{date.Volume}</p></td>
                                    {formula_items  &&
                                        formula_items.map( (item, index) => {
                                        {cellStyle = valueChecker(buyPrice, date.Low, date.High, item.percentage).split("-")[0].toString()}
                                        {perShare = valueChecker(buyPrice, date.Low, date.High, item.percentage).split("-")[1]
                                         var dollarIndex = perShare.indexOf("$")
                                         perShare = perShare.slice(dollarIndex+1)
                                        }
                                         return (
                                                           <td key={index} className={cellStyle}>
                                                            <p>{valueChecker(buyPrice, date.Low, date.High, item.percentage)}</p>
                                                            <p>{ "Total:$"+(parseFloat(perShare) * parseFloat(shares)).toFixed(2) }</p>
                                                           </td>
                                                           )
                                        })
                                    }
                                </tr>
                                )
                            }

                        )
                        }

                    </tbody>
                </table>
            </div>
        )
    }
}