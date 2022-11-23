import React ,{useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.png'
import searchicon from '../../assets/search-icon.png'
import Avatar from '../../components/Avatar/Avatar'
import { useSelector,useDispatch } from 'react-redux'
//import Button from '../../components/Button/Button'
import './Navbar.css'
import { setCurrentUser } from '../../actions/currentUser'
import decode from 'jwt-decode'

const Navbar = () => {
  const dispatch = useDispatch()
    var User = useSelector((state) => (state.currentUserReducer))
    const navigate = useNavigate();
    
    const handleLogout = () => {
        dispatch({ type: 'LOGOUT'});
        navigate('/Auth')
        dispatch(setCurrentUser(null))
    }
    
    useEffect(() => {
        const token = User?.token 
        if(token){
            const decodedToken = decode(token)
            if(decodedToken.exp * 1000 < new Date().getTime()){
                handleLogout()
            }
        }
        dispatch(setCurrentUser( JSON.parse(localStorage.getItem('Profile'))))
    },[User?.token, dispatch])

  return (
    <nav className='main-nav'>
        <div className='navbar'>
            <Link to='/' className='nav-item nav-logo'>
            <img src={logo} alt="stackoverflow" />
            </Link>
            <Link to='/' className='nav-item nav-btn'>About</Link>
            <Link to='/' className='nav-item nav-btn'>Products</Link>
            <Link to='/' className='nav-item nav-btn'>For Teams</Link>
        <form action="">
            <input type="text" placeholder='Search...'/>
            <img src={searchicon} alt="" width="18" className='search-icon'/>
        </form>
        {User==null
        ?<Link to='/Auth' className='nav-item nav-links'>Log in</Link>
        : <>
         <Link to={`/Users/${User?.result?._id}`} style={{ textDecoration: 'none', color:"white"}}><Avatar backgroundColor='#009dff' px='10px' py='7px' borderRadius='50%' color='white' >{ User.result.name.charAt(0).toUpperCase()}</Avatar></Link>
         
          <button className='nav-item nav-links' onClick={handleLogout}>Log out</button>
          </>
        }
        
        </div>

    </nav>
  )
}

export default Navbar