import './App.css';
import { useDispatch,useSelector } from 'react-redux';
import HomeScreen from './screen/HomeScreen';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import { BrowserRouter, Route } from 'react-router-dom';
import SigninScreen from './screen/SigninScreen';
import SignupScreen from './screen/SignupScreen';
import VideoScreen from './screen/VideoScreen';
import ProfileScreen from './screen/ProfileScreen';
import ListVideoScreen from './screen/ListVideoScreens';
import UploadScreen from './screen/UploadScreen';
import { logout } from './actions/userActions';

function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  }

  const Header = () => {
    return (
      <Navbar className="header">
        <Container>
          <Navbar.Brand className='nav-brand' href="/">FunVideoSite</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end ">

            {/* <Button href="/videos">Signin</Button> */}
            {userInfo ? (
              <Nav.Link className='mx-3' href="/profile">{userInfo.name}</Nav.Link>
            ) : (
              <Button href="/signin">Signin</Button>
            )}

             {userInfo  && ( 
            //  {userInfo && userInfo.isAdmin && (
              // <div className="dropdown">
              //   <a href="#">Admin</a>
              //   <ul className="dropdown-content">
              //     <li>
              //       <Link to="/orders">Orders</Link>
              //       <Link to="/products">Products</Link>
              //     </li>
              //   </ul>
              // </div>
              <NavDropdown title="Action" id="basic-nav-dropdown">
                <NavDropdown.Item href={"/videos/author/" + userInfo._id}>Videos</NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  };


  const Footer = () => {
    return (
      <Navbar className="footer">
        <Container>
          <p>&copy; 2023 Your Website</p>
        </Container>
      </Navbar>
    );
  };
  return (
    <BrowserRouter>
      <Header />
      {/* để full cho screen thì phải thêm fluid ở cả container app.js chứ ko phải chỉ mình container phần ...Screen.js và cấu hình lại cho container-fluid trong file index.css nữa !!!!! */}
      <Container fluid>


        <body class="d-flex flex-column min-vh-100">
          <Route path="/" exact={true} component={HomeScreen} />
          {/* nếu ko có exact={true} thì nó sẽ kết hợp cái Homescreen lại luôn vi Homescreen có đường dẫn là / và /signin cũng có */}
          <Route path="/signin" component={SigninScreen} />
          <Route path="/signup" component={SignupScreen} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/videos" exact={true} component={ListVideoScreen} />
          <Route path="/videos/author/:id" component={ListVideoScreen} />
          <Route path="/uploads" component={UploadScreen} />
          <Route path="/video/:id" component={VideoScreen} />
        </body>

      </Container>
      <footer class="mt-0 footer">
        <Navbar >
          <Container >
            <p>&copy; 2023 Your Website</p>
          </Container>
        </Navbar>

      </footer>


    </BrowserRouter>



  );
}

export default App;
