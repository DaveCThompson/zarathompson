import styles from './Header.module.css';

export function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <h1 className={styles.logo}>Zara Thompson Art</h1>
                <nav className={styles.nav}>
                    <a href="#" className={styles.link}>Shop</a>
                    <a href="#about" className={styles.link}>About</a>
                </nav>
            </div>
        </header>
    );
}
