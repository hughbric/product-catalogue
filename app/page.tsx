import { Suspense } from 'react'
import ProductsArea from '../components/ProductsArea'
import Loading from '../components/Loading'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">AeroEdit Products</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <Suspense fallback={<Loading />}>
          <ProductsArea />
        </Suspense>
      </main>
    </div>
  )
}
