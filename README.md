# pilot-logbook-system

włączenie i konfiguracja projektu:
docker:
docker run -d --name pilot-logbook-db -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=pilot_logbook -p 5432:5432 postgres:17
backend:
./mvnw spring-boot:run
front:
cd src/app
ng serve
