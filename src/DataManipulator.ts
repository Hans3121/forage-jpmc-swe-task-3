import { ServerRespond } from './DataStreamer';

export interface Row {
  price_abc: number,
  price_def: number,
  ratio: number,
  timestamp: Date,
  upper_bound: number,
  lower_bound: number,
  trigger_alert: number | undefined,
}


export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]): Row {
    let abc = (serverResponds[0].top_ask.price + serverResponds[0].top_bid.price) / 2
    let def = (serverResponds[1].top_ask.price + serverResponds[1].top_bid.price) / 2
    let ratio = abc / def
    let upperBound = 1 + 0.05;
    let lowerBound = 1 - 0.05;
    return {
      price_abc: abc,
      price_def: def,
      ratio,
      upper_bound: upperBound,
      lower_bound: lowerBound,
      timestamp: serverResponds[0].timestamp > serverResponds[1].timestamp ? serverResponds[0].timestamp : serverResponds[1].timestamp,
      trigger_alert: (ratio > upperBound || ratio < lowerBound) ? ratio : undefined
    }
  }
}
