#!/bin/bash
echo "Stopping current app..."
pm2 stop gashtook-nextjs-app

echo "remove file changes git ..."
git reset --hard
git clean -fd

echo "Pulling latest changes..."
git pull

echo "Installing dependencies..."
npm install

echo "Building app..."
npm run build

echo "Restarting app..."
pm2 restart gashtook-nextjs-app

echo "Saving PM2 state..."
pm2 save

echo "Deployment complete!"