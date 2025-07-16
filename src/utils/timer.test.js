const Timer = require('./timer');

describe('Timer', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('initializes with the correct state', () => {
    const timer = new Timer({ onTick: () => {}, onEnd: () => {} });
    expect(timer.isRunning).toBe(false);
    expect(timer.remainingTime).toBe(0);
  });

  it('starts the timer and ticks every second', () => {
    const onTick = jest.fn();
    const timer = new Timer({ onTick, onEnd: () => {} });
    
    timer.start(5); // 5 seconds
    expect(timer.isRunning).toBe(true);

    jest.advanceTimersByTime(1000);
    expect(onTick).toHaveBeenCalledWith(4);
    
    jest.advanceTimersByTime(1000);
    expect(onTick).toHaveBeenCalledWith(3);
    expect(onTick).toHaveBeenCalledTimes(2);
  });

  it('pauses the timer', () => {
    const onTick = jest.fn();
    const timer = new Timer({ onTick, onEnd: () => {} });
    
    timer.start(5);
    jest.advanceTimersByTime(2000);
    expect(onTick).toHaveBeenCalledTimes(2);

    timer.pause();
    expect(timer.isRunning).toBe(false);

    jest.advanceTimersByTime(3000);
    expect(onTick).toHaveBeenCalledTimes(2); // Should not have ticked again
  });

  it('resets the timer', () => {
    const onTick = jest.fn();
    const timer = new Timer({ onTick, onEnd: () => {} });
    
    timer.start(10);
    jest.advanceTimersByTime(3000);

    timer.reset(10);
    expect(timer.isRunning).toBe(false);
    expect(timer.remainingTime).toBe(10);
    expect(onTick).toHaveBeenLastCalledWith(10);
  });

  it('calls the onEnd callback when the timer finishes', () => {
    const onEnd = jest.fn();
    const timer = new Timer({ onTick: () => {}, onEnd });
    
    timer.start(3);
    jest.advanceTimersByTime(3000);

    expect(onEnd).toHaveBeenCalledTimes(1);
  });

  it('formats the time correctly', () => {
    const timer = new Timer({ onTick: () => {}, onEnd: () => {} });
    timer.remainingTime = 1505; // 25 minutes and 5 seconds
    expect(timer.getFormattedTime()).toBe('25:05');
    
    timer.remainingTime = 59;
    expect(timer.getFormattedTime()).toBe('00:59');
  });
}); 