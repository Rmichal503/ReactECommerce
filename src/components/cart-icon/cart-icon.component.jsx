import './cart-icon.styles.scss'
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'

import React, { useContext } from 'react'
import { CartContext } from '../../contexts/cart.context';

export const CartIcon = () => {
    const {setToggleDropdown} = useContext(CartContext);
  return (
    <div className='cart-icon-container' onClick={()=>{
        setToggleDropdown(prevValue=>{
            return !prevValue
        });
    }}>
        <ShoppingIcon className='shopping-icon'/>
        <span className='item-count'>10</span>
    </div>
  )
}
