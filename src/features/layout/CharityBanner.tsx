import styles from './CharityBanner.module.css';
import { GraduationCap, Heart } from '@phosphor-icons/react';

export function CharityBanner() {
    return (
        <div className={styles.banner}>
            <div className={styles.content}>
                <p className={styles.text}>
                    <Heart size={16} weight="fill" className={styles.icon} style={{ color: '#ef4444' }} />
                    <strong>50% of proceeds</strong> go to BC Children's Hospital
                </p>
                <p className={styles.text}>
                    <GraduationCap size={16} weight="fill" className={styles.icon} />
                    <strong>50% of proceeds</strong> go to Zara's Education fund.
                </p>
            </div>
        </div>
    );
}