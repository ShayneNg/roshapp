// tailwind.config.js
module.exports = {
    theme: {
        extend: {
            fontFamily: {
            'sans': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
            'mono': ['JetBrains Mono', 'Fira Code', 'monospace'],
            },
            fontSize: {
            'xs': ['0.75rem', { lineHeight: '1.5' }],
            'sm': ['0.875rem', { lineHeight: '1.5' }],
            'base': ['1rem', { lineHeight: '1.5' }],
            'lg': ['1.125rem', { lineHeight: '1.5' }],
            'xl': ['1.25rem', { lineHeight: '1.25' }],
            '2xl': ['1.5rem', { lineHeight: '1.25' }],
            '3xl': ['1.875rem', { lineHeight: '1.25' }],
            },
            fontWeight: {
            'light': '300',
            'normal': '400', 
            'medium': '500',
            'semibold': '600',
            'bold': '700',
            }
        }
    }
}
