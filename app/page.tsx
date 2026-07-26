"use client";

import { useMemo, useState } from "react";
import { medicineCatalogSummary, medicineStockItems } from "./medicines";

type ViewKey =
  | "dashboard"
  | "request"
  | "approve"
  | "stock"
  | "receive"
  | "reports"
  | "master";

const menuItems: { key: ViewKey; label: string; hint: string }[] = [
  { key: "dashboard", label: "ภาพรวม", hint: "สถานะคลังวันนี้" },
  { key: "request", label: "ขอเบิก", hint: "สร้างใบขอเบิก" },
  { key: "approve", label: "อนุมัติ", hint: "รายการรอตรวจสอบ" },
  { key: "stock", label: "สต็อก", hint: "คงเหลือและล็อต" },
  { key: "receive", label: "รับเข้า", hint: "เพิ่มของเข้าคลัง" },
  { key: "reports", label: "รายงาน", hint: "สรุปการใช้งาน" },
  { key: "master", label: "ข้อมูลพื้นฐาน", hint: "ตั้งค่าระบบ" },
];

const stockItems = [
  {
    code: "MED-001",
    name: "Paracetamol 500 mg",
    category: "ยาเม็ด",
    unit: "แผง",
    warehouse: "คลังกลาง",
    location: "ตู้ A / ชั้น 2",
    lot: "PCT2604",
    expire: "2026-10-18",
    remain: 84,
    min: 120,
    qty: 86,
    status: "ใกล้หมด",
  },
  {
    code: "SUP-014",
    name: "ถุงมือ Nitrile Size M",
    category: "วัสดุสิ้นเปลือง",
    unit: "กล่อง",
    warehouse: "คลังกลาง",
    location: "ตู้ B / ชั้น 1",
    lot: "GLV2606",
    expire: "2028-06-02",
    remain: 677,
    min: 40,
    qty: 155,
    status: "ปกติ",
  },
  {
    code: "MED-022",
    name: "Normal Saline 1000 ml",
    category: "น้ำเกลือ",
    unit: "ขวด",
    warehouse: "ห้องฉุกเฉิน",
    location: "ชั้น NS-1",
    lot: "NS2602",
    expire: "2026-08-21",
    remain: 26,
    min: 50,
    qty: 44,
    status: "ใกล้หมดอายุ",
  },
  {
    code: "SUP-031",
    name: "Syringe 10 ml",
    category: "อุปกรณ์หัตถการ",
    unit: "ชิ้น",
    warehouse: "คลังกลาง",
    location: "ตู้ C / ชั้น 3",
    lot: "SR2601",
    expire: "2029-01-15",
    remain: 904,
    min: 300,
    qty: 1240,
    status: "ปกติ",
  },
];

const displayedStockItems = medicineStockItems;

const requisitions = [
  {
    id: "REQ-2607-018",
    department: "ห้องฉุกเฉิน",
    requester: "คุณพยาบาลอร",
    items: "Normal Saline 1000 ml, Syringe 10 ml",
    amount: "30 ขวด / 120 ชิ้น",
    status: "รออนุมัติ",
    time: "วันนี้ 09:20",
  },
  {
    id: "REQ-2607-017",
    department: "แผนกผู้ป่วยใน",
    requester: "คุณนันท์",
    items: "ถุงมือ Nitrile Size M",
    amount: "12 กล่อง",
    status: "อนุมัติแล้ว",
    time: "วันนี้ 08:45",
  },
  {
    id: "REQ-2607-016",
    department: "ห้องทำแผล",
    requester: "คุณปริม",
    items: "Paracetamol 500 mg",
    amount: "20 แผง",
    status: "จ่ายของแล้ว",
    time: "เมื่อวาน 16:10",
  },
];

const movementRows = [
  ["รับเข้า", "ถุงมือ Nitrile Size M", "+80 กล่อง", "คลังกลาง", "วันนี้ 07:55"],
  ["จ่ายออก", "Normal Saline 1000 ml", "-18 ขวด", "ห้องฉุกเฉิน", "วันนี้ 10:10"],
  ["ปรับยอด", "Paracetamol 500 mg", "-4 แผง", "คลังกลาง", "เมื่อวาน 15:40"],
  ["ตัดทิ้ง", "Normal Saline 1000 ml", "-3 ขวด", "ห้องฉุกเฉิน", "เมื่อวาน 11:05"],
];

const masterCards = [
  ["รายการเวชภัณฑ์", "รหัส, ชื่อ, หมวดหมู่, หน่วยนับ, จำนวนขั้นต่ำ"],
  ["หมวดหมู่", "ยา, วัสดุสิ้นเปลือง, อุปกรณ์, น้ำยา"],
  ["แผนก", "ห้องฉุกเฉิน, ผู้ป่วยใน, ห้องทำแผล, ทันตกรรม"],
  ["คลังและตำแหน่ง", "คลังกลาง, ห้องยา, ตู้, ชั้น, ช่องเก็บ"],
  ["ผู้ใช้งานและสิทธิ์", "ผู้ขอเบิก, ผู้อนุมัติ, เจ้าหน้าที่คลัง, ผู้ดูแล"],
  ["ผู้จำหน่าย", "ชื่อบริษัท, เบอร์ติดต่อ, เลขเอกสารรับเข้า"],
];

function statusClass(status: string) {
  if (status.includes("รอ")) return "status pending";
  if (status.includes("ใกล้")) return "status warn";
  if (status.includes("อนุมัติ") || status.includes("ปกติ")) {
    return "status success";
  }
  return "status neutral";
}

function Card({
  title,
  value,
  detail,
  tone = "plain",
}: {
  title: string;
  value: string;
  detail: string;
  tone?: "plain" | "warn" | "danger" | "success";
}) {
  return (
    <section className={`metric ${tone}`}>
      <p>{title}</p>
      <strong>{value}</strong>
      <span>{detail}</span>
    </section>
  );
}

function Dashboard() {
  const lowStock = medicineCatalogSummary.lowStock;
  const nearExpire = medicineCatalogSummary.nearExpire;

  return (
    <div className="view-grid">
      <div className="metrics">
        <Card title="บัญชียาตัวอย่าง" value={`${medicineCatalogSummary.total} ชนิด`} detail="ยังไม่เชื่อมฐานข้อมูล" tone="success" />
        <Card title="รายการใกล้หมด" value={`${lowStock} รายการ`} detail="ต่ำกว่าจำนวนขั้นต่ำ" tone="danger" />
        <Card title="ใกล้หมดอายุ" value={`${nearExpire} ล็อต`} detail="ภายใน 90 วัน" tone="warn" />
        <Card title="จ่ายออกเดือนนี้" value="1,284 หน่วย" detail="เพิ่มขึ้น 12%" tone="success" />
      </div>

      <section className="panel wide">
        <div className="panel-head">
          <div>
            <h2>งานที่ต้องดูวันนี้</h2>
            <p>ใช้เป็นหน้าจอแรกหลังล็อกอิน เพื่อบอกว่าควรจัดการอะไรก่อน</p>
          </div>
          <button className="ghost-button" type="button">ดูทั้งหมด</button>
        </div>
        <div className="task-list">
          <div className="task-row urgent">
            <span className="task-mark">1</span>
            <div>
              <strong>อนุมัติใบเบิกห้องฉุกเฉิน</strong>
              <p>มี Normal Saline ที่ต้องเลือกล็อตก่อนจ่าย</p>
            </div>
            <span>09:20</span>
          </div>
          <div className="task-row warning">
            <span className="task-mark">2</span>
            <div>
              <strong>ตรวจล็อตใกล้หมดอายุ</strong>
              <p>Normal Saline เหลือ 26 วัน ควรเร่งใช้หรือตัดสินใจย้ายคลัง</p>
            </div>
            <span>26 วัน</span>
          </div>
          <div className="task-row">
            <span className="task-mark">3</span>
            <div>
              <strong>เติม Paracetamol</strong>
              <p>เหลือ 86 แผง ต่ำกว่าขั้นต่ำ 120 แผง</p>
            </div>
            <span>ใกล้หมด</span>
          </div>
        </div>
      </section>

      <section className="panel">
        <h2>ขั้นตอนมาตรฐาน</h2>
        <div className="flow">
          {["ขอเบิก", "อนุมัติ", "จ่ายของ", "ตัดสต็อก", "รายงาน"].map((step, index) => (
            <div className="flow-step" key={step}>
              <span>{index + 1}</span>
              <strong>{step}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="panel">
        <h2>การเคลื่อนไหวล่าสุด</h2>
        <div className="mini-table">
          {movementRows.map((row) => (
            <div className="mini-row" key={row.join("-")}>
              <span>{row[0]}</span>
              <strong>{row[1]}</strong>
              <em>{row[2]}</em>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function RequestView() {
  return (
    <div className="two-column">
      <section className="panel form-panel">
        <div className="panel-head">
          <div>
            <h2>สร้างใบขอเบิก</h2>
            <p>ตัวอย่างฟอร์มสำหรับผู้ใช้งานทั่วไป</p>
          </div>
          <span className="status pending">ฉบับร่าง</span>
        </div>
        <div className="form-grid">
          <label>
            แผนก
            <select defaultValue="er">
              <option value="er">ห้องฉุกเฉิน</option>
              <option value="ward">แผนกผู้ป่วยใน</option>
              <option value="wound">ห้องทำแผล</option>
            </select>
          </label>
          <label>
            ผู้ขอเบิก
            <input defaultValue="คุณพยาบาลอร" />
          </label>
          <label className="span-2">
            รายการเวชภัณฑ์
            <select defaultValue="ns">
              <option value="ns">Normal Saline 1000 ml</option>
              <option value="glove">ถุงมือ Nitrile Size M</option>
              <option value="para">Paracetamol 500 mg</option>
            </select>
          </label>
          <label>
            จำนวนที่ขอ
            <input defaultValue="30" inputMode="numeric" />
          </label>
          <label>
            หน่วย
            <input defaultValue="ขวด" />
          </label>
          <label className="span-2">
            เหตุผล / หมายเหตุ
            <textarea defaultValue="ใช้เติมประจำห้องฉุกเฉิน รอบเช้า" />
          </label>
        </div>
        <div className="button-row">
          <button className="primary-button" type="button">ส่งคำขอ</button>
          <button className="ghost-button" type="button">บันทึกร่าง</button>
        </div>
      </section>

      <section className="panel">
        <h2>ระบบช่วยตรวจสอบก่อนส่ง</h2>
        <div className="check-list">
          <div>
            <strong>สต็อกพอจ่าย</strong>
            <span className="status success">เหลือ 44 ขวด</span>
          </div>
          <div>
            <strong>ล็อตที่ควรจ่ายก่อน</strong>
            <span>NS2602 หมดอายุ 21 ส.ค. 2026</span>
          </div>
          <div>
            <strong>ผู้อนุมัติ</strong>
            <span>หัวหน้าห้องฉุกเฉิน</span>
          </div>
          <div>
            <strong>สถานะหลังส่ง</strong>
            <span className="status pending">รออนุมัติ</span>
          </div>
        </div>
      </section>
    </div>
  );
}

function ApproveView() {
  return (
    <section className="panel wide">
      <div className="panel-head">
        <div>
          <h2>รายการขอเบิก</h2>
          <p>ผู้อนุมัติเห็นรายการสำคัญ และแก้จำนวนอนุมัติก่อนส่งคลังได้</p>
        </div>
        <div className="segmented">
          <button type="button" className="active">รออนุมัติ</button>
          <button type="button">ทั้งหมด</button>
        </div>
      </div>
      <div className="request-list">
        {requisitions.map((item) => (
          <article className="request-card" key={item.id}>
            <div>
              <span>{item.id}</span>
              <h3>{item.department}</h3>
              <p>{item.items}</p>
            </div>
            <div>
              <strong>{item.amount}</strong>
              <p>{item.requester}</p>
            </div>
            <div>
              <span className={statusClass(item.status)}>{item.status}</span>
              <p>{item.time}</p>
            </div>
            <div className="button-row compact">
              <button className="primary-button" type="button">อนุมัติ</button>
              <button className="ghost-button" type="button">รายละเอียด</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function StockView() {
  return (
    <section className="panel wide">
      <div className="panel-head">
        <div>
          <h2>สต็อกคงเหลือแยกล็อต</h2>
          <p>ใช้ดูจำนวนจริง ตำแหน่งเก็บ วันหมดอายุ และสถานะเตือน</p>
        </div>
        <label className="search-box">
          ค้นหา
          <input placeholder="ชื่อยา รหัส หรือเลขล็อต" />
        </label>
      </div>
      <div className="stock-table">
        <div className="stock-summary">
          <span>
            <strong>{medicineCatalogSummary.total}</strong>
            ยาตัวอย่างทั้งหมด
          </span>
          <span>
            <strong>{medicineCatalogSummary.lowStock}</strong>
            รายการใกล้หมด
          </span>
          <span>
            <strong>{medicineCatalogSummary.nearExpire}</strong>
            ล็อตใกล้หมดอายุ
          </span>
          <em>ข้อมูลจำลองเพื่อออกแบบหน้าจอ ยังไม่ใช่ข้อมูลยาใช้งานจริง</em>
        </div>
        <div className="stock-row stock-head">
          <span>รายการ</span>
          <span>คลัง / ตำแหน่ง</span>
          <span>ล็อต</span>
          <span>หมดอายุ</span>
          <span>คงเหลือ</span>
          <span>สถานะ</span>
        </div>
        {displayedStockItems.map((item) => (
          <div className="stock-row" key={item.code}>
            <span>
              <strong>{item.name}</strong>
              <small>{item.code} · {item.category}</small>
            </span>
            <span>
              <strong>{item.warehouse}</strong>
              <small>{item.location}</small>
            </span>
            <span>{item.lot}</span>
            <span>
              {item.expire}
              <small>เหลือ {item.remain} วัน</small>
            </span>
            <span>
              <strong>{item.qty.toLocaleString("th-TH")} {item.unit}</strong>
              <small>ขั้นต่ำ {item.min} {item.unit}</small>
            </span>
            <span className={statusClass(item.status)}>{item.status}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function ReceiveView() {
  return (
    <div className="two-column">
      <section className="panel form-panel">
        <div className="panel-head">
          <div>
            <h2>บันทึกรับเข้า</h2>
            <p>เจ้าหน้าที่คลังเพิ่มล็อตสินค้าใหม่เข้าระบบ</p>
          </div>
        </div>
        <div className="form-grid">
          <label className="span-2">
            รายการ
            <select defaultValue="glove">
              <option value="glove">ถุงมือ Nitrile Size M</option>
              <option value="para">Paracetamol 500 mg</option>
              <option value="ns">Normal Saline 1000 ml</option>
            </select>
          </label>
          <label>
            เลขล็อต
            <input defaultValue="GLV2607" />
          </label>
          <label>
            จำนวนรับเข้า
            <input defaultValue="80" inputMode="numeric" />
          </label>
          <label>
            วันหมดอายุ
            <input defaultValue="2028-07-30" type="date" />
          </label>
          <label>
            คลัง
            <select defaultValue="main">
              <option value="main">คลังกลาง</option>
              <option value="er">ห้องฉุกเฉิน</option>
            </select>
          </label>
          <label className="span-2">
            เลขที่เอกสาร / ผู้จำหน่าย
            <input defaultValue="PO-2607-044 / บริษัท เมดซัพพลาย จำกัด" />
          </label>
        </div>
        <div className="button-row">
          <button className="primary-button" type="button">บันทึกรับเข้า</button>
          <button className="ghost-button" type="button">พิมพ์ใบรับเข้า</button>
        </div>
      </section>

      <section className="panel">
        <h2>หลักการตัดจ่ายที่แนะนำ</h2>
        <div className="rule-box">
          <strong>FEFO</strong>
          <p>จ่ายล็อตที่หมดอายุก่อนออกก่อน เพื่อลดของหมดอายุคาคลัง</p>
        </div>
        <div className="rule-box">
          <strong>Stock Card</strong>
          <p>ทุกการรับเข้า จ่ายออก ปรับยอด และตัดทิ้ง ต้องมีประวัติย้อนหลัง</p>
        </div>
      </section>
    </div>
  );
}

function ReportsView() {
  return (
    <div className="view-grid">
      <section className="panel wide">
        <div className="panel-head">
          <div>
            <h2>รายงานที่ควรมีในเวอร์ชันแรก</h2>
            <p>เลือกช่วงวันที่ แผนก คลัง หรือหมวดหมู่ แล้วส่งออก Excel/PDF ได้ในอนาคต</p>
          </div>
        </div>
        <div className="report-grid">
          {[
            ["รายงานการเบิกรายวัน", "ดูว่าแต่ละวันแผนกไหนเบิกอะไรบ้าง"],
            ["รายงานการเบิกรายเดือน", "สรุปยอดใช้แยกรายการและแผนก"],
            ["รายงานรับเข้า", "ติดตามล็อต ผู้จำหน่าย และเลขเอกสาร"],
            ["รายงานใกล้หมดอายุ", "แยก 30 / 60 / 90 วัน"],
            ["รายงานของใกล้หมด", "เทียบจำนวนคงเหลือกับขั้นต่ำ"],
            ["Stock Card", "ประวัติรายการรับเข้า จ่ายออก ปรับยอด ตัดทิ้ง"],
          ].map(([title, body]) => (
            <article className="report-card" key={title}>
              <strong>{title}</strong>
              <p>{body}</p>
              <button className="ghost-button" type="button">ดูตัวอย่าง</button>
            </article>
          ))}
        </div>
      </section>
      <section className="panel">
        <h2>ตัวอย่างสรุปรายเดือน</h2>
        <div className="bar-chart" aria-label="กราฟตัวอย่างยอดเบิก">
          <span style={{ height: "42%" }}><b>ยา</b></span>
          <span style={{ height: "76%" }}><b>วัสดุ</b></span>
          <span style={{ height: "55%" }}><b>น้ำเกลือ</b></span>
          <span style={{ height: "34%" }}><b>อุปกรณ์</b></span>
        </div>
      </section>
      <section className="panel">
        <h2>ตัวกรองรายงาน</h2>
        <div className="form-grid single">
          <label>
            ช่วงวันที่
            <input defaultValue="2026-07-01 ถึง 2026-07-31" />
          </label>
          <label>
            แผนก
            <select defaultValue="all">
              <option value="all">ทุกแผนก</option>
              <option value="er">ห้องฉุกเฉิน</option>
            </select>
          </label>
          <label>
            หมวดหมู่
            <select defaultValue="all">
              <option value="all">ทุกหมวดหมู่</option>
              <option value="drug">ยา</option>
              <option value="supply">วัสดุสิ้นเปลือง</option>
            </select>
          </label>
        </div>
      </section>
    </div>
  );
}

function MasterView() {
  return (
    <section className="panel wide">
      <div className="panel-head">
        <div>
          <h2>ข้อมูลพื้นฐานของระบบ</h2>
          <p>ส่วนนี้คือหลังบ้านที่ต้องตั้งค่าก่อนเริ่มใช้งานจริง</p>
        </div>
        <button className="primary-button" type="button">เพิ่มข้อมูล</button>
      </div>
      <div className="master-grid">
        {masterCards.map(([title, body]) => (
          <article className="master-card" key={title}>
            <strong>{title}</strong>
            <p>{body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  const [activeView, setActiveView] = useState<ViewKey>("dashboard");

  const activeMeta = useMemo(
    () => menuItems.find((item) => item.key === activeView) ?? menuItems[0],
    [activeView],
  );

  return (
    <main className="app-shell">
      <aside className="sidebar" aria-label="เมนูหลัก">
        <div className="brand">
          <span className="brand-mark">S</span>
          <div>
            <strong>StockCare</strong>
            <small>ระบบเบิกเวชภัณฑ์</small>
          </div>
        </div>
        <nav>
          {menuItems.map((item) => (
            <button
              className={item.key === activeView ? "active" : ""}
              key={item.key}
              onClick={() => setActiveView(item.key)}
              type="button"
            >
              <span>{item.label}</span>
              <small>{item.hint}</small>
            </button>
          ))}
        </nav>
        <div className="sidebar-note">
          <strong>Mockup</strong>
          <p>ข้อมูลทั้งหมดเป็นตัวอย่าง ยังไม่เชื่อมฐานข้อมูล</p>
        </div>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div>
            <span className="eyebrow">ต้นแบบเว็บไซต์</span>
            <h1>{activeMeta.label}</h1>
            <p>{activeMeta.hint}</p>
          </div>
          <div className="user-card">
            <span>ผู้ใช้งานตัวอย่าง</span>
            <strong>เจ้าหน้าที่คลัง</strong>
          </div>
        </header>

        <div className="mobile-tabs">
          {menuItems.map((item) => (
            <button
              className={item.key === activeView ? "active" : ""}
              key={item.key}
              onClick={() => setActiveView(item.key)}
              type="button"
            >
              {item.label}
            </button>
          ))}
        </div>

        {activeView === "dashboard" && <Dashboard />}
        {activeView === "request" && <RequestView />}
        {activeView === "approve" && <ApproveView />}
        {activeView === "stock" && <StockView />}
        {activeView === "receive" && <ReceiveView />}
        {activeView === "reports" && <ReportsView />}
        {activeView === "master" && <MasterView />}
      </section>
    </main>
  );
}
