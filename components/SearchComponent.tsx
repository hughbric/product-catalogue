'use client'

import { useState } from 'react'
import Products from './Products'
import Error from './Error'
import { ProductInterface } from './types'

interface SearchComponentProps {
  initialProducts: ProductInterface[]
}

const fetchProducts = async ({ searchQuery = '', setIsSearchError }: { searchQuery: string, setIsSearchError: (arg: boolean) => void }) => {
  const res = await fetch(`/api/v1/aeroedit/products${searchQuery ? `?productId=${searchQuery}` : ''}`)

  if (!res.ok) {
    setIsSearchError(true)
  } else {
    setIsSearchError(false)
  }

  return res.json()
}

const SearchComponent: React.FC<SearchComponentProps> = ({ initialProducts }) => {
  const [products, setProducts] = useState<ProductInterface[]>(initialProducts)
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchError, setIsSearchError] = useState(false)

  const handleSearch = async () => {
    const fetchedProducts = await fetchProducts({ searchQuery, setIsSearchError })
    setProducts(fetchedProducts.data)
  }

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      {isSearchError ? (
        <Error reset={handleSearch} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products?.length !== 0 ? (
            <Products products={products}/>
          ) : (
            <p className="text-gray-600">No products found.</p>
          )}
        </div>
      )}
    </>
  )
}

export default SearchComponent
