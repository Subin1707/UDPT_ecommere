# Ecommerce Distributed System

## Lenh chay nhanh

Chay theo thu tu duoi day tren Windows PowerShell. Cac lenh `spring-boot:run` va `npm run dev` se giu terminal dang chay, vi vay nen mo terminal rieng cho tung phan.

```powershell
# 1. Khoi dong database, Redis, Zookeeper va Kafka
docker compose up -d

# 2. Terminal moi: chay Eureka Discovery Service
cd services\discovery-service
.\mvnw.cmd spring-boot:run

# 3. Terminal moi: chay Auth Service
cd services\auth-service
.\mvnw.cmd spring-boot:run

# 4. Terminal moi: chay Product Service
cd services\product-service
.\mvnw.cmd spring-boot:run

# 5. Terminal moi: chay Order Service
cd services\order-service
.\mvnw.cmd spring-boot:run

# 6. Terminal moi: chay Notification Service
cd services\notification-service
.\mvnw.cmd spring-boot:run

# 7. Terminal moi: chay Shipping Service
cd services\shipping-service
.\mvnw.cmd spring-boot:run

# 8. Terminal moi, tuy chon: chay API Gateway
cd services\api-gateway
.\mvnw.cmd spring-boot:run

# 9. Terminal moi: chay frontend
cd frontend-react
npm install
npm run dev
```

He thong thuong mai dien tu phan tan duoc xay dung theo kien truc microservices. Du an gom frontend React/Vite, cac backend service Spring Boot, service discovery bang Eureka, co so du lieu PostgreSQL, cache Redis va giao tiep bat dong bo bang Kafka.

## Muc tieu de tai

De tai mo phong mot he thong ecommerce co kha nang tach rieng cac mien nghiep vu quan trong:

- Xac thuc va quan ly nguoi dung.
- Quan ly danh muc, san pham va ton kho.
- Tao, cap nhat va theo doi don hang.
- Tu dong phat sinh thong bao khi co don hang moi.
- Tu dong tao phieu giao hang khi co don hang moi.
- Theo doi trang thai giao hang va vi tri shipper.
- Giam sat tinh trang cac service trong giao dien quan tri.

## Kien truc tong quan

```text
Frontend React/Vite
        |
        | HTTP API / Vite proxy
        v
+-------------------+      +-------------------+
|   Auth Service    |      |  Product Service  |
|      :8081        |      |      :8082        |
+-------------------+      +-------------------+
        |                          |
        |                          |
+-------------------+      +-------------------+
|   Order Service   | ---> | Kafka topic       |
|      :8083        |      | order-created     |
+-------------------+      +-------------------+
        |                          |
        v                          v
+-------------------+      +-------------------+
| Shipping Service  |      | Notification Svc  |
|      :8085        |      |      :8084        |
+-------------------+      +-------------------+

Service registry: Eureka Discovery Service :8761
Infrastructure: PostgreSQL, Redis, Zookeeper, Kafka
Optional gateway: API Gateway :8080
```

Khi khach hang tao don hang, `order-service` luu don hang vao PostgreSQL va publish su kien `OrderCreatedEvent` len Kafka topic `order-created-topic`. `notification-service` lang nghe su kien nay de tao thong bao, trong khi `shipping-service` lang nghe cung su kien de tao ban ghi giao hang.

## Cau truc thu muc

```text
.
├── docker-compose.yml
├── frontend-react/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── routes/
│   │   └── utils/
│   ├── package.json
│   └── vite.config.js
└── services/
    ├── api-gateway/
    ├── auth-service/
    ├── discovery-service/
    ├── notification-service/
    ├── order-service/
    ├── product-service/
    └── shipping-service/
```

## Cac thanh phan chinh

| Thanh phan | Port | Vai tro |
| --- | ---: | --- |
| `frontend-react` | `5173` | Giao dien cho customer, shipper va admin |
| `api-gateway` | `8080` | Gateway, JWT filter, route qua Eureka; hien cau hinh route chinh cho `/api/auth/**` |
| `auth-service` | `8081` | Dang ky, dang nhap, JWT, refresh token, quan ly user |
| `product-service` | `8082` | Quan ly danh muc, san pham, ton kho |
| `order-service` | `8083` | Tao va quan ly don hang, publish Kafka event |
| `notification-service` | `8084` | Nhan Kafka event va luu thong bao |
| `shipping-service` | `8085` | Nhan Kafka event va quan ly giao hang |
| `discovery-service` | `8761` | Eureka Server cho service discovery |
| PostgreSQL | `5433` host -> `5432` container | Co so du lieu chinh |
| Redis | `6380` host -> `6379` container | Cache/phu tro |
| Kafka | `9092` | Message broker |
| Zookeeper | `2181` | Dieu phoi Kafka |

## Cong nghe su dung

### Backend

- Java 21.
- Spring Boot.
- Spring Cloud Netflix Eureka.
- Spring Cloud Gateway.
- Spring Security va JWT.
- Spring Data JPA.
- PostgreSQL.
- Redis.
- Apache Kafka.
- Lombok.
- Actuator.
- Springdoc OpenAPI trong mot so service.
- Maven Wrapper.

### Frontend

- React 19.
- Vite 7.
- Lucide React.
- Leaflet va React Leaflet cho ban do giao hang.
- CSS thuan trong `src/assets/styles/global.css`.

### DevOps/Infrastructure

- Docker Compose.
- PostgreSQL 16.
- Redis 7.
- Confluent Kafka/Zookeeper 7.6.1.

## Chuc nang nghiep vu

### Khach hang

- Xem landing page va danh sach san pham.
- Dang ky tai khoan customer.
- Dang nhap.
- Xem danh muc, tim kiem va loc san pham.
- Xem chi tiet san pham.
- Them san pham vao gio hang.
- Tao don hang.
- Theo doi don hang da tao.

### Shipper

- Xem dashboard giao hang.
- Xem danh sach don giao.
- Xem chi tiet delivery.
- Cap nhat trang thai giao hang.
- Cap nhat vi tri giao hang tren ban do.

### Admin

- Xem dashboard quan tri.
- Quan ly danh muc.
- Quan ly san pham.
- Quan ly don hang.
- Quan ly user.
- Quan ly shipper.
- Xem thong bao he thong.
- Theo doi trang thai Product, Order, Notification, Shipping, Eureka, Kafka, Redis va PostgreSQL.

## Tai khoan mau

`auth-service` co `AuthDataSeeder` tao san cac tai khoan mau:

| Vai tro | Username | Password |
| --- | --- | --- |
| Admin | `admin` | `admin123` |
| Customer | `customer` | `customer123` |
| Shipper | `shipper` | `shipper123` |

Seeder cung tao them cac tai khoan customer/shipper phu neu database chua co du lieu.

## Yeu cau moi truong

- JDK 21.
- Node.js phien ban phu hop voi Vite 7.
- npm.
- Docker Desktop hoac Docker Engine.
- PowerShell, Git Bash hoac terminal tuong duong.

Kiem tra nhanh:

```bash
java -version
node -v
npm -v
docker --version
docker compose version
```

## Huong dan chay local

### 1. Clone va di chuyen vao du an

```bash
git clone <repository-url>
cd ecommerce-distributed-system
```

### 2. Khoi dong infrastructure

```bash
docker compose up -d
```

Lenh nay khoi dong:

- PostgreSQL voi database `ecommerce`, user `ecommerce`, password `ecommerce`.
- Redis.
- Zookeeper.
- Kafka.

Kiem tra container:

```bash
docker compose ps
```

### 3. Chay Eureka Discovery Service

```bash
cd services/discovery-service
./mvnw spring-boot:run
```

Tren Windows PowerShell:

```powershell
cd services\discovery-service
.\mvnw.cmd spring-boot:run
```

Sau khi chay, mo:

```text
http://localhost:8761
```

### 4. Chay cac backend service

Mo nhieu terminal rieng va chay lan luot:

```bash
cd services/auth-service
./mvnw spring-boot:run
```

```bash
cd services/product-service
./mvnw spring-boot:run
```

```bash
cd services/order-service
./mvnw spring-boot:run
```

```bash
cd services/notification-service
./mvnw spring-boot:run
```

```bash
cd services/shipping-service
./mvnw spring-boot:run
```

Neu muon chay API Gateway:

```bash
cd services/api-gateway
./mvnw spring-boot:run
```

Tren Windows PowerShell, dung `.\mvnw.cmd spring-boot:run` thay cho `./mvnw spring-boot:run`.

### 5. Chay frontend

```bash
cd frontend-react
npm install
npm run dev
```

Mo trinh duyet:

```text
http://localhost:5173
```

Vite proxy da duoc cau hinh de frontend goi truc tiep den cac service:

- `/api/auth` -> `http://localhost:8081`
- `/api/products` -> `http://localhost:8082`
- `/api/categories` -> `http://localhost:8082`
- `/api/orders` -> `http://localhost:8083`
- `/api/deliveries` -> `http://localhost:8085`
- `/api/notifications` -> `http://localhost:8084`
- `/eureka` -> `http://localhost:8761`

## Bien moi truong va cau hinh mac dinh

`docker-compose.yml` cau hinh mac dinh:

| Bien | Gia tri mac dinh | Mo ta |
| --- | --- | --- |
| `POSTGRES_PORT` | `5433` | Port PostgreSQL tren may host |
| `POSTGRES_DB` | `ecommerce` | Ten database |
| `POSTGRES_USER` | `ecommerce` | Username database |
| `POSTGRES_PASSWORD` | `ecommerce` | Password database |
| `REDIS_PORT` | `6380` | Port Redis tren may host |

Trong cac service, datasource thuong tro den PostgreSQL local voi user/password tren. Kafka dung broker `localhost:9092`. Eureka client dang ky ve `http://localhost:8761/eureka/`.

## API chinh

### Auth Service - `http://localhost:8081`

| Method | Endpoint | Mo ta |
| --- | --- | --- |
| `GET` | `/api/auth` | Kiem tra auth API |
| `POST` | `/api/auth/register` | Dang ky customer |
| `POST` | `/api/auth/login` | Dang nhap |
| `POST` | `/api/auth/refresh-token` | Lay access token moi |
| `POST` | `/api/auth/logout` | Dang xuat |
| `GET` | `/api/auth/users` | Lay danh sach user |
| `GET` | `/api/auth/users/shippers` | Lay danh sach shipper |
| `POST` | `/api/auth/users` | Tao user |
| `PUT` | `/api/auth/users/{id}/status` | Cap nhat trang thai user |
| `DELETE` | `/api/auth/users/{id}` | Xoa user |
| `GET` | `/api/health` | Health check |

### Product Service - `http://localhost:8082`

| Method | Endpoint | Mo ta |
| --- | --- | --- |
| `GET` | `/api/products` | Lay danh sach san pham |
| `GET` | `/api/products/{id}` | Lay chi tiet san pham |
| `POST` | `/api/products` | Tao san pham |
| `PUT` | `/api/products/{id}` | Cap nhat san pham |
| `DELETE` | `/api/products/{id}` | Xoa san pham |
| `GET` | `/api/categories` | Lay danh sach danh muc |
| `POST` | `/api/categories` | Tao danh muc |
| `PUT` | `/api/categories/{id}` | Cap nhat danh muc |
| `DELETE` | `/api/categories/{id}` | Xoa danh muc |
| `GET` | `/api/inventory/{productId}` | Lay ton kho san pham |
| `PUT` | `/api/inventory/{productId}` | Cap nhat ton kho |

### Order Service - `http://localhost:8083`

| Method | Endpoint | Mo ta |
| --- | --- | --- |
| `POST` | `/api/orders` | Tao don hang va publish Kafka event |
| `GET` | `/api/orders` | Lay danh sach don hang |
| `PUT` | `/api/orders/{id}` | Cap nhat don hang |
| `DELETE` | `/api/orders/{id}` | Xoa don hang |

### Notification Service - `http://localhost:8084`

| Method | Endpoint | Mo ta |
| --- | --- | --- |
| `GET` | `/api/notifications` | Lay danh sach thong bao/su kien |

### Shipping Service - `http://localhost:8085`

| Method | Endpoint | Mo ta |
| --- | --- | --- |
| `GET` | `/api/deliveries` | Lay danh sach delivery |
| `GET` | `/api/deliveries/shipper/{shipperName}` | Lay delivery theo shipper |
| `PUT` | `/api/deliveries/{id}/status` | Cap nhat trang thai delivery |
| `PUT` | `/api/deliveries/{id}/location` | Cap nhat vi tri delivery |

## Luong xu ly tao don hang

1. Customer chon san pham va tao order tren frontend.
2. Frontend goi `POST /api/orders`.
3. `order-service` luu order vao PostgreSQL voi trang thai ban dau.
4. `order-service` publish `OrderCreatedEvent` len Kafka topic `order-created-topic`.
5. `notification-service` consume event va tao ban ghi notification.
6. `shipping-service` consume event va tao ban ghi delivery.
7. Admin/shipper/customer refresh giao dien de xem order, notification va delivery moi.

## Du lieu mau

`product-service` co seed data gom:

- Danh muc: Laptop, Phone, Accessory.
- San pham: MacBook Pro M3, iPhone 15 Pro Max, Logitech G Pro X.
- Ton kho mau cho tung san pham.
- Anh va review mau.

`auth-service` seed role va user mau bang `AuthDataSeeder`.

## Build va kiem thu

### Backend

Chay test tung service:

```bash
cd services/product-service
./mvnw test
```

Build tung service:

```bash
cd services/product-service
./mvnw clean package
```

Lam tuong tu cho:

- `auth-service`
- `product-service`
- `order-service`
- `notification-service`
- `shipping-service`
- `discovery-service`
- `api-gateway`

### Frontend

```bash
cd frontend-react
npm run build
```

Xem ban build:

```bash
npm run preview
```

## Cac URL huu ich

| URL | Mo ta |
| --- | --- |
| `http://localhost:5173` | Frontend |
| `http://localhost:8761` | Eureka Dashboard |
| `http://localhost:8081/api/health` | Auth health |
| `http://localhost:8082/actuator/health` | Product health |
| `http://localhost:8083/actuator/health` | Order health |
| `http://localhost:8084/actuator/health` | Notification health |
| `http://localhost:8085/actuator/health` | Shipping health |

## Troubleshooting

### Port da duoc su dung

Kiem tra tien trinh dang chiem port va doi port trong file cau hinh tuong ung:

- Frontend: `frontend-react/vite.config.js`.
- Backend: `services/<service-name>/src/main/resources/application.yml`.
- Docker infra: `docker-compose.yml`.

### Backend khong ket noi duoc PostgreSQL

Dam bao container PostgreSQL dang chay:

```bash
docker compose ps
```

Kiem tra port PostgreSQL mac dinh tren host la `5433`, khong phai `5432`.

### Service khong hien trong Eureka

Hay chay `discovery-service` truoc cac service khac. Sau do mo:

```text
http://localhost:8761
```

Neu service van chua dang ky, kiem tra cau hinh `eureka.client.service-url.defaultZone` trong `application.yml`.

### Tao order nhung khong co notification/delivery

Kiem tra Kafka va Zookeeper:

```bash
docker compose ps
```

Dam bao `order-service`, `notification-service` va `shipping-service` deu dang chay. Kafka topic su dung trong code la:

```text
order-created-topic
```

### Frontend goi API bi loi

Dam bao cac backend service dang chay dung port. Frontend phu thuoc vao proxy trong `frontend-react/vite.config.js`, vi vay nen chay frontend bang:

```bash
npm run dev
```

## Ghi chu phat trien

- Nen chay infrastructure bang Docker Compose truoc.
- Nen khoi dong Eureka truoc khi chay cac service client.
- Moi service backend co Maven Wrapper rieng, co the build/test doc lap.
- Frontend dang goi truc tiep cac service qua Vite proxy; API Gateway ton tai nhung chua gom day du route cho tat ca service.
- Worktree co the phat sinh cac file log khi chay service; nen them rule ignore cho `*.log`, `hs_err_pid*.log`, `replay_pid*.log`, `node_modules/` va `dist/` neu chua co.
