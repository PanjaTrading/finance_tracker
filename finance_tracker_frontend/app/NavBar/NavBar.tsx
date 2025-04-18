import Link from "next/link";
import styles from "./NavBar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <h1 className={styles.logo}>Finance Tracker</h1>
        <div className={styles.links}>
          <Link href="/">
            <span className={styles.link}>Home</span>
          </Link>
          <Link href="/about">
            <span className={styles.link}>About Us</span>
          </Link>
          <Link href="/contact">
            <span className={styles.link}>Contact</span>
          </Link>
          <Link href="/SignUp">
            <span className={styles.link}>Sign Up</span>
          </Link>
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;