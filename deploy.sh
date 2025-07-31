#!/bin/bash

# Meister Umzüge 24 - Deployment Script
# This script builds and deploys the application using Docker

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is installed
check_docker() {
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed. Please install Docker first."
        exit 1
    fi

    if ! command -v docker-compose &> /dev/null; then
        print_error "Docker Compose is not installed. Please install Docker Compose first."
        exit 1
    fi

    print_success "Docker and Docker Compose are installed"
}

# Stop and remove existing containers
cleanup() {
    print_status "Cleaning up existing containers..."
    docker-compose down --remove-orphans || true
    print_success "Cleanup completed"
}

# Build the application
build() {
    print_status "Building the application..."
    docker-compose build --no-cache
    print_success "Build completed"
}

# Start the application
start() {
    print_status "Starting the application..."
    docker-compose up -d
    print_success "Application started"
}

# Check application health
health_check() {
    print_status "Checking application health..."
    
    # Wait for the application to start
    sleep 10
    
    # Check if the application is responding
    if curl -f http://localhost/health &> /dev/null; then
        print_success "Application is healthy and responding"
    else
        print_warning "Application health check failed. Check logs with: docker-compose logs"
    fi
}

# Show application status
show_status() {
    print_status "Application status:"
    docker-compose ps
    
    echo ""
    print_status "Application URLs:"
    echo "  - Local: http://localhost"
    echo "  - Health: http://localhost/health"
    echo ""
    print_status "Useful commands:"
    echo "  - View logs: docker-compose logs -f"
    echo "  - Stop: docker-compose down"
    echo "  - Restart: docker-compose restart"
}

# Main deployment function
deploy() {
    print_status "Starting deployment..."
    
    check_docker
    cleanup
    build
    start
    health_check
    show_status
    
    print_success "Deployment completed successfully!"
}

# SSL deployment function
deploy_ssl() {
    print_status "Starting SSL deployment..."
    
    # Check if SSL certificates exist
    if [ ! -f "./ssl/cert.pem" ] || [ ! -f "./ssl/key.pem" ]; then
        print_error "SSL certificates not found. Please place your SSL certificates in the ./ssl/ directory:"
        echo "  - ./ssl/cert.pem (certificate)"
        echo "  - ./ssl/key.pem (private key)"
        exit 1
    fi
    
    check_docker
    cleanup
    build
    start
    health_check
    
    print_status "Starting SSL proxy..."
    docker-compose --profile ssl up -d nginx-proxy
    
    print_success "SSL deployment completed successfully!"
    print_status "Application URLs:"
    echo "  - HTTPS: https://localhost"
    echo "  - Health: https://localhost/health"
}

# Show help
show_help() {
    echo "Meister Umzüge 24 - Deployment Script"
    echo ""
    echo "Usage: $0 [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  deploy     Deploy the application (HTTP)"
    echo "  deploy-ssl Deploy the application with SSL (HTTPS)"
    echo "  build      Build the Docker image"
    echo "  start      Start the application"
    echo "  stop       Stop the application"
    echo "  restart    Restart the application"
    echo "  logs       Show application logs"
    echo "  status     Show application status"
    echo "  cleanup    Stop and remove containers"
    echo "  help       Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 deploy      # Deploy with HTTP"
    echo "  $0 deploy-ssl  # Deploy with HTTPS (requires SSL certificates)"
    echo "  $0 logs        # View logs"
}

# Parse command line arguments
case "${1:-deploy}" in
    deploy)
        deploy
        ;;
    deploy-ssl)
        deploy_ssl
        ;;
    build)
        check_docker
        build
        ;;
    start)
        check_docker
        start
        ;;
    stop)
        docker-compose down
        print_success "Application stopped"
        ;;
    restart)
        check_docker
        docker-compose restart
        print_success "Application restarted"
        ;;
    logs)
        docker-compose logs -f
        ;;
    status)
        show_status
        ;;
    cleanup)
        cleanup
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        print_error "Unknown command: $1"
        echo ""
        show_help
        exit 1
        ;;
esac 