import 'server-only'
import { cache } from 'react'
import fs from 'fs'
import path from 'path'
import SearchComponent from '../components/SearchComponent'

export const preload = () => {
  void getProducts()
}

export const getProducts = cache(async () => {
  const dataPath = path.join(process.cwd(), './input-data.json')
  return JSON.parse(fs.readFileSync(dataPath, 'utf8'))
})

const ProductsArea = async () => {
  const productsData = await getProducts()

  return (
    <SearchComponent initialProducts={productsData.data}/>
  )
}

export default ProductsArea
