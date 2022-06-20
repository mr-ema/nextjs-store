import mongoose from 'mongoose'
import { NextApiRequest, NextApiResponse } from 'next'
import { connectDB } from '../../../middleware/mongodb'
import { Product } from '../../../models/product'
import { ResponseFuncs } from '../../../types/types'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  //capture request method, we type it as a key of ResponseFunc to reduce typing later
  const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs

  //function for catch errors
  const catcher = (error: Error) => res.status(400).json({ error })

  // DEFINE ID VAR FOR POSTERIOR USE ON CLIENTS REQUESTS
  let id: string

  // CHECK IF REQ.QUERY.ID IS A VALID OBJECT_ID
  if (mongoose.Types.ObjectId.isValid(req.query.id as string)) {
    id = req.query.id as string // if vaild pass request query as _id
  }else {
    // if request is not a valid objectId use a fake _id with 12 numbers
    // if not fake id is provided the server will stop
    // with a castError
    id = '111111111111' // fake mongo _id which bypass castError 
  }

  // Potential Responses for /Products/:id
  const handleCase: ResponseFuncs = {
    // RESPONSE FOR GET REQUESTS
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      await connectDB() // connec to database
      const product = await Product.findById(id).exec()
      return res.json(product)
    },
    // RESPONSE PUT REQUESTS
  /*   PUT: async (req: NextApiRequest, res: NextApiResponse) => {
      await connectDB() // connec to database
      res.json(
        await Product.findByIdAndUpdate(id, req.body, { new: true }).catch(catcher)
      )
    }, */
    // RESPONSE FOR DELETE REQUESTS
    DELETE: async (req: NextApiRequest, res: NextApiResponse) => {
      try {
        await connectDB() // connect to database
        const products = await Product.find({})

        if(products && products.length > 4) {
          await Product.findByIdAndRemove(id)
        }else return res.status(200).json({ status: 'DENIED' })
      
      }catch(err) {
        return res.status(400).json({ status: 'Something go wrong' })
      }
    },
  }

  // Check if there is a response for the particular method, if so invoke it, if not response with an error
  const response = handleCase[method]
  if (response) response(req, res)
  else res.status(400).json({ error: 'No Response for This Request' })
}

export default handler
