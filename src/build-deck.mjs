import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  Presentation,
  auto,
  chart,
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
  rule,
  shape,
  table,
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
const PREVIEW_DIR = path.join(ROOT, "scratch", "previews");
const ASSETS = path.join(ROOT, "assets");

const pdfPath = path.join(OUTPUT_DIR, "boostseller-seo-aeo-geo-kp.pdf");

const W = 1920;
const H = 1080;

const DISPLAY = "Bahnschrift";
const BODY = "Aptos";
const BODY_SCALE = 1.18;
const UI_SCALE = 1.14;
const SUBTITLE_SCALE = 1.18;

const COLORS = {
  ink: "#111317",
  muted: "#5A6472",
  soft: "#7E8792",
  line: "#D7D9DE",
  lightBg: "#F5F2EC",
  paper: "#FFFDFC",
  dark: "#090D14",
  dark2: "#101726",
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
    "boostseller-logo.png",
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

function s(value) {
  return text(value, {
    width: fill,
    height: hug,
    style: {
      typeface: BODY,
      fontSize: bodyFs(24),
      color: COLORS.ink,
    },
  });
}

function label(textValue, color = COLORS.green, fg = COLORS.dark) {
  const textWidth = Math.max(74, Math.ceil(textValue.length * 13));
  return panel(
    {
      fill: color,
      borderRadius: 999,
      padding: { x: 18, y: 12 },
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
        fontSize: uiFs(16),
        bold: true,
        color: fg,
      },
    }),
  );
}

function smallKicker(textValue, dark = false) {
  return row(
    { width: fill, height: hug, gap: 14, align: "center" },
    [
      shape({
        width: 54,
        height: 4,
        fill: COLORS.green,
        borderRadius: 999,
      }),
      text(textValue, {
        width: hug,
        height: hug,
        style: {
          typeface: DISPLAY,
          fontSize: uiFs(20),
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
  titleWidth = wrap(1380),
  subtitleWidth = wrap(1260),
  titleSize = 58,
  subtitleSize = 24,
}) {
  return column(
    {
      width: fill,
      height: hug,
      gap: 14,
    },
    [
      text(title, {
        name: "slide-title",
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
        name: "slide-subtitle",
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
  const size = opts.size ?? 24;
  const bodyWidth = opts.width ?? fill;

  return row(
    {
      width: fill,
      height: hug,
      gap: 14,
      align: "start",
    },
    [
      panel(
        {
          width: 18,
          height: 18,
          fill: accent,
          borderRadius: 999,
          padding: 0,
          align: "center",
          justify: "center",
        },
        shape({
          width: 6,
          height: 6,
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
  cardPadding = { x: 30, y: 30 },
  titleSize = 27,
  bodySize = 21,
  contentGap = 12,
}) {
  return panel(
    {
      width: fill,
      height: cardHeight,
      fill: fillColor,
      line: stroke(`2 ${lineColor}`),
      borderRadius: 28,
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
            fontSize: uiFs(titleSize),
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
      borderRadius: 22,
      padding: { x: 20, y: 18 },
    },
    column(
      {
        width: fill,
        height: hug,
        gap: 10,
      },
      [
        text(value, {
          width: fill,
          height: hug,
          style: {
            typeface: DISPLAY,
            fontSize: uiFs(30),
            bold: true,
            color: dark ? COLORS.green : COLORS.ink,
          },
        }),
        text(caption, {
          width: fill,
          height: hug,
          style: {
            typeface: BODY,
            fontSize: bodyFs(18),
            color: dark ? "#B9C6D8" : COLORS.muted,
          },
        }),
      ],
    ),
  );
}

function packageCard({ tier, price, note, bullets, highlight = false }) {
  const line = highlight ? COLORS.green : COLORS.line;
  const header = highlight ? COLORS.green : COLORS.cyan;
  const fillColor = highlight ? "#0D1420" : COLORS.paper;
  const fg = highlight ? COLORS.white : COLORS.ink;
  const muted = highlight ? "#AEBBD0" : COLORS.muted;

  return panel(
    {
      width: fill,
      height: fill,
      fill: fillColor,
      line: stroke(`2 ${line}`),
      borderRadius: 28,
      padding: { x: 26, y: 26 },
    },
    column(
      {
        width: fill,
        height: fill,
        gap: 18,
      },
      [
        column(
          {
            width: fill,
            height: hug,
            gap: 10,
          },
          [
            text(tier, {
              width: fill,
              height: hug,
              style: {
                typeface: DISPLAY,
                fontSize: uiFs(24),
                bold: true,
                color: header,
              },
            }),
            text(price, {
              width: fill,
              height: hug,
              style: {
                typeface: DISPLAY,
                fontSize: uiFs(42),
                bold: true,
                color: fg,
              },
            }),
            text(note, {
              width: fill,
              height: hug,
              style: {
                typeface: BODY,
                fontSize: bodyFs(19),
                color: muted,
              },
            }),
          ],
        ),
        bulletList(bullets, {
          dark: highlight,
          accent: highlight ? COLORS.green : COLORS.gold,
          size: 21,
        }),
      ],
    ),
  );
}

function timelineStep(index, title, body, tone = "light") {
  const dark = tone === "dark";
  return panel(
    {
      width: fill,
      height: fill,
      fill: dark ? "#0F1827" : COLORS.paper,
      line: stroke(`1 ${dark ? "#24344D" : COLORS.line}`),
      borderRadius: 28,
      padding: { x: 26, y: 26 },
    },
    column(
      {
        width: fill,
        height: fill,
        gap: 16,
      },
      [
        row(
          {
            width: fill,
            height: hug,
            gap: 12,
            align: "center",
          },
          [
            panel(
              {
                width: 64,
                height: 64,
                fill: dark ? COLORS.green : COLORS.dark,
                borderRadius: 999,
                align: "center",
                justify: "center",
              },
              text(index, {
                width: fixed(44),
                height: hug,
                style: {
                  typeface: DISPLAY,
                  fontSize: uiFs(23),
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
                fontSize: uiFs(26),
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
            fontSize: bodyFs(21),
            color: dark ? "#B9C6D8" : COLORS.muted,
          },
        }),
      ],
    ),
  );
}

function footer(page, dark = false) {
  return panel(
    {
      width: fill,
      height: fixed(52),
      fill: dark ? COLORS.dark : "#0E1420",
      padding: { x: 72, y: 0 },
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
          name: "footer-left",
          width: grow(1),
          height: hug,
          style: {
            typeface: DISPLAY,
            fontSize: uiFs(16),
            bold: true,
            color: dark ? COLORS.white : "#EAF0FA",
          },
        }),
        text(String(page).padStart(2, "0"), {
          name: "footer-page",
          width: fixed(44),
          height: hug,
          style: {
            typeface: DISPLAY,
            fontSize: uiFs(16),
            bold: true,
            color: dark ? COLORS.green : COLORS.green,
          },
        }),
      ],
    ),
  );
}

function lightSlideShell(media, page, content, opts = {}) {
  const topWaveHeight = opts.topWaveHeight ?? 126;
  const paddingX = opts.paddingX ?? 80;
  const paddingY = opts.paddingY ?? 48;
  return layers(
    {
      name: `light-shell-${page}`,
      width: fill,
      height: fill,
    },
    [
      shape({
        name: `light-bg-${page}`,
        width: fill,
        height: fill,
        fill: COLORS.lightBg,
      }),
      column(
        {
          name: `light-stack-${page}`,
          width: fill,
          height: fill,
        },
        [
          img(media, "wave-top.png", {
            name: `top-wave-${page}`,
            width: fill,
            height: fixed(topWaveHeight),
            fit: "cover",
            alt: "Abstract color wave",
          }),
          panel(
            {
              width: fill,
              height: grow(1),
              padding: { x: paddingX, y: paddingY },
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
  const topWaveHeight = opts.topWaveHeight ?? 138;
  const paddingX = opts.paddingX ?? 80;
  const paddingY = opts.paddingY ?? 38;
  const bottomWaveHeight = opts.bottomWaveHeight ?? 104;
  return layers(
    {
      name: `dark-shell-${page}`,
      width: fill,
      height: fill,
    },
    [
      shape({
        name: `dark-bg-${page}`,
        width: fill,
        height: fill,
        fill: paint("linear(180deg, #070B12 0%, #0C1322 100%)"),
      }),
      column(
        {
          name: `dark-stack-${page}`,
          width: fill,
          height: fill,
        },
        [
          img(media, "wave-top.png", {
            name: `dark-top-wave-${page}`,
            width: fill,
            height: fixed(topWaveHeight),
            fit: "cover",
            alt: "Abstract color wave",
          }),
          panel(
            {
              width: fill,
              height: grow(1),
              padding: { x: paddingX, y: paddingY },
            },
            content,
          ),
          img(media, "wave-bottom.png", {
            name: `dark-bottom-wave-${page}`,
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

  const composeRuns = [];

  function addSlide(node) {
    const slide = presentation.slides.add();
    const runs = slide.compose(node, {
      frame: { left: 0, top: 0, width: W, height: H },
      baseUnit: 8,
    });
    composeRuns.push(runs);
    return slide;
  }

  addSlide(
    darkSlideShell(
      media,
      1,
      row(
        {
          width: fill,
          height: fill,
          gap: 42,
          align: "start",
        },
        [
          column(
            {
              width: grow(1.05),
              height: fill,
              gap: 26,
              justify: "start",
            },
            [
              row(
                {
                  width: fill,
                  height: hug,
                  gap: 24,
                  align: "center",
                },
                [
                  img(media, "boostseller-logo.png", {
                    name: "cover-logo",
                    width: fixed(300),
                    height: fixed(72),
                    fit: "contain",
                    alt: "BOOSTSELLER logo",
                  }),
                  label("KAZAKHSTAN-FIRST", COLORS.gold, COLORS.dark),
                ],
              ),
              text("КОММЕРЧЕСКОЕ ПРЕДЛОЖЕНИЕ", {
                name: "cover-kicker",
                width: fill,
                height: hug,
                style: {
                  typeface: DISPLAY,
                  fontSize: uiFs(22),
                  bold: true,
                  color: COLORS.cyan,
                },
              }),
              text("SEO / AEO / GEO ДЛЯ РОСТА ВИДИМОСТИ В ПОИСКЕ И AI-ОТВЕТАХ", {
                name: "cover-title",
                width: wrap(800),
                height: hug,
                style: {
                  typeface: DISPLAY,
                  fontSize: 62,
                  bold: true,
                  color: COLORS.white,
                },
              }),
              text(
                "BOOSTSELLER выстраивает для бизнеса в Казахстане цельную систему поисковой и AI-видимости, а не только базовую SEO-настройку.",
                {
                  name: "cover-subtitle",
                  width: wrap(720),
                  height: hug,
                  style: {
                    typeface: BODY,
                    fontSize: bodyFs(25),
                    color: "#D3DEEB",
                  },
                },
              ),
              row(
                {
                  width: fill,
                  height: hug,
                  gap: 18,
                  align: "center",
                },
                [
                  label("СТАРТ 350 / 750 / 1200К", COLORS.green),
                  label("ВЕДЕНИЕ 250К / МЕС", COLORS.cyanSoft),
                ],
              ),
            ],
          ),
          column(
            {
              width: grow(0.95),
              height: fill,
              gap: 24,
            },
            [
              img(media, "astana-sunset.jpg", {
                name: "cover-city",
                width: fill,
                height: fixed(520),
                fit: "cover",
                borderRadius: 34,
                alt: "Astana skyline at sunset",
              }),
              row(
                {
                  width: fill,
                  height: hug,
                  gap: 18,
                },
                [
                  factChip("SEO", "Техническая и поисковая база", "dark"),
                  factChip("AEO", "Страницы, готовые стать ответом", "dark"),
                  factChip("GEO", "Видимость бренда в AI-выдаче", "dark"),
                ],
              ),
            ],
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
          gap: 26,
        },
        [
          smallKicker("ПОЧЕМУ ЭТО ВАЖНО СЕЙЧАС"),
          titleBlock({
            title: "ОДНОГО КЛАССИЧЕСКОГО SEO УЖЕ НЕДОСТАТОЧНО",
            subtitle:
              "Пользователь всё чаще получает ответ раньше, чем доходит до сайта. Значит бизнесу нужно выигрывать не только в выдаче, но и в ответных форматах поиска.",
          }),
          row(
            {
              width: fill,
              height: grow(1),
              gap: 34,
              align: "start",
            },
            [
              column(
                {
                  width: grow(1.05),
                  height: fill,
                  gap: 14,
                },
                [
                  text("ПОВЕДЕНИЕ ПОИСКА СМЕСТИЛОСЬ ОТ СПИСКА ССЫЛОК К ГОТОВЫМ ВЫВОДАМ.", {
                    width: wrap(740),
                    height: hug,
                    style: {
                      typeface: DISPLAY,
                      fontSize: uiFs(44),
                      bold: true,
                      color: COLORS.ink,
                    },
                  }),
                  bulletList(
                    [
                      "Google ранжирует страницы, но всё активнее вытаскивает быстрые ответы и фрагменты прямо в выдачу.",
                      "AI-интерфейсы вроде ChatGPT, Perplexity и других генеративных систем формируют рекомендацию до клика.",
                      "Если бренд и страницы не подготовлены, часть спроса и доверия теряется ещё до посещения сайта.",
                    ],
                    { size: 20, gap: 12 },
                  ),
                  panel(
                    {
                      width: fill,
                      height: hug,
                      fill: COLORS.paper,
                      line: stroke(`1 ${COLORS.line}`),
                      borderRadius: 24,
                      padding: { x: 24, y: 16 },
                    },
                    text(
                      "Для бизнеса это значит одно: сайт должен не только ранжироваться, но и становиться источником ответа для AI.",
                      {
                        width: fill,
                        height: hug,
                        style: {
                          typeface: BODY,
                          fontSize: bodyFs(19),
                          color: COLORS.ink,
                        },
                      },
                    ),
                  ),
                ],
              ),
              column(
                {
                  width: grow(0.95),
                  height: fill,
                  gap: 16,
                },
                [
                  img(media, "ai-hero.jpg", {
                    name: "ai-hero-2",
                    width: fill,
                    height: fixed(280),
                    fit: "cover",
                    borderRadius: 30,
                    alt: "AI abstract visual",
                  }),
                  insightCard({
                    title: "ПОИСК ТЕПЕРЬ В ТРЁХ СЛОЯХ",
                    body:
                      "Органика, ответные блоки и генеративные ответы. Сильный бренд должен быть заметен во всех трёх сценариях.",
                    fillColor: COLORS.paper,
                    lineColor: COLORS.gold,
                    titleColor: COLORS.ink,
                    bodyColor: COLORS.muted,
                  }),
                ],
              ),
            ],
          ),
        ],
      ),
      { topWaveHeight: 116, paddingY: 34 },
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
          gap: 26,
        },
        [
          smallKicker("ТРИ СЛОЯ ВИДИМОСТИ"),
          titleBlock({
            title: "КАК РАБОТАЕТ SEO + AEO + GEO В ОДНОЙ СИСТЕМЕ",
            subtitle:
              "Это не три разрозненные услуги. Это единый контур видимости, который помогает сайту ранжироваться, отвечать на вопросы и корректно считываться AI-движками.",
          }),
          grid(
            {
              width: fill,
              height: grow(1),
              columns: [fr(1), fr(1), fr(1)],
              rows: [fr(1)],
              columnGap: 24,
            },
            [
              insightCard({
                title: "SEO",
                body:
                  "Search Engine Optimization. Отвечает за индексацию, архитектуру, семантику, коммерческую релевантность и базовый рост органического трафика.",
                fillColor: COLORS.paper,
                lineColor: COLORS.gold,
                titleColor: COLORS.ink,
                bodyColor: COLORS.muted,
              }),
              insightCard({
                title: "AEO",
                body:
                  "Answer Engine Optimization. Подготавливает страницы к форматам готового ответа: FAQ, прямые объяснения, snippets, answer blocks и schema.",
                fillColor: COLORS.paper,
                lineColor: COLORS.cyan,
                titleColor: COLORS.ink,
                bodyColor: COLORS.muted,
              }),
              insightCard({
                title: "GEO",
                body:
                  "Generative Engine Optimization. Формирует понятную для AI-контуров картину о бренде, услугах, кейсах и точках доверия вокруг компании.",
                fillColor: COLORS.paper,
                lineColor: COLORS.green,
                titleColor: COLORS.ink,
                bodyColor: COLORS.muted,
              }),
            ],
          ),
          panel(
            {
              width: fill,
              height: hug,
              fill: "#131A27",
              borderRadius: 24,
              padding: { x: 26, y: 18 },
            },
            text(
              "Итог: SEO приводит спрос, AEO увеличивает вероятность стать ответом, GEO делает бренд видимым в генеративной рекомендации и сравнении.",
              {
                width: fill,
                height: hug,
                style: {
                  typeface: BODY,
                  fontSize: bodyFs(22),
                  color: COLORS.white,
                },
              },
            ),
          ),
        ],
      ),
    ),
  );

  addSlide(
    lightSlideShell(
      media,
      4,
      row(
        {
          width: fill,
          height: fill,
          gap: 32,
          align: "start",
        },
        [
          column(
            {
              width: grow(0.9),
              height: fill,
              gap: 18,
            },
            [
              smallKicker("ВЛИЯНИЕ НА БИЗНЕС"),
              titleBlock({
                title: "ЭТА РАБОТА ВЛИЯЕТ НА КАЧЕСТВО СПРОСА И ДОВЕРИЯ",
                subtitle:
                  "Когда бренд чаще появляется в релевантном поиске, компания получает более тёплые касания до первого контакта.",
                titleWidth: wrap(700),
                subtitleWidth: wrap(720),
                titleSize: 50,
                subtitleSize: 23,
              }),
              text("ВИДИМОСТЬ → ДОВЕРИЕ → ЗАЯВКИ", {
                width: wrap(620),
                height: hug,
                style: {
                  typeface: DISPLAY,
                  fontSize: uiFs(40),
                  bold: true,
                  color: COLORS.ink,
                },
              }),
              bulletList(
                [
                  "Приходит небрендовый спрос: пользователя не нужно сначала знакомить с брендом.",
                  "Выше доверие до звонка: бренд чаще виден в поиске и AI-ответах.",
                  "Лучше качество заявок: страницы снимают часть вопросов до общения.",
                  "Часть спроса начинает работать органически, а не только через рекламу.",
                ],
                {
                  size: 20,
                  gap: 10,
                },
              ),
            ],
          ),
          column(
            {
              width: grow(1.1),
              height: fill,
              gap: 22,
            },
            [
              img(media, "astana-fountain.jpg", {
                name: "astana-fountain-4",
                width: fill,
                height: fixed(520),
                fit: "cover",
                borderRadius: 34,
                alt: "Astana fountain and skyline",
              }),
              grid(
                {
                  width: fill,
                  height: hug,
                  columns: [fr(1), fr(1), fr(1)],
                  rows: [auto],
                  columnGap: 18,
                },
                [
                  factChip("CTR", "выше кликабельность сильных ответных блоков"),
                  factChip("LEADS", "лучше качество входящих заявок"),
                  factChip("TRUST", "выше доверие к бренду до контакта"),
                ],
              ),
            ],
          ),
        ],
      ),
    ),
  );

  addSlide(
    lightSlideShell(
      media,
      5,
      row(
        {
          width: fill,
          height: fill,
          gap: 34,
          align: "start",
        },
        [
          column(
            {
              width: grow(1.05),
              height: fill,
              gap: 22,
            },
            [
              smallKicker("БЛОК SEO"),
              titleBlock({
                title: "SEO — ФУНДАМЕНТ ПОИСКОВОЙ ВИДИМОСТИ",
                subtitle:
                  "Если техническая база и архитектура сайта слабые, остальные слои оптимизации тоже упираются в потолок. Поэтому SEO здесь — фундамент, а не формальная галочка.",
                titleWidth: wrap(760),
                subtitleWidth: wrap(760),
                subtitleSize: 25,
              }),
              bulletList([
                "Технический аудит: индексация, robots/sitemap, ошибки и дубли.",
                "Семантика и кластеризация спроса: карта запросов по страницам и интентам.",
                "Архитектура: URL, перелинковка, иерархия разделов, коммерческие страницы.",
                "On-page слой: titles, descriptions, H-структура, смысловые блоки.",
                "Скорость, аналитика и базовый контроль роста.",
              ]),
            ],
          ),
          column(
            {
              width: grow(0.95),
              height: fill,
              gap: 14,
            },
            [
              insightCard({
                title: "ЧТО ДАЁТ SEO-БЛОК",
                body:
                  "Сайт становится понятнее поисковым системам, страницы получают корректную релевантность, а бизнес перестаёт терять спрос на технических и структурных ошибках.",
                fillColor: "#131A27",
                lineColor: COLORS.green,
                titleColor: COLORS.white,
                bodyColor: "#CBD7E6",
                cardHeight: fixed(292),
                bodySize: 22,
              }),
              factChip("ПОЗИЦИИ", "рост видимости в релевантных запросах", "dark"),
              factChip("ИНДЕКСАЦИЯ", "меньше потерь из-за дублей и ошибок", "dark"),
              factChip("СТРУКТУРА", "понятная карта страниц для роста", "dark"),
              factChip("ОРГАНИКА", "лучший фундамент для стабильного трафика", "dark"),
            ],
          ),
        ],
      ),
    ),
  );

  addSlide(
    lightSlideShell(
      media,
      6,
      row(
        {
          width: fill,
          height: fill,
          gap: 32,
          align: "start",
        },
        [
          column(
            {
              width: grow(0.92),
              height: fill,
              gap: 20,
            },
            [
              img(media, "ai-network.jpg", {
                name: "ai-network-6",
                width: fill,
                height: fixed(500),
                fit: "cover",
                borderRadius: 34,
                alt: "AI network visualization",
              }),
              panel(
                {
                  width: fill,
                  height: hug,
                  fill: "#131A27",
                  borderRadius: 24,
                  padding: { x: 24, y: 18 },
                },
                text(
                  "AEO помогает сайту не просто присутствовать в выдаче, а быть выбранным как удобный и извлекаемый ответ.",
                  {
                    width: fill,
                    height: hug,
                    style: {
                      typeface: BODY,
                      fontSize: bodyFs(21),
                      color: COLORS.white,
                    },
                  },
                ),
              ),
            ],
          ),
          column(
            {
              width: grow(1.08),
              height: fill,
              gap: 22,
            },
            [
              smallKicker("БЛОК AEO"),
              titleBlock({
                title: "AEO — СТРАНИЦЫ ДОЛЖНЫ СТАТЬ ГОТОВЫМИ ОТВЕТАМИ",
                subtitle:
                  "Поисковые и answer-движки лучше работают с контентом, который уже структурирован под интенты пользователя: что это, как выбрать, в чём разница, сколько стоит, кому подходит.",
                titleWidth: wrap(820),
                subtitleWidth: wrap(840),
                titleSize: 54,
                subtitleSize: 25,
              }),
              bulletList([
                "Формируем answer-ready контент: FAQ, comparison blocks, краткие прямые ответы и логичные summary-секции.",
                "Укладываем смысл в извлекаемые форматы: понятные заголовки, списки, definitional blocks, schema.",
                "Перепаковываем страницы под реальные интенты: «что это», «как выбрать», «чем отличается», «сколько стоит», «подходит ли мне».",
                "Усиливаем CTR и доверие: пользователь быстрее понимает, что на странице есть именно нужный ему ответ.",
              ]),
              row(
                {
                  width: fill,
                  height: hug,
                  gap: 12,
                },
                [
                  label("SNIPPET", COLORS.goldSoft, COLORS.ink),
                  label("CTR", COLORS.cyanSoft, COLORS.ink),
                  label("TRUST", COLORS.greenSoft, COLORS.ink),
                  label("PRE-QUAL", COLORS.paper, COLORS.ink),
                ],
              ),
            ],
          ),
        ],
      ),
    ),
  );

  addSlide(
    lightSlideShell(
      media,
      7,
      row(
        {
          width: fill,
          height: fill,
          gap: 36,
          align: "start",
        },
        [
          column(
            {
              width: grow(1.02),
              height: fill,
              gap: 22,
            },
            [
              smallKicker("БЛОК GEO"),
              titleBlock({
                title: "GEO — ПОДГОТОВКА БРЕНДА К ГЕНЕРАТИВНОЙ ВЫДАЧЕ",
                subtitle:
                  "Generative Engine Optimization помогает AI-движкам корректно понимать компанию, услуги, точки экспертизы и факты доверия, а затем включать бренд в релевантные ответы и сравнения.",
              }),
              bulletList([
                "Собираем entity-layer бренда: компания, услуги, продукты, кейсы, эксперты, контекст рынка Казахстана.",
                "Усиливаем доказательную базу: кейсы, proof pages, структурированные service pages, связки между сущностями.",
                "Нормализуем формулировки и сигналы доверия по сайту, метаданным и внешнему цифровому контуру.",
                "Готовим сайт не только к клику из поиска, но и к тому, чтобы AI-ответы понимали, кого именно и почему стоит упомянуть.",
              ]),
            ],
          ),
          column(
            {
              width: grow(0.98),
              height: fill,
              gap: 20,
            },
            [
              img(media, "ai-hero.jpg", {
                name: "ai-hero-7",
                width: fill,
                height: fixed(460),
                fit: "cover",
                borderRadius: 34,
                alt: "AI hero graphic",
              }),
              grid(
                {
                  width: fill,
                  height: hug,
                  columns: [fr(1), fr(1)],
                  rows: [auto, auto],
                  columnGap: 16,
                  rowGap: 16,
                },
                [
                  factChip("ENTITY FIT", "бренд лучше считывается AI-системами", "dark"),
                  factChip("MENTIONS", "выше шанс попасть в генеративные ответы", "dark"),
                  factChip("COMPARISONS", "сильнее позиция в сценариях выбора", "dark"),
                  factChip("FUTURE-READY", "база под следующие поисковые интерфейсы", "dark"),
                ],
              ),
            ],
          ),
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
          gap: 26,
        },
        [
          smallKicker("РАЗОВАЯ НАСТРОЙКА"),
          titleBlock({
            title: "ЧТО ВХОДИТ В СТАРТОВЫЙ ЭТАП ВНЕДРЕНИЯ",
            subtitle:
              "Разовая настройка ставит систему: диагностика, карта спроса, приоритеты внедрения и база под рост.",
            titleWidth: wrap(1180),
            subtitleWidth: wrap(1240),
            subtitleSize: 25,
          }),
          grid(
            {
              width: fill,
              height: grow(1),
              columns: [fr(1), fr(1)],
              rows: [fr(1), fr(1)],
              columnGap: 20,
              rowGap: 20,
            },
            [
              timelineStep(
                "01",
                "АУДИТ",
                "Снимаем текущее состояние сайта, технические риски и точки потерь в видимости.",
              ),
              timelineStep(
                "02",
                "КАРТА СПРОСА",
                "Собираем семантику, интенты, приоритеты страниц и архитектуру роста.",
              ),
              timelineStep(
                "03",
                "ВНЕДРЕНИЕ ЛОГИКИ",
                "Готовим on-page, answer-блоки, schema и приоритетные SEO/AEO/GEO-рекомендации.",
              ),
              timelineStep(
                "04",
                "АНАЛИТИКА И ROADMAP",
                "Настраиваем измерение результатов и выдаём roadmap роста.",
              ),
            ],
          ),
          panel(
            {
              width: fill,
              height: hug,
              fill: COLORS.paper,
              line: stroke(`1 ${COLORS.line}`),
              borderRadius: 24,
              padding: { x: 24, y: 18 },
            },
            text(
              "Выход этапа: список внедрений, карта спроса, приоритеты страниц, аналитика и база для ежемесячного роста.",
              {
                width: fill,
                height: hug,
                style: {
                  typeface: BODY,
                  fontSize: bodyFs(22),
                  color: COLORS.ink,
                },
              },
            ),
          ),
        ],
      ),
      { topWaveHeight: 116, paddingY: 38 },
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
          gap: 24,
        },
        [
          smallKicker("ПАКЕТЫ ЗАПУСКА", true),
          titleBlock({
            title: "ТРИ УРОВНЯ РАЗОВОЙ НАСТРОЙКИ",
            subtitle:
              "Пакеты различаются не идеей услуги, а глубиной проработки, масштабом структуры и степенью готовности проекта к дальнейшему росту.",
            dark: true,
          }),
          grid(
            {
              width: fill,
              height: grow(1),
              columns: [fr(1), fr(1), fr(1)],
              rows: [fr(1)],
              columnGap: 20,
            },
            [
              packageCard({
                tier: "BASE",
                price: "350 000 тг",
                note: "Стартовый фундамент",
                bullets: [
                  "базовый аудит и карта рисков",
                  "семантика и приоритетные страницы",
                  "первичный SEO-слой",
                  "базовые AEO/GEO-рекомендации",
                  "подходит для старта",
                ],
              }),
              packageCard({
                tier: "RECOMMENDED",
                price: "750 000 тг",
                note: "Оптимум системного роста",
                bullets: [
                  "углублённая карта спроса",
                  "расширенная структура страниц",
                  "on-page + answer-блоки + schema",
                  "entity-логика и trust-layer",
                  "аналитика и roadmap роста",
                ],
                highlight: true,
              }),
              packageCard({
                tier: "MAX",
                price: "1 200 000 тг",
                note: "Максимум стратегии",
                bullets: [
                  "глубокий конкурентный и контентный слой",
                  "масштабная архитектура под рост",
                  "расширенный AEO/GEO-контур",
                  "шаблоны под масштабирование",
                  "для конкурентной ниши",
                ],
              }),
            ],
          ),
        ],
      ),
    ),
  );

  addSlide(
    darkSlideShell(
      media,
      10,
      row(
        {
          width: fill,
          height: fill,
          gap: 34,
          align: "start",
        },
        [
          column(
            {
              width: grow(0.95),
              height: fill,
              gap: 20,
            },
            [
              smallKicker("ЕЖЕМЕСЯЧНОЕ СОПРОВОЖДЕНИЕ", true),
              text("250 000 тг", {
                name: "admin-price",
                width: wrap(560),
                height: hug,
                style: {
                  typeface: DISPLAY,
                  fontSize: 92,
                  bold: true,
                  color: COLORS.white,
                },
              }),
              text("в месяц", {
                name: "admin-price-sub",
                width: wrap(460),
                height: hug,
                style: {
                  typeface: DISPLAY,
                  fontSize: 58,
                  bold: true,
                  color: COLORS.white,
                },
              }),
              text(
                "После стартовой настройки система должна развиваться каждый месяц. Иначе сайт постепенно теряет темп, а структура перестаёт успевать за новым спросом.",
                {
                  width: wrap(620),
                  height: hug,
                  style: {
                    typeface: BODY,
                    fontSize: bodyFs(24),
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
            ],
          ),
          column(
            {
              width: grow(1.05),
              height: fill,
              gap: 18,
            },
            [
              bulletList(
                [
                  "Контроль индексации, позиций, приоритетных страниц и критичных технических сигналов.",
                  "Корректировки по структуре, внутренней перелинковке и search-intent слоям.",
                  "Расширение FAQ, answer-блоков, schema и смысловых модулей под AEO.",
                  "Развитие entity-layer, кейсов, proof pages и точек доверия под GEO.",
                  "Контентные приоритеты, рекомендации по новым страницам и ежемесячная аналитика действий.",
                ],
                {
                  dark: true,
                  accent: COLORS.green,
                  size: 23,
                },
              ),
              panel(
                {
                  width: fill,
                  height: hug,
                  fill: "#101927",
                  line: stroke("1 #20324A"),
                  borderRadius: 24,
                  padding: { x: 24, y: 20 },
                },
                text(
                  "Логика оплаты здесь простая: разовая настройка ставит систему, а ежемесячное администрирование не даёт ей застыть и позволяет регулярно конвертировать новые поисковые сценарии в заявки.",
                  {
                    width: fill,
                    height: hug,
                    style: {
                      typeface: BODY,
                      fontSize: bodyFs(22),
                      color: COLORS.white,
                    },
                  },
                ),
              ),
            ],
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
          gap: 26,
        },
        [
          smallKicker("ЭТАПЫ РАБОТ"),
              titleBlock({
                title: "КАК ПРОХОДИТ ПРОЕКТ И КОГДА ПОЯВЛЯЕТСЯ ЭФФЕКТ",
                subtitle:
                  "Сначала диагностика и структура, затем приоритетные внедрения, после чего начинается ежемесячный рост.",
              }),
              grid(
                {
                  width: fill,
                  height: fixed(328),
                  columns: [fr(1), fr(1), fr(1), fr(1)],
                  rows: [fr(1)],
                  columnGap: 18,
            },
            [
              timelineStep("01", "АУДИТ И СРЕЗ", "3–5 рабочих дней. Снимаем состояние, риски и базовые точки роста."),
              timelineStep("02", "СТРУКТУРА И СПРОС", "5–7 рабочих дней. Формируем карту интентов, семантику и архитектуру."),
              timelineStep("03", "ПРИОРИТЕТЫ ВНЕДРЕНИЯ", "5–10 рабочих дней. Выстраиваем SEO/AEO/GEO-слой по приоритету влияния."),
              timelineStep("04", "ЕЖЕМЕСЯЧНЫЙ РОСТ", "Со 2-го месяца. Доработки, расширение структуры и контроль эффекта."),
            ],
          ),
          row(
            {
              width: fill,
              height: grow(1),
              gap: 18,
              align: "start",
            },
            [
              insightCard({
                title: "ПЕРВЫЕ СИГНАЛЫ",
                body:
                  "Чаще видны через 4–8 недель после приоритетных правок.",
                fillColor: COLORS.paper,
                lineColor: COLORS.cyan,
                titleColor: COLORS.ink,
                bodyColor: COLORS.muted,
                titleSize: 24,
                bodySize: 19,
                cardPadding: { x: 24, y: 24 },
              }),
              insightCard({
                title: "НАКОПИТЕЛЬНЫЙ ЭФФЕКТ",
                body:
                  "Полный эффект обычно собирается за 2–6 месяцев.",
                fillColor: COLORS.paper,
                lineColor: COLORS.gold,
                titleColor: COLORS.ink,
                bodyColor: COLORS.muted,
                titleSize: 24,
                bodySize: 19,
                cardPadding: { x: 24, y: 24 },
              }),
              insightCard({
                title: "ПОЧЕМУ НУЖНО СОПРОВОЖДЕНИЕ",
                body:
                  "Поиск и AI-выдача меняются, поэтому проект нужно адаптировать ежемесячно.",
                fillColor: COLORS.paper,
                lineColor: COLORS.green,
                titleColor: COLORS.ink,
                bodyColor: COLORS.muted,
                titleSize: 24,
                bodySize: 19,
                cardPadding: { x: 24, y: 24 },
              }),
            ],
          ),
        ],
      ),
    ),
  );

  addSlide(
    lightSlideShell(
      media,
      12,
      row(
        {
          width: fill,
          height: fill,
          gap: 34,
          align: "start",
        },
        [
          column(
            {
              width: grow(0.95),
              height: fill,
              gap: 24,
            },
            [
              smallKicker("ЧТО ЕЩЁ МОЖЕМ СДЕЛАТЬ"),
              titleBlock({
                title: "BOOSTSELLER МОЖЕТ ВЕСТИ ВЕСЬ GROWTH-КОНТУР",
                subtitle:
                  "Если задача шире базовой видимости, мы собираем дополнительные слои, которые усиливают SEO / AEO / GEO и быстрее переводят внимание в заявки.",
                titleWidth: wrap(700),
                subtitleWidth: wrap(720),
                titleSize: 60,
                subtitleSize: 26,
              }),
              text("ОПТИМИЗАЦИЯ РАБОТАЕТ СИЛЬНЕЕ, КОГДА ЕЁ ПОДДЕРЖИВАЮТ КОНТЕНТ, СТРАНИЦЫ, АНАЛИТИКА И КОНВЕРСИЯ.", {
                width: wrap(620),
                height: hug,
                style: {
                  typeface: DISPLAY,
                  fontSize: uiFs(36),
                  bold: true,
                  color: COLORS.ink,
                },
              }),
            ],
          ),
          column(
            {
              width: grow(1.05),
              height: fill,
              gap: 18,
            },
            [
              bulletList([
                "SEO-ready и GEO-ready landing pages под отдельные направления, услуги и офферы.",
                "Контент-кластеры, кейсы, экспертные статьи и FAQ-архитектура под небрендовый спрос.",
                "Региональные или сегментные страницы под рынок Казахстана и отдельные сценарии выбора.",
                "CRO и точки захвата заявки: усиление CTA, форм, микро-доверия и pre-qualification слоёв.",
                "Дашборды и отчётность по поисковой и AI-видимости, чтобы видеть не только действия, но и управляемый прогресс.",
                "При необходимости — связка с AI-ассистентами, knowledge layer, чат-интерфейсами и автоматизацией внутренних сценариев.",
              ], { size: 20, gap: 12 }),
              panel(
                {
                  width: fill,
                  height: hug,
                  fill: "#131A27",
                  borderRadius: 24,
                  padding: { x: 24, y: 20 },
                },
                text(
                  "То есть проект можно развивать как точечную SEO/AEO/GEO-оптимизацию, а можно — как полноценную систему цифрового роста вокруг сайта и контента.",
                  {
                    width: fill,
                    height: hug,
                    style: {
                      typeface: BODY,
                      fontSize: bodyFs(22),
                      color: COLORS.white,
                    },
                  },
                ),
              ),
            ],
          ),
        ],
      ),
    ),
  );

  addSlide(
    lightSlideShell(
      media,
      13,
      row(
        {
          width: fill,
          height: fill,
          gap: 34,
          align: "start",
        },
        [
          column(
            {
              width: grow(0.95),
              height: fill,
              gap: 18,
            },
            [
              smallKicker("МИНИ-СВОДКА ПО САЙТУ"),
              titleBlock({
                title: "SMARTPROF.KZ: БАЗА ЕСТЬ, ТОЧКИ РОСТА ЯСНЫ",
                subtitle:
                  "Короткий внешний взгляд на homepage и ближайший потенциал усиления.",
                titleWidth: wrap(720),
                subtitleWidth: wrap(700),
                titleSize: 52,
                subtitleSize: 22,
              }),
              img(media, "smartprof-home-crop.png", {
                name: "smartprof-home-13",
                width: fill,
                height: fixed(470),
                fit: "cover",
                borderRadius: 28,
                alt: "Homepage screenshot of smartprof.kz",
              }),
              text("Наблюдение по homepage на 7 мая 2026 года.", {
                width: fill,
                height: hug,
                style: {
                  typeface: BODY,
                  fontSize: bodyFs(16),
                  color: COLORS.soft,
                },
              }),
            ],
          ),
          column(
            {
              width: grow(1.05),
              height: fill,
              gap: 18,
            },
            [
              insightCard({
                title: "ЧТО УЖЕ ХОРОШО",
                body:
                  "Сильная отраслевая подача, заметный продуктовый блок, проекты, FAQ и новости уже формируют доверие и тематическую глубину бренда.",
                fillColor: COLORS.paper,
                lineColor: COLORS.green,
                titleColor: COLORS.ink,
                bodyColor: COLORS.muted,
              }),
              insightCard({
                title: "ЧТО МОЖНО УСИЛИТЬ",
                body:
                  "Чтобы забирать больше небрендового спроса, сайту нужны отдельные SEO-ready страницы под системы, типы объектов, сегменты клиентов и сценарии выбора, плюс более чистые answer-блоки.",
                fillColor: COLORS.paper,
                lineColor: COLORS.cyan,
                titleColor: COLORS.ink,
                bodyColor: COLORS.muted,
              }),
              grid(
                {
                  width: fill,
                  height: hug,
                  columns: [fr(1), fr(1), fr(1), fr(1)],
                  rows: [auto],
                  columnGap: 14,
                },
                [
                  factChip("200", "homepage отвечает корректно"),
                  factChip("1 H1", "структура не перегружена"),
                  factChip("18 URL", "в sitemap уже есть базовая карта сайта"),
                  factChip("3 JSON-LD", "schema есть и её можно развивать дальше"),
                ],
              ),
              panel(
                {
                  width: fill,
                  height: hug,
                  fill: "#131A27",
                  borderRadius: 24,
                  padding: { x: 24, y: 18 },
                },
                text(
                  "Точка роста: перевести smartprof.kz из брендовой витрины в систему продуктовых и экспертных страниц.",
                  {
                    width: fill,
                    height: hug,
                    style: {
                      typeface: BODY,
                      fontSize: bodyFs(22),
                      color: COLORS.white,
                    },
                  },
                ),
              ),
            ],
          ),
        ],
      ),
    ),
  );

  addSlide(
    darkSlideShell(
      media,
      14,
      row(
        {
          width: fill,
          height: fill,
          gap: 38,
          align: "start",
        },
        [
          column(
            {
              width: grow(1),
              height: hug,
              gap: 26,
            },
            [
              smallKicker("СЛЕДУЮЩИЙ ШАГ", true),
              titleBlock({
                title: "ГОТОВЫ ЗАБРАТЬ ВИДИМОСТЬ В ПОИСКЕ И AI?",
                subtitle:
                  "BOOSTSELLER соберёт для вас SEO / AEO / GEO-контур под рынок Казахстана и переведёт его в управляемый рост, где каждая доработка работает на спрос и заявки.",
                dark: true,
                titleWidth: wrap(780),
                subtitleWidth: wrap(700),
                titleSize: 54,
                subtitleSize: 23,
              }),
              row(
                {
                  width: fill,
                  height: hug,
                  gap: 18,
                },
                [
                  label("СТАРТ 350 / 750 / 1200К", COLORS.green, COLORS.dark),
                  label("ВЕДЕНИЕ 250К / МЕС", COLORS.goldSoft, COLORS.dark),
                ],
              ),
              text("СТАРТ ПРОЕКТА ОБЫЧНО НАЧИНАЕТСЯ С КОРОТКОГО БРИФА, ВЫБОРА ПАКЕТА И ПРИОРИТЕТНОЙ ДОРОЖНОЙ КАРТЫ.", {
                width: wrap(760),
                height: hug,
                style: {
                  typeface: DISPLAY,
                  fontSize: uiFs(34),
                  bold: true,
                  color: COLORS.white,
                },
              }),
              panel(
                {
                  width: wrap(760),
                  height: hug,
                  fill: "#101927",
                  line: stroke("1 #20324A"),
                  borderRadius: 26,
                  padding: { x: 24, y: 22 },
                },
                text(
                  "CTA: запросить стратегическую сессию и собрать стартовый SEO / AEO / GEO-план под ваш сайт, продукт и коммерческие цели.",
                  {
                    width: fill,
                    height: hug,
                    style: {
                      typeface: BODY,
                      fontSize: bodyFs(24),
                      color: "#D7E3F4",
                    },
                  },
                ),
              ),
            ],
          ),
          panel(
            {
              width: grow(0.92),
              height: fill,
              fill: "#121B2A",
              line: stroke("1 #24344D"),
              borderRadius: 34,
              padding: { x: 28, y: 28 },
            },
            column(
              {
                width: fill,
                height: fill,
                gap: 20,
              },
              [
                img(media, "boostseller-logo.png", {
                  name: "closing-logo-14",
                  width: fixed(280),
                  height: fixed(68),
                  fit: "contain",
                  alt: "BOOSTSELLER logo",
                }),
                text("ПАКЕТ СТАРТА", {
                  width: fill,
                  height: hug,
                  style: {
                    typeface: DISPLAY,
                    fontSize: uiFs(22),
                    bold: true,
                    color: COLORS.cyan,
                  },
                }),
                text("1. Выбираем формат запуска: 350 / 750 / 1 200 тыс. тг.", {
                  width: fill,
                  height: hug,
                  style: {
                    typeface: BODY,
                    fontSize: bodyFs(24),
                    color: COLORS.white,
                  },
                }),
                text("2. Сверяем сайт, спрос, регион и коммерческие приоритеты.", {
                  width: fill,
                  height: hug,
                  style: {
                    typeface: BODY,
                    fontSize: bodyFs(24),
                    color: COLORS.white,
                  },
                }),
                text("3. Запускаем внедрение и переводим проект в сопровождение.", {
                  width: fill,
                  height: hug,
                  style: {
                    typeface: BODY,
                    fontSize: bodyFs(24),
                    color: COLORS.white,
                  },
                }),
                panel(
                  {
                    width: fill,
                    height: hug,
                    fill: COLORS.green,
                    borderRadius: 22,
                    padding: { x: 22, y: 18 },
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
                    borderRadius: 22,
                    padding: { x: 22, y: 18 },
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
                          fontSize: bodyFs(24),
                          color: "#D7E3F4",
                        },
                      }),
                      text("Алматы\nработаем по контракту и договору по законодательству РК", {
                        width: fill,
                        height: hug,
                        style: {
                          typeface: BODY,
                          fontSize: bodyFs(17),
                          color: "#D7E3F4",
                        },
                      }),
                      text("офис: г. Караганда", {
                        width: fill,
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
                ),
              ],
            ),
          ),
        ],
      ),
    ),
  );

  return { presentation, composeRuns };
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
  const { presentation } = deck(media);
  const previews = await renderOutputs(presentation);
  await writeSources();

  console.log(JSON.stringify({ pdfPath, previews }, null, 2));
}

await main();
