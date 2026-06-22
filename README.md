# Web Shield

**[English](#english) | [Русский](#русский)**

---

<a id="english"></a>
# English

**Tactical tracker visualizer and link safety scanner for modern browsers.**

Browser extension that reveals the hidden tracking ecosystem of any website and warns about potentially dangerous links in real-time.

## Overview

Web Shield provides complete visibility into third-party tracking activities on any webpage you visit. It combines real-time network analysis with link safety heuristics, presenting the data through an interactive tactical HUD interface.

### Key capabilities

- **Real-time tracker detection** — identifies 50+ known trackers including Google Analytics, Facebook Pixel, Yandex Metrika, Chartbeat, Optimizely, and others
- **Interactive network map** — visualizes connections between the current website and third-party trackers using force-directed graph layout
- **Link safety scanner** — analyzes URLs on hover using multiple heuristics (IP addresses, suspicious keywords, excessive subdomains, unencrypted connections)
- **Dangerous link highlighting** — suspicious and dangerous links are underlined directly on the page
- **Tactical HUD design** — cyberpunk-inspired interface with JetBrains Mono typography and amber accent colors
- **100% private** — all analysis happens locally in your browser, no data is transmitted externally

## Installation

### From source

```bash
git clone https://github.com/CerCraft07/web-shield.git
cd web-shield
npm install
npm run build
```

Then load the `dist/` folder as an unpacked extension:

1. Open `chrome://extensions/`
2. Enable **Developer mode** (toggle in top-right corner)
3. Click **Load unpacked**
4. Select the `dist/` directory

### From release

1. Download the latest ZIP from [Releases](../../releases)
2. Extract to any folder
3. Follow steps 1-4 above

## Technical stack

| Component | Technology |
|-----------|-----------|
| Language | TypeScript (strict mode) |
| Build system | Rollup with IIFE output |
| Graph visualization | vis-network |
| Manifest version | Chrome Extension Manifest V3 |
| Typography | JetBrains Mono, Inter |

### Architecture

```
src/
├── background.ts      # Service worker — intercepts network requests
├── content.ts         # Content script — injects link safety UI
├── lib/
│   ├── trackers.ts    # Tracker database and matching logic
│   └── safety.ts      # URL safety heuristics
└── popup/
    ├── popup.html     # Main UI
    ├── popup.css      # Tactical HUD styling
    └── popup.ts       # Graph rendering and data display
```

### Permissions used

- `webRequest` — intercept network requests to detect trackers
- `storage` — cache tracker data per tab (automatically cleared on tab close)
- `activeTab` — access current tab information
- `scripting` — inject link safety UI into webpages
- `declarativeNetRequest` — future support for tracker blocking

## Development

```bash
npm install      # Install dependencies
npm run build    # Build to dist/
npm run watch    # Auto-rebuild on file changes
```

After building, load the `dist/` folder as an unpacked extension in Chrome.

## Testing

### Tracker detection

1. Open a major news website (e.g., `bbc.com`, `nytimes.com`, `habr.com`)
2. Wait 3-5 seconds for trackers to load
3. Click the extension icon to view the network map and tracker list

### Link safety scanner

1. Hover over any link on any webpage
2. A tooltip appears showing the security rating (SECURE / SUSPICIOUS / DANGEROUS)
3. Dangerous links are underlined with a red line directly on the page

### Manual testing with synthetic links

Open DevTools (F12) on any page and execute:

```javascript
const a = document.createElement('a');
a.href = 'http://192.168.1.1/login?user=admin&pass=123';
a.textContent = 'Test phishing link';
a.style.cssText = 'display:block;padding:20px;background:#fee;color:#900;';
document.body.prepend(a);
```

Hover over the created link to see the DANGEROUS rating with detailed reasons.

## Privacy

Web Shield does not collect, store, or transmit any personal data.

- All analysis is performed locally in your browser
- Tracker detection uses a built-in database of known tracker domains
- Link safety analysis uses local heuristics (URL structure, keywords, etc.)
- No external APIs are called
- No data is sent to any server
- No accounts or telemetry

See [PRIVACY.md](./PRIVACY.md) for details.

## Roadmap

- [ ] Integration with VirusTotal API for real-time URL reputation
- [ ] Tracker blocking via `declarativeNetRequest`
- [ ] Historical statistics and charts
- [ ] Custom tracker database management
- [ ] Firefox and Edge support
- [ ] Export reports to PDF

## License

MIT License. See [LICENSE](./LICENSE) for details.

---

<a id="русский"></a>
# Русский

**Тактический визуализатор трекеров и сканер безопасности ссылок для современных браузеров.**

Расширение браузера, которое выявляет скрытую экосистему трекинга на любом сайте и предупреждает о потенциально опасных ссылках в реальном времени.

## Обзор

Web Shield обеспечивает полную видимость активности сторонних трекеров на любой веб-странице. Он сочетает анализ сети в реальном времени с эвристиками безопасности ссылок, представляя данные через интерактивный тактический HUD-интерфейс.

### Ключевые возможности

- **Обнаружение трекеров в реальном времени** — определяет 50+ известных трекеров, включая Google Analytics, Facebook Pixel, Яндекс.Метрику, Chartbeat, Optimizely и другие
- **Интерактивная карта сети** — визуализирует связи между текущим сайтом и сторонними трекерами с использованием графа с силовой компоновкой
- **Сканер безопасности ссылок** — анализирует URL при наведении по множеству эвристик (IP-адреса, подозрительные ключевые слова, чрезмерное количество поддоменов, незашифрованные соединения)
- **Подсветка опасных ссылок** — подозрительные и опасные ссылки подчёркиваются прямо на странице
- **Тактический HUD-дизайн** — киберпанк-интерфейс с типографикой JetBrains Mono и янтарными акцентными цветами
- **100% приватность** — весь анализ происходит локально в браузере, данные не передаются вовне

## Установка

### Из исходного кода

```bash
git clone https://github.com/CerCraft/WS.git
npm install
npm run build
```

Затем загрузите папку `dist/` как распакованное расширение:

1. Откройте `chrome://extensions/`
2. Включите **Режим разработчика** (переключатель в правом верхнем углу)
3. Нажмите **Загрузить распакованное**
4. Выберите директорию `dist/`

### Из релиза

1. Скачайте последний ZIP из [Releases](../../releases)
2. Распакуйте в любую папку
3. Выполните шаги 1-4 выше

## Технический стек

| Компонент | Технология |
|-----------|-----------|
| Язык | TypeScript (строгий режим) |
| Система сборки | Rollup с IIFE-выводом |
| Визуализация графов | vis-network |
| Версия манифеста | Chrome Extension Manifest V3 |
| Типографика | JetBrains Mono, Inter |

### Архитектура

```
src/
├── background.ts      # Service worker — перехватывает сетевые запросы
├── content.ts         # Content script — внедряет UI безопасности ссылок
├── lib/
│   ├── trackers.ts    # База трекеров и логика сопоставления
│   └── safety.ts      # Эвристики безопасности URL
└── popup/
    ├── popup.html     # Основной интерфейс
    ├── popup.css      # Тактическая HUD-стилизация
    └── popup.ts       # Рендеринг графа и отображение данных
```

### Используемые разрешения

- `webRequest` — перехват сетевых запросов для обнаружения трекеров
- `storage` — кэширование данных трекеров по вкладкам (автоматически очищается при закрытии вкладки)
- `activeTab` — доступ к информации о текущей вкладке
- `scripting` — внедрение UI безопасности ссылок в веб-страницы
- `declarativeNetRequest` — будущая поддержка блокировки трекеров

## Разработка

```bash
npm install      # Установка зависимостей
npm run build    # Сборка в dist/
npm run watch    # Автоматическая пересборка при изменениях
```

После сборки загрузите папку `dist/` как распакованное расширение в Chrome.

## Тестирование

### Обнаружение трекеров

1. Откройте крупный новостной сайт (например, `bbc.com`, `nytimes.com`, `habr.com`)
2. Подождите 3-5 секунд для загрузки трекеров
3. Кликните на иконку расширения для просмотра карты сети и списка трекеров

### Сканер безопасности ссылок

1. Наведите курсор на любую ссылку на любой веб-странице
2. Появится тултип с рейтингом безопасности (SECURE / SUSPICIOUS / DANGEROUS)
3. Опасные ссылки подчёркиваются красной линией прямо на странице

### Ручное тестирование с синтетическими ссылками

Откройте DevTools (F12) на любой странице и выполните:

```javascript
const a = document.createElement('a');
a.href = 'http://192.168.1.1/login?user=admin&pass=123';
a.textContent = 'Тестовая фишинговая ссылка';
a.style.cssText = 'display:block;padding:20px;background:#fee;color:#900;';
document.body.prepend(a);
```

Наведите курсор на созданную ссылку, чтобы увидеть рейтинг DANGEROUS с подробными причинами.

## Приватность

Web Shield не собирает, не хранит и не передаёт никакие персональные данные.

- Весь анализ выполняется локально в вашем браузере
- Обнаружение трекеров использует встроенную базу известных доменов трекеров
- Анализ безопасности ссылок использует локальные эвристики (структура URL, ключевые слова и т.д.)
- Внешние API не вызываются
- Данные не отправляются на какие-либо серверы
- Нет аккаунтов или телеметрии

Подробности в [PRIVACY.md](./PRIVACY.md).

## План развития

- [ ] Интеграция с VirusTotal API для проверки репутации URL в реальном времени
- [ ] Блокировка трекеров через `declarativeNetRequest`
- [ ] Историческая статистика и графики
- [ ] Управление пользовательской базой трекеров
- [ ] Поддержка Firefox и Edge
- [ ] Экспорт отчётов в PDF

## Лицензия

MIT License. Подробности в [LICENSE](./LICENSE).

---

## Author / Автор

**CerCraft07** — [GitHub](https://github.com/CerCraft07)
