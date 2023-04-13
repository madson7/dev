FROM maven as build
WORKDIR /app
COPY ./app ./
RUN mvn clean install

FROM tomcat:9.0
WORKDIR /usr/local/tomcat
COPY --from=build /app/target/*.war webapps/app.war
EXPOSE 8080
