# Instalacja Docker na serwerze VPS

## 1. Aktualizacja systemu
```bash
sudo apt update && sudo apt upgrade -y
```

## 2. Instalacja Docker
```bash
# Usuń stare wersje
sudo apt remove docker docker-engine docker.io containerd runc

# Zainstaluj wymagane pakiety
sudo apt install -y apt-transport-https ca-certificates curl gnupg lsb-release

# Dodaj klucz GPG Docker
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Dodaj repozytorium Docker
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Zainstaluj Docker
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io

# Dodaj użytkownika do grupy docker
sudo usermod -aG docker $USER

# Uruchom Docker
sudo systemctl start docker
sudo systemctl enable docker
```

## 3. Instalacja Docker Compose
```bash
# Pobierz Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# Nadaj uprawnienia wykonywania
sudo chmod +x /usr/local/bin/docker-compose

# Sprawdź instalację
docker-compose --version
```

## 4. Wyloguj się i zaloguj ponownie
```bash
exit
# Zaloguj się ponownie do serwera
```

## 5. Sprawdź instalację
```bash
docker --version
docker-compose --version
```

## 6. Teraz możesz uruchomić projekt
```bash
cd ~/meisterumzuge24/move-page-magic-82
docker-compose build --no-cache
docker-compose up -d
```

## Alternatywna instalacja (jeśli powyższe nie działa)
```bash
# Instalacja przez snap
sudo snap install docker

# Lub przez apt
sudo apt install docker-compose
```

## Sprawdzenie statusu
```bash
# Sprawdź czy Docker działa
sudo systemctl status docker

# Sprawdź kontenery
docker ps

# Sprawdź logi
docker-compose logs
``` 