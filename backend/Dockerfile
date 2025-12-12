FROM maven:3.9.9-eclipse-temurin-21 AS builder

WORKDIR /app

COPY pom.xml .

RUN mvn dependency:go-offline -B

COPY src ./src

RUN mvn clean package -DskipTests


FROM eclipse-temurin:21-jre AS runner

WORKDIR /app

COPY --from=builder ./app/target/*SNAPSHOT.jar ./app.jar

COPY uploads ./uploads

RUN mkdir -p ./uploads/voiture_photos && chmod -R 777 ./uploads

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]