# Presentation Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Обновить коммерческую PDF-презентацию: улучшить типографику, заменить разбор `anamai.kz` на `smartprof.kz`, добавить CTA, контакты и более дорогой финальный closing-slide.

**Architecture:** Правки вносятся в единый генератор [src/build-deck.mjs](/C:/Users/boostseller/Documents/Codex/2026-05-06/350-750-1200-250-seo-aeo/src/build-deck.mjs). Внешние факты и визуалы по `smartprof.kz` и `BOOSTSELLER` собираются как входные данные, затем deck пересобирается в PDF и проверяется по PNG-превью.

**Tech Stack:** Node.js, `skia-canvas`, локальный deck generator, web/CLI research, PNG preview QA

---

### Task 1: Собрать новый контент и активы

**Files:**
- Modify: `C:\Users\boostseller\Documents\Codex\2026-05-06\350-750-1200-250-seo-aeo\scratch\asset-sources.md`
- Create/Refresh: `C:\Users\boostseller\Documents\Codex\2026-05-06\350-750-1200-250-seo-aeo\assets\smartprof-home.png`

- [ ] Извлечь ключевые сигналы по `smartprof.kz` для короткого разбора на 1 слайд
- [ ] Получить новый screenshot homepage
- [ ] Уточнить контакты/CTA для closing-slide

### Task 2: Подправить типографику и переносы

**Files:**
- Modify: `C:\Users\boostseller\Documents\Codex\2026-05-06\350-750-1200-250-seo-aeo\src\build-deck.mjs`

- [ ] Пройти по проблемным заголовкам и подзаголовкам
- [ ] Увеличить ключевые шрифты там, где это усиливает иерархию
- [ ] Уменьшить вторичный текст и скорректировать локальные ширины/переносы

### Task 3: Обновить финальные слайды

**Files:**
- Modify: `C:\Users\boostseller\Documents\Codex\2026-05-06\350-750-1200-250-seo-aeo\src\build-deck.mjs`

- [ ] Полностью заменить контент разбора `anamai.kz` на `smartprof.kz`
- [ ] Усилить предпоследний слайд с доп. возможностями
- [ ] Добавить новый финальный премиальный closing-slide с CTA и контактами

### Task 4: Пересобрать и проверить

**Files:**
- Output: `C:\Users\boostseller\Documents\Codex\2026-05-06\350-750-1200-250-seo-aeo\output\boostseller-seo-aeo-geo-kp.pdf`
- Output: `C:\Users\boostseller\Documents\Codex\2026-05-06\350-750-1200-250-seo-aeo\scratch\previews\slide-*.png`

- [ ] Запустить сборку:

```powershell
& 'C:\Users\boostseller\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' 'C:\Users\boostseller\Documents\Codex\2026-05-06\350-750-1200-250-seo-aeo\src\build-deck.mjs'
```

- [ ] Проверить свежие PNG-превью вручную
- [ ] Подтвердить итоговый PDF-путь и отсутствие критичных артефактов
