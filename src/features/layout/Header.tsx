import { useAtom } from 'jotai';
import { darkModeAtom } from '@/data/atoms';
import { Sun, Moon } from '@phosphor-icons/react';
import styles from './Header.module.css';

export function Header() {
    const [isDark, setIsDark] = useAtom(darkModeAtom);

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <h1 className={styles.logo}>Zara Thompson | Art for Education</h1>
                <nav className={styles.nav}>
                    <button
                        className={styles.themeToggle}
                        onClick={() => setIsDark(!isDark)}
                        aria-label="Toggle Dark Mode"
                    >
                        {isDark ? (
                            <Sun size={24} weight="duotone" />
                        ) : (
                            <Moon size={24} weight="duotone" />
                        )}
                    </button>
                    {/* Link removed as About is now in Hero */}
                </nav>
            </div>
        </header>
    );
}