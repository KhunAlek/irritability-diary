# Two personal observation diaries

A small Russian-language diary for Alex and a separate observer diary for Olga. Built for Chrome on Android, including POCO X6 Pro. GitHub Pages delivers the application files; diary entries stay in the browser on each device.

## Install on each phone

1. Open the published website in **Chrome**, not inside a messenger's browser.
2. Alex opens `/alex/`; Olga opens `/olga/`.
3. Wait until the page says **«Готово к офлайн»**.
4. Tap Chrome's **⋮ → «Установить и создать ярлык» → «Установить»**. Depending on the Chrome version, the option may be called **«Добавить на главный экран»**. If the page shows **«Установить»**, that button can start installation too.
5. Open the new **«Дневник Алекс»** or **«Дневник Оля»** icon. Turn on airplane mode and open it again once to check offline operation on your phone.
6. Open **«Настройки и резервная копия»** and set the observation start date. Add the actual medication start date when known. Use identical dates on both phones.

The initial visit needs internet. The cached app then supports offline entry. Updates download when internet is available. Reinstalling, changing the website address, using a different browser, or clearing browser data can affect access to local records; export your backup first.

## Daily use

Open the icon, select the date, fill the form and tap **«Сохранить»**. Older entries load into the same form through **«Мой журнал»**. One saved entry exists per date. Unsaved changes become local drafts; drafts are excluded from statistics until saved.

Alex records irritation, sleep, pain, medication taken and possible side effects. Olga first chooses whether she observed enough that day. **«Нет»** saves an insufficient-observation day without numerical zeros. An explicit **«Не могу оценить»** differs from a real zero.

## Weekly comparisons

The baseline window is the seven calendar days before the medication start date. Therapy weeks are consecutive seven-day intervals starting on that date. Before a medication start date is set, observation weeks start on the observation start date. Dates and period boundaries use Bangkok time (UTC+7).

Each metric uses only known values. Percentage comparisons need at least five known values in both completed seven-day windows. A baseline of zero produces an absolute change. The diaries remain separate; there is no combined score or automatic medical conclusion.

To compare journals:

1. After a week finishes, open **«Недельные итоги»**.
2. Tap **«Поделиться итогами»**, or **«Скачать итоги»** and send the resulting JSON file yourself.
3. On the other phone, open **«Недельные итоги» → «Открыть итоги другого пользователя»** and choose that file.
4. Repeat in the opposite direction if both users want comparisons.
5. If an old entry is corrected, export and exchange a new file. Import replaces the previous partner-summary copy; it does not alter your daily records.

Shared files contain only completed weekly aggregates, counts and period dates. They exclude daily rows, free-text notes, medication names/doses, symptoms, sleep and pain. There is no automatic transfer between phones. The device's clock determines local period closure; this local version has no server enforcing access rules.

## Backup and restore

Once a week, download **«Скачать резервную копию JSON»** under settings. Verify that the file appears in Downloads, then keep a copy somewhere separate from the phone. This backup contains your own records, drafts, dates and imported summary copy. It contains personal information; share weekly summaries instead when you only want comparisons.

To move to a new phone, install your diary, choose **«Восстановить свою копию»**, select your own backup and confirm. Restoration replaces local data for that diary. Backups from the other role are rejected. CSV export contains saved entries, with explicit unknown-value columns; drafts are excluded.

**«Защитить хранение от автоматической очистки»** asks Chrome for persistent storage. Chrome may decline. Neither installation nor this permission replaces a backup. There is no online login; access is protected by the phone's lock and control over its browser.

## Hosting on GitHub Pages

Upload this project's files without changing their relative paths. Enable **Settings → Pages → Deploy from a branch → main → /(root) → Save**. GitHub publishes only the app code and icons. Never upload downloaded diary backups, CSV files, summary exchanges or real test records to the repository.

Project structure:

```text
index.html                 Diary chooser
alex/index.html            Alex's self-contained form, style and logic
olga/index.html            Olga's self-contained form, style and logic
alex/manifest.webmanifest  Alex's installation settings
olga/manifest.webmanifest  Olga's installation settings
alex/sw.js                 Alex's offline cache
olga/sw.js                 Olga's offline cache
alex/icon-*.png            Alex's green icons
olga/icon-*.png            Olga's purple icons
.nojekyll                  Serve files without Jekyll processing
```

The HTML pages include their styles and application logic; no third-party scripts, fonts, analytics or libraries load at runtime. Supporting manifest, cache and icon files enable installation and offline reopening. Entries are held in role-specific local storage on the website origin; this separation organizes the app and is not an account or encryption boundary. Other trusted apps hosted on the same origin share that browser security boundary. GitHub receives ordinary requests for app delivery, not the diary contents.

## Verification

Core checks cover date arithmetic and Bangkok boundaries; baseline/therapy windows; zero versus unknown values; insufficient observations; per-metric denominators; comparison completeness and zero-base rules; closed-period-only exports; whitelisting and rejection of invalid summary files; CSV quoting and formula escaping; backup record validation; corrupted-storage handling; and draft sanitization.

Browser checks cover daily entry, editing without duplicate entries, draft restoration, local backup import, separate role forms, collapsible sections, no horizontal overflow at 320 px, and cache readiness. Actual POCO installation is a final check on your devices.

## Updates

Change the HTML and supporting files, and increment the cache version in each `sw.js`. The app offers **«Обновить приложение»** when a new service worker is waiting. Updates preserve entries stored under the existing diary URL. Keep the published hostname and role paths stable.
