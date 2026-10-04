#!/usr/bin/env bash
set -e

BIN_DIR="$HOME/.local/bin"
APP_DIR="$HOME/.local/share/applications"
ICON_DIR="$HOME/.local/share/icons/hicolor/512x512/apps"

mkdir -p "$BIN_DIR" "$APP_DIR" "$ICON_DIR"

cp bin/keyster "$BIN_DIR/keyster"
chmod +X "$BIN_DIR/keyster"

cp keyster.desktop "$APP_DIR/keyster.desktop"
# cp assets/icon.png "$ICON_DIR/keyster.png"

update-desktop-database "$APP_DIR" 2>/dev/null || true
gtk-update-icon-cache -f -t "$HOME/.local/share/icons/hicolor" 2>/dev/null || true

echo "Keyster has been successfully installed to $BIN_DIR!"
