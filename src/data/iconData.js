const getFileEmoji = (fileName) => {
    const ext = fileName.split('.').pop().toLowerCase();

    const emojiMap = {
        js: '📜',       // JavaScript
        jsx: '⚛️',     // React JSX
        ts: '🌀',       // TypeScript
        tsx: '🔷',      // React TSX
        html: '🌐',     // HTML
        css: '🎨',      // CSS
        json: '🧾',     // JSON
        md: '📘',       // Markdown
        py: '🐍',       // Python
        java: '☕',     // Java
        cpp: '💻',      // C++
        go: '🐹',       // Go
        php: '🐘',      // PHP
        sql: '🗄️',      // SQL
        sh: '🐚',       // Shell script
    };

    return emojiMap[ext] || '📄'; // default emoji for unknown files
};

export default getFileEmoji;