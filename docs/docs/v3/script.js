document.addEventListener('DOMContentLoaded', () => {
    
    /* ----------------------------------------------------
       1. THEME SWITCHER (Dark/Light)
       ---------------------------------------------------- */
    const themeToggle = document.getElementById('themeToggle');
    const htmlEl = document.documentElement;
    const storedTheme = localStorage.getItem('nimbus-theme');
    
    // Auto-detect system preference if no storage
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (storedTheme) {
        htmlEl.setAttribute('data-theme', storedTheme);
    } else {
        htmlEl.setAttribute('data-theme', systemDark ? 'dark' : 'light');
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlEl.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        htmlEl.setAttribute('data-theme', newTheme);
        localStorage.setItem('nimbus-theme', newTheme);
    });

    /* ----------------------------------------------------
       2. MOBILE SIDEBAR
       ---------------------------------------------------- */
    const sidebar = document.getElementById('sidebar');
    const openBtn = document.getElementById('openSidebar');
    const closeBtn = document.getElementById('closeSidebar');
    const mainWrapper = document.querySelector('.main-wrapper');

    function toggleSidebar() {
        sidebar.classList.toggle('open');
    }

    openBtn.addEventListener('click', toggleSidebar);
    closeBtn.addEventListener('click', toggleSidebar);

    // Close sidebar when clicking outside on mobile
    mainWrapper.addEventListener('click', () => {
        if (window.innerWidth <= 768 && sidebar.classList.contains('open')) {
            sidebar.classList.remove('open');
        }
    });

    /* ----------------------------------------------------
       3. VERSION SELECTOR
       ---------------------------------------------------- */
    const versionSelect = document.getElementById('versionSelect');
    
    versionSelect.addEventListener('change', (e) => {
        window.location.href = e.target.value;
    });

    /* ----------------------------------------------------
       4. COPY CODE BUTTON
       ---------------------------------------------------- */
    window.copyCode = function(btn) {
        const codeBlock = btn.parentElement.nextElementSibling;
        const codeText = codeBlock.innerText;
        
        navigator.clipboard.writeText(codeText).then(() => {
            const icon = btn.querySelector('.material-symbols-rounded');
            const originalText = icon.textContent;
            
            icon.textContent = 'check';
            btn.style.color = 'var(--color-success)';
            
            setTimeout(() => {
                icon.textContent = originalText;
                btn.style.color = '';
            }, 2000);
        });
    };

    /* ----------------------------------------------------
       5. ACTIVE LINK HIGHLIGHTER
       ---------------------------------------------------- */
    const currentPath = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});
