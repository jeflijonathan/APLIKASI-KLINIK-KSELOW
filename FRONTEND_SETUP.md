# Setup Frontend-Backend Connection

## Status: ✅ Siap Koneksi

### Perubahan yang Dilakukan:

#### 1. **Perbaikan API Endpoints**
- UserService: `/user` → `/users` (sesuai dengan backend route)
- Register endpoint: `/user/register` → `/register`
- Tambahkan method `deleteUser()` untuk Delete operation

#### 2. **Environment Configuration**
- Buat `src/environments/environment.ts` dan `environment.prod.ts`
- Centralisasi baseUrl configuration di `http://localhost:3000`
- Mudah untuk switch production URL

#### 3. **CRUD Operations Lengkap**
Semua service sekarang mendukung 4 operasi CRUD:
- **CREATE**: `createUser()`, `createPasien()`, `createRekamMedis()`
- **READ**: `getUserData()`, `getPasienData()`, `getRekamMedis()` + `getUserById()`, `getPasienById()`, `getRekamMedisById()`
- **UPDATE**: `updateUser()`, `updatePasien()`, `updateRekamMedis()`
- **DELETE**: `deleteUser()`, `deletePasien()`, `deleteRekamMedis()`

#### 4. **Backend Sudah Siap**
- CORS dikonfigurasi untuk accept `http://localhost:4200` (frontend)
- Routes: `/api/users`, `/api/pasien`, `/api/rekammedis`
- CRUD endpoints lengkap di semua routes

#### 5. **Component Perbaikan**
- Tambahkan `standalone: true` dan import `CommonModule` di List components
- Tambahkan delete method di UserPage component
- UserStore mendukung delete operation

### Cara Menjalankan:

#### Terminal 1: Backend
```bash
cd backend
npm install
npm run dev
```
Backend akan berjalan di `http://localhost:3000`

#### Terminal 2: Frontend
```bash
cd frontend
npm install
npm start
```
Frontend akan berjalan di `http://localhost:4200`

### Testing API:

1. Buka `http://localhost:4200` di browser
2. Pergi ke halaman User/Pasien/Rekam Medis
3. Test CRUD operations:
   - **Create**: Klik tombol "Tambah" → isi form → submit
   - **Read**: Data otomatis dimuat dari API
   - **Update**: Klik edit → ubah data → submit
   - **Delete**: Klik delete → confirm → data dihapus

### Troubleshooting:

**Error: Cannot GET /users**
- Pastikan backend berjalan di port 3000
- Cek `backend/src/app.js` untuk CORS setting

**Error: HTTP 0 error**
- Frontend dan backend mungkin tidak berjalan
- Pastikan kedua terminal sudah start dengan `npm run dev` dan `npm start`

**CORS Error**
- Backend sudah dikonfigurasi untuk accept frontend dari `http://localhost:4200`
- Jika perlu custom, edit `backend/src/app.js` baris 13

### Files Modified:
- ✅ `frontend/src/app/api/user/index.ts` - Fix endpoint + Add delete
- ✅ `frontend/src/app/api/pasien/index.ts` - Add delete method
- ✅ `frontend/src/app/api/pasien/service.ts` - Use environment config
- ✅ `frontend/src/app/page/user/List/user.store.ts` - Add delete operation
- ✅ `frontend/src/app/page/user/user.ts` - Add delete handler
- ✅ `frontend/src/app/page/pasien/List/list.ts` - Fix component imports
- ✅ `frontend/src/environments/environment.ts` - Create config
- ✅ `frontend/src/environments/environment.prod.ts` - Create config

### Next Steps (Optional):
1. Tambahkan Authentication (JWT Token)
2. Tambahkan error handling lebih detail
3. Optimize bundle size (warning: 204KB over budget)
4. Tambahkan unit tests
5. Setup production deployment
