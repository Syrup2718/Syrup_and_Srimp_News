/* ========================================================= */
/* S&SN CORE LOGIC - v1.3.1 */
/* Includes: Translations, Router, DatePicker, ThemeToggle */
/* ========================================================= */

const translations = {
    // 繁體中文
    'zh': {
        'nav-title': 'Syrup & Shrimp News',
        'welcome': 'Syrup & Shrimp',
        'slogan': '客觀 / 中立 / AI 驅動新聞聚合',
        'read_today': '閱讀今日快訊',
        'dev_log': '系統日誌',
        
        // Sidebar
        'home': '首頁',
        'home_desc': '返回歡迎頁面',
        'today': '今日總結',
        'today_desc': 'AI 聚合最新消息',
        'past': '歷史存檔',
        'past_desc': '瀏覽過去的新聞庫',
        'lang_select': '語言選擇',
        'lang_desc': '變更介面語言',
        'links': '友好連結',
        'links_desc': '外部資源與工具',
        'about': '關於我們',
        'about_desc': '專案開發資訊',

        // Tech Stack
        'arch_title': '系統核心架構',
        'ingest_title': '數據攝取',
        'ingest_desc': '針對全球新聞來源的多源異步爬蟲系統。',
        'embed_title': '向量空間',
        'embed_desc': '利用 Nomic AI 嵌入技術的高維文本聚類。',
        'llm_title': '神經網路合成',
        'llm_desc': '確保中立性與客觀性的 LLM 驅動摘要。',

        // Time Vault
        'vault_title': '時光保險箱',
        'vault_desc': '存取歷史數據分層',
        'retrieve_btn': '檢索數據片段',
        
        // Common
        'loading': '載入中...',
        'back': '返回'
    },

    // English (US/UK shared base)
    'en': {
        'nav-title': 'Syrup & Shrimp News',
        'welcome': 'Syrup & Shrimp',
        'slogan': 'Objective / Neutral / AI-Driven',
        'read_today': 'Read Today Summary',
        'dev_log': 'System Log',
        
        'home': 'Home',
        'home_desc': 'Return to landing page',
        'today': 'Today Summary',
        'today_desc': 'Latest AI aggregated news',
        'past': 'Archives',
        'past_desc': 'Browse past records',
        'lang_select': 'Language',
        'lang_desc': 'Change interface language',
        'links': 'Friendly Links',
        'links_desc': 'External resources',
        'about': 'About',
        'about_desc': 'Project information',

        'arch_title': 'System Architecture',
        'ingest_title': 'Data Ingestion',
        'ingest_desc': 'Multi-source asynchronous crawlers targeting global news outlets.',
        'embed_title': 'Vector Space',
        'embed_desc': 'High-dimensional text clustering utilizing Nomic AI embeddings.',
        'llm_title': 'Neural Synthesis',
        'llm_desc': 'LLM-driven summarization ensuring neutrality and objectivity.',

        'vault_title': 'Time Vault',
        'vault_desc': 'Access historical data layers',
        'retrieve_btn': 'Retrieve Data Segment',

        'loading': 'Loading...',
        'back': 'Back'
    },

    // Français
    'fr': {
        'nav-title': 'Nouvelles S&SN',
        'welcome': 'Syrup & Shrimp',
        'slogan': 'Objectif / Neutre / Piloté par IA',
        'read_today': 'Lire le résumé',
        'dev_log': 'Journal Système',
        
        'home': 'Accueil',
        'home_desc': 'Retour à la page d\'accueil',
        'today': 'Résumé',
        'today_desc': 'Dernières nouvelles IA',
        'past': 'Archives',
        'past_desc': 'Parcourir les archives',
        'lang_select': 'Langue',
        'lang_desc': 'Changer la langue',
        'links': 'Liens',
        'links_desc': 'Ressources externes',
        'about': 'À propos',
        'about_desc': 'Info projet',

        'arch_title': 'Architecture Système',
        'ingest_title': 'Ingestion de données',
        'ingest_desc': 'Crawlers asynchrones multi-sources.',
        'embed_title': 'Espace Vectoriel',
        'embed_desc': 'Clustering de texte haute dimension (Nomic AI).',
        'llm_title': 'Synthèse Neuronale',
        'llm_desc': 'Résumé piloté par LLM assurant la neutralité.',

        'vault_title': 'Coffre Temporel',
        'vault_desc': 'Accéder aux couches de données',
        'retrieve_btn': 'Récupérer le segment',

        'loading': 'Chargement...',
        'back': 'Retour'
    },

    // Русский
    'ru': {
        'nav-title': 'Новости S&SN',
        'welcome': 'Syrup & Shrimp',
        'slogan': 'Объективный / Нейтральный / ИИ',
        'read_today': 'Читать сегодня',
        'dev_log': 'Системный лог',
        
        'home': 'Главная',
        'home_desc': 'Вернуться на главную',
        'today': 'Сводка',
        'today_desc': 'Агрегатор новостей ИИ',
        'past': 'Архив',
        'past_desc': 'Просмотр записей',
        'lang_select': 'Язык',
        'lang_desc': 'Изменить язык',
        'links': 'Ссылки',
        'links_desc': 'Внешние ресурсы',
        'about': 'О нас',
        'about_desc': 'Информация о проекте',

        'arch_title': 'Архитектура',
        'ingest_title': 'Сбор данных',
        'ingest_desc': 'Многопоточные асинхронные краулеры.',
        'embed_title': 'Векторное пр-во',
        'embed_desc': 'Кластеризация текста (Nomic AI).',
        'llm_title': 'Нейросинтез',
        'llm_desc': 'ИИ-саммаризация новостей.',

        'vault_title': 'Хранилище',
        'vault_desc': 'Доступ к истории',
        'retrieve_btn': 'Извлечь данные',

        'loading': 'Загрузка...',
        'back': 'Назад'
    },

    // العربية
    'ar': {
        'nav-title': 'أخبار S&SN',
        'welcome': 'Syrup & Shrimp',
        'slogan': 'موضوعي / محايد / ذكاء اصطناعي',
        'read_today': 'اقرأ ملخص اليوم',
        'dev_log': 'سجل النظام',
        
        'home': 'الرئيسية',
        'home_desc': 'عودة للصفحة الرئيسية',
        'today': 'ملخص اليوم',
        'today_desc': 'آخر أخبار الذكاء الاصطناعي',
        'past': 'الأرشيف',
        'past_desc': 'تصفح السجلات القديمة',
        'lang_select': 'لغة',
        'lang_desc': 'تغيير لغة الواجهة',
        'links': 'روابط',
        'links_desc': 'مصادر خارجية',
        'about': 'من نحن',
        'about_desc': 'معلومات المشروع',

        'arch_title': 'بنية النظام',
        'ingest_title': 'استيعاب البيانات',
        'ingest_desc': 'زواحف غير متزامنة متعددة المصادر.',
        'embed_title': 'فضاء المتجهات',
        'embed_desc': 'تجميع النصوص عالي الأبعاد.',
        'llm_title': 'التوليف العصبي',
        'llm_desc': 'تلخيص محايد مدعوم بالذكاء الاصطناعي.',

        'vault_title': 'خزنة الزمن',
        'vault_desc': 'الوصول إلى البيانات التاريخية',
        'retrieve_btn': 'استرجاع البيانات',

        'loading': 'جار التحميل...',
        'back': 'رجوع'
    }
};

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Initialize Date Picker to Today
    const today = new Date();
    const yInput = document.getElementById('picker-year');
    const mInput = document.getElementById('picker-month');
    const dInput = document.getElementById('picker-day');

    if(yInput && mInput && dInput) {
        yInput.value = today.getFullYear();
        mInput.value = today.getMonth() + 1;
        dInput.value = today.getDate();
    }

    // 2. Load Saved Language
    const savedLang = localStorage.getItem('s_sn_lang') || 'en';
    setLanguage(savedLang);

    // 3. Menu Logic
    const menuBtn = document.getElementById('menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');

    function toggleMenu() {
        const isActive = sidebar.classList.contains('active');
        if (isActive) {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        } else {
            sidebar.classList.add('active');
            overlay.classList.add('active');
        }
    }

    if(menuBtn) menuBtn.addEventListener('click', (e) => { e.stopPropagation(); toggleMenu(); });
    if(closeMenuBtn) closeMenuBtn.addEventListener('click', toggleMenu);
    if(overlay) overlay.addEventListener('click', toggleMenu);

    // 4. Archive Retrieve Button Logic
    const goDateBtn = document.getElementById('go-date-btn');
    if(goDateBtn) {
        goDateBtn.addEventListener('click', () => {
            const y = document.getElementById('picker-year').value;
            let m = document.getElementById('picker-month').value;
            let d = document.getElementById('picker-day').value;
            
            if(!y || !m || !d) {
                alert("Please synchronize date parameters.");
                return;
            }
            
            m = m.toString().padStart(2, '0');
            d = d.toString().padStart(2, '0');
            
            loadNewsByDate(`${y}${m}${d}`);
        });
    }

    // 5. Theme Toggle
    const themeBtn = document.getElementById('theme-toggle');
    if(themeBtn) {
        themeBtn.addEventListener('click', () => {
            const body = document.body;
            const current = body.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            body.setAttribute('data-theme', next);
            themeBtn.querySelector('.icon').textContent = next === 'dark' ? '🌙' : '☀';
        });
    }
});

// === Navigation Handler ===
function handleMenuNav(viewId) {
    if (viewId === 'today') {
        loadTodayNews();
    } else {
        showView(viewId);
    }
    // Close sidebar
    document.getElementById('sidebar').classList.remove('active');
    document.getElementById('sidebar-overlay').classList.remove('active');
}

// === View Switcher ===
function showView(viewId) {
    document.querySelectorAll('.view-section').forEach(el => {
        el.classList.add('hidden');
        el.classList.remove('active');
    });
    
    const target = document.getElementById(viewId);
    if (target) {
        target.classList.remove('hidden');
        setTimeout(() => target.classList.add('active'), 10);
    }
    window.scrollTo(0, 0);
}

// === Language System ===
function setLanguage(lang) {
    // Fallback to English if translation missing
    const t = translations[lang] || translations['en'];
    
    // Update all elements with data-lang attribute
    document.querySelectorAll('[data-lang]').forEach(el => {
        const key = el.getAttribute('data-lang');
        if (t[key]) {
            el.textContent = t[key];
        }
    });

    // Special handling for HTML document lang attribute (for accessibility)
    document.documentElement.lang = lang === 'zh' ? 'zh-TW' : lang;

    // Handle RTL for Arabic
    if (lang === 'ar') {
        document.body.style.direction = 'rtl';
        document.body.style.fontFamily = "'Tahoma', 'Arial', sans-serif";
    } else {
        document.body.style.direction = 'ltr';
        document.body.style.fontFamily = "";
    }

    // Persist selection
    localStorage.setItem('s_sn_lang', lang);
}

// === News Loader Logic ===
function loadTodayNews() {
    const today = new Date();
    const dateStr = today.getFullYear() + 
                    String(today.getMonth() + 1).padStart(2, '0') + 
                    String(today.getDate()).padStart(2, '0');
    loadNewsByDate(dateStr);
}

async function loadNewsByDate(dateString) {
    showView('news-view');
    const grid = document.getElementById('articles-grid');
    const dateHeader = document.getElementById('current-date');
    
    // Get current language for "Loading" text
    const curLang = localStorage.getItem('s_sn_lang') || 'en';
    const t = translations[curLang] || translations['en'];

    const displayDate = `${dateString.slice(0,4)}/${dateString.slice(4,6)}/${dateString.slice(6,8)}`;
    
    dateHeader.textContent = `${displayDate}`; // Simple date
    grid.innerHTML = `<p style="text-align:center; opacity:0.6; margin-top:50px;">${t['loading']}</p>`;

    const folderPath = `articles/${dateString}`;
    
    try {
        const indexRes = await fetch(`${folderPath}/index.json`);
        if (!indexRes.ok) throw new Error("Index file missing");
        
        const files = await indexRes.json();
        
        grid.innerHTML = '';
        if (files.length === 0) {
            grid.innerHTML = '<p>No data segments found.</p>';
            return;
        }

        for (const file of files) {
            try {
                const articleRes = await fetch(`${folderPath}/${file}`);
                if (articleRes.ok) {
                    const fullText = await articleRes.text();
                    createArticleCard(fullText, displayDate);
                }
            } catch (err) {
                console.warn(`Failed to load ${file}`, err);
            }
        }

    } catch (error) {
        console.error(error);
        grid.innerHTML = `
            <div class="glass-panel" style="text-align:center; padding:30px; color:#ef4444; border-color: rgba(239, 68, 68, 0.3);">
                <h3 style="margin-bottom:10px;">Archive Error 404</h3>
                <p>Data segment for ${displayDate} is unreachable.</p>
            </div>
        `;
    }
}

function createArticleCard(fullText, dateDisplay) {
    const grid = document.getElementById('articles-grid');
    const lines = fullText.split('\n');
    const title = lines[0] || "Untitled Segment";
    const body = lines.slice(1).join('\n').trim();

    // Get current language for "Read More" text
    const curLang = localStorage.getItem('s_sn_lang') || 'en';
    const readMoreText = (curLang === 'zh') ? '閱讀全文 &rarr;' : 'Read Full Segment &rarr;';

    const card = document.createElement('article');
    card.className = 'article-card rainbow-hover'; 
    
    card.innerHTML = `
        <h3>${title}</h3>
        <div class="read-more">${readMoreText}</div>
    `;

    card.addEventListener('click', () => {
        openReader(title, body, dateDisplay);
    });

    grid.appendChild(card);
}

function openReader(title, body, dateStr) {
    document.getElementById('reader-title').textContent = title;
    document.getElementById('reader-content').textContent = body;
    document.getElementById('reader-date-display').textContent = dateStr;
    
    // Update Back button text based on language
    const curLang = localStorage.getItem('s_sn_lang') || 'en';
    const t = translations[curLang] || translations['en'];
    // Assuming there is a back button in reader view, though we handle it via HTML onclick usually.
    
    showView('reader-view');
}

function closeReader() {
    showView('news-view');
}