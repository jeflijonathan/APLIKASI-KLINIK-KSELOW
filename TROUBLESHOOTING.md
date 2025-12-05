# Troubleshooting: Data Tidak Tampil di Website

## Solusi yang Telah Diterapkan:

### 1. **Perbaikan Endpoint & Response Handling**
- Pastikan backend mengembalikan response dengan format: `{ status: true, data: [...], pagination: {...} }`
- Frontend sekarang dengan benar menghandle response format

### 2. **Perbaikan PasienService Usage**
- List component sekarang menggunakan `PasienService` bukan langsung `API` service
- Service callback-based untuk handle async operations

### 3. **Perbaikan Type Safety**
- Update PasienModel field: hapus `nik` yang tidak ada di model
- Tampilkan field yang benar: `nama`, `tanggal_lahir`, `jenis_kelamin`, `asuransi`, `isActive`

### 4. **UI/UX Improvement**
- Tambahkan loading state indicator
- Tambahkan error message display
- Tambahkan "empty state" message

### 5. **Delete Button Binding**
- Fix delete button di User component agar memanggil `deleteUser()` method

## Step-by-Step Running Aplikasi:

### 1. Terminal 1 - Run Backend:
```bash
cd D:\APLIKASI-KLINIK-KSELOW\backend
npm install  # Hanya saat pertama kali
npm run dev
```
**Expected Output:**
```
[nodemon] starting `node src/app.js`
Server running on port http://localhost:3000 
✅ MongoDB connected successfully
```

### 2. Terminal 2 - Run Frontend:
```bash
cd D:\APLIKASI-KLINIK-KSELOW\frontend
npm install  # Hanya saat pertama kali
ng serve --poll 2000
# atau
npm start
```
**Expected Output:**
```
✔ Compiled successfully.
√ Compiled successfully - 1234 ms
✔ Preloading chunk files...
✔ Build complete.

→ Local:   http://localhost:4200/
```

### 3. Buka di Browser:
```
http://localhost:4200
```

## Debug Checklist:

### Jika Data Tidak Tampil:

✅ **Backend Running?**
- Terminal 1 harus show: `Server running on port http://localhost:3000`
- MongoDB: `✅ MongoDB connected successfully`

✅ **Frontend Running?**
- Terminal 2 harus show: `Local: http://localhost:4200/`

✅ **Check Network Tab (Browser DevTools):**
1. Open DevTools → Network tab
2. Refresh halaman
3. Cari request ke `/api/users`, `/api/pasien`, dll
4. Response harus ada dan status 200
5. Body harus contain `data` array

✅ **Check Console Tab:**
1. Open DevTools → Console tab
2. Cari error messages
3. Cari log: "Loading pasien data..." dan "Data loaded:"

✅ **Test API Manually (Postman/curl):**
```bash
# Get Users
curl http://localhost:3000/api/users

# Get Pasien
curl http://localhost:3000/api/pasien

# Should return:
{
  "status": true,
  "message": "...",
  "data": [...],
  "pagination": {...}
}
```

## Common Issues & Solutions:

### Issue 1: "Cannot GET /users"
**Cause:** Backend tidak running
**Solution:** Jalankan `npm run dev` di backend folder

### Issue 2: CORS Error
**Cause:** Backend CORS setting salah
**Solution:** Check `backend/src/app.js` line 13-14:
```javascript
res.header("Access-Control-Allow-Origin", "http://localhost:4200");
```

### Issue 3: "Connecting..." Forever
**Cause:** Frontend bisa tidak connect ke backend
**Solution:** 
- Pastikan backend di port 3000
- Check firewall tidak block port 3000 & 4200
- Restart browser cache: Ctrl+Shift+R

### Issue 4: Empty Table tapi No Error
**Cause:** Backend return empty data array
**Solution:** 
- Check database connection
- Pastikan ada data di MongoDB

### Issue 5: TypeError: Cannot read property 'data'
**Cause:** Response format tidak sesuai
**Solution:** Check API response format di Network tab

## Files Modified:

- ✅ `frontend/src/app/page/pasien/List/list.ts` - Use PasienService
- ✅ `frontend/src/app/page/pasien/List/list.html` - Fix fields & add loading/error UI
- ✅ `frontend/src/app/page/user/user.html` - Bind delete button
- ✅ `frontend/src/app/page/user/user.ts` - Add deleteUser method
- ✅ `frontend/src/app/page/user/List/user.store.ts` - Add deleteUser operation
- ✅ `frontend/src/app/api/pasien/index.ts` - Add deletePasien method

## Next Debug Steps:

1. Buka `http://localhost:4200` di browser
2. Buka DevTools (F12) → Network tab
3. Refresh halaman
4. Cari request `/api/users` atau `/api/pasien`
5. Click request → Response tab
6. Paste response content ke sini untuk diagnosis lebih lanjut

---

**Status**: ✅ Build Sukses | ✅ Backend Running | ✅ Frontend Dev Server Ready

Buka browser di `http://localhost:4200` dan lapor error yang muncul di Console!
