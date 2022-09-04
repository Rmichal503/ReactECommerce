import { Outlet, Link } from "react-router-dom";
import { Fragment, useContext } from "react";
import {ReactComponent as CrwnLogo} from '../../assets/crown.svg';
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utilities/firebase/firebase.utilities";
import './navigation.styles.scss'


const Navigation=()=>{
  const {currentUser,setCurrentUser} = useContext(UserContext);
  const signOutHandler = async()=>{
    await signOutUser();
    setCurrentUser(null);
  }
  console.log(currentUser);
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
              <span className="nav-link" onClick={signOutHandler}>SignOut</span>
            ):(<Link className="nav-link" to={'/authentication'}>
            Sign In</Link>)}
          </div>
        </div>
        <Outlet></Outlet>
      </Fragment>
    )
}

export default Navigation