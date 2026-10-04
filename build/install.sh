#!/usr/bin/env bash
set -e

REPO="compscitwilight/keyster"
BIN_DIR="$HOME/.local/bin"
APP_DIR="$HOME/.local/share/applications"
ICON_DIR="$HOME/.local/share/icons/hicolor/512x512/apps"

mkdir -p "$BIN_DIR" "$APP_DIR" "$ICON_DIR"

curl -sSL "https://raw.githubusercontent.com/$REPO/main/build/keyster.desktop" -o "$APP_DIR/keyster.desktop"
curl -sSL "https://raw.githubusercontent.com/$REPO/main/build/assets/icon.png" -o "$ICON_DIR/keyster.png"
curl -sSL "https://github.com/$REPO/releases/latest/download/keyster" -o "$BIN_DIR/keyster"
chmod +x "$BIN_DIR/keyster"

update-desktop-database "$APP_DIR" 2>/dev/null || true
gtk-update-icon-cache -f -t "$HOME/.local/share/icons/hicolor" 2>/dev/null || true

echo "Keyster has been successfully installed to $BIN_DIR!"
