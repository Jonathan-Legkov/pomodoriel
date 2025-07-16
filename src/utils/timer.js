class Timer {
  constructor({ onTick, onEnd }) {
    this.duration = 0;
    this.remainingTime = 0;
    this.isRunning = false;
    this.intervalId = null;
    this.onTick = onTick;
    this.onEnd = onEnd;
  }

  start(durationInSeconds) {
    if (this.isRunning) return;
    
    this.isRunning = true;
    this.remainingTime = this.remainingTime > 0 ? this.remainingTime : durationInSeconds;
    this.duration = durationInSeconds;

    this.intervalId = setInterval(() => {
      this.remainingTime--;
      this.onTick(this.remainingTime);

      if (this.remainingTime <= 0) {
        this.pause();
        this.onEnd();
      }
    }, 1000);
  }

  pause() {
    if (!this.isRunning) return;
    this.isRunning = false;
    clearInterval(this.intervalId);
    this.intervalId = null;
  }

  reset(durationInSeconds) {
    this.pause();
    this.remainingTime = durationInSeconds || this.duration;
    this.onTick(this.remainingTime);
  }

  getFormattedTime() {
    const minutes = Math.floor(this.remainingTime / 60);
    const seconds = this.remainingTime % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
}

module.exports = Timer; 