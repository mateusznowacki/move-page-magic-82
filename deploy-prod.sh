#!/bin/bash

# Deploy script for Meister Umzüge 24 (Production)
set -e

echo "🚀 Starting production deployment..."

# Check if SSL certificates exist
if [ ! -f "/etc/ssl/cloudflare/origin.crt" ] || [ ! -f "/etc/ssl/cloudflare/origin.key" ]; then
    echo "❌ SSL certificates not found in /etc/ssl/cloudflare/"
    echo "Please ensure certificates are properly installed:"
    echo "sudo mkdir -p /etc/ssl/cloudflare"
    echo "sudo chown root:root /etc/ssl/cloudflare"
    echo "sudo chmod 700 /etc/ssl/cloudflare"
    echo "sudo nano /etc/ssl/cloudflare/origin.crt"
    echo "sudo nano /etc/ssl/cloudflare/origin.key"
    exit 1
fi

# Check certificate permissions
CERT_PERMS=$(stat -c %a /etc/ssl/cloudflare/origin.crt)
KEY_PERMS=$(stat -c %a /etc/ssl/cloudflare/origin.key)

if [ "$CERT_PERMS" != "600" ] || [ "$KEY_PERMS" != "600" ]; then
    echo "❌ SSL certificate permissions are incorrect"
    echo "Cert permissions: $CERT_PERMS (should be 600)"
    echo "Key permissions: $KEY_PERMS (should be 600)"
    echo "Fixing permissions..."
    sudo chmod 600 /etc/ssl/cloudflare/origin.crt
    sudo chmod 600 /etc/ssl/cloudflare/origin.key
fi

# Stop existing containers
echo "🛑 Stopping existing containers..."
docker-compose down

# Build new image
echo "🔨 Building new Docker image..."
docker-compose build --no-cache

# Start containers
echo "🚀 Starting containers..."
docker-compose up -d

# Wait for container to be healthy
echo "⏳ Waiting for container to be healthy..."
sleep 10

# Check if container is running
if ! docker-compose ps | grep -q "Up"; then
    echo "❌ Container failed to start"
    docker-compose logs
    exit 1
fi

# Test HTTPS
echo "🔒 Testing HTTPS connection..."
sleep 5
if curl -k -f https://localhost/health > /dev/null 2>&1; then
    echo "✅ HTTPS is working!"
else
    echo "⚠️  HTTPS test failed, but container is running"
fi

echo "🎉 Production deployment completed successfully!"
echo "📊 Container status:"
docker-compose ps

echo "🌐 Access your site at:"
echo "   HTTPS: https://meisterumzuege24.de" 