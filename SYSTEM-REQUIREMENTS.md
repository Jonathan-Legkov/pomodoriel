# System Requirements

## Required Software

### Node.js (v14 or higher)
- **Download**: https://nodejs.org/
- **Recommended**: LTS version (currently v18 or v20)
- **Includes**: npm (Node Package Manager)

### Git (for cloning and updates)
- **Windows**: https://git-scm.com/download/win
- **macOS**: Pre-installed or via Homebrew: `brew install git`
- **Linux**: `sudo apt install git` or `sudo yum install git`

## Project Dependencies (Auto-installed)

The following dependencies are automatically installed when you run `npm install`:

### Runtime Dependencies
- **electron** (^36.5.0) - Desktop app framework
- **electron-builder** (^25.1.8) - Build and packaging tool
- **jest** (^30.0.2) - Testing framework

### Audio Files
- `src/audio/break-end.mp3` - Break end notification
- `src/audio/tick.mp3` - Timer tick sound
- `src/audio/work-end.mp3` - Work session end notification

## Quick Installation

### Option 1: Automated Setup (Recommended)
```bash
# Clone the repository
git clone https://github.com/Jonathan-Legkov/pomodoriel.git
cd pomodoriel

# Run the setup script
node setup.js
```

### Option 2: Manual Setup
```bash
# Clone the repository
git clone https://github.com/Jonathan-Legkov/pomodoriel.git
cd pomodoriel

# Install dependencies
npm install

# Start the application
npm start
```

## Platform-Specific Notes

### Windows
- **Windows 10 or higher** recommended
- **Visual Studio Build Tools** may be required for native dependencies
- **Windows Defender** may flag the app initially - this is normal for Electron apps

### macOS
- **macOS 10.15 (Catalina) or higher** recommended
- **Xcode Command Line Tools** may be required: `xcode-select --install`

### Linux
- **Ubuntu 18.04+**, **Debian 10+**, or equivalent
- **Additional packages** may be required: `sudo apt install libnss3-dev libatk-bridge2.0-dev libdrm2 libxkbcommon0 libxrandr2 libasound2-dev`

## Disk Space Requirements

- **Source code**: ~1 MB
- **node_modules**: ~200 MB
- **Built application**: ~150 MB (per platform)

## Network Requirements

- **Initial setup**: ~200 MB download for dependencies
- **Updates**: Minimal (only changed files via git)

## Testing the Installation

After installation, verify everything works:

```bash
# Test the application
npm start

# Run tests (if available)
npm test

# Build for distribution
npm run build
```

## Troubleshooting

### Common Issues

1. **Node.js version too old**
   - Update Node.js to v14 or higher
   - Run: `node --version` to check current version

2. **npm install fails**
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules: `rm -rf node_modules`
   - Reinstall: `npm install`

3. **Electron app won't start**
   - Check if all files are present
   - Verify permissions on executable files
   - Try development mode: `npm run dev`

4. **Build fails**
   - Ensure all dependencies are installed
   - Check system requirements for target platform
   - Try: `npm run pack` for testing builds

### Getting Help

If you encounter issues:
1. Check the `TESTING-WINDOWS.md` file for Windows-specific guidance
2. Verify system requirements are met
3. Try the automated setup script: `node setup.js`
4. Check the project repository for issues and updates 