
import cartReducer, { addToCart, removeFromCart } from '../cartSlice'

describe('cartSlice', () => {
  const initialState = {
    items: {},
  }

  test('should return the initial state', () => {
    expect(cartReducer(undefined, { type: 'unknown' })).toEqual(initialState)
  })

  test('should handle addToCart', () => {
    const productId = '101'
    const actual = cartReducer(initialState, addToCart(productId))
    
    expect(actual.items[productId]).toBe(1)
  })

  test('should increment quantity when adding existing item', () => {
    const productId = '101'
    const stateWithItem = {
      items: { [productId]: 2 }
    }
    
    const actual = cartReducer(stateWithItem, addToCart(productId))
    expect(actual.items[productId]).toBe(3)
  })

  test('should handle removeFromCart', () => {
    const productId = '101'
    const stateWithItem = {
      items: { [productId]: 2 }
    }
    
    const actual = cartReducer(stateWithItem, removeFromCart(productId))
    expect(actual.items[productId]).toBe(1)
  })

  test('should remove item completely when quantity reaches 0', () => {
    const productId = '101'
    const stateWithItem = {
      items: { [productId]: 1 }
    }
    
    const actual = cartReducer(stateWithItem, removeFromCart(productId))
    expect(actual.items[productId]).toBeUndefined()
  })

  

  test('should not remove item with 0 quantity', () => {
    const productId = '101'
    const actual = cartReducer(initialState, removeFromCart(productId))
    
    expect(actual.items[productId]).toBeUndefined()
  })
})
