# AutoCash Test

## Getting Started

Follow these instructions to run the application on your local machine.

### Prerequisites

- Git
- Docker and Docker Compose
- Node.js and npm
- Android Studio with an Android emulator configured

### Installation and Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/tarek-mo/autocash-test
   ```

2. **Navigate to the project directory**

   ```bash
   cd autocash-test
   ```

3. **Start the backend and database**

   ```bash
   docker-compose up -d
   ```

   This will start the Spring Boot backend and PostgreSQL database in Docker containers.

4. **Navigate to the mobile folder**

   ```bash
   cd mobile
   ```

5. **Install dependencies**

   ```bash
   npm install
   ```

6. **Run the Android app**
   ```bash
   npm run android
   ```
   This will launch the application on your Android emulator.

## Project Structure

```
autocash-test/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── ma/
│   │   │   │       └── autocash/
│   │   │   │           └── backend/
│   │   │   │               ├── BackendApplication.java
│   │   │   │               ├── config/
│   │   │   │               ├── controller/
│   │   │   │               ├── dto/
│   │   │   │               ├── entities/
│   │   │   │               ├── enums/
│   │   │   │               ├── exception/
│   │   │   │               ├── mapper/
│   │   │   │               ├── repository/
│   │   │   │               └── service/
│   │   │   └── resources/
│   │   │       ├── application.properties
│   │   │       └── db/
│   │   │           └── migration/
│   │   │               ├── V1__init_schema.sql
│   │   │               └── V2__seed_initial_data.sql
│   │   └── test/
│   ├── uploads/
│   │   └── voiture_photos/
│   ├── Dockerfile
│   └── pom.xml
│
├── mobile/
│   ├── app/
│   │   ├── (tabs)/
│   │   │   ├── _layout.tsx
│   │   │   ├── finance.tsx
│   │   │   ├── index.tsx
│   │   │   ├── lead.tsx
│   │   │   ├── vendeur.tsx
│   │   │   └── voiture.tsx
│   │   ├── _layout.tsx
│   │   ├── add-car.tsx
│   │   └── index.tsx
│   ├── api/
│   │   ├── createVoiture.ts
│   │   ├── getAllMarques.ts
│   │   ├── getAllModeles.ts
│   │   ├── getAllVilles.ts
│   │   └── getAllVoitures.ts
│   ├── components/
│   │   ├── ui/
│   │   │   ├── collapsible.tsx
│   │   │   ├── icon-symbol.tsx
│   │   │   ├── input.tsx
│   │   │   └── picker.tsx
│   │   ├── add-car-button.tsx
│   │   ├── all-cars.tsx
│   │   ├── car-card.tsx
│   │   ├── car-type-badge.tsx
│   │   ├── home-tabs.tsx
│   │   └── voiture-screen-header.tsx
│   ├── types/
│   │   ├── validation/
│   │   │   └── CreateCarValidation.ts
│   │   ├── GetAllVoitures.ts
│   │   ├── Marque.ts
│   │   ├── Modele.ts
│   │   └── Vendeur.ts
│   ├── utils/
│   │   └── dateFormat.ts
│   ├── constants/
│   │   └── theme.ts
│   ├── hooks/
│   ├── assets/
│   ├── axios.ts
│   ├── package.json
│   └── tsconfig.json
│
└── docker-compose.yml
```

## Technologies Used

- **Backend**: Spring Boot, PostgreSQL, Flyway
- **Mobile**: React Native, Expo,Expo Router, NativeWind, TypeScript
- **Containerization**: Docker, Docker Compose

## Contact

If you have any questions, feel free to reach out at: **itistarek@gmail.com**
