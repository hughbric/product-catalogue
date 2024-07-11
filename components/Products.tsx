'use client'

import Product from './Product'
import { ProductInterface } from './types'

interface ProductsProps {
  products: ProductInterface[]
}

const Products: React.FC<ProductsProps> = ({ products }) => {
  return (
    <>
      {products.map((product: ProductInterface) => (
        <Product key={product.id} product={product} />
      ))}
    </>
  )
}

export default Products
