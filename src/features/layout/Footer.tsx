import styles from './Footer.module.css';

export function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <p className={styles.text}>
                        &copy; {new Date().getFullYear()} Zara Thompson. All rights reserved.
                    </p>
                    <p className={styles.charity}>
                        50% of proceeds go to <span className={styles.highlight}>Children's Hospital</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}
