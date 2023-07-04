import logo from '../images/Vector.svg';

function Header() {
  return (
    <header className="header">
        <img src={logo} alt="Места России" className="logo" />
    </header>
  )
}

export default Header;