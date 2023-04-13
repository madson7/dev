# server-status-app

Projeto que exibe o status do servidor onde a aplicação está rodando. Link do vídeo https://youtu.be/feltexbr

## Rodando o projeto

### Usando Maven + Spring Boot action 


Rodar o projeto
```shell
mvn spring-boot:run
```

[Acesse](http://localhost:8080/)


Parar o projeto
```shell
mvn spring-boot:stop
```

### Usando Maven + Jar

Gerar o arquivo jar
```shell
mvn clean install
```

Executar o projeto
```shell
java -jar target/server-status.jar  
```

[Acesse](http://localhost:8080/)


<!-- ### Usando Docker

```shell
docker run  --name server_status_docker -p 8080:8080 andrefelix/server-status:V2
```

[Acesse](http://localhost:8080/)

### Usando Docker-compose

```shell
docker-compose -f docker/docker-compose.yaml up
```

[Acesse](http://localhost:8080/)


```shell
docker-compose -f docker/docker-compose.yaml down
```

 -->
