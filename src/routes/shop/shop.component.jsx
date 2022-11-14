import React,{useContext} from 'react'
import { ProductCard } from '../../components/product-card/product-card.component'
import { ProductContext } from '../../contexts/product.context'



export const Shop = () => {
    const {products} = useContext(ProductContext)
  return (
    <div className='products'>
        {products.map((product)=>{
            return (
                <ProductCard product={product} key={product.id} />
            )
        })}
    </div>
  )
}
