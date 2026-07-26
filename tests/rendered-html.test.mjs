import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
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

test("server-renders the StockCare mockup shell", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html lang="th">/i);
  assert.match(html, /<title>StockCare \| ระบบเบิกเวชภัณฑ์<\/title>/i);
  assert.match(html, /StockCare/);
  assert.match(html, /ระบบเบิกเวชภัณฑ์/);
  assert.match(html, /บัญชียาตัวอย่าง/);
  assert.match(html, /100 ชนิด/);
  assert.match(html, /Paracetamol 500 mg/);
  assert.match(html, /ข้อมูลทั้งหมดเป็นตัวอย่าง ยังไม่เชื่อมฐานข้อมูล/);
  assert.match(html, /ขอเบิก/);
  assert.match(html, /อนุมัติ/);
  assert.match(html, /สต็อก/);
  assert.match(html, /รับเข้า/);
  assert.doesNotMatch(html, /Your site is taking shape|react-loading-skeleton|codex-preview/i);
});

test("removes starter preview dependencies and files", async () => {
  const [page, medicines, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/medicines.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /"use client"/);
  assert.match(page, /medicineStockItems/);
  assert.match(medicines, /medicineCatalogSeed/);
  assert.match(medicines, /export const medicineStockItems/);
  assert.match(medicines, /Lidocaine injection/);
  assert.match(page, /Mockup/);
  assert.match(layout, /lang="th"/);
  assert.match(layout, /StockCare \| ระบบเบิกเวชภัณฑ์/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.doesNotMatch(page, /_sites-preview|SkeletonPreview/);
  await assert.rejects(access(new URL("../app/_sites-preview/SkeletonPreview.tsx", import.meta.url)));
});
