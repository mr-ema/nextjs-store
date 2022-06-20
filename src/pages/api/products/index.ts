import { NextApiRequest, NextApiResponse } from 'next'
import { connectDB } from '../../../middleware/mongodb'
import { ResponseFuncs } from '../../../types/types'
import { Product } from '../../../models/product'
import { validate } from '../../../middleware/validate'
import { productSquema } from '../../../models/yup/product'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // capture request method, we type it as a key of ResponseFunc to reduce typing later
  const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs

  // Potential Responses
  const handleCase: ResponseFuncs = {
    // RESPONSE FOR GET REQUESTS
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      try {
        await connectDB() // conect to database
        const data = await Product.find({}).exec()
        return res.status(200).json(data)
      
      }catch(err) {
        return res.status(400).json({ message: 'Something go wrong' })
      }
    },
    // RESPONSE FOR POST REQUESTS
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      try {
        await connectDB() // connect to database
        const products = await Product.find({})

        if(products && products.length < 30) {
            await Product.create(req.body)
            return res.status(200).json({ mesagge: 'success' })

          }else res.status(200).json({ message: 'DENIED' })

      }catch(err) {
        return res.status(400).json({ status: 'bad request' })
      }
    }
  }

  // Check if there is a response for the particular method, if so invoke it, if not response with an error
  const response = handleCase[method]
  if (response) response(req, res)
  else res.status(400).json({ error: "No Response for This Request" })
}

export default validate(productSquema, handler)