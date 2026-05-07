# 🚀 HƯỚNG DẪN DEPLOY LÊN DOKPLOY

## 1. Chuẩn bị trên GitHub

### Bật GitHub Container Registry (GHCR)

1. Vào https://github.com/heglory13/bhdbv/settings
2. Tìm **Packages** > bật **Improve repository support for GitHub Container Registry**
3. Repository sẽ có quyền publish packages

### Push code lên GitHub

```bash
cd d:\Code_vo_van\BaoHiemOToDBV
git add .
git commit -m "Configure for Dokploy deployment"
git push origin main
```

---

## 2. Cài đặt trên Dokploy

### 2.1 Kết nối GitHub Provider

1. Đăng nhập Dokploy
2. Vào **Dashboard** > **Providers** > **Git Providers**
3. Click **Add Git Provider** > Chọn **GitHub**
4. Authorize Dokploy truy cập GitHub
5. Chọn repository `heglory13/bhdbv`

### 2.2 Tạo Project

1. **Dashboard** > **Projects** > **Create Project**
2. Tên: `DBV Insurance`
3. Description: `Website Bảo Hiểm Ô Tô DBV`
4. Type: `Application` (hoặc `Compose` nếu dùng docker-compose)

### 2.3 Deploy Database (PostgreSQL)

1. **Dashboard** > **Databases** > **Create Database**
2. Chọn type: **PostgreSQL**
3. Name: `dbv-postgres`
4. Version: `16-alpine`
5. Database Name: `dbv_insurance`
6. Username: `postgres`
7. Password: `YourSecurePassword123!` (tạo password mạnh)
8. Click **Create**

### 2.4 Deploy Backend

1. **Dashboard** > **Projects** > **DBV Insurance** > **Create Project**
2. Chọn type: **Application**
3. Name: `dbv-backend`
4. Git Provider: **GitHub**
5. Repository: `heglory13/bhdbv`
6. Branch: `main`
7. Build Method: **Dockerfile**
8. Dockerfile Path: `/backend/Dockerfile`
9. **Environment Variables** - Click **Add**:

```
NODE_ENV = production
DATABASE_URL = postgres://postgres:YourSecurePassword123!@<postgres-host>:5432/dbv_insurance
JWT_SECRET = YourSecureJWTSecret256bits!
ADMIN_USERNAME = admin
ADMIN_PASSWORD = YourSecureAdminPassword123!
PORT = 4000
```

> ⚠️ Thay `<postgres-host>` bằng hostname của database vừa tạo (Dokploy sẽ cung cấp)

10. **Health Check**:
    - Path: `/api/health`
    - Port: `4000`

11. Click **Create & Deploy**

### 2.5 Deploy Frontend

1. **Dashboard** > **Projects** > **DBV Insurance** > **Create Project**
2. Type: **Application**
3. Name: `dbv-frontend`
4. Git Provider: **GitHub**
5. Repository: `heglory13/bhdbv`
6. Branch: `main`
7. Build Method: **Dockerfile**
8. Dockerfile Path: `/frontend/Dockerfile`
9. **Environment Variables** - Click **Add**:

```
REACT_APP_API_BASE_URL = https://api.your-domain.com
```

> ⚠️ Thay bằng domain của backend (hoặc internal network URL nếu cùng server)

10. Click **Create & Deploy**

---

## 3. Cấu hình Domain & SSL

### 3.1 Thêm Domain

1. Sau khi deploy thành công, vào **Settings** của mỗi app
2. **Domains** > **Add Domain**

- Backend: `api.your-domain.com`
- Frontend: `your-domain.com` hoặc `www.your-domain.com`

### 3.2 SSL Certificate

1. Bật **HTTPS** / **SSL**
2. Chọn **Let's Encrypt** (miễn phí)
3. Auto-renew sẽ được bật mặc định

---

## 4. Cấu hình CI/CD Tự động

### Auto-Deploy on Push

1. Vào **Settings** của project trên Dokploy
2. Tìm **Continuous Deployment**
3. Bật **Auto Deploy** khi có push vào branch `main`

---

## 5. Kiểm tra sau Deploy

### Backend Health Check
```bash
curl https://api.your-domain.com/health
# Response: OK
```

### Kiểm tra Admin Login
```bash
curl -X POST https://api.your-domain.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"YourSecureAdminPassword123!"}'
```

### Frontend
- Truy cập: `https://your-domain.com`
- Kiểm tra: Load trang, điền form báo giá

---

## 6. Troubleshooting

### Lỗi "Connection refused" backend
- Kiểm tra DATABASE_URL đúng format
- Kiểm tra database đã ready chưa

### Lỗi "502 Bad Gateway"
- Backend chưa start xong
- Kiểm tra health check endpoint

### Lỗi CORS
- Backend đã có CORS config cho domain frontend

### Frontend không load API
- Kiểm tra REACT_APP_API_BASE_URL đúng domain backend

---

## 7. Lệnh hữu ích trên Dokploy

### Xem Logs
```bash
# Realtime logs
 dokploy logs -f <project-id>

# Hoặc qua Dashboard > Logs tab
```

### Restart Service
```bash
dokploy restart <project-id>
```

### Rebuild
```bash
dokploy rebuild <project-id>
```

---

## Liên hệ Support

Nếu gặp vấn đề:
- Docs: https://docs.dokploy.com
- Discord: https://discord.gg/dokploy
