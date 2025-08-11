#!/bin/bash

# Deploy script for Meister Umzüge 24 with SSL certificates
set -e

echo "🚀 Starting deployment with SSL certificates..."

# Check if SSL certificates exist
if [ ! -f "/etc/ssl/cloudflare/cert.pem" ] || [ ! -f "/etc/ssl/cloudflare/key.pem" ]; then
    echo "❌ SSL certificates not found in /etc/ssl/cloudflare/"
    echo "Please ensure certificates are properly installed:"
    echo "sudo chown root:root /etc/ssl/cloudflare"
    echo "sudo chmod 700 /etc/ssl/cloudflare"
    echo "sudo install -m 600 /dev/null /etc/ssl/cloudflare/cert.pem"
    echo "sudo install -m 600 /dev/null /etc/ssl/cloudflare/key.pem"
    exit 1
fi

# Check certificate permissions
CERT_PERMS=$(stat -c %a /etc/ssl/cloudflare/cert.pem)
KEY_PERMS=$(stat -c %a /etc/ssl/cloudflare/key.pem)

if [ "$CERT_PERMS" != "600" ] || [ "$KEY_PERMS" != "600" ]; then
    echo "❌ SSL certificate permissions are incorrect"
    echo "Cert permissions: $CERT_PERMS (should be 600)"
    echo "Key permissions: $KEY_PERMS (should be 600)"
    echo "Fixing permissions..."
    sudo chmod 600 /etc/ssl/cloudflare/cert.pem
    sudo chmod 600 /etc/ssl/cloudflare/key.pem
fi

# Stop existing containers
echo "🛑 Stopping existing containers..."
docker-compose down

# Build new image
echo "🔨 Building new Docker image..."
docker-compose build --no-cache

# Start containers
echo "🚀 Starting containers with SSL..."
docker-compose up -d

# Wait for container to be healthy
echo "⏳ Waiting for container to be healthy..."
for i in {1..30}; do
    if docker-compose ps | grep -q "healthy"; then
        echo "✅ Container is healthy!"
        break
    fi
    echo "Waiting... ($i/30)"
    sleep 2
done

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

echo "🎉 Deployment completed successfully!"
echo "📊 Container status:"
docker-compose ps

echo "🌐 Access your site at:"
echo "   HTTP:  http://your-domain.com"
echo "   HTTPS: https://your-domain.com" 