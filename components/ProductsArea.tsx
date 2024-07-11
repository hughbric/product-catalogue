import { cache } from 'react'
import 'server-only'
import SearchComponent from '../components/SearchComponent'
import fs from 'fs'
import path from 'path'

export const preload = () => {
  void getProducts()
}
 
const BASE_URL =
  process.env.NODE_ENV === "production"
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";
console.log('BASE_URL')
console.log(BASE_URL)
console.log(process.env.VERCEL_URL)

export const getProducts = cache(async () => {
  // const res = await fetch(`${BASE_URL}/api/v1/aeroedit/products`)
  // console.log(res)
  // return res.json()

  const dataPath = path.join(process.cwd(), './input-data.json')
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'))
  return data
  // To simulate a slow network request, uncomment the following code
  // return new Promise((resolve, reject) => {
  //   setTimeout(async () => {
  //     const res = await fetch(`${BASE_URL}/api/v1/aeroedit/products`)
  //     resolve(res.json())
  //   }, 5000)
  // });
})

const ProductsArea = async () => {
  const productsData = await getProducts()

  return (
    <SearchComponent initialProducts={productsData.data.data ? productsData.data.data : []}/>
  )
}

export default ProductsArea
