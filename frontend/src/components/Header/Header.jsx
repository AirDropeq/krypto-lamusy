import { NavLink } from "react-router-dom";
import styles from "./header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <span className={styles.title}>CryptoTool</span>
      <nav className={styles.navbar}>
        <ul>
          <li>
            <NavLink to="/" className={({isActive}) => (isActive ? styles.active : "")}>Home</NavLink>
          </li>
          <li>
            <NavLink to="/listing" className={({isActive}) => (isActive ? styles.active : "")}>Listing</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
