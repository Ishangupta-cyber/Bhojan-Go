/**
 * Cart Context
 * Manages shopping cart state using React Context API.
 * Provides: cart items, add/remove/update quantity, clear cart, and totals.
 */
import React, { createContext, useContext, useReducer, useMemo } from 'react';

const CartContext = createContext(null);

// ─── Action Types ─────────────────────────────────────────
const ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
};

// ─── Cart Reducer ─────────────────────────────────────────
const cartReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_ITEM: {
      const existingIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingIndex > -1) {
        // Item exists — increment quantity
        const updatedItems = [...state.items];
        updatedItems[existingIndex] = {
          ...updatedItems[existingIndex],
          quantity: updatedItems[existingIndex].quantity + 1,
        };
        return {
          ...state,
          items: updatedItems,
          restaurantId: state.restaurantId,
          restaurantName: state.restaurantName,
        };
      }

      // New item — add to cart
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
        restaurantId: action.payload.restaurantId || state.restaurantId,
        restaurantName: action.payload.restaurantName || state.restaurantName,
      };
    }

    case ACTIONS.REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
        ...(state.items.length <= 1
          ? { restaurantId: null, restaurantName: null }
          : {}),
      };

    case ACTIONS.UPDATE_QUANTITY: {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        // Remove item if quantity is 0 or less
        const filtered = state.items.filter((item) => item.id !== id);
        return {
          ...state,
          items: filtered,
          ...(filtered.length === 0
            ? { restaurantId: null, restaurantName: null }
            : {}),
        };
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === id ? { ...item, quantity } : item
        ),
      };
    }

    case ACTIONS.CLEAR_CART:
      return {
        items: [],
        restaurantId: null,
        restaurantName: null,
      };

    default:
      return state;
  }
};

// ─── Initial State ────────────────────────────────────────
const initialState = {
  items: [],
  restaurantId: null,
  restaurantName: null,
};

// ─── Cart Provider ────────────────────────────────────────
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (item) => {
    dispatch({ type: ACTIONS.ADD_ITEM, payload: item });
  };

  const removeFromCart = (itemId) => {
    dispatch({ type: ACTIONS.REMOVE_ITEM, payload: itemId });
  };

  const updateQuantity = (id, quantity) => {
    dispatch({ type: ACTIONS.UPDATE_QUANTITY, payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: ACTIONS.CLEAR_CART });
  };

  // Calculate totals
  const cartTotal = useMemo(() => {
    return state.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }, [state.items]);

  const itemCount = useMemo(() => {
    return state.items.reduce((count, item) => count + item.quantity, 0);
  }, [state.items]);

  const value = {
    items: state.items,
    restaurantId: state.restaurantId,
    restaurantName: state.restaurantName,
    cartTotal,
    itemCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// ─── Custom Hook ──────────────────────────────────────────
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
