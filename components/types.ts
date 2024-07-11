interface Price {
  id: string
  description: string
  unitPrice: {
    amount: string
    currencyCode: string
  }
}

export interface ProductInterface {
  id: string
  name: string
  description: string
  imageUrl: string
  prices: Price[]
}

export interface Products {
  products: ProductInterface[]
}
