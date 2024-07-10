'use client'

import { useState } from 'react'
import Products from './Products'

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

interface Products {
  products: Product[]
}

interface SearchComponentProps {
  initialProducts: Product[]
}

const fetchProducts = async (query: string = '') => {
  const res = await fetch(`/api/v1/aeroedit/products${query ? `?productId=${query}` : ''}`)
  const data = await res.json()
  return data.data
}

const SearchComponent: React.FC<SearchComponentProps> = ({ initialProducts }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchError, setIsSearchError] = useState(false)

  const handleSearch = async () => {
    const fetchedProducts = await fetchProducts(searchQuery)
    setProducts(fetchedProducts)
  }

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSearchError(false)
    setSearchQuery(e.target.value)
  }

  return (
    <>
      <div className="mb-8 flex">
        <input
          type="text"
          placeholder="Search by Product ID"
          value={searchQuery}
          onChange={handleSearchInputChange}
          className="text-gray-600 flex-grow p-2 border border-gray-300 rounded-lg"
        />
        <button
          onClick={handleSearch}
          className="ml-4 p-2 bg-blue-500 text-white rounded-lg"
        >
          Search
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.length === 0 ? (
          <p className="text-gray-600">No products found.</p>
        ) : (
          <Products products={products}/>
        )}
      </div>
    </>
  )
}

export default SearchComponent
