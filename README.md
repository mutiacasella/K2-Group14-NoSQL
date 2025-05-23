# 📚 Biblio Haven

Biblio Haven merupakan sebuah aplikasi perpustakaan digital yang dirancang untuk mempermudah proses peminjaman dan pengelolaan buku secara online. Dengan antarmuka yang intuitif dan sistem yang terintegrasi, pengguna dapat melakukan registrasi, menelusuri koleksi buku, melakukan peminjaman, serta memantau riwayat aktivitas mereka secara efisien. Aplikasi ini bertujuan untuk menghadirkan solusi manajemen perpustakaan yang modern, praktis, dan dapat diakses kapan saja.

---

## ✨ Fitur Utama

Biblio Haven menyediakan berbagai fitur yang dirancang untuk mendukung pengelolaan perpustakaan secara digital, seperti:
### - 📝 Registrasi dan Login Pengguna
    Pengguna dapat membuat akun dan masuk ke sistem menggunakan email dan kata sandi terenkripsi.
### - 🗂️ Daftar Buku Tersedia
    Pengguna dapat melihat seluruh koleksi buku yang ditampilkan dan dikelompokkan berdasarkan kategori untuk memudahkan penelusuran.
### - 📈 Buku Terpopuler
    Sistem secara otomatis menampilkan empat buku yang paling sering dipinjam oleh pengguna.
### - 🔄 Peminjaman dan Pengembalian Buku
    Pengguna dapat melakukan peminjaman buku langsung dari aplikasi, serta mengembalikan buku yang sudah selesai dibaca.
### - 🕘 Riwayat Peminjaman
    Setiap aktivitas peminjaman dicatat dan dapat diakses kembali oleh pengguna untuk keperluan pelacakan dan pengelolaan pribadi.
### - 📊 Statistik Penggunaan
    Sistem menampilkan informasi ringkas mengenai informasi-informasi yang berhubungan dengan peminjaman.

---

## 🧭 Arsitektur Sistem

![Diagram](https://i.imgur.com/seu1uBj.jpeg)  

- Seluruh aplikasi berjalan dalam Docker Engine.
- Masing-masing container saling terhubung melalui Docker Network internal.
- Pengguna mengakses aplikasi melalui frontend (React) yang berkomunikasi dengan backend (Node.js), dan backend berinteraksi dengan database MongoDB.

---

## 🧰 Tech Stack

| Komponen         | Teknologi               |
|------------------|-------------------------|
| Frontend         | React Vite, TailwindCSS |
| Backend          | Express.js              |
| Database         | MongoDB                 |
| Deployment       | Docker                  |
| Lainnya          | Cloudinary              |


## 🛠️ Cara Menjalankan Proyek

### 1. Clone repositori ini
   ```
   git clone https://github.com/username/biblio-haven.git
   cd biblio-haven
   ```

### 2. Jalankan dengan Docker Compose
   ```
   docker compose up --build
   ```

### 3. Akses aplikasi melalui browser
   ```
   http://localhost:3000
   ```

>Pastikan Docker dan Docker Compose telah ter-*install* pada sistem Anda.

---

## 👥 Kontributor

Backend  : Mutia Casella

Frontend : Siti Amalia Nurfaidah

---

## 📄 Lisensi
Proyek ini berada di bawah lisensi MIT, silahkan lihat file LICENSE untuk informasi lebih lanjut.