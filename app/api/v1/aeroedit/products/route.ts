import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const productId = searchParams.get('productId')

  const dataPath = path.join(process.cwd(), './app/input-data.json')
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'))

  if (productId) {
    const product = data.data.find((product: any) => product.id === productId)
    if (product) {
      return NextResponse.json({ data: [product] })
    } else {
      return NextResponse.json({ data: [] })
    }
  }

  return NextResponse.json(data)
}
