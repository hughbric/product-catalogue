import SearchComponent from '../components/SearchComponent'

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.VERCEL_URL
    : "localhost:3000";

export const getProducts = async () => {
  const res = await fetch(`http://${BASE_URL}/api/v1/aeroedit/products`)
  return res.json()

  // To simulate a slow network request, uncomment the following code
  // return new Promise((resolve, reject) => {
  //   setTimeout(async () => {
  //     const res = await fetch(`http://${BASE_URL}/api/v1/aeroedit/products`)
  //     resolve(res.json())
  //   }, 5000)
  // });
}

const ProductsArea = async () => {
  // const productsData = await getProducts()

  return (
    <SearchComponent initialProducts={[]}/>
  )
}

export default ProductsArea
