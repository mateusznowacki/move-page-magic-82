# SSL Setup with Cloudflare Certificates

## Overview
This setup provides secure HTTPS access using Cloudflare Origin Certificates with Docker and Nginx.

## Prerequisites
- Docker and Docker Compose installed
- Cloudflare Origin Certificate and Private Key
- Root access to the server

## SSL Certificate Setup

### 1. Create SSL Directory
```bash
sudo mkdir -p /etc/ssl/cloudflare
sudo chown root:root /etc/ssl/cloudflare
sudo chmod 700 /etc/ssl/cloudflare
```

### 2. Create Certificate Files
```bash
sudo install -m 600 /dev/null /etc/ssl/cloudflare/cert.pem
sudo install -m 600 /dev/null /etc/ssl/cloudflare/key.pem
```

### 3. Add Your Certificates
Edit the certificate files with your Cloudflare certificates:

```bash
sudo nano /etc/ssl/cloudflare/cert.pem
# Paste your Cloudflare Origin Certificate here

sudo nano /etc/ssl/cloudflare/key.pem
# Paste your Cloudflare Private Key here
```

## Security Features

### SSL Configuration
- **Protocols**: TLSv1.2, TLSv1.3
- **Ciphers**: ECDHE-RSA-AES128-GCM-SHA256, ECDHE-RSA-AES256-GCM-SHA384
- **Session Cache**: 10m shared cache
- **HSTS**: 1 year with preload and subdomains

### Security Headers
- X-Frame-Options: SAMEORIGIN
- X-Content-Type-Options: nosniff
- X-XSS-Protection: 1; mode=block
- Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
- Content-Security-Policy: Comprehensive CSP for security

### Cloudflare Integration
- Real IP detection from Cloudflare IP ranges
- CF-Connecting-IP header support
- Optimized for Cloudflare proxy

## Deployment

### Quick Deploy
```bash
./deploy-ssl.sh
```

### Manual Deploy
```bash
# Stop existing containers
docker-compose down

# Build new image
docker-compose build --no-cache

# Start with SSL
docker-compose up -d
```

## Verification

### Check Container Status
```bash
docker-compose ps
```

### Test HTTPS
```bash
curl -k https://localhost/health
```

### Check Logs
```bash
docker-compose logs -f
```

## Ports
- **80**: HTTP (redirects to HTTPS)
- **443**: HTTPS

## File Structure
```
├── nginx-ssl.conf          # SSL-enabled Nginx configuration
├── docker-compose.yml      # Docker Compose with SSL volumes
├── Dockerfile              # Updated for SSL support
├── deploy-ssl.sh           # Automated deployment script
└── SSL_SETUP.md           # This documentation
```

## Troubleshooting

### Certificate Permission Issues
```bash
sudo chmod 600 /etc/ssl/cloudflare/cert.pem
sudo chmod 600 /etc/ssl/cloudflare/key.pem
```

### Container Won't Start
```bash
# Check logs
docker-compose logs

# Verify certificate files exist
ls -la /etc/ssl/cloudflare/
```

### SSL Handshake Errors
- Verify certificate and key match
- Check certificate expiration
- Ensure Cloudflare Origin Certificate is used (not Edge Certificate)

## Security Best Practices

1. **Regular Updates**: Keep certificates updated
2. **Monitoring**: Monitor certificate expiration
3. **Backup**: Backup certificates securely
4. **Access Control**: Restrict access to certificate files
5. **Logging**: Monitor SSL/TLS logs for issues

## Cloudflare Configuration

### DNS Settings
- Set A record pointing to your server IP
- Enable Cloudflare proxy (orange cloud)

### SSL/TLS Settings
- **Encryption Mode**: Full (strict)
- **Minimum TLS Version**: 1.2
- **Opportunistic Encryption**: On
- **TLS 1.3**: On

### Security Settings
- **Security Level**: Medium
- **Browser Integrity Check**: On
- **Always Use HTTPS**: On
- **HSTS**: On (if not using Cloudflare HSTS) 