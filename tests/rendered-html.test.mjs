import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Bạch Đằng story entrance", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Mật lệnh Bạch Đằng 1288 \| Lịch sử tương tác<\/title>/i);
  assert.match(html, /Chuyện Bạch Đằng/);
  assert.match(html, /Mật lệnh Bạch Đằng/);
  assert.match(html, /truyen-ke-sach-dem-trang\.png/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/i);
});

test("keeps all 13 slides and the new key-fact material", async () => {
  const [page, teacher] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/teacher/page.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(page, /const TOTAL_SLIDES = 13/);
  assert.match(page, /09 · 04/);
  assert.match(page, /Ai đối đầu\?/);
  assert.match(page, /Trần Hưng Đạo/);
  assert.match(page, /VÌ SAO QUAN TRỌNG\?/);
  assert.match(page, /\/images\/tran-hung-dao-hero\.png/);
  assert.match(teacher, /7 trang truyện \+ 13 slide/);
  assert.match(teacher, /9-4-1288/);

  await access(new URL("../public/images/tran-hung-dao-hero.png", import.meta.url));
});
