import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Product from '../../components/Product'

const mockProduct = {
  id: '1',
  name: 'Test Product',
  description: 'This is a test product.',
  imageUrl: 'http://example.com/product.jpg',
  prices: [
    { id: 'price_1', description: 'Standard Price', unitPrice: { amount: '100', currencyCode: 'USD' } },
    { id: 'price_2', description: 'Discounted Price', unitPrice: { amount: '80', currencyCode: 'USD' } }
  ]
}

describe('Product', () => {
  test('renders product information', () => {
    render(<Product product={mockProduct} />)

    const productName = screen.getByText(mockProduct.name)
    const productDescription = screen.getByText(mockProduct.description)
    const productImage = screen.getByAltText(mockProduct.name)

    expect(productName).toBeInTheDocument()
    expect(productDescription).toBeInTheDocument()
    expect(productImage).toBeInTheDocument()
  })

  test('toggles prices display on click', async () => {
    const user = userEvent.setup()
    render(<Product product={mockProduct} />)

    const productContainer = screen.getByText(mockProduct.name)

    expect(screen.queryByText('Standard Price: 100 USD')).not.toBeInTheDocument()
    expect(screen.queryByText('Discounted Price: 80 USD')).not.toBeInTheDocument()

    await user.click(productContainer)
    expect(screen.getByText('Standard Price: 100 USD')).toBeInTheDocument()
    expect(screen.getByText('Discounted Price: 80 USD')).toBeInTheDocument()

    await user.click(productContainer)
    expect(screen.queryByText('Standard Price: 100 USD')).not.toBeInTheDocument()
    expect(screen.queryByText('Discounted Price: 80 USD')).not.toBeInTheDocument()
  })
})
