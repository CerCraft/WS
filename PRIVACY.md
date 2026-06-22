# Privacy Policy / Политика конфиденциальности

**[English](#english) | [Русский](#русский)**

**Last updated / Обновлено:** June 2026

---

<a id="english"></a>
## English

### Summary

Web Shield does not collect, store, or transmit any personal data. All analysis is performed locally in your browser.

### What data we collect

**None.** Web Shield operates entirely on your local machine. No data leaves your browser.

### How it works

#### Tracker detection
- The extension monitors network requests made by webpages you visit
- Requests are matched against a built-in database of known tracker domains
- Matched trackers are displayed in the popup UI
- **No data about these requests is sent to any external server**

#### Link safety analysis
- When you hover over a link, the extension analyzes the URL structure locally
- Analysis includes checking for IP addresses, suspicious keywords, excessive subdomains, and protocol security
- **No URL data is sent to any external service**

#### Data storage
- Tracker data is temporarily stored in `chrome.storage.local` for the duration of your browsing session
- Data is automatically cleared when you close the tab
- **No persistent storage of browsing history or personal data**

### Permissions explained

| Permission | Purpose | Data handling |
|-----------|---------|---------------|
| `webRequest` | Intercept network requests to detect trackers | Data stays local, never transmitted |
| `storage` | Cache tracker data per tab | Cleared automatically on tab close |
| `activeTab` | Access current tab URL and ID | Used only for display in popup |
| `scripting` | Inject link safety UI into webpages | No data collected from pages |
| `declarativeNetRequest` | Future tracker blocking feature | Not currently used |

### Third-party services

Web Shield does not communicate with any third-party services. All functionality is self-contained.

### Data sharing

We do not share, sell, or transfer any data to third parties, as we do not collect any data.

### Children's privacy

Web Shield is safe for users of all ages. It does not collect any data from children or adults.

### Changes to this policy

If this privacy policy changes, the updated version will be posted on the GitHub repository.

### Contact

For questions about this privacy policy:

- GitHub: https://github.com/CerCraft/WS
- Issues: https://github.com/CerCraft/WS/issues

---

<a id="русский"></a>
## Русский

### Краткое описание

Web Shield не собирает, не хранит и не передаёт никакие персональные данные. Весь анализ выполняется локально в вашем браузере.

### Какие данные мы собираем

**Никакие.** Web Shield работает исключительно на вашем локальном устройстве. Никакие данные не покидают ваш браузер.

### Как это работает

#### Обнаружение трекеров
- Расширение отслеживает сетевые запросы, которые делают посещаемые вами веб-страницы
- Запросы сопоставляются со встроенной базой известных доменов трекеров
- Обнаруженные трекеры отображаются в popup-интерфейсе
- **Никакие данные об этих запросах не отправляются на внешние серверы**

#### Анализ безопасности ссылок
- При наведении курсора на ссылку расширение локально анализирует структуру URL
- Анализ включает проверку на IP-адреса, подозрительные ключевые слова, чрезмерное количество поддоменов и безопасность протокола
- **Никакие данные URL не отправляются во внешние сервисы**

#### Хранение данных
- Данные о трекерах временно хранятся в `chrome.storage.local` на время вашей сессии просмотра
- Данные автоматически очищаются при закрытии вкладки
- **Никакого постоянного хранения истории просмотров или персональных данных**

### Объяснение разрешений

| Разрешение | Назначение | Обработка данных |
|-----------|-----------|------------------|
| `webRequest` | Перехват сетевых запросов для обнаружения трекеров | Данные остаются локально, никогда не передаются |
| `storage` | Кэширование данных трекеров по вкладкам | Очищается автоматически при закрытии вкладки |
| `activeTab` | Доступ к URL и ID текущей вкладки | Используется только для отображения в popup |
| `scripting` | Внедрение UI безопасности ссылок в веб-страницы | Данные со страниц не собираются |
| `declarativeNetRequest` | Функция блокировки трекеров (будущее) | В настоящее время не используется |

### Сторонние сервисы

Web Shield не взаимодействует со сторонними сервисами. Вся функциональность самодостаточна.

### Передача данных

Мы не передаём, не продаём и не передаём никакие данные третьим лицам, поскольку не собираем никаких данных.

### Приватность детей

Web Shield безопасен для пользователей всех возрастов. Он не собирает никаких данных ни от детей, ни от взрослых.

### Изменения в политике

Если эта политика конфиденциальности изменится, обновлённая версия будет размещена в репозитории GitHub.

### Контакты

По вопросам, связанным с этой политикой конфиденциальности:

- GitHub: https://github.com/CerCraft/WS

