import styles from './CharityBanner.module.css';
import { Info } from '@phosphor-icons/react';
import { Tooltip } from '@/components/Tooltip';

export function CharityBanner() {
    return (
        <div className={styles.banner}>
            <div className={styles.content}>
                <p className={styles.text}>
                    <strong>100% of proceeds support Children's Health & Education.</strong>
                    <Tooltip
                        content={
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', textAlign: 'left' }}>
                                <span>❤️ A portion of proceeds is donated to BC Children's Hospital.</span>
                                <span>📚 All remaining proceeds go to Zara's Education Fund.</span>
                            </div>
                        }
                    >
                        <span className={styles.infoIcon}>
                            <Info size={22} weight="fill" />
                        </span>
                    </Tooltip>
                </p>
            </div>
        </div>
    );
}