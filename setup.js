#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🍅 Pomodoro Timer Setup Script');
console.log('================================');

// Check if Node.js and npm are installed
function checkSystemRequirements() {
  console.log('\n📋 Checking system requirements...');
  
  try {
    const nodeVersion = execSync('node --version', { encoding: 'utf8' }).trim();
    const npmVersion = execSync('npm --version', { encoding: 'utf8' }).trim();
    
    console.log(`✅ Node.js: ${nodeVersion}`);
    console.log(`✅ npm: ${npmVersion}`);
    
    // Check if Node.js version is compatible (v14+)
    const majorVersion = parseInt(nodeVersion.replace('v', '').split('.')[0]);
    if (majorVersion < 14) {
      throw new Error(`Node.js version ${nodeVersion} is too old. Please install Node.js 14 or higher.`);
    }
    
    return true;
  } catch (error) {
    console.error('❌ System requirements check failed:');
    console.error(error.message);
    console.log('\n📥 Please install Node.js from: https://nodejs.org/');
    return false;
  }
}

// Install dependencies
function installDependencies() {
  console.log('\n📦 Installing dependencies...');
  
  try {
    // Clear npm cache to avoid issues
    console.log('🧹 Clearing npm cache...');
    execSync('npm cache clean --force', { stdio: 'inherit' });
    
    // Install dependencies
    console.log('⬇️ Installing packages...');
    execSync('npm install', { stdio: 'inherit' });
    
    console.log('✅ Dependencies installed successfully!');
    return true;
  } catch (error) {
    console.error('❌ Failed to install dependencies:');
    console.error(error.message);
    return false;
  }
}

// Verify installation
function verifyInstallation() {
  console.log('\n🔍 Verifying installation...');
  
  const requiredDirs = ['node_modules', 'src'];
  const requiredFiles = ['package.json', 'src/main.js', 'src/index.html'];
  
  for (const dir of requiredDirs) {
    if (!fs.existsSync(dir)) {
      console.error(`❌ Missing directory: ${dir}`);
      return false;
    }
  }
  
  for (const file of requiredFiles) {
    if (!fs.existsSync(file)) {
      console.error(`❌ Missing file: ${file}`);
      return false;
    }
  }
  
  console.log('✅ All files and directories are present!');
  return true;
}

// Test the application
function testApplication() {
  console.log('\n🧪 Testing application...');
  
  try {
    // Check if electron is available
    execSync('npx electron --version', { encoding: 'utf8' });
    console.log('✅ Electron is working!');
    
    console.log('\n🚀 Setup complete! You can now run:');
    console.log('   npm start     - Start the application');
    console.log('   npm run dev   - Start in development mode');
    console.log('   npm run build - Build for distribution');
    
    return true;
  } catch (error) {
    console.error('❌ Application test failed:');
    console.error(error.message);
    return false;
  }
}

// Main setup function
function main() {
  console.log('Starting setup process...\n');
  
  const steps = [
    { name: 'System Requirements', fn: checkSystemRequirements },
    { name: 'Install Dependencies', fn: installDependencies },
    { name: 'Verify Installation', fn: verifyInstallation },
    { name: 'Test Application', fn: testApplication }
  ];
  
  for (const step of steps) {
    console.log(`\n🔄 ${step.name}...`);
    if (!step.fn()) {
      console.error(`\n❌ Setup failed at: ${step.name}`);
      process.exit(1);
    }
  }
  
  console.log('\n🎉 Setup completed successfully!');
  console.log('\n💡 Quick start:');
  console.log('   npm start');
  console.log('\n📖 For Windows testing workflow, see: TESTING-WINDOWS.md');
}

// Run setup
main(); 