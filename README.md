# 🔥 Firebase CRUD App — Realtime + Search + Sort

แอปพลิเคชัน CRUD (Create, Read, Update, Delete) บน **React + Firebase Firestore**  
รองรับการอัปเดตข้อมูลแบบ **Realtime** พร้อมระบบ **ค้นหา** และ **จัดเรียงข้อมูล (Sort)** ในตาราง Bootstrap

---

## ✨ ฟีเจอร์
- ➕ **Create**: เพิ่มข้อมูลลง Firestore
- 📖 **Read**: ดึงข้อมูลแบบ realtime ด้วย `onSnapshot`
- ✏ **Update**: แก้ไขข้อมูลได้ทันที
- 🗑 **Delete**: ลบข้อมูลพร้อมยืนยัน
- 🔍 **Search**: ค้นหาข้อมูลในตารางแบบ client-side
- ⬆⬇ **Sort**: จัดเรียงข้อมูลขึ้น/ลงด้วยการคลิกหัวคอลัมน์
- 🎨 ใช้ **Bootstrap 5** ให้ UI ดูสวยงามและ responsive

---

## 🛠 Tech Stack
- **React** (Vite)
- **Firebase Firestore**
- **Bootstrap 5**
- JavaScript (ES6+)

---

## 🚀 การติดตั้งและใช้งาน

```bash
# 1. Clone โปรเจกต์
git clone https://github.com/USERNAME/firebase-crud-app.git
cd firebase-crud-app

# 2. ติดตั้ง dependencies
npm install

# 3. สร้างไฟล์ .env และใส่ค่า Firebase Config ของคุณ
VITE_FIREBASE_API_KEY=xxxx
VITE_FIREBASE_AUTH_DOMAIN=xxxx
VITE_FIREBASE_PROJECT_ID=xxxx
VITE_FIREBASE_STORAGE_BUCKET=xxxx
VITE_FIREBASE_MESSAGING_SENDER_ID=xxxx
VITE_FIREBASE_APP_ID=xxxx

# 4. รันโปรเจกต์
npm run dev
