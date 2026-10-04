# Keyster

**Keyster** is a graphical SSH key and ssh_config manager for Linux built with Go, Wails, and React.

## Screenshots
<details>
  <summary>Details View</summary>

  ![](.github/screenshots/details.png)
    
</details>

## Features

- View and search for keys located in `~/.ssh`
- View and modify `ssh_config` options for each key
- View known hosts for a given key
- Upload keys to `~/.ssh`
- Generate RSA keys from UI

## Installation

### Release

To install the latest stable release of Keyster, visit the [releases page](https://github.com/compscitwilight/keyster/releases/latest) to download the binary.

### Build

In order to manually build and run Keyster manually, use the following commands:

```sh
# create a clone repo
git clone https://github.com/compscitwilight/keyster
cd keyster

# build / execution
go mod download
wails build -tags webkit2_41
chmod +X ./build/bin/keyster
./build/bin/keyster &
```

> [!NOTE]
> `webkit2_41` is used for GTK version 4.1. If you are running a legacy GTK version (i.e. `libwebkit2gtk-4.0` on Ubuntu 20.04, Debian 11, etc), use `wails build -tags webkit2_40` instead.
