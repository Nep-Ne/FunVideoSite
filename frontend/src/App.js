import './App.css';
import HomeScreen from './screen/HomeScreen';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import SigninScreen from './screen/SigninScreen';
import SignupScreen from './screen/SignupScreen';
import VideoScreen from './screen/VideoScreen';
function App() {
  const Header = () => {
    return (
      <Navbar className="header">
      <Container>
        <Navbar.Brand href="/">FunVideoSite</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
        <Button href="/signin">Signin</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    );
  };

  const Main = () => {
    return (
      <div>
        

      </div>
      
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
      <Route path= "/" exact={true} component ={HomeScreen}/>
        {/* nếu ko có exact={true} thì nó sẽ kết hợp cái Homescreen lại luôn vi Homescreen có đường dẫn là / và /signin cũng có */}
      <Route path= "/signin" component ={SigninScreen}/>
      <Route path= "/signup" component ={SignupScreen}/>
      <Route path= "/id" component ={VideoScreen}/>
      </body>
        
      </Container>
      <footer class="mt-auto footer">
      <Navbar >
        <Container>
          <p>&copy; 2023 Your Website</p>
        </Container>
        </Navbar>

      </footer>
      

    </BrowserRouter>



  );
}

export default App;
