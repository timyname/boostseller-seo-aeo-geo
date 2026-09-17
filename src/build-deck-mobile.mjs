import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  Presentation,
  auto,
  column,
  fill,
  fixed,
  fr,
  grid,
  grow,
  hug,
  image,
  layers,
  panel,
  row,
  shape,
  text,
  wrap,
  drawSlideToCtx,
} from "file:///C:/Users/boostseller/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/@oai/artifact-tool/dist/artifact_tool.mjs";
import {
  paint,
  stroke,
} from "file:///C:/Users/boostseller/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/@oai/artifact-tool/dist/presentation-jsx/index.mjs";
import {
  Canvas,
} from "file:///C:/Users/boostseller/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/.pnpm/@oai+artifact-tool@file+loc_40138bddc7e6fa8f5488e20ef9bf79a4/node_modules/@oai/artifact-tool/node_modules/skia-canvas/lib/index.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");
const OUTPUT_DIR = path.join(ROOT, "output");
const PREVIEW_DIR = path.join(ROOT, "scratch", "previews-mobile");
const ASSETS = path.join(ROOT, "assets");

const pdfPath = path.join(OUTPUT_DIR, "boostseller-seo-aeo-geo-kp-mobile.pdf");

const W = 1080;
const H = 1920;

const DISPLAY = "Bahnschrift";
const BODY = "Aptos";
const BODY_SCALE = 1.45;
const UI_SCALE = 1.3;
const SUBTITLE_SCALE = 1.32;

const COLORS = {
  ink: "#111317",
  muted: "#5A6472",
  soft: "#7E8792",
  line: "#D7D9DE",
  lightBg: "#F5F2EC",
  paper: "#FFFDFC",
  dark: "#090D14",
  white: "#FFFFFF",
  green: "#7AE30C",
  greenSoft: "#DDF8AA",
  cyan: "#46D7FF",
  cyanSoft: "#D9F6FF",
  gold: "#C7A158",
  goldSoft: "#F4E6C8",
  coral: "#FF8A5B",
};

function bodyFs(value) {
  return Math.round(value * BODY_SCALE);
}

function uiFs(value) {
  return Math.round(value * UI_SCALE);
}

function subtitleFs(value) {
  return Math.round(value * SUBTITLE_SCALE);
}

const SOURCE_LINKS = {
  astanaFountain:
    "https://unsplash.com/photos/a-city-skyline-with-a-fountain-JvQCPAtNMGw",
  astanaSunset:
    "https://unsplash.com/photos/a-view-of-a-city-skyline-at-sunset-CxEaMcjrw28",
  aiNetwork:
    "https://unsplash.com/photos/abstract-blue-lines-and-dots-on-black-background-KKx5r-w1dPo",
  aiHero:
    "https://unsplash.com/photos/ai-letters-on-a-glowing-orange-and-blue-background-pd9jBKNLyj4",
  smartprof: "https://smartprof.kz/",
  boostseller: "https://boostseller.kz/",
  referencePdf:
    "file:///C:/Users/boostseller/Downloads/Telegram%20Desktop/%D0%94%D0%BC%D0%B8%D1%82%D1%80%D0%B8%D0%B9%20%D0%A2%D0%9E%D0%9E.pdf",
};

function asset(name) {
  return path.join(ASSETS, name);
}

function mimeFor(filename) {
  const lower = filename.toLowerCase();
  if (lower.endsWith(".png")) return "image/png";
  if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) return "image/jpeg";
  if (lower.endsWith(".webp")) return "image/webp";
  throw new Error(`Unsupported asset type for ${filename}`);
}

async function buildMediaMap() {
  const assetNames = [
    "wave-top.png",
    "wave-bottom.png",
    "astana-fountain.jpg",
    "astana-sunset.jpg",
    "ai-network.jpg",
    "ai-hero.jpg",
    "smartprof-home-crop.png",
  ];

  const entries = await Promise.all(
    assetNames.map(async (name) => {
      const bytes = await fs.readFile(asset(name));
      const mime = mimeFor(name);
      const dataUrl = `data:${mime};base64,${bytes.toString("base64")}`;
      return [name, dataUrl];
    }),
  );

  return Object.fromEntries(entries);
}

function img(media, assetName, config) {
  return image({
    ...config,
    dataUrl: media[assetName],
  });
}

function s(value, dark = false, fontSize = 28) {
  return text(value, {
    width: fill,
    height: hug,
    style: {
      typeface: BODY,
      fontSize: bodyFs(fontSize),
      color: dark ? COLORS.white : COLORS.ink,
    },
  });
}

function label(textValue, color = COLORS.green, fg = COLORS.dark) {
  const textWidth = Math.max(96, Math.ceil(textValue.length * 17));
  return panel(
    {
      fill: color,
      borderRadius: 999,
      padding: { x: 20, y: 14 },
      width: hug,
      height: hug,
      align: "center",
      justify: "center",
    },
    text(textValue, {
      width: fixed(textWidth),
      height: hug,
      style: {
        typeface: DISPLAY,
        fontSize: uiFs(18),
        bold: true,
        color: fg,
      },
    }),
  );
}

function smallKicker(textValue, dark = false) {
  return row(
    { width: fill, height: hug, gap: 16, align: "center" },
    [
      shape({
        width: 58,
        height: 5,
        fill: COLORS.green,
        borderRadius: 999,
      }),
      text(textValue, {
        width: hug,
        height: hug,
        style: {
          typeface: DISPLAY,
          fontSize: uiFs(24),
          bold: true,
          color: dark ? COLORS.cyan : COLORS.muted,
        },
      }),
    ],
  );
}

function titleBlock({
  title,
  subtitle,
  dark = false,
  titleWidth = wrap(920),
  subtitleWidth = wrap(900),
  titleSize = 74,
  subtitleSize = 34,
}) {
  return column(
    {
      width: fill,
      height: hug,
      gap: 16,
    },
    [
      text(title, {
        width: titleWidth,
        height: hug,
        style: {
          typeface: DISPLAY,
          fontSize: titleSize,
          bold: true,
          color: dark ? COLORS.white : COLORS.ink,
        },
      }),
      text(subtitle, {
        width: subtitleWidth,
        height: hug,
        style: {
          typeface: BODY,
          fontSize: subtitleFs(subtitleSize),
          color: dark ? "#D9E3F0" : COLORS.muted,
        },
      }),
    ],
  );
}

function bulletItem(textValue, opts = {}) {
  const dark = opts.dark ?? false;
  const accent = opts.accent ?? COLORS.green;
  const size = opts.size ?? 28;
  const bodyWidth = opts.width ?? fill;

  return row(
    {
      width: fill,
      height: hug,
      gap: 16,
      align: "start",
    },
    [
      panel(
        {
          width: 22,
          height: 22,
          fill: accent,
          borderRadius: 999,
          padding: 0,
          align: "center",
          justify: "center",
        },
        shape({
          width: 8,
          height: 8,
          fill: dark ? COLORS.dark : COLORS.white,
          borderRadius: 999,
        }),
      ),
      text(textValue, {
        width: bodyWidth,
        height: hug,
        style: {
          typeface: BODY,
          fontSize: bodyFs(size),
          color: dark ? COLORS.white : COLORS.ink,
        },
      }),
    ],
  );
}

function bulletList(items, opts = {}) {
  return column(
    {
      width: fill,
      height: hug,
      gap: opts.gap ?? 14,
    },
    items.map((item) => bulletItem(item, opts)),
  );
}

function insightCard({
  title,
  body,
  fillColor,
  lineColor,
  titleColor,
  bodyColor,
  cardHeight = fill,
  cardPadding = { x: 32, y: 32 },
  titleSize = 34,
  bodySize = 26,
  contentGap = 14,
}) {
  return panel(
    {
      width: fill,
      height: cardHeight,
      fill: fillColor,
      line: stroke(`2 ${lineColor}`),
      borderRadius: 30,
      padding: cardPadding,
    },
    column(
      {
        width: fill,
        height: fill,
        gap: contentGap,
      },
      [
        text(title, {
          width: fill,
          height: hug,
          style: {
            typeface: DISPLAY,
            fontSize: titleSize,
            bold: true,
            color: titleColor,
          },
        }),
        text(body, {
          width: fill,
          height: hug,
          style: {
            typeface: BODY,
            fontSize: bodyFs(bodySize),
            color: bodyColor,
          },
        }),
      ],
    ),
  );
}

function factChip(value, caption, tone = "light") {
  const dark = tone === "dark";
  return panel(
    {
      width: fill,
      height: hug,
      fill: dark ? "#111B2A" : COLORS.paper,
      line: stroke(`1 ${dark ? "#20324A" : COLORS.line}`),
      borderRadius: 24,
      padding: { x: 22, y: 20 },
    },
    column(
      {
        width: fill,
        height: hug,
        gap: 12,
      },
      [
        text(value, {
          width: fill,
          height: hug,
          style: {
            typeface: DISPLAY,
            fontSize: uiFs(34),
            bold: true,
            color: dark ? COLORS.green : COLORS.ink,
          },
        }),
        text(caption, {
          width: fill,
          height: hug,
          style: {
            typeface: BODY,
            fontSize: bodyFs(22),
            color: dark ? "#B9C6D8" : COLORS.muted,
          },
        }),
      ],
    ),
  );
}

function packageCard({
  tier,
  price,
  note,
  bullets,
  highlight = false,
  cardHeight = fill,
  cardPadding = { x: 28, y: 28 },
  contentGap = 20,
  headerGap = 10,
  headerSize = 28,
  priceSize = 54,
  noteSize = 22,
  bulletSize = 24,
  bulletGap = 12,
}) {
  const line = highlight ? COLORS.green : COLORS.line;
  const header = highlight ? COLORS.green : COLORS.cyan;
  const fillColor = highlight ? "#0D1420" : COLORS.paper;
  const fg = highlight ? COLORS.white : COLORS.ink;
  const muted = highlight ? "#AEBBD0" : COLORS.muted;

  return panel(
    {
      width: fill,
      height: cardHeight,
      fill: fillColor,
      line: stroke(`2 ${line}`),
      borderRadius: 30,
      padding: cardPadding,
    },
    column(
      {
        width: fill,
        height: fill,
        gap: contentGap,
      },
      [
        column(
          {
            width: fill,
            height: hug,
            gap: headerGap,
          },
          [
            text(tier, {
              width: fill,
              height: hug,
              style: {
                typeface: DISPLAY,
                fontSize: uiFs(headerSize),
                bold: true,
                color: header,
              },
            }),
            text(price, {
              width: fill,
              height: hug,
              style: {
                typeface: DISPLAY,
                fontSize: uiFs(priceSize),
                bold: true,
                color: fg,
              },
            }),
            text(note, {
              width: fill,
              height: hug,
              style: {
                typeface: BODY,
                fontSize: bodyFs(noteSize),
                color: muted,
              },
            }),
          ],
        ),
        bulletList(bullets, {
          dark: highlight,
          accent: highlight ? COLORS.green : COLORS.gold,
          size: bulletSize,
          gap: bulletGap,
        }),
      ],
    ),
  );
}

function timelineStep(index, title, body, tone = "light", cardHeight = fill, opts = {}) {
  const dark = tone === "dark";
  const padX = opts.padX ?? 28;
  const padY = opts.padY ?? 28;
  const contentGap = opts.contentGap ?? 18;
  const headerGap = opts.headerGap ?? 16;
  const badgeSize = opts.badgeSize ?? 76;
  const badgeFontSize = opts.badgeFontSize ?? 28;
  const badgeTextWidth = opts.badgeTextWidth ?? 52;
  const titleSize = opts.titleSize ?? 32;
  const bodySize = opts.bodySize ?? 24;
  const bodyColor = opts.bodyColor ?? (dark ? "#B9C6D8" : COLORS.muted);
  return panel(
    {
      width: fill,
      height: cardHeight,
      fill: dark ? "#0F1827" : COLORS.paper,
      line: stroke(`1 ${dark ? "#24344D" : COLORS.line}`),
      borderRadius: 30,
      padding: { x: padX, y: padY },
    },
    column(
      {
        width: fill,
        height: fill,
        gap: contentGap,
      },
      [
        row(
          {
            width: fill,
            height: hug,
            gap: headerGap,
            align: "center",
          },
          [
            panel(
              {
                width: badgeSize,
                height: badgeSize,
                fill: dark ? COLORS.green : COLORS.dark,
                borderRadius: 999,
                align: "center",
                justify: "center",
              },
              text(index, {
                width: fixed(badgeTextWidth),
                height: hug,
                style: {
                  typeface: DISPLAY,
                  fontSize: uiFs(badgeFontSize),
                  bold: true,
                  color: dark ? COLORS.dark : COLORS.white,
                },
              }),
            ),
            text(title, {
              width: fill,
              height: hug,
              style: {
                typeface: DISPLAY,
                fontSize: uiFs(titleSize),
                bold: true,
                color: dark ? COLORS.white : COLORS.ink,
              },
            }),
          ],
        ),
        text(body, {
          width: fill,
          height: hug,
          style: {
            typeface: BODY,
            fontSize: bodyFs(bodySize),
            color: bodyColor,
          },
        }),
      ],
    ),
  );
}

function notePanel(copy, dark = false, fontSize = 26, opts = {}) {
  const padX = opts.padX ?? 26;
  const padY = opts.padY ?? 22;
  return panel(
    {
      width: fill,
      height: hug,
      fill: dark ? "#131A27" : COLORS.paper,
      line: stroke(`1 ${dark ? "#22354B" : COLORS.line}`),
      borderRadius: 28,
      padding: { x: padX, y: padY },
    },
    text(copy, {
      width: fill,
      height: hug,
      style: {
        typeface: BODY,
        fontSize: bodyFs(fontSize),
        color: dark ? COLORS.white : COLORS.ink,
      },
    }),
  );
}

function factGrid(items) {
  return grid(
    {
      width: fill,
      height: hug,
      columns: [fr(1), fr(1)],
      rows: [auto, auto],
      columnGap: 16,
      rowGap: 16,
    },
    items,
  );
}

function labelRows(items) {
  return column(
    {
      width: fill,
      height: hug,
      gap: 14,
    },
    [
      row(
        {
          width: fill,
          height: hug,
          gap: 16,
        },
        [items[0], items[1]],
      ),
      row(
        {
          width: fill,
          height: hug,
          gap: 16,
        },
        [items[2], items[3]],
      ),
    ],
  );
}

function footer(page, dark = false) {
  return panel(
    {
      width: fill,
      height: fixed(56),
      fill: dark ? COLORS.dark : "#0E1420",
      padding: { x: 44, y: 0 },
    },
    row(
      {
        width: fill,
        height: fill,
        align: "center",
        gap: 16,
      },
      [
        text("BOOSTSELLER  •  SEO / AEO / GEO", {
          width: grow(1),
          height: hug,
          style: {
            typeface: DISPLAY,
            fontSize: uiFs(18),
            bold: true,
            color: dark ? COLORS.white : "#EAF0FA",
          },
        }),
        text(String(page).padStart(2, "0"), {
          width: fixed(44),
          height: hug,
          style: {
            typeface: DISPLAY,
            fontSize: uiFs(18),
            bold: true,
            color: COLORS.green,
          },
        }),
      ],
    ),
  );
}

function lightSlideShell(media, page, content, opts = {}) {
  const topWaveHeight = opts.topWaveHeight ?? 96;
  const contentPaddingY = opts.paddingY ?? 36;
  return layers(
    {
      width: fill,
      height: fill,
    },
    [
      shape({
        width: fill,
        height: fill,
        fill: COLORS.lightBg,
      }),
      column(
        {
          width: fill,
          height: fill,
        },
        [
          img(media, "wave-top.png", {
            width: fill,
            height: fixed(topWaveHeight),
            fit: "cover",
            alt: "Abstract color wave",
          }),
          panel(
            {
              width: fill,
              height: grow(1),
              padding: { x: 54, y: contentPaddingY },
            },
            content,
          ),
          footer(page),
        ],
      ),
    ],
  );
}

function darkSlideShell(media, page, content, opts = {}) {
  const topWaveHeight = opts.topWaveHeight ?? 112;
  const contentPaddingY = opts.paddingY ?? 36;
  const bottomWaveHeight = opts.bottomWaveHeight ?? 96;
  return layers(
    {
      width: fill,
      height: fill,
    },
    [
      shape({
        width: fill,
        height: fill,
        fill: paint("linear(180deg, #070B12 0%, #0C1322 100%)"),
      }),
      column(
        {
          width: fill,
          height: fill,
        },
        [
          img(media, "wave-top.png", {
            width: fill,
            height: fixed(topWaveHeight),
            fit: "cover",
            alt: "Abstract color wave",
          }),
          panel(
            {
              width: fill,
              height: grow(1),
              padding: { x: 54, y: contentPaddingY },
            },
            content,
          ),
          img(media, "wave-bottom.png", {
            width: fill,
            height: fixed(bottomWaveHeight),
            fit: "cover",
            alt: "Abstract color wave",
          }),
          footer(page, true),
        ],
      ),
    ],
  );
}

function deck(media) {
  const presentation = Presentation.create({
    slideSize: { width: W, height: H },
  });

  function addSlide(node) {
    const slide = presentation.slides.add();
    slide.compose(node, {
      frame: { left: 0, top: 0, width: W, height: H },
      baseUnit: 8,
    });
    return slide;
  }

  const mobileTitle = ({
    title,
    subtitle,
    dark = false,
    titleSize = 74,
    subtitleSize = 34,
    titleWidth = wrap(920),
    subtitleWidth = wrap(900),
  }) =>
    titleBlock({
      title,
      subtitle,
      dark,
      titleSize,
      subtitleSize,
      titleWidth,
      subtitleWidth,
    });

  addSlide(
    darkSlideShell(
      media,
      1,
      column(
        {
          width: fill,
          height: fill,
          gap: 20,
        },
        [
          smallKicker("BOOSTSELLER / KAZAKHSTAN", true),
          mobileTitle({
            title: "SEO / AEO / GEO\nДЛЯ РЫНКА\nКАЗАХСТАНА",
            subtitle:
              "Коммерческое предложение по росту поисковой видимости, answer-форматов и генеративного присутствия бренда.",
            dark: true,
            titleSize: 74,
            subtitleSize: 30,
            titleWidth: wrap(972),
            subtitleWidth: wrap(920),
          }),
          img(media, "astana-sunset.jpg", {
            width: fill,
            height: fixed(360),
            fit: "cover",
            borderRadius: 36,
            alt: "Astana skyline at sunset",
          }),
          row(
            {
              width: fill,
              height: hug,
              gap: 16,
            },
            [
              label("СТАРТ 350 / 750 / 1200К", COLORS.green, COLORS.dark),
              label("ВЕДЕНИЕ 250К / МЕС", COLORS.goldSoft, COLORS.dark),
            ],
          ),
          text("Видимость в Google, ответных блоках и AI-рекомендациях должна работать как одна управляемая система.", {
            width: fill,
            height: hug,
            style: {
              typeface: DISPLAY,
              fontSize: 42,
              bold: true,
              color: COLORS.white,
            },
          }),
          notePanel(
            "Разовая настройка ставит фундамент. Ежемесячное администрирование усиливает и адаптирует систему под новый спрос.",
            true,
            28,
          ),
        ],
      ),
    ),
  );

  addSlide(
    lightSlideShell(
      media,
      2,
      column(
        {
          width: fill,
          height: fill,
          gap: 22,
        },
        [
          smallKicker("ПОЧЕМУ ЭТО ВАЖНО СЕЙЧАС"),
          mobileTitle({
            title: "ОДНОГО КЛАССИЧЕСКОГО SEO УЖЕ НЕДОСТАТОЧНО",
            subtitle:
              "Пользователь всё чаще получает ответ раньше, чем доходит до сайта. Значит бизнесу нужно выигрывать не только в выдаче, но и в ответных форматах поиска.",
            titleSize: 72,
            subtitleSize: 34,
          }),
          text("ПОИСК СМЕСТИЛСЯ ОТ СПИСКА ССЫЛОК К ГОТОВЫМ ВЫВОДАМ.", {
            width: wrap(900),
            height: hug,
            style: {
              typeface: DISPLAY,
              fontSize: 56,
              bold: true,
              color: COLORS.ink,
            },
          }),
          bulletList(
            [
              "Google ранжирует страницы, но всё активнее показывает быстрые ответы и фрагменты прямо в выдаче.",
              "ChatGPT, Perplexity и другие AI-интерфейсы формируют рекомендацию ещё до перехода на сайт.",
              "Если бренд и страницы не подготовлены, часть спроса и доверия теряется ещё до клика.",
            ],
            {
              size: 28,
              gap: 14,
            },
          ),
          notePanel(
            "Для бизнеса это значит одно: сайт должен не только ранжироваться, но и становиться удобным источником ответа для AI.",
            false,
            28,
          ),
        ],
      ),
    ),
  );

  addSlide(
    lightSlideShell(
      media,
      3,
      column(
        {
          width: fill,
          height: fill,
          gap: 18,
        },
        [
          smallKicker("ТРИ СЛОЯ ВИДИМОСТИ"),
          mobileTitle({
            title: "КАК РАБОТАЕТ SEO + AEO + GEO В ОДНОЙ СИСТЕМЕ",
            subtitle:
              "Это не три разрозненные услуги, а единый контур, который помогает сайту ранжироваться, отвечать и корректно считываться AI-движками.",
            titleSize: 70,
            subtitleSize: 32,
          }),
          insightCard({
            title: "SEO",
            body:
              "Фундамент индексации, структуры, семантики и органического роста.",
            fillColor: COLORS.paper,
            lineColor: COLORS.gold,
            titleColor: COLORS.ink,
            bodyColor: COLORS.muted,
            cardHeight: fixed(208),
          }),
          insightCard({
            title: "AEO",
            body:
              "Подготовка страниц к answer-форматам: FAQ, snippets, summary blocks и schema.",
            fillColor: COLORS.paper,
            lineColor: COLORS.cyan,
            titleColor: COLORS.ink,
            bodyColor: COLORS.muted,
            cardHeight: fixed(208),
          }),
          insightCard({
            title: "GEO",
            body:
              "Формирование понятной картины о бренде, услугах, кейсах и сигналах доверия для генеративных систем.",
            fillColor: COLORS.paper,
            lineColor: COLORS.green,
            titleColor: COLORS.ink,
            bodyColor: COLORS.muted,
            cardHeight: fixed(232),
          }),
          notePanel(
            "Итог: SEO приводит спрос, AEO повышает шанс стать ответом, GEO делает бренд заметным в AI-рекомендации и сравнении.",
            true,
            26,
          ),
        ],
      ),
    ),
  );

  addSlide(
    lightSlideShell(
      media,
      4,
      column(
        {
          width: fill,
          height: fill,
          gap: 20,
        },
        [
          smallKicker("ВЛИЯНИЕ НА БИЗНЕС"),
          mobileTitle({
            title: "ЭТА РАБОТА ВЛИЯЕТ НА СПРОС И ДОВЕРИЕ",
            subtitle:
              "Чем чаще бренд виден в релевантном поиске, тем теплее первый контакт.",
            titleSize: 68,
            subtitleSize: 32,
          }),
          img(media, "astana-fountain.jpg", {
            width: fill,
            height: fixed(188),
            fit: "cover",
            borderRadius: 34,
            alt: "Astana fountain and skyline",
          }),
          text("ВИДИМОСТЬ → ДОВЕРИЕ → ЗАЯВКИ", {
            width: fill,
            height: hug,
            style: {
              typeface: DISPLAY,
              fontSize: 48,
              bold: true,
              color: COLORS.ink,
            },
          }),
          bulletList(
            [
              "Приходит небрендовый спрос: вас находят новые пользователи.",
              "Растёт доверие до звонка: бренд видят в поиске и AI-ответах.",
              "Заявки становятся теплее: сайт снимает часть вопросов до контакта.",
              "Снижается зависимость от платного трафика: часть спроса идёт органически.",
            ],
            {
              size: 26,
              gap: 12,
            },
          ),
          factGrid([
            factChip("CTR", "выше кликабельность ответных блоков"),
            factChip("LEADS", "лучше качество входящих заявок"),
            factChip("TRUST", "выше доверие к бренду"),
            factChip("ORGANIC", "часть спроса работает органически"),
          ]),
        ],
      ),
    ),
  );

  addSlide(
    lightSlideShell(
      media,
      5,
      column(
        {
          width: fill,
          height: fill,
          gap: 18,
        },
        [
          smallKicker("БЛОК SEO"),
          mobileTitle({
            title: "SEO — ФУНДАМЕНТ ПОИСКОВОЙ ВИДИМОСТИ",
            subtitle:
              "Если техническая база и архитектура сайта слабые, остальные слои оптимизации тоже упираются в потолок.",
            titleSize: 68,
            subtitleSize: 32,
          }),
          bulletList(
            [
              "Технический аудит: индексация, robots/sitemap, ошибки и дубли.",
              "Семантика и спрос: карта ключевых запросов по страницам и интентам.",
              "Архитектура: URL, перелинковка, иерархия разделов и коммерческие страницы.",
              "On-page слой: titles, descriptions, H-структура и смысловые блоки.",
            ],
            {
              size: 24,
              gap: 12,
            },
          ),
          insightCard({
            title: "ЧТО ДАЁТ SEO-БЛОК",
            body:
              "Сайт становится понятнее поисковым системам, а бизнес перестаёт терять спрос на технических и структурных ошибках.",
            fillColor: "#131A27",
            lineColor: COLORS.green,
            titleColor: COLORS.white,
            bodyColor: "#CBD7E6",
            cardHeight: fixed(214),
            bodySize: 24,
          }),
          factGrid([
            factChip("ПОЗИЦИИ", "рост видимости в релевантных запросах", "dark"),
            factChip("ИНДЕКСАЦИЯ", "меньше потерь из-за дублей и ошибок", "dark"),
            factChip("СТРУКТУРА", "понятная карта страниц для роста", "dark"),
            factChip("ОРГАНИКА", "лучший фундамент для стабильного трафика", "dark"),
          ]),
        ],
      ),
    ),
  );

  addSlide(
    lightSlideShell(
      media,
      6,
      column(
        {
          width: fill,
          height: fill,
          gap: 18,
        },
        [
          smallKicker("БЛОК AEO"),
          mobileTitle({
            title: "AEO — СТРАНИЦЫ ДОЛЖНЫ СТАТЬ ГОТОВЫМИ ОТВЕТАМИ",
            subtitle:
              "Поисковые и answer-движки лучше работают с контентом, который уже структурирован под интенты пользователя.",
            titleSize: 68,
            subtitleSize: 32,
          }),
          img(media, "ai-network.jpg", {
            width: fill,
            height: fixed(244),
            fit: "cover",
            borderRadius: 34,
            alt: "AI network visualization",
          }),
          bulletList(
            [
              "Формируем answer-ready контент: FAQ, прямые ответы и summary-секции.",
              "Укладываем смысл в извлекаемые форматы: заголовки, списки и schema.",
              "Перепаковываем страницы под интенты: «что это», «как выбрать», «сколько стоит».",
              "Усиливаем CTR и доверие: пользователь быстрее находит нужный ответ.",
            ],
            {
              size: 24,
              gap: 12,
            },
          ),
          labelRows([
            label("SNIPPET", COLORS.goldSoft, COLORS.ink),
            label("CTR", COLORS.cyanSoft, COLORS.ink),
            label("TRUST", COLORS.greenSoft, COLORS.ink),
            label("PRE-QUAL", COLORS.paper, COLORS.ink),
          ]),
        ],
      ),
    ),
  );

  addSlide(
    lightSlideShell(
      media,
      7,
      column(
        {
          width: fill,
          height: fill,
          gap: 18,
        },
        [
          smallKicker("БЛОК GEO"),
          mobileTitle({
            title: "GEO — ПОДГОТОВКА БРЕНДА К ГЕНЕРАТИВНОЙ ВЫДАЧЕ",
            subtitle:
              "Generative Engine Optimization помогает AI-движкам корректно понимать компанию, услуги, экспертизу и факты доверия.",
            titleSize: 66,
            subtitleSize: 32,
          }),
          img(media, "ai-hero.jpg", {
            width: fill,
            height: fixed(236),
            fit: "cover",
            borderRadius: 34,
            alt: "AI hero graphic",
          }),
          bulletList(
            [
              "Собираем entity-layer бренда: компания, услуги, кейсы и эксперты.",
              "Усиливаем доказательную базу: кейсы, proof pages и service pages.",
              "Нормализуем формулировки и сигналы доверия по сайту и метаданным.",
              "Готовим сайт к корректному упоминанию в AI-ответах и сравнениях.",
            ],
            {
              size: 24,
              gap: 12,
            },
          ),
          factGrid([
            factChip("ENTITY FIT", "бренд лучше считывается AI", "dark"),
            factChip("MENTIONS", "выше шанс попасть в AI-ответы", "dark"),
            factChip("COMPARISONS", "сильнее позиция в выборе", "dark"),
            factChip("FUTURE-READY", "база под новые интерфейсы", "dark"),
          ]),
        ],
      ),
    ),
  );

  addSlide(
    lightSlideShell(
      media,
      8,
      column(
        {
          width: fill,
          height: fill,
          gap: 8,
        },
        [
          smallKicker("РАЗОВАЯ НАСТРОЙКА"),
          mobileTitle({
            title: "ЧТО ВХОДИТ В СТАРТОВЫЙ ЭТАП ВНЕДРЕНИЯ",
            subtitle:
              "Разовая настройка ставит систему: диагностика, карта спроса, приоритеты внедрения и база под рост.",
            titleSize: 48,
            subtitleSize: 22,
          }),
          timelineStep(
            "01",
            "АУДИТ",
            "Снимаем текущее состояние сайта, технические риски и точки потерь в видимости.",
            "light",
            fixed(228),
            { titleSize: 30, bodySize: 26, badgeSize: 72, padY: 26, contentGap: 16, bodyColor: "#46505D" },
          ),
          timelineStep(
            "02",
            "КАРТА СПРОСА",
            "Собираем семантику, интенты, приоритеты страниц и архитектуру роста.",
            "light",
            fixed(206),
            { titleSize: 30, bodySize: 26, badgeSize: 72, padY: 26, contentGap: 16, bodyColor: "#46505D" },
          ),
          timelineStep(
            "03",
            "ВНЕДРЕНИЕ ЛОГИКИ",
            "Готовим on-page, answer-блоки, schema и приоритетные SEO/AEO/GEO-рекомендации.",
            "light",
            fixed(228),
            { titleSize: 30, bodySize: 26, badgeSize: 72, padY: 26, contentGap: 16, bodyColor: "#46505D" },
          ),
          timelineStep(
            "04",
            "АНАЛИТИКА И ROADMAP",
            "Настраиваем измерение результатов и выдаём roadmap роста.",
            "light",
            fixed(206),
            { titleSize: 30, bodySize: 26, badgeSize: 72, padY: 26, contentGap: 16, bodyColor: "#46505D" },
          ),
          notePanel(
            "Выход этапа: список внедрений, карта спроса, приоритеты страниц и база для ежемесячного роста.",
            false,
            22,
            { padX: 24, padY: 18 },
          ),
        ],
      ),
      { topWaveHeight: 72, paddingY: 26 },
    ),
  );

  addSlide(
    darkSlideShell(
      media,
      9,
      column(
        {
          width: fill,
          height: fill,
          gap: 10,
        },
        [
          smallKicker("ПАКЕТЫ ЗАПУСКА", true),
          mobileTitle({
            title: "ТРИ УРОВНЯ\nРАЗОВОЙ НАСТРОЙКИ",
            subtitle:
              "Пакеты различаются глубиной работы и масштабом структуры.",
            dark: true,
            titleSize: 54,
            subtitleSize: 26,
          }),
          packageCard({
            tier: "BASE",
            price: "350 000 тг",
            note: "Стартовый пакет",
            bullets: [
              "базовый аудит и карта рисков",
              "семантика и приоритетные страницы",
              "первичный SEO-слой и базовые AEO/GEO-рекомендации",
            ],
            cardHeight: fixed(332),
            cardPadding: { x: 22, y: 22 },
            contentGap: 14,
            headerGap: 8,
            headerSize: 24,
            priceSize: 44,
            noteSize: 18,
            bulletSize: 19,
            bulletGap: 9,
          }),
          packageCard({
            tier: "RECOMMENDED",
            price: "750 000 тг",
            note: "Оптимум роста",
            bullets: [
              "углублённая карта спроса",
              "расширенная структура и приоритеты",
              "on-page + answer-блоки + schema + GEO-логика",
            ],
            highlight: true,
            cardHeight: fixed(332),
            cardPadding: { x: 22, y: 22 },
            contentGap: 14,
            headerGap: 8,
            headerSize: 24,
            priceSize: 44,
            noteSize: 18,
            bulletSize: 19,
            bulletGap: 9,
          }),
          packageCard({
            tier: "MAX",
            price: "1 200 000 тг",
            note: "Максимум стратегии",
            bullets: [
              "глубокий конкурентный и контентный слой",
              "масштабная архитектура под рост",
              "расширенный AEO/GEO-контур под масштабирование",
            ],
            cardHeight: fixed(332),
            cardPadding: { x: 22, y: 22 },
            contentGap: 14,
            headerGap: 8,
            headerSize: 24,
            priceSize: 44,
            noteSize: 18,
            bulletSize: 19,
            bulletGap: 9,
          }),
        ],
      ),
      { topWaveHeight: 92, paddingY: 24, bottomWaveHeight: 82 },
    ),
  );

  addSlide(
    darkSlideShell(
      media,
      10,
      column(
        {
          width: fill,
          height: fill,
          gap: 20,
        },
        [
          smallKicker("ЕЖЕМЕСЯЧНОЕ СОПРОВОЖДЕНИЕ", true),
          text("250 000 тг", {
            width: fill,
            height: hug,
            style: {
              typeface: DISPLAY,
              fontSize: 96,
              bold: true,
              color: COLORS.white,
            },
          }),
          text("в месяц", {
            width: fill,
            height: hug,
            style: {
              typeface: DISPLAY,
              fontSize: 56,
              bold: true,
              color: COLORS.white,
            },
          }),
          text(
            "После стартовой настройки система должна развиваться каждый месяц. Иначе сайт постепенно теряет темп и перестаёт успевать за новым спросом.",
            {
              width: fill,
              height: hug,
              style: {
                typeface: BODY,
                fontSize: bodyFs(25),
                color: "#CFDAE9",
              },
            },
          ),
          row(
            {
              width: fill,
              height: hug,
              gap: 16,
            },
            [
              label("КОНТРОЛЬ", COLORS.cyanSoft),
              label("ДОРАБОТКИ", COLORS.goldSoft),
              label("РОСТ", COLORS.greenSoft),
            ],
          ),
          bulletList(
            [
              "Контроль индексации, позиций, приоритетных страниц и критичных технических сигналов.",
              "Корректировки по структуре, внутренней перелинковке и search-intent слоям.",
              "Расширение FAQ, answer-блоков, schema и смысловых модулей под AEO.",
              "Развитие entity-layer, кейсов, proof pages и точек доверия под GEO.",
              "Контентные приоритеты, новые страницы и ежемесячная аналитика действий.",
            ],
            {
              dark: true,
              accent: COLORS.green,
              size: 26,
              gap: 14,
            },
          ),
          notePanel(
            "Логика оплаты простая: разовая настройка ставит систему, а ежемесячное администрирование не даёт ей застыть и регулярно переводит новые поисковые сценарии в заявки.",
            true,
            26,
          ),
        ],
      ),
    ),
  );

  addSlide(
    lightSlideShell(
      media,
      11,
      column(
        {
          width: fill,
          height: fill,
          gap: 14,
        },
        [
          smallKicker("ЭТАПЫ РАБОТ"),
          mobileTitle({
            title: "КАК ПРОХОДИТ ПРОЕКТ",
            subtitle:
              "Сначала диагностика и структура, затем внедрение, после чего начинается ежемесячный рост.",
            titleSize: 60,
            subtitleSize: 28,
          }),
          timelineStep(
            "01",
            "АУДИТ И СРЕЗ",
            "3–5 рабочих дней. Снимаем состояние, риски и базовые точки роста.",
            "light",
            fixed(198),
            { titleSize: 30, bodySize: 25, badgeSize: 72, padY: 26, contentGap: 16, bodyColor: "#46505D" },
          ),
          timelineStep(
            "02",
            "СТРУКТУРА И СПРОС",
            "5–7 рабочих дней. Формируем карту интентов, семантику и архитектуру.",
            "light",
            fixed(198),
            { titleSize: 30, bodySize: 25, badgeSize: 72, padY: 26, contentGap: 16, bodyColor: "#46505D" },
          ),
          timelineStep(
            "03",
            "ПРИОРИТЕТЫ ВНЕДРЕНИЯ",
            "5–10 рабочих дней. Выстраиваем SEO/AEO/GEO-слой по приоритету влияния.",
            "light",
            fixed(210),
            { titleSize: 30, bodySize: 25, badgeSize: 72, padY: 26, contentGap: 16, bodyColor: "#46505D" },
          ),
          timelineStep(
            "04",
            "ЕЖЕМЕСЯЧНЫЙ РОСТ",
            "Со 2-го месяца. Доработки, расширение структуры и контроль эффекта.",
            "light",
            fixed(198),
            { titleSize: 30, bodySize: 25, badgeSize: 72, padY: 26, contentGap: 16, bodyColor: "#46505D" },
          ),
        ],
      ),
      { topWaveHeight: 84, paddingY: 26 },
    ),
  );

  addSlide(
    lightSlideShell(
      media,
      12,
      column(
        {
          width: fill,
          height: fill,
          gap: 18,
        },
        [
          smallKicker("ЭФФЕКТ И СОПРОВОЖДЕНИЕ"),
          mobileTitle({
            title: "КОГДА ПОЯВЛЯЕТСЯ ЭФФЕКТ",
            subtitle:
              "Первые сигналы приходят быстрее, а полный результат накапливается по мере индексации, доработок и сопровождения.",
            titleSize: 70,
            subtitleSize: 32,
          }),
          insightCard({
            title: "ПЕРВЫЕ СИГНАЛЫ",
            body:
              "Чаще видны через 4–8 недель после приоритетных правок.",
            fillColor: COLORS.paper,
            lineColor: COLORS.cyan,
            titleColor: COLORS.ink,
            bodyColor: COLORS.muted,
            cardHeight: fixed(196),
            titleSize: 30,
            bodySize: 24,
          }),
          insightCard({
            title: "НАКОПИТЕЛЬНЫЙ ЭФФЕКТ",
            body:
              "Полный эффект обычно собирается за 2–6 месяцев.",
            fillColor: COLORS.paper,
            lineColor: COLORS.gold,
            titleColor: COLORS.ink,
            bodyColor: COLORS.muted,
            cardHeight: fixed(196),
            titleSize: 30,
            bodySize: 24,
          }),
          insightCard({
            title: "ПОЧЕМУ НУЖНО СОПРОВОЖДЕНИЕ",
            body:
              "Поиск и AI-выдача меняются, поэтому проект нужно адаптировать ежемесячно.",
            fillColor: COLORS.paper,
            lineColor: COLORS.green,
            titleColor: COLORS.ink,
            bodyColor: COLORS.muted,
            cardHeight: fixed(214),
            titleSize: 30,
            bodySize: 24,
          }),
        ],
      ),
    ),
  );

  addSlide(
    lightSlideShell(
      media,
      13,
      column(
        {
          width: fill,
          height: fill,
          gap: 18,
        },
        [
          smallKicker("ЧТО ЕЩЁ МОЖЕМ СДЕЛАТЬ"),
          mobileTitle({
            title: "BOOSTSELLER МОЖЕТ ВЕСТИ ВЕСЬ GROWTH-КОНТУР",
            subtitle:
              "Если задача шире базовой видимости, мы собираем дополнительные слои роста вокруг сайта и контента.",
            titleSize: 66,
            subtitleSize: 32,
          }),
          insightCard({
            title: "LANDING PAGES",
            body:
              "SEO-ready и GEO-ready страницы под отдельные направления, услуги и офферы.",
            fillColor: COLORS.paper,
            lineColor: COLORS.cyan,
            titleColor: COLORS.ink,
            bodyColor: COLORS.muted,
            cardHeight: fixed(176),
            titleSize: 28,
            bodySize: 24,
          }),
          insightCard({
            title: "CONTENT CLUSTERS",
            body:
              "Кейсы, экспертные статьи, FAQ-архитектура и тематические хабы под небрендовый спрос.",
            fillColor: COLORS.paper,
            lineColor: COLORS.gold,
            titleColor: COLORS.ink,
            bodyColor: COLORS.muted,
            cardHeight: fixed(176),
            titleSize: 28,
            bodySize: 24,
          }),
          insightCard({
            title: "CRO И LEAD CAPTURE",
            body:
              "Усиление CTA, форм, микро-доверия и pre-qualification слоёв.",
            fillColor: COLORS.paper,
            lineColor: COLORS.green,
            titleColor: COLORS.ink,
            bodyColor: COLORS.muted,
            cardHeight: fixed(176),
            titleSize: 28,
            bodySize: 24,
          }),
          insightCard({
            title: "DASHBOARDS И AI LAYER",
            body:
              "Отчётность по видимости, knowledge layer, чат-интерфейсы и автоматизация внутренних сценариев.",
            fillColor: COLORS.paper,
            lineColor: COLORS.coral,
            titleColor: COLORS.ink,
            bodyColor: COLORS.muted,
            cardHeight: fixed(190),
            titleSize: 28,
            bodySize: 24,
          }),
          notePanel(
            "Проект можно вести как точечную SEO/AEO/GEO-оптимизацию или как полноценную систему цифрового роста.",
            true,
            24,
          ),
        ],
      ),
      { topWaveHeight: 84, paddingY: 28 },
    ),
  );

  addSlide(
    lightSlideShell(
      media,
      14,
      column(
        {
          width: fill,
          height: fill,
          gap: 16,
        },
        [
          smallKicker("МИНИ-СВОДКА ПО САЙТУ"),
          mobileTitle({
            title: "SMARTPROF.KZ:\nБАЗА ЕСТЬ,\nТОЧКИ РОСТА ЯСНЫ",
            subtitle:
              "Короткий внешний взгляд на homepage и ближайший потенциал усиления.",
            titleSize: 68,
            subtitleSize: 30,
          }),
          img(media, "smartprof-home-crop.png", {
            width: fill,
            height: fixed(220),
            fit: "cover",
            borderRadius: 28,
            alt: "Homepage screenshot of smartprof.kz",
          }),
          insightCard({
            title: "ЧТО УЖЕ ХОРОШО",
            body:
              "Сильная отраслевая подача, проекты, FAQ и новости уже формируют доверие к бренду.",
            fillColor: COLORS.paper,
            lineColor: COLORS.green,
            titleColor: COLORS.ink,
            bodyColor: COLORS.muted,
            cardHeight: fixed(176),
            titleSize: 28,
            bodySize: 24,
          }),
          insightCard({
            title: "ЧТО МОЖНО УСИЛИТЬ",
            body:
              "Нужны отдельные SEO-ready страницы и более чистые answer-блоки под небрендовый спрос.",
            fillColor: COLORS.paper,
            lineColor: COLORS.cyan,
            titleColor: COLORS.ink,
            bodyColor: COLORS.muted,
            cardHeight: fixed(176),
            titleSize: 28,
            bodySize: 24,
          }),
          factGrid([
            factChip("200", "homepage отвечает"),
            factChip("1 H1", "структура чистая"),
            factChip("18 URL", "sitemap уже есть"),
            factChip("3 JSON-LD", "schema можно развивать"),
          ]),
          notePanel(
            "Точка роста: перевести smartprof.kz из брендовой витрины в систему продуктовых и экспертных страниц.",
            true,
            24,
          ),
        ],
      ),
      { topWaveHeight: 84, paddingY: 24 },
    ),
  );

  addSlide(
    darkSlideShell(
      media,
      15,
      column(
        {
          width: fill,
          height: fill,
          gap: 20,
        },
        [
          smallKicker("СЛЕДУЮЩИЙ ШАГ", true),
          mobileTitle({
            title: "ГОТОВЫ ЗАБРАТЬ ВИДИМОСТЬ В ПОИСКЕ И AI?",
            subtitle:
              "BOOSTSELLER соберёт для вас SEO / AEO / GEO-контур под рынок Казахстана и переведёт его в управляемый рост, где каждая доработка работает на спрос и заявки.",
            dark: true,
            titleSize: 74,
            subtitleSize: 32,
          }),
          row(
            {
              width: fill,
              height: hug,
              gap: 16,
            },
            [
              label("СТАРТ 350 / 750 / 1200К", COLORS.green, COLORS.dark),
              label("ВЕДЕНИЕ 250К / МЕС", COLORS.goldSoft, COLORS.dark),
            ],
          ),
          text("СТАРТ ПРОЕКТА ОБЫЧНО НАЧИНАЕТСЯ С КОРОТКОГО БРИФА, ВЫБОРА ПАКЕТА И ПРИОРИТЕТНОЙ ДОРОЖНОЙ КАРТЫ.", {
            width: fill,
            height: hug,
            style: {
              typeface: DISPLAY,
              fontSize: 48,
              bold: true,
              color: COLORS.white,
            },
          }),
          panel(
            {
              width: fill,
              height: hug,
              fill: "#141E2D",
              line: stroke("1 #23364E"),
              borderRadius: 32,
              padding: { x: 28, y: 26 },
            },
            column(
              {
                width: fill,
                height: hug,
                gap: 16,
              },
              [
                text("ПАКЕТ СТАРТА", {
                  width: fill,
                  height: hug,
                  style: {
                    typeface: DISPLAY,
                    fontSize: uiFs(26),
                    bold: true,
                    color: COLORS.cyan,
                  },
                }),
                s("1. Выбираем формат запуска: 350 / 750 / 1 200 тыс. тг.", true),
                s("2. Сверяем сайт, спрос, регион и коммерческие приоритеты.", true),
                s("3. Запускаем внедрение и переводим проект в сопровождение.", true),
              ],
            ),
          ),
          panel(
            {
              width: fill,
              height: hug,
              fill: COLORS.green,
              borderRadius: 24,
              padding: { x: 24, y: 20 },
            },
            text("СВЯЗАТЬСЯ С BOOSTSELLER", {
              width: fill,
              height: hug,
              style: {
                typeface: DISPLAY,
                fontSize: uiFs(26),
                bold: true,
                color: COLORS.dark,
              },
            }),
          ),
          panel(
            {
              width: fill,
              height: hug,
              fill: "#0B111D",
              line: stroke("1 #20324A"),
              borderRadius: 24,
              padding: { x: 24, y: 20 },
            },
            column(
              {
                width: fill,
                height: hug,
                gap: 10,
              },
              [
                text("boostseller.kz", {
                  width: fill,
                  height: hug,
                  style: {
                    typeface: DISPLAY,
                    fontSize: uiFs(30),
                    bold: true,
                    color: COLORS.white,
                  },
                }),
                text("+7 777 836 85 76", {
                  width: fill,
                  height: hug,
                  style: {
                    typeface: BODY,
                    fontSize: bodyFs(22),
                    color: "#D7E3F4",
                  },
                }),
                text("Алматы\nработаем по контракту и договору по законодательству РК", {
                  width: fill,
                  height: hug,
                  style: {
                    typeface: BODY,
                    fontSize: bodyFs(18),
                    color: "#D7E3F4",
                  },
                }),
                text("офис: г. Караганда", {
                  width: fill,
                  height: hug,
                  style: {
                    typeface: DISPLAY,
                    fontSize: uiFs(22),
                    bold: true,
                    color: COLORS.green,
                  },
                }),
              ],
            ),
          ),
        ],
      ),
      { topWaveHeight: 96, paddingY: 28, bottomWaveHeight: 88 },
    ),
  );

  return presentation;
}

async function renderOutputs(presentation) {
  const previewPaths = [];
  const pdfCanvas = new Canvas(W, H);

  for (const slide of presentation.slides.items) {
    const pdfCtx = pdfCanvas.getContext("2d");
    await drawSlideToCtx(slide, presentation, pdfCtx);
    if (slide.index < presentation.slides.items.length - 1) {
      pdfCanvas.newPage();
    }

    const canvas = new Canvas(W, H);
    const ctx = canvas.getContext("2d");
    await drawSlideToCtx(slide, presentation, ctx);
    const previewPath = path.join(
      PREVIEW_DIR,
      `slide-${String(slide.index + 1).padStart(2, "0")}.png`,
    );
    await canvas.toFile(previewPath);
    previewPaths.push(previewPath);
  }

  await pdfCanvas.toFile(pdfPath);

  return previewPaths;
}

async function writeSources() {
  const lines = [
    "# Asset Sources",
    "",
    `- Astana fountain: ${SOURCE_LINKS.astanaFountain}`,
    `- Astana skyline: ${SOURCE_LINKS.astanaSunset}`,
    `- AI network: ${SOURCE_LINKS.aiNetwork}`,
    `- AI hero: ${SOURCE_LINKS.aiHero}`,
    `- smartprof.kz homepage: ${SOURCE_LINKS.smartprof}`,
    `- BOOSTSELLER official site: ${SOURCE_LINKS.boostseller}`,
    `- style reference PDF: ${SOURCE_LINKS.referencePdf}`,
  ];

  await fs.writeFile(path.join(ROOT, "scratch", "asset-sources.md"), lines.join("\n"), "utf8");
}

async function main() {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  await fs.mkdir(PREVIEW_DIR, { recursive: true });
  await fs.mkdir(path.join(ROOT, "scratch"), { recursive: true });

  const media = await buildMediaMap();
  const presentation = deck(media);
  const previews = await renderOutputs(presentation);
  await writeSources();

  console.log(JSON.stringify({ pdfPath, previews }, null, 2));
}

try {
  await main();
  process.exit(0);
} catch (error) {
  console.error(error);
  process.exit(1);
}
