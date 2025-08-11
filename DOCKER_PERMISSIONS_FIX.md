# Naprawa uprawnień Docker

## Problem
```
permission denied while trying to connect to the Docker daemon socket
```

## Rozwiązanie

### 1. Sprawdź czy użytkownik jest w grupie docker
```bash
groups $USER
```

### 2. Jeśli nie ma grupy docker, dodaj ponownie
```bash
sudo usermod -aG docker $USER
```

### 3. Sprawdź czy Docker działa
```bash
sudo systemctl status docker
```

### 4. Wyloguj się i zaloguj ponownie
```bash
exit
# Zaloguj się ponownie do serwera
```

### 5. Sprawdź uprawnienia
```bash
ls -la /var/run/docker.sock
```

### 6. Jeśli nadal nie działa, uruchom z sudo
```bash
sudo docker-compose build --no-cache
sudo docker-compose up -d
```

### 7. Alternatywnie, zmień uprawnienia socket
```bash
sudo chmod 666 /var/run/docker.sock
```

## Sprawdzenie po naprawie
```bash
docker ps
docker-compose --version
```

## Uruchomienie projektu
```bash
cd ~/meisterumzuge24/move-page-magic-82
docker-compose build --no-cache
docker-compose up -d
``` 