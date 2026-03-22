# Birthday page

## Видео для 1-й и 3-й коробки

Страница поддерживает 2 способа источника видео:

1. **Локальные файлы** (по умолчанию):
   - `public/video/IMG_1912.mov`
   - `public/video/babar.mp4`
2. **Внешние URL через переменные окружения**:
   - `NEXT_PUBLIC_CONGRATULATION_VIDEO_URL`
   - `NEXT_PUBLIC_CHILDHOOD_VIDEO_URL`

Если локальный файл не найден, в модальном окне появится подсказка с тем, что нужно добавить файл или указать переменную окружения.

### Почему не загружается через web-интерфейс GitHub

GitHub Web Upload ограничен ~25 MB на файл. Это ограничение интерфейса.

- Через `git push` можно отправлять файлы до 100 MB (hard limit GitHub для обычного git-объекта).
- Для больших файлов используйте Git LFS или внешнее хранилище (Cloudflare R2, S3, Bunny/CDN и т.д.) + `NEXT_PUBLIC_*_VIDEO_URL`.

## Деплой на GitHub Pages (статический)

Проект уже настроен на static export (`output: 'export'` в `next.config.mjs`).

Пример workflow `.github/workflows/deploy-pages.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with:
          version: 10
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    needs: build
    runs-on: ubuntu-latest
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

Если сайт не на custom domain, обычно нужен `basePath` под имя репозитория (например `/mihe35`).
