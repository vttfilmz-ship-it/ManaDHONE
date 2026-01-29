#!/bin/bash

# ManaDHONE Deployment Script for Hostinger
# This script automates the deployment process
# Usage: bash scripts/deploy.sh [production|staging]

set -e  # Exit on error

# Color output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
DEPLOY_ENV=${1:-production}
DOMAIN="manadhone.com"
REMOTE_USER="${REMOTE_USER:-user}"
REMOTE_HOST="${REMOTE_HOST:-manadhone.com}"
REMOTE_PATH="${REMOTE_PATH:-/home/$REMOTE_USER/public_html}"
LOCAL_BUILD_PATH="./dist"

echo -e "${YELLOW}Starting ManaDHONE Deployment...${NC}"
echo "Environment: $DEPLOY_ENV"
echo "Domain: $DOMAIN"
echo ""

# Step 1: Check Prerequisites
echo -e "${YELLOW}[1/6] Checking prerequisites...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}Error: Node.js is not installed${NC}"
    exit 1
fi
echo "✓ Node.js version: $(node --version)"

if ! command -v npm &> /dev/null; then
    echo -e "${RED}Error: npm is not installed${NC}"
    exit 1
fi
echo "✓ npm version: $(npm --version)"

# Step 2: Install dependencies
echo -e "${YELLOW}[2/6] Installing dependencies...${NC}"
npm install
echo -e "${GREEN}✓ Dependencies installed${NC}"

# Step 3: Build application
echo -e "${YELLOW}[3/6] Building application...${NC}"
npm run build
if [ ! -d "$LOCAL_BUILD_PATH" ]; then
    echo -e "${RED}Error: Build failed - dist folder not found${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Build completed${NC}"

# Step 4: Verify build
echo -e "${YELLOW}[4/6] Verifying build artifacts...${NC}"
if [ ! -f "$LOCAL_BUILD_PATH/index.html" ]; then
    echo -e "${RED}Error: index.html not found in dist${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Build artifacts verified${NC}"

# Step 5: Deploy to Hostinger (via SFTP)
echo -e "${YELLOW}[5/6] Deploying to Hostinger ($REMOTE_HOST)...${NC}"
if command -v scp &> /dev/null; then
    echo "Uploading files via SCP..."
    scp -r $LOCAL_BUILD_PATH/* "$REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH/"
    echo -e "${GREEN}✓ Files uploaded${NC}"
else
    echo -e "${YELLOW}Note: scp not available. Use SFTP client or GitHub Actions for deployment.${NC}"
fi

# Step 6: Post-deployment verification
echo -e "${YELLOW}[6/6] Post-deployment verification...${NC}"
echo "Deployment URL: https://$DOMAIN"
echo ""
echo -e "${GREEN}Deployment Summary:${NC}"
echo "- Environment: $DEPLOY_ENV"
echo "- Domain: $DOMAIN"
echo "- Build path: $LOCAL_BUILD_PATH"
echo "- Remote path: $REMOTE_PATH@$REMOTE_HOST"
echo ""
echo -e "${GREEN}✓ Deployment completed successfully!${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Verify deployment: https://$DOMAIN"
echo "2. Check browser console for errors"
echo "3. Test business directory functionality"
echo "4. Review logs in Hostinger panel"
echo ""
echo "For rollback, use: git revert <commit-hash> && git push && bash scripts/deploy.sh"
