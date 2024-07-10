'use client'

import Product from './Product'

interface Price {
  id: string
  description: string
  unitPrice: {
    amount: string
    currencyCode: string
  }
}

interface Product {
  id: string
  name: string
  description: string
  imageUrl: string
  prices: Price[]
}

interface ProductsProps {
  products: Product[]
}

const Products: React.FC<ProductsProps> = ({ products }) => {
  return (
    <>
      {products.map((product: Product) => (
        <Product key={product.id} product={product} />
      ))}
    </>
  )
}

export default Products
