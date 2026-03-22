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
4. Загружает `out/` как Pages artifact в job `build` и публикует его в отдельном job `deploy` через `actions/deploy-pages`.

Проект собирается как статика через `output: 'export'` в `next.config.mjs`, поэтому он подходит для GitHub Pages. Для кастомного домена в CI принудительно используется пустой `BASE_PATH`, чтобы ссылки были от корня домена.


### Если в логах есть `Failed to create deployment (status: 404)`

Это означает, что GitHub Pages для репозитория ещё не активирован в режиме Actions.

Что нужно один раз проверить в настройках:

1. `Settings → Pages`.
2. `Build and deployment → Source = GitHub Actions`.

После этого workflow будет идти в 2 job: `build` → `deploy`, а в job `deploy` появится `page_url` и ссылка в Environment `github-pages`.


### По какой ссылке открывать сайт

После успешного workflow смотри:

- ссылка из job `deploy` (`steps.deployment.outputs.page_url`) — это главный источник правды
- обычно это `https://istominvi.github.io/mihe35/`
- и (после привязки DNS) `https://mihe35.ru/`

Если `mihe35.ru` ещё не выпущен/не обновился в DNS, временно проверяй по `github.io` ссылке.

## Custom domain `mihe35.ru`

Для автопривязки домена в деплое добавлены:

- `public/CNAME` со значением `mihe35.ru`
- `public/.nojekyll` для корректной раздачи статических `_next/*` файлов

Это значит, что при каждом деплое GitHub Pages будет использовать твой домен из `CNAME`.

### Что включить в настройках GitHub (один раз)

1. `Settings` → `Pages`.
2. В `Build and deployment` выбрать **Source = GitHub Actions**.
3. Убедиться, что домен `mihe35.ru` отображается в Custom domain (обычно подтянется автоматически после первого деплоя), затем включить `Enforce HTTPS` после выпуска сертификата (может занять от нескольких минут до нескольких часов).

После этого любой merge в `main` будет автоматически выкатывать сайт на GitHub Pages.

> Примечание: деплой идёт через стандартный Pages pipeline `build -> deploy`, поэтому в `Settings → Pages` должен быть выбран источник `GitHub Actions`.
