import styles from './CharityBanner.module.css';
import { Info } from '@phosphor-icons/react';
import { Tooltip } from '@/components/Tooltip';

export function CharityBanner() {
    return (
        <div className={styles.banner}>
            <div className={styles.content}>
                <p className={styles.text}>
                    <strong>50% of proceeds go to Children's Hospital.</strong>
                    <Tooltip
                        content={
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                <span>❤️ 50% donated to BC Children's Hospital.</span>
                                <span>📚 50% goes to Zara's Education Fund.</span>
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