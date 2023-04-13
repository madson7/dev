FROM adoptopenjdk/openjdk11:jre-11.0.11_9-alpine

ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar

ENTRYPOINT ["java", "-jar", "/app.jar"]
EXPOSE 8080


# FROM maven as build
# WORKDIR /app
# COPY . .
# RUN mvn install

# FROM openjdk:11.0
# WORKDIR /app
# COPY --from=build /app/target/*.jar /app/
# EXPOSE 8080
# ENTRYPOINT ["java", "-jar", "/app.jar"]