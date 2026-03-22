# Birthday page

## Видео для 1-й и 3-й коробки

Страница поддерживает 2 способа источника видео:

1. **Локальные файлы** (по умолчанию):
   - `public/video/congratulation.mp4`
   - `public/video/babar.mp4`
2. **Внешние URL через переменные окружения**:
   - `NEXT_PUBLIC_CONGRATULATION_VIDEO_URL`
   - `NEXT_PUBLIC_CHILDHOOD_VIDEO_URL`

Если локальный файл не найден, в модальном окне появится подсказка с тем, что нужно добавить файл или указать переменную окружения.

### Почему не загружается через web-интерфейс GitHub

GitHub Web Upload ограничен ~25 MB на файл. Это ограничение интерфейса.

- Через `git push` можно отправлять файлы до 100 MB (hard limit GitHub для обычного git-объекта).
- Для больших файлов используйте Git LFS или внешнее хранилище (Cloudflare R2, S3, Bunny/CDN и т.д.) + `NEXT_PUBLIC_*_VIDEO_URL`.

## Деплой на GitHub Pages (после merge в `main`)

В репозитории уже добавлен workflow: `.github/workflows/deploy-pages.yml`.

Что он делает:

1. На каждый `push` в `main` (включая merge PR) запускает сборку.
2. Ставит Node.js 22 и pnpm 10.
3. Выполняет `pnpm install --frozen-lockfile` и `pnpm build`.
4. Публикует папку `out/` в ветку `gh-pages` через `peaceiris/actions-gh-pages`.

Проект собирается как статика через `output: 'export'` в `next.config.mjs`, поэтому он подходит для GitHub Pages. Для кастомного домена в CI принудительно используется пустой `BASE_PATH`, чтобы ссылки были от корня домена.


### Если в логах есть `Failed to create deployment (status: 404)`

Это ошибка API-деплоя `actions/deploy-pages` (у репозитория не активирован Pages site).

В текущем workflow используется деплой в ветку `gh-pages` (без GitHub Pages Deployment API), чтобы избежать 404 на endpoint `createPagesDeployment`.

Что нужно один раз проверить в настройках:

1. `Settings → Pages`.
2. `Build and deployment → Source = Deploy from a branch`.
3. `Branch = gh-pages` и `/ (root)`.

После этого каждый push в `main` будет обновлять ветку `gh-pages`, а GitHub Pages будет забирать статику оттуда.


### По какой ссылке открывать сайт

После успешного workflow смотри:

- `https://istominvi.github.io/mihe35/`
- `https://mihe35.ru/`

Если `mihe35.ru` ещё не выпущен/не обновился в DNS, временно проверяй по `github.io` ссылке выше.

## Custom domain `mihe35.ru`

Для автопривязки домена в деплое добавлены:

- `public/CNAME` со значением `mihe35.ru`
- `public/.nojekyll` для корректной раздачи статических `_next/*` файлов

Это значит, что при каждом деплое GitHub Pages будет использовать твой домен из `CNAME`.

### Что включить в настройках GitHub (один раз)

1. `Settings` → `Pages`.
2. В `Build and deployment` выбрать **Source = Deploy from a branch**.
3. Выбрать ветку **`gh-pages`** и папку **`/ (root)`**.
4. Убедиться, что домен `mihe35.ru` отображается в Custom domain (обычно подтянется автоматически после первого деплоя), затем включить `Enforce HTTPS` после выпуска сертификата (может занять от нескольких минут до нескольких часов).

После этого любой merge в `main` будет автоматически выкатывать сайт на GitHub Pages.

> Примечание: теперь деплой идёт через ветку `gh-pages`, поэтому в `Settings → Pages` должен быть выбран источник `Deploy from a branch` и ветка `gh-pages`.
