'use client'

import { useState } from 'react'
import Image from 'next/image'

interface Price {
  id: string
  description: string
  unitPrice: {
    amount: string
    currencyCode: string
  }
}

interface ProductProps {
  product: {
    id: string
    name: string
    description: string
    imageUrl: string
    prices: Price[]
  }
}

const Product: React.FC<ProductProps> = ({ product }) => {
  const [showPrices, setShowPrices] = useState(false)

  const handleTogglePrices = () => {
    setShowPrices(!showPrices)
  }

  return (
    <div key={product.id} className={`bg-white p-6 rounded-lg shadow-md flex flex-col justify-between`}>
      <div onClick={handleTogglePrices} className="cursor-pointer">
        <Image
          src={product.imageUrl}
          alt={product.name}
          className="h-40 w-full object-cover mb-4 rounded"
          width={500}
          height={300}
        />
        <h2 className="text-xl text-gray-800 font-semibold mb-2">{product.name}</h2>
        <p className="text-gray-600">{product.description}</p>
      </div>
      {showPrices && (
        <ul className="mt-4 flex-grow flex flex-col justify-items-start">
          {product.prices.map((price) => (
            <li key={price.id} className="text-gray-600 border-t pt-2 mt-2">
              {price.description}: {price.unitPrice.amount} {price.unitPrice.currencyCode}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Product
