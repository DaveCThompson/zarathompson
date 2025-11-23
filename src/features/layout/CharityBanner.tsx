import styles from './CharityBanner.module.css';

export function CharityBanner() {
    return (
        <div className={styles.banner}>
            <p className={styles.text}>
                ❤️ <strong>50% of all proceeds</strong> go directly to BC Children's Hospital
            </p>
        </div>
    );
}
