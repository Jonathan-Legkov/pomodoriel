// Test functionality for the Pomodoro Timer
// This file tests various features of the timer application

// Test 1: Basic element existence
console.log('Test 1: Element existence');
const timerDisplay = document.querySelector('.timer-display');
const startBtn = document.getElementById('start-btn');
const toggleBtn = document.getElementById('toggle-size-btn');
const container = document.querySelector('.container');

console.log('Timer display exists:', !!timerDisplay);
console.log('Start button exists:', !!startBtn);
console.log('Toggle button exists:', !!toggleBtn);
console.log('Container exists:', !!container);

// Test 2: Input validation
console.log('\nTest 2: Input validation');
const workInput = document.getElementById('work-duration');
const breakInput = document.getElementById('break-duration');
const setBtn = document.getElementById('set-durations-btn');

console.log('Work input value:', workInput.value);
console.log('Break input value:', breakInput.value);

// Test 3: Preset buttons
console.log('\nTest 3: Preset buttons');
const presetBtn = document.querySelector('[data-work="50"]');
if (presetBtn) {
    console.log('Testing 50/10 preset...');
    presetBtn.click();
    setTimeout(() => {
        console.log('After clicking 50/10 preset:');
        console.log('Work input:', workInput.value);
        console.log('Break input:', breakInput.value);
        console.log('Timer display:', document.querySelector('.timer-display').textContent);
    }, 100);
}

// Test 4: Test manual duration setting
setTimeout(() => {
    console.log('\nTest 4: Manual duration setting');
    workInput.value = 1; // 1 minute for quick testing
    breakInput.value = 1;
    setBtn.click();
    
    setTimeout(() => {
        console.log('After setting 1 minute work/break:');
        console.log('Timer display:', document.querySelector('.timer-display').textContent);
        
        // Test 5: Test start button
        console.log('\nTest 5: Start button functionality');
        const startBtn = document.getElementById('start-btn');
        startBtn.click();
        console.log('Timer started. Check if display updates...');
        
        // Test 6: Test toggle button functionality (Windows-specific)
        setTimeout(() => {
            console.log('\nTest 6: Toggle button functionality (Windows-specific)');
            const toggleBtn = document.getElementById('toggle-size-btn');
            const container = document.querySelector('.container');
            
            // Test platform detection
            const isWindows = navigator.userAgent.includes('Windows');
            console.log('Detected Windows:', isWindows);
            console.log('Body has windows-platform class:', document.body.classList.contains('windows-platform'));
            
            // Test initial state
            console.log('Container has compact-view class:', container.classList.contains('compact-view'));
            
            // Test toggle functionality
            if (toggleBtn) {
                console.log('Toggle button exists and is clickable');
                console.log('Toggle button position:', {
                    top: toggleBtn.style.top || getComputedStyle(toggleBtn).top,
                    right: toggleBtn.style.right || getComputedStyle(toggleBtn).right
                });
                
                // Test click
                toggleBtn.click();
                setTimeout(() => {
                    console.log('After clicking toggle:');
                    console.log('Container has compact-view class:', container.classList.contains('compact-view'));
                    
                    // Test click again to toggle back
                    toggleBtn.click();
                    setTimeout(() => {
                        console.log('After clicking toggle again:');
                        console.log('Container has compact-view class:', container.classList.contains('compact-view'));
                    }, 100);
                }, 100);
            } else {
                console.log('Toggle button not found!');
            }
        }, 1000);
    }, 100);
}, 500);

// Test 7: Test keyboard shortcut
setTimeout(() => {
    console.log('\nTest 7: Keyboard shortcut (Ctrl+T)');
    
    // Simulate Ctrl+T key press
    const event = new KeyboardEvent('keydown', {
        key: 't',
        ctrlKey: true,
        bubbles: true
    });
    
    document.dispatchEvent(event);
    
    setTimeout(() => {
        console.log('After Ctrl+T:');
        console.log('Container has compact-view class:', container.classList.contains('compact-view'));
    }, 100);
}, 3000);

// Test 8: Test Windows-specific positioning
setTimeout(() => {
    console.log('\nTest 8: Windows-specific positioning');
    
    const toggleBtn = document.getElementById('toggle-size-btn');
    if (toggleBtn) {
        const computedStyle = getComputedStyle(toggleBtn);
        console.log('Toggle button computed styles:');
        console.log('Position:', computedStyle.position);
        console.log('Top:', computedStyle.top);
        console.log('Right:', computedStyle.right);
        console.log('Z-index:', computedStyle.zIndex);
        console.log('Background:', computedStyle.backgroundColor);
        console.log('Border:', computedStyle.border);
    }
}, 4000);

// Test 9: Test click area and responsiveness
setTimeout(() => {
    console.log('\nTest 9: Click area and responsiveness');
    
    const toggleBtn = document.getElementById('toggle-size-btn');
    if (toggleBtn) {
        const rect = toggleBtn.getBoundingClientRect();
        console.log('Toggle button dimensions:');
        console.log('Width:', rect.width);
        console.log('Height:', rect.height);
        console.log('Top:', rect.top);
        console.log('Right:', rect.right);
        
        // Test mouse events
        toggleBtn.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
        setTimeout(() => {
            toggleBtn.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
        }, 100);
    }
}, 5000);

console.log('\nAll tests scheduled. Check console output over the next 6 seconds.');
