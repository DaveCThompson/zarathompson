import styles from './Footer.module.css';

export function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <p className={styles.text}>
                        &copy; 2025 Zara Thompson.
                    </p>
                </div>
            </div>
        </footer>
    );
}
