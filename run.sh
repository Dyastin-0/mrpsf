#!/bin/bash

APP="mrps-frontend"
SERVICE_FILE="mrpsf.service"
SERVICE_PATH="/etc/systemd/system/$SERVICE_FILE"

copy_file() {
    local source_file=$1
    local dest_file=$2
    echo "$APP: Copying $source_file to $dest_file..."
    sudo cp "$source_file" "$dest_file"
    if [ $? -eq 0 ]; then
        echo "$APP: $source_file successfully copied to $dest_file"
    else
        echo "$APP: Failed to move $source_file. Check permissions or path."
        exit 1
    fi
}

copy_file ./$SERVICE_FILE $SERVICE_PATH

echo "$APP: Pulling latest changes from git..."
git pull

echo "$APP: Installing dependencies..."
npm install

echo "$APP: Building the project..."

npm run build

echo "$APP: Reloading systemd daemon..."
sudo systemctl daemon-reload
echo "$APP: Daemon reloaded"

if systemctl is-active --quiet $SERVICE_FILE; then
	echo "$APP: Restarting the service..."
    sudo systemctl restart $SERVICE_FILE
	echo "$APP: Service restarted"
else
	echo "$APP: Starting the service..."
    sudo systemctl start $SERVICE_FILE
	echo "$APP: Service started"
fi

echo "$APP: Service build and deployment complete"

sudo systemctl status $SERVICE_FILE
