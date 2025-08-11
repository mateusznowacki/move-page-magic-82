#!/bin/bash

# Deploy script for Meister Umzüge 24 (HTTP version)
set -e

echo "🚀 Starting HTTP deployment..."

# Stop existing containers
echo "🛑 Stopping existing containers..."
docker-compose -f docker-compose-http.yml down

# Build new image
echo "🔨 Building new Docker image..."
docker-compose -f docker-compose-http.yml build --no-cache

# Start containers
echo "🚀 Starting containers..."
docker-compose -f docker-compose-http.yml up -d

# Wait for container to be healthy
echo "⏳ Waiting for container to be healthy..."
for i in {1..30}; do
    if docker-compose -f docker-compose-http.yml ps | grep -q "healthy"; then
        echo "✅ Container is healthy!"
        break
    fi
    echo "Waiting... ($i/30)"
    sleep 2
done

# Check if container is running
if ! docker-compose -f docker-compose-http.yml ps | grep -q "Up"; then
    echo "❌ Container failed to start"
    docker-compose -f docker-compose-http.yml logs
    exit 1
fi

# Test HTTP
echo "🌐 Testing HTTP connection..."
sleep 5
if curl -f http://localhost/health > /dev/null 2>&1; then
    echo "✅ HTTP is working!"
else
    echo "⚠️  HTTP test failed, but container is running"
fi

echo "🎉 HTTP deployment completed successfully!"
echo "📊 Container status:"
docker-compose -f docker-compose-http.yml ps

echo "🌐 Access your site at:"
echo "   HTTP:  http://your-domain.com" 