#!/bin/bash

# Meister Umzüge 24 - Deployment Script
# Usage: ./deploy.sh [build|start|stop|restart|logs|clean]

set -e

COMPOSE_FILE="docker-compose.yml"
SERVICE_NAME="meisterumzuege24"
IMAGE_NAME="meisterumzuege24-web"

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

# Function to check if Docker is running
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        print_error "Docker is not running. Please start Docker first."
        exit 1
    fi
}

# Function to build the application
build() {
    print_status "Building Docker image..."
    docker-compose -f $COMPOSE_FILE build --no-cache
    print_success "Build completed successfully!"
}

# Function to start the application
start() {
    print_status "Starting application..."
    docker-compose -f $COMPOSE_FILE up -d
    print_success "Application started successfully!"
    
    # Wait a moment for the container to start
    sleep 5
    
    # Check if the application is healthy
    if docker-compose -f $COMPOSE_FILE ps | grep -q "Up"; then
        print_success "Application is running and healthy!"
        print_status "You can access the application at: http://localhost"
    else
        print_error "Application failed to start properly."
        exit 1
    fi
}

# Function to stop the application
stop() {
    print_status "Stopping application..."
    docker-compose -f $COMPOSE_FILE down
    print_success "Application stopped successfully!"
}

# Function to restart the application
restart() {
    print_status "Restarting application..."
    docker-compose -f $COMPOSE_FILE down
    docker-compose -f $COMPOSE_FILE up -d
    print_success "Application restarted successfully!"
}

# Function to show logs
logs() {
    print_status "Showing application logs..."
    docker-compose -f $COMPOSE_FILE logs -f
}

# Function to clean up
clean() {
    print_warning "This will remove all containers, images, and volumes. Are you sure? (y/N)"
    read -r response
    if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
        print_status "Cleaning up Docker resources..."
        docker-compose -f $COMPOSE_FILE down -v --rmi all
        docker system prune -f
        print_success "Cleanup completed!"
    else
        print_status "Cleanup cancelled."
    fi
}

# Function to show status
status() {
    print_status "Application status:"
    docker-compose -f $COMPOSE_FILE ps
}

# Function to show help
show_help() {
    echo "Usage: $0 [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  build     Build the Docker image"
    echo "  start     Start the application"
    echo "  stop      Stop the application"
    echo "  restart   Restart the application"
    echo "  logs      Show application logs"
    echo "  status    Show application status"
    echo "  clean     Clean up Docker resources"
    echo "  help      Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 build    # Build the image"
    echo "  $0 start    # Start the application"
    echo "  $0 logs     # View logs"
}

# Main script logic
main() {
    check_docker
    
    case "${1:-help}" in
        build)
            build
            ;;
        start)
            start
            ;;
        stop)
            stop
            ;;
        restart)
            restart
            ;;
        logs)
            logs
            ;;
        status)
            status
            ;;
        clean)
            clean
            ;;
        help|--help|-h)
            show_help
            ;;
        *)
            print_error "Unknown command: $1"
            show_help
            exit 1
            ;;
    esac
}

# Run main function with all arguments
main "$@" 