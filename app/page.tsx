import SearchComponent from '../components/SearchComponent'

export const getProducts = async () => {
  const res = await fetch('http://localhost:3000/api/v1/aeroedit/products')
  return res.json()
}

export default async function Home() {
  const productsData = await getProducts()

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">AeroEdit Products</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <SearchComponent initialProducts={productsData.data.data} />
      </main>
    </div>
  )
}
