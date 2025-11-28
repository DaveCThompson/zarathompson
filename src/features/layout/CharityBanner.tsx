// FILE: src/features/layout/CharityBanner.tsx
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
                            <span>❤️ All proceeds go to BC Children's Hospital and my education fund!</span>
                        }
                    >
                        <button
                            type="button"
                            className={`${styles.infoIcon} no-select`}
                            aria-label="More information about donations"
                        >
                            <Info size={22} weight="fill" />
                        </button>
                    </Tooltip>
                </p>
            </div>
        </div>
    );
}