import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchComponent from '../../components/SearchComponent'

const mockInitialProducts = [
  { id: '1', name: 'Product 1', description: 'Description 1', imageUrl: 'http://example.com/1.jpg', prices: [] },
  { id: '2', name: 'Product 2', description: 'Description 2', imageUrl: 'http://example.com/2.jpg', prices: [] }
]

describe('SearchComponent', () => {
  test('renders initial products', () => {
    render(<SearchComponent initialProducts={mockInitialProducts} />)

    const productElements = screen.getAllByRole('heading')
    expect(productElements.length).toBe(mockInitialProducts.length)
    expect(productElements[0]).toHaveTextContent('Product 1')
    expect(productElements[1]).toHaveTextContent('Product 2')
  })

  test('searches and updates products', async () => {
    const mockFetchedProducts = [
      { id: '3', name: 'Product 3', description: 'Description 3', imageUrl: 'http://example.com/3.jpg', prices: [] }
    ]

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ data: mockFetchedProducts }),
        ok: true
      })
    ) as jest.Mock

    const user = userEvent.setup()
    render(<SearchComponent initialProducts={mockInitialProducts} />)

    const inputElement = screen.getByPlaceholderText('Search by Product ID')
    const buttonElement = screen.getByText('Search')

    await user.type(inputElement, '3')
    await user.click(buttonElement)
    screen.debug()

    const productElements = screen.getAllByRole('heading')
    expect(productElements.length).toBe(mockFetchedProducts.length)
    expect(productElements[0]).toHaveTextContent('Product 3')
  })

  test('shows no products when search results are empty', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ data: [] }),
        ok: true
      })
    ) as jest.Mock

    const user = userEvent.setup()
    render(<SearchComponent initialProducts={mockInitialProducts} />)

    const inputElement = screen.getByPlaceholderText('Search by Product ID')
    const buttonElement = screen.getByText('Search')

    await user.type(inputElement, 'id-not-found')
    await user.click(buttonElement)

    const productElements = screen.queryAllByRole('heading')
    expect(productElements.length).toBe(0)
  })

  test('displays error message when request response is not ok', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ data: [] }),
        ok: false
      })
    ) as jest.Mock

    const user = userEvent.setup()
    render(<SearchComponent initialProducts={mockInitialProducts} />)

    const inputElement = screen.getByPlaceholderText('Search by Product ID')
    const buttonElement = screen.getByText('Search')

    await user.type(inputElement, '2')
    await user.click(buttonElement)

    const productElements = screen.queryAllByRole('heading')
    expect(productElements[0]).toHaveTextContent('Something went wrong!')
  })
})
