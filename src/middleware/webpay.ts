import { WebpayPlus } from 'transbank-sdk'
import { Options, IntegrationApiKeys, Environment, IntegrationCommerceCodes } from 'transbank-sdk'
import { Order } from '../models/order'
import { connectDB } from './mongodb'

const tx = new WebpayPlus.Transaction(
  new Options(
    IntegrationCommerceCodes.WEBPAY_PLUS, 
    IntegrationApiKeys.WEBPAY,
    Environment.Integration
  ))

export const Pay = async ( Amount: number, BuyOrder: string, Url: string ) => {
  if( Amount && BuyOrder ) {
    const amount: number = Amount
    const buyOrder: string = BuyOrder
    const returnUrl: string = `${Url}/pay/status`
    const sessionId: string = (Math.random() * 100000).toString() // must be unique on production

    const createResponse = await tx.create(buyOrder, sessionId, amount, returnUrl)
    
    const url: string = createResponse.url
    const token: string = createResponse.token

    return { url, token }
  
  }else return { 'status': 'error' }
}

export const PayConfirmation = async ( Token: string ) => {
  try {
      const response = await tx.commit(Token)

      const status: string = response.status
      const amount: number = response.amount
      const buyOrder: string = response.buy_order
      const date: string = response.transaction_date
      const authorizationCode: string = response.authorization_code
      const responseCode: number = response.response_code

      if ( status === 'AUTHORIZED' && buyOrder && responseCode === 0 ) {
        await connectDB()
        await Order.findByIdAndUpdate({ _id: buyOrder }, { status: 'Pagado' }).exec()
      }

      return { status, amount, buyOrder, date, authorizationCode }

  }catch(err) {
    return { 'status': 'error' }
  }
}