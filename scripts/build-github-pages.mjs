import { writeFileSync } from "node:fs";
import { medicineCatalogSummary, medicineStockItems } from "../app/medicines.ts";

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function encodeNonAscii(value) {
  return value.replace(/[^\x00-\x7F]/gu, (char) => {
    const codePoint = char.codePointAt(0);
    return codePoint ? `&#${codePoint};` : "";
  });
}

const rows = medicineStockItems
  .map((item) => {
    const statusClass =
      item.status === "ปกติ" ? "ok" : item.status === "ใกล้หมด" ? "low" : "exp";

    return `
  <tr>
    <td><strong>${escapeHtml(item.name)}</strong><small>${escapeHtml(item.code)} · ${escapeHtml(item.category)}</small></td>
    <td>${escapeHtml(item.warehouse)}<small>${escapeHtml(item.location)}</small></td>
    <td>${escapeHtml(item.lot)}</td>
    <td>${escapeHtml(item.expire)}<small>เหลือ ${item.remain} วัน</small></td>
    <td><strong>${item.qty.toLocaleString("th-TH")} ${escapeHtml(item.unit)}</strong><small>ขั้นต่ำ ${item.min} ${escapeHtml(item.unit)}</small></td>
    <td><span class="status ${statusClass}">${escapeHtml(item.status)}</span></td>
  </tr>`;
  })
  .join("");

const html = `<!doctype html>
<html lang="th">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>STOCK ระบบเบิกเวชภัณฑ์</title>
  <meta name="description" content="GitHub Pages สำหรับระบบเบิกและติดตามสต็อกเวชภัณฑ์" />
  <style>
    :root{--bg:#f4f7f8;--ink:#102022;--muted:#607073;--line:#dce5e6;--primary:#0d766e;--danger:#b42318;--warn:#ca8a04;--panel:#fff}
    *{box-sizing:border-box} body{margin:0;background:linear-gradient(180deg,rgba(13,118,110,.08),transparent 320px),var(--bg);color:var(--ink);font-family:"Noto Sans Thai","Segoe UI",Arial,sans-serif}
    header{padding:30px 24px 18px;max-width:1180px;margin:auto;display:flex;justify-content:space-between;gap:18px;align-items:flex-start}
    .brand{display:flex;gap:12px;align-items:center}.mark{display:grid;place-items:center;width:46px;height:46px;border-radius:8px;background:var(--primary);color:white;font-weight:800}.eyebrow{color:var(--primary);font-weight:800;font-size:.8rem}h1{font-size:2.6rem;margin:.15rem 0 .4rem;line-height:1.05}p{color:var(--muted);line-height:1.55;margin:0}.notice{background:#fff8e7;border:1px solid #f1d49c;border-radius:8px;padding:12px 14px;max-width:360px;color:#6b5a34}
    main{max-width:1180px;margin:auto;padding:0 24px 40px}.metrics{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px;margin:12px 0 16px}.card{background:var(--panel);border:1px solid var(--line);border-radius:8px;padding:16px;box-shadow:0 18px 50px rgba(16,32,34,.06)}.card span{display:block;color:var(--muted);font-weight:700}.card strong{display:block;font-size:1.8rem;margin:8px 0;color:var(--ink)}
    .panel{background:var(--panel);border:1px solid var(--line);border-radius:8px;box-shadow:0 18px 50px rgba(16,32,34,.06);overflow:hidden}.panel-head{padding:18px;border-bottom:1px solid var(--line);display:flex;justify-content:space-between;gap:16px}.panel-head h2{margin:0 0 4px;font-size:1.25rem}.table-wrap{overflow:auto}table{width:100%;min-width:920px;border-collapse:collapse}th,td{text-align:left;padding:13px 14px;border-bottom:1px solid var(--line);vertical-align:middle}th{background:#eef5f5;color:var(--muted);font-size:.86rem}td small{display:block;color:var(--muted);margin-top:3px}.status{display:inline-flex;border-radius:999px;padding:4px 10px;font-size:.82rem;font-weight:800;white-space:nowrap}.ok{background:#dff3e8;color:#0d613a}.low{background:#ffe9d6;color:#944b00}.exp{background:#fff1cc;color:#7a4b00}.links{display:flex;gap:10px;flex-wrap:wrap}.links a{display:inline-flex;align-items:center;min-height:38px;padding:8px 12px;border-radius:8px;border:1px solid var(--line);color:var(--ink);text-decoration:none;font-weight:800;background:white}.links a.primary{background:var(--primary);border-color:var(--primary);color:white}
    @media (max-width:860px){header{display:grid}.metrics{grid-template-columns:repeat(2,minmax(0,1fr))}h1{font-size:2rem}.notice{max-width:none}}@media (max-width:560px){.metrics{grid-template-columns:1fr}main,header{padding-left:16px;padding-right:16px}}
  </style>
</head>
<body>
  <header>
    <div>
      <div class="brand"><span class="mark">S</span><div><span class="eyebrow">GitHub Pages</span><h1>STOCK ระบบเบิกเวชภัณฑ์</h1></div></div>
      <p>หน้าเว็บจริงบน GitHub Pages สำหรับดูภาพรวมคลังและรายการยาตัวอย่าง 100 ชนิด</p>
    </div>
    <div class="notice"><strong>Mockup</strong><br/>ข้อมูลนี้เป็นข้อมูลตัวอย่าง ยังไม่เชื่อมฐานข้อมูลและไม่ใช่ข้อมูลทางการแพทย์สำหรับใช้งานจริง</div>
  </header>
  <main>
    <section class="metrics">
      <div class="card"><span>บัญชียาตัวอย่าง</span><strong>${medicineCatalogSummary.total} ชนิด</strong><p>แสดงบน GitHub Pages</p></div>
      <div class="card"><span>รายการใกล้หมด</span><strong>${medicineCatalogSummary.lowStock} รายการ</strong><p>ต่ำกว่าจำนวนขั้นต่ำ</p></div>
      <div class="card"><span>ใกล้หมดอายุ</span><strong>${medicineCatalogSummary.nearExpire} ล็อต</strong><p>ภายใน 90 วัน</p></div>
      <div class="card"><span>เว็บระบบเต็ม</span><strong>StockCare</strong><p>มีเมนู mockup แบบคลิกได้</p></div>
    </section>
    <section class="panel">
      <div class="panel-head"><div><h2>สต็อกคงเหลือแยกล็อต</h2><p>รายการตัวอย่างสำหรับนำเสนอระบบเบิกและติดตามเวชภัณฑ์</p></div><div class="links"><a class="primary" href="https://stock-ncsc8650-demo.team86gpt.chatgpt.site">เปิดเว็บระบบเต็ม</a><a href="https://github.com/Ncsc8650/STOCK--">เปิด repo</a></div></div>
      <div class="table-wrap"><table><thead><tr><th>รายการ</th><th>คลัง / ตำแหน่ง</th><th>ล็อต</th><th>หมดอายุ</th><th>คงเหลือ</th><th>สถานะ</th></tr></thead><tbody>${rows}</tbody></table></div>
    </section>
  </main>
</body>
</html>`;

writeFileSync("index.html", encodeNonAscii(html), "utf8");
writeFileSync(".nojekyll", "", "utf8");
