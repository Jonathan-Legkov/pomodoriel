# Windows Testing Workflow Guide

## Quick Setup (One-time)

1. **On your Windows PC**, install:
   - [Git](https://git-scm.com/download/win)
   - [Node.js](https://nodejs.org/) (LTS version)
   - [Visual Studio Code](https://code.visualstudio.com/) (optional but recommended)

2. **Clone the repository on Windows**:
   ```bash
   git clone <your-repo-url>
   cd pomodoro
   npm install
   ```

## Testing Workflows (Ranked by Efficiency)

### 🥇 **Option 1: Git-Based Workflow** (Recommended)

**Setup**: Push your Mac changes to a Git repository (GitHub, GitLab, etc.)

**Mac (Development)**:
```bash
git add .
git commit -m "Fix toggle button positioning"
git push origin main
```

**Windows (Testing)**:
```bash
git pull origin main
npm start
```

**Benefits**:
- ✅ Fastest sync (seconds)
- ✅ Version control included
- ✅ Easy to revert changes
- ✅ Works with any Git provider

### 🥈 **Option 2: Local Git Server** (For offline testing)

**Setup**: Create a bare Git repository on a shared drive or network location

**Mac**:
```bash
git remote add local /path/to/shared/pomodoro.git
git push local main
```

**Windows**:
```bash
git pull local main
npm start
```

### 🥉 **Option 3: Network File Sharing**

**Setup**: Share the project folder via SMB/AFP

**Mac**: Enable File Sharing in System Preferences, share the project folder
**Windows**: Map network drive to the shared folder

⚠️ **Warning**: Be careful with `node_modules` - may need to run `npm install` on Windows

### 🏅 **Option 4: Automated Build Distribution**

**Setup**: Use GitHub Actions or similar CI/CD

**Mac**: Push changes trigger automated Windows builds
**Windows**: Download and test pre-built executables

**.github/workflows/build.yml**:
```yaml
name: Build Windows
on: [push]
jobs:
  build:
    runs-on: windows-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build:win
      - uses: actions/upload-artifact@v2
        with:
          name: windows-build
          path: dist/
```

### 🎯 **Option 5: VS Code Remote Development**

**Setup**: Use VS Code Remote - SSH extension

**Requirements**: SSH server on Windows (OpenSSH or similar)

**Mac**: Open VS Code, connect to Windows via SSH, develop directly on Windows

**Benefits**:
- ✅ Real-time development on Windows
- ✅ No file sync needed
- ✅ Direct Windows testing environment

## Testing Commands

### Development Testing
```bash
# Start with development logging
npm run dev-server

# Run functionality tests
# Open DevTools (F12) and paste the contents of test-functionality.js
```

### Build Testing
```bash
# Build Windows executable
npm run build:win

# Test the built executable
./dist/Pomodoro\ Setup\ 1.0.0.exe
```

### Live Development
```bash
# Start with auto-reload (requires nodemon)
npm install -g nodemon
nodemon --exec "npm start"
```

## Windows-Specific Testing Checklist

### Toggle Button Testing
- [ ] Button is visible and clickable
- [ ] Positioned correctly (not behind title bar)
- [ ] Hover effects work
- [ ] Click feedback is responsive
- [ ] Keyboard shortcut (Ctrl+T) works
- [ ] Compact mode toggles correctly

### Window Management
- [ ] Always on top works
- [ ] Window resizing works
- [ ] Compact mode positioning
- [ ] Title bar behavior
- [ ] Minimize/maximize/close buttons don't interfere

### Cross-Platform Features
- [ ] Timer functionality identical to Mac
- [ ] Audio playback works
- [ ] Settings persist correctly
- [ ] Keyboard shortcuts work

## Recommended Development Flow

1. **Initial Setup** (once):
   ```bash
   # Set up git repository
   git init
   git remote add origin <your-repo-url>
   ```

2. **Development Cycle**:
   ```bash
   # Mac: Make changes
   git add .
   git commit -m "Describe changes"
   git push origin main
   
   # Windows: Test changes
   git pull origin main
   npm start
   ```

3. **Quick Iterations**:
   ```bash
   # For rapid testing, use git stash for temporary changes
   git stash push -m "Testing toggle button positioning"
   git push origin main
   
   # Windows: pull and test
   git pull origin main
   npm start
   
   # Mac: retrieve your work
   git stash pop
   ```

## Performance Tips

### Speed Up npm install
```bash
# Use npm ci for faster installs
npm ci

# Or use yarn (generally faster)
yarn install
```

### Reduce Build Time
```bash
# Build directory only (no installer)
npm run pack

# Target specific architecture
npm run build:win -- --x64
```

## Troubleshooting

### Common Issues

1. **Permission Errors**:
   ```bash
   # Run as Administrator on Windows
   npm install --force
   ```

2. **Node Version Mismatch**:
   ```bash
   # Use nvm to match Node versions
   nvm use 18
   ```

3. **Module Not Found**:
   ```bash
   # Clear cache and reinstall
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

### Windows-Specific Issues

1. **Antivirus Interference**: Add project folder to antivirus exclusions
2. **Windows Defender**: May quarantine Electron executables
3. **Path Length**: Windows has 260 character path limits

## Additional Tools

### Recommended Extensions (VS Code)
- `ms-vscode-remote.remote-ssh` - Remote development
- `ms-vscode.vscode-json` - JSON editing
- `bradlc.vscode-tailwindcss` - CSS support
- `formulahendry.auto-close-tag` - HTML support

### Useful Commands
```bash
# Check Node/npm versions
node --version && npm --version

# List npm scripts
npm run

# Analyze bundle size
npm run pack && dir dist

# Clean everything
npm run clean && npm install
```

## Summary

**For fastest iteration**: Use **Git-Based Workflow** (#1)
**For isolated testing**: Use **Local Git Server** (#2)  
**For continuous integration**: Use **Automated Build Distribution** (#4)
**For real-time development**: Use **VS Code Remote Development** (#5)

The Windows-specific toggle button fixes should now work seamlessly with any of these workflows! 