#!/bin/bash

echo "=== DIAGNOSTYKA SERWERA ==="
echo ""

echo "1. OBECNA LOKALIZACJA:"
pwd
echo ""

echo "2. PLIKI W KATALOGU:"
ls -la
echo ""

echo "3. WERSJE DOCKER:"
docker --version
docker-compose --version
echo ""

echo "4. KONTENERY:"
docker ps -a
echo ""

echo "5. KONFIGURACJA DOCKER-COMPOSE:"
if [ -f "docker-compose.yml" ]; then
    cat docker-compose.yml
else
    echo "Brak pliku docker-compose.yml"
fi
echo ""

echo "6. CERTYFIKATY SSL:"
ls -la /etc/ssl/cloudflare/ 2>/dev/null || echo "Katalog /etc/ssl/cloudflare/ nie istnieje"
echo ""

echo "7. KONFIGURACJA NGINX:"
if [ -f "nginx.prod.conf" ]; then
    cat nginx.prod.conf
else
    echo "Brak pliku nginx.prod.conf"
fi
echo ""

echo "8. DOCKERFILE:"
if [ -f "Dockerfile" ]; then
    cat Dockerfile
else
    echo "Brak pliku Dockerfile"
fi
echo ""

echo "9. LOGI KONTENERÓW:"
docker-compose logs --tail=50 2>/dev/null || echo "Brak logów"
echo ""

echo "10. STATUS USŁUG:"
systemctl status docker 2>/dev/null | head -10
echo ""

echo "=== KONIEC DIAGNOSTYKI ===" 