FROM postgres
ENV POSTGRES_DB=letterboxd-postgres-docker
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=password22
COPY init.sql /docker-entrypoint-initdb.d/
