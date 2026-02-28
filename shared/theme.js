/**
 * 主题管理器
 * 支持：跟随系统 / 浅色 / 深色，偏好存储在 localStorage
 * 用法：页面引入此脚本即可，会自动应用主题并在 <html> 上设置 data-theme 属性
 */
(function () {
    const STORAGE_KEY = 'theme-preference'; // 'auto' | 'light' | 'dark'

    function getPreference() {
        return localStorage.getItem(STORAGE_KEY) || 'auto';
    }

    function setPreference(pref) {
        localStorage.setItem(STORAGE_KEY, pref);
        applyTheme();
    }

    function getEffectiveTheme() {
        const pref = getPreference();
        if (pref === 'auto') {
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        return pref;
    }

    function applyTheme() {
        document.documentElement.setAttribute('data-theme', getEffectiveTheme());
    }

    // 监听系统主题变化
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (getPreference() === 'auto') applyTheme();
    });

    // 立即应用
    applyTheme();

    // 暴露全局 API
    window.ThemeManager = { getPreference, setPreference, getEffectiveTheme, applyTheme };
})();
