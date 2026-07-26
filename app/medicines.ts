export type StockItem = {
  code: string;
  name: string;
  category: string;
  unit: string;
  warehouse: string;
  location: string;
  lot: string;
  expire: string;
  remain: number;
  min: number;
  qty: number;
  status: string;
};

const medicineCatalogSeed = [
  ["Paracetamol 500 mg", "ยาแก้ปวดลดไข้", "แผง"],
  ["Ibuprofen 400 mg", "ยาแก้ปวดอักเสบ", "แผง"],
  ["Diclofenac 25 mg", "ยาแก้ปวดอักเสบ", "แผง"],
  ["Naproxen 250 mg", "ยาแก้ปวดอักเสบ", "แผง"],
  ["Aspirin 81 mg", "ยาต้านเกล็ดเลือด", "แผง"],
  ["Cetirizine 10 mg", "ยาแก้แพ้", "แผง"],
  ["Loratadine 10 mg", "ยาแก้แพ้", "แผง"],
  ["Chlorpheniramine 4 mg", "ยาแก้แพ้", "แผง"],
  ["Diphenhydramine 25 mg", "ยาแก้แพ้", "แผง"],
  ["Fexofenadine 180 mg", "ยาแก้แพ้", "แผง"],
  ["Amoxicillin 500 mg", "ยาปฏิชีวนะ", "แผง"],
  ["Amoxicillin/Clavulanate 625 mg", "ยาปฏิชีวนะ", "แผง"],
  ["Cephalexin 500 mg", "ยาปฏิชีวนะ", "แผง"],
  ["Cefixime 100 mg", "ยาปฏิชีวนะ", "แผง"],
  ["Azithromycin 250 mg", "ยาปฏิชีวนะ", "แผง"],
  ["Clarithromycin 500 mg", "ยาปฏิชีวนะ", "แผง"],
  ["Doxycycline 100 mg", "ยาปฏิชีวนะ", "แผง"],
  ["Ciprofloxacin 500 mg", "ยาปฏิชีวนะ", "แผง"],
  ["Levofloxacin 500 mg", "ยาปฏิชีวนะ", "แผง"],
  ["Metronidazole 400 mg", "ยาปฏิชีวนะ", "แผง"],
  ["Omeprazole 20 mg", "ยากระเพาะอาหาร", "แผง"],
  ["Pantoprazole 40 mg", "ยากระเพาะอาหาร", "แผง"],
  ["Famotidine 20 mg", "ยากระเพาะอาหาร", "แผง"],
  ["Domperidone 10 mg", "ยาแก้คลื่นไส้", "แผง"],
  ["Metoclopramide 10 mg", "ยาแก้คลื่นไส้", "แผง"],
  ["Ondansetron 4 mg", "ยาแก้คลื่นไส้", "แผง"],
  ["Simethicone 80 mg", "ยาลดแก๊ส", "แผง"],
  ["ORS sachet", "เกลือแร่", "ซอง"],
  ["Loperamide 2 mg", "ยาแก้ท้องเสีย", "แผง"],
  ["Bisacodyl 5 mg", "ยาระบาย", "แผง"],
  ["Senna tablet", "ยาระบาย", "แผง"],
  ["Lactulose syrup", "ยาระบาย", "ขวด"],
  ["Metformin 500 mg", "ยาเบาหวาน", "แผง"],
  ["Glipizide 5 mg", "ยาเบาหวาน", "แผง"],
  ["Gliclazide 80 mg", "ยาเบาหวาน", "แผง"],
  ["Insulin Regular vial", "ยาเบาหวาน", "ขวด"],
  ["Insulin NPH vial", "ยาเบาหวาน", "ขวด"],
  ["Insulin Glargine pen", "ยาเบาหวาน", "ด้าม"],
  ["Losartan 50 mg", "ยาความดัน", "แผง"],
  ["Enalapril 5 mg", "ยาความดัน", "แผง"],
  ["Amlodipine 5 mg", "ยาความดัน", "แผง"],
  ["Nifedipine SR 20 mg", "ยาความดัน", "แผง"],
  ["Atenolol 50 mg", "ยาความดัน", "แผง"],
  ["Carvedilol 6.25 mg", "ยาความดัน", "แผง"],
  ["Hydrochlorothiazide 25 mg", "ยาขับปัสสาวะ", "แผง"],
  ["Furosemide 40 mg", "ยาขับปัสสาวะ", "แผง"],
  ["Spironolactone 25 mg", "ยาขับปัสสาวะ", "แผง"],
  ["Atorvastatin 20 mg", "ยาลดไขมัน", "แผง"],
  ["Simvastatin 20 mg", "ยาลดไขมัน", "แผง"],
  ["Clopidogrel 75 mg", "ยาต้านเกล็ดเลือด", "แผง"],
  ["Warfarin 3 mg", "ยาต้านการแข็งตัวของเลือด", "แผง"],
  ["Heparin injection", "ยาฉีด", "ขวด"],
  ["Enoxaparin injection", "ยาฉีด", "เข็ม"],
  ["Salbutamol inhaler", "ยาระบบทางเดินหายใจ", "กระป๋อง"],
  ["Budesonide inhaler", "ยาระบบทางเดินหายใจ", "กระป๋อง"],
  ["Ipratropium nebulizer", "ยาระบบทางเดินหายใจ", "หลอด"],
  ["Montelukast 10 mg", "ยาระบบทางเดินหายใจ", "แผง"],
  ["Prednisolone 5 mg", "สเตียรอยด์", "แผง"],
  ["Hydrocortisone injection", "สเตียรอยด์", "ขวด"],
  ["Dexamethasone injection", "สเตียรอยด์", "ขวด"],
  ["Folic acid 5 mg", "วิตามินและแร่ธาตุ", "แผง"],
  ["Ferrous fumarate 200 mg", "วิตามินและแร่ธาตุ", "แผง"],
  ["Vitamin B complex", "วิตามินและแร่ธาตุ", "แผง"],
  ["Vitamin C 500 mg", "วิตามินและแร่ธาตุ", "แผง"],
  ["Calcium carbonate 600 mg", "วิตามินและแร่ธาตุ", "แผง"],
  ["Vitamin D3 1000 IU", "วิตามินและแร่ธาตุ", "แผง"],
  ["Multivitamin", "วิตามินและแร่ธาตุ", "แผง"],
  ["Levothyroxine 50 mcg", "ยาฮอร์โมน", "แผง"],
  ["Methimazole 5 mg", "ยาฮอร์โมน", "แผง"],
  ["Allopurinol 100 mg", "ยาเกาต์", "แผง"],
  ["Colchicine 0.6 mg", "ยาเกาต์", "แผง"],
  ["Gabapentin 300 mg", "ยาระบบประสาท", "แผง"],
  ["Amitriptyline 10 mg", "ยาระบบประสาท", "แผง"],
  ["Sertraline 50 mg", "ยาระบบประสาท", "แผง"],
  ["Haloperidol 2 mg", "ยาระบบประสาท", "แผง"],
  ["Risperidone 1 mg", "ยาระบบประสาท", "แผง"],
  ["Carbamazepine 200 mg", "ยากันชัก", "แผง"],
  ["Phenytoin 100 mg", "ยากันชัก", "แผง"],
  ["Valproate 200 mg", "ยากันชัก", "แผง"],
  ["Levetiracetam 500 mg", "ยากันชัก", "แผง"],
  ["Aciclovir 400 mg", "ยาต้านไวรัส", "แผง"],
  ["Oseltamivir 75 mg", "ยาต้านไวรัส", "แผง"],
  ["Fluconazole 150 mg", "ยาต้านเชื้อรา", "แผง"],
  ["Clotrimazole cream", "ยาทาภายนอก", "หลอด"],
  ["Mupirocin ointment", "ยาทาภายนอก", "หลอด"],
  ["Hydrocortisone cream", "ยาทาภายนอก", "หลอด"],
  ["Betamethasone cream", "ยาทาภายนอก", "หลอด"],
  ["Povidone iodine solution", "น้ำยาฆ่าเชื้อ", "ขวด"],
  ["Chlorhexidine solution", "น้ำยาฆ่าเชื้อ", "ขวด"],
  ["Alcohol 70%", "น้ำยาฆ่าเชื้อ", "ขวด"],
  ["Normal Saline 1000 ml", "สารน้ำ", "ขวด"],
  ["Dextrose 5% 1000 ml", "สารน้ำ", "ขวด"],
  ["Ringer Lactate 1000 ml", "สารน้ำ", "ขวด"],
  ["Sterile water 10 ml", "สารน้ำ", "หลอด"],
  ["Potassium chloride injection", "ยาฉีด", "หลอด"],
  ["Magnesium sulfate injection", "ยาฉีด", "หลอด"],
  ["Adrenaline injection", "ยาฉุกเฉิน", "หลอด"],
  ["Atropine injection", "ยาฉุกเฉิน", "หลอด"],
  ["Naloxone injection", "ยาฉุกเฉิน", "หลอด"],
  ["Lidocaine injection", "ยาฉีด", "ขวด"],
] as const;

const warehouses = ["คลังกลาง", "ห้องยา", "ห้องฉุกเฉิน", "คลังผู้ป่วยใน"];
const shelves = ["ตู้ A", "ตู้ B", "ตู้ C", "ตู้ D", "ตู้ E"];

export const medicineStockItems: StockItem[] = medicineCatalogSeed.map(
  ([name, category, unit], index) => {
    const itemNumber = index + 1;
    const remain = 24 + ((index * 19) % 980);
    const min = 40 + ((index * 7) % 160);
    const qty =
      index % 11 === 0 ? Math.max(12, min - 18) : min + 30 + ((index * 13) % 420);
    const status =
      remain <= 90 ? "ใกล้หมดอายุ" : qty <= min ? "ใกล้หมด" : "ปกติ";

    return {
      code: `MED-${String(itemNumber).padStart(3, "0")}`,
      name,
      category,
      unit,
      warehouse: warehouses[index % warehouses.length],
      location: `${shelves[index % shelves.length]} / ชั้น ${(index % 4) + 1}`,
      lot: `LOT26${String((index % 12) + 1).padStart(2, "0")}-${String(itemNumber).padStart(3, "0")}`,
      expire: `202${6 + (index % 4)}-${String((index % 12) + 1).padStart(2, "0")}-${String(((index * 3) % 27) + 1).padStart(2, "0")}`,
      remain,
      min,
      qty,
      status,
    };
  },
);

export const medicineCatalogSummary = {
  total: medicineStockItems.length,
  lowStock: medicineStockItems.filter((item) => item.qty <= item.min).length,
  nearExpire: medicineStockItems.filter((item) => item.remain <= 90).length,
};
