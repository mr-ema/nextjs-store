// Interface to defining our object of response functions
export interface ResponseFuncs {
  GET?: Function,
  POST?: Function,
  PUT?: Function,
  DELETE?: Function
}

// product interface
export interface IProduct {
  _id?: string
  imgUrl: string,
  name: string,
  price: number,
  stock?: number,
  description: string
}