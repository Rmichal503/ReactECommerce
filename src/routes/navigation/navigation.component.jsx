import { Outlet, Link } from "react-router-dom";
import { Fragment, useContext } from "react";
import {ReactComponent as CrwnLogo} from '../../assets/crown.svg';
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utilities/firebase/firebase.utilities";
import './navigation.styles.scss'
import { CartIcon } from "../../components/cart-icon/cart-icon.component";
import { CartDropdown } from "../../components/cart-dropdown/cart-dropdown.component";
import { CartContext } from "../../contexts/cart.context";


const Navigation=()=>{
  const {currentUser} = useContext(UserContext);
  const {toggleDropdown} = useContext(CartContext);
  console.log(currentUser);
  console.log(toggleDropdown)
    return(
      <Fragment>
        <div className="navigation">
          <Link className='logo-container'to={'/'}>
              <CrwnLogo className='logo'/>
          </Link>
          <div className="nav-links-container">
            <Link className="nav-link" to={'/shop'}>
                SHOP
            </Link>
            {currentUser? (
              <span className="nav-link" onClick={signOutUser}>SignOut</span>
            ):(<Link className="nav-link" to={'/authentication'}>
            Sign In</Link>)}
            <CartIcon />
          </div>{toggleDropdown?<CartDropdown/>:null}
        </div>
        <Outlet></Outlet>
      </Fragment>
    )
}

export default Navigation