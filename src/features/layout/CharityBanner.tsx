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
                        <button
                            type="button"
                            className={`${styles.infoIcon} no-select`}
                            aria-label="More information about donations"
                            style={{
                                background: 'none',
                                border: 'none',
                                padding: 0,
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                color: 'inherit'
                            }}
                        >
                            <Info size={22} weight="fill" />
                        </button>
                    </Tooltip>
                </p>
            </div>
        </div>
    );
}