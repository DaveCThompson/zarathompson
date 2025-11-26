import styles from './CharityBanner.module.css';
import { Info } from '@phosphor-icons/react';
import { Tooltip } from '@/components/Tooltip';

export function CharityBanner() {
    return (
        <div className={styles.banner}>
            <div className={styles.content}>
                <p className={styles.text}>
                    <strong>100% of proceeds support Children's Health and Education.</strong>
                    <Tooltip
                        content={
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                <span>❤️ $1 from every poster donated to BC Children's Hospital.</span>
                                <span>All proceeds go to Zara's Education Fund.</span>
                            </div>
                        }
                    >
                        <span className={styles.infoIcon}>
                            <Info size={18} weight="bold" />
                        </span>
                    </Tooltip>
                </p>
            </div>
        </div>
    );
}