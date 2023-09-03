class Timer {
    constructor(bpm: number, onTick: () => void) {
        this.time = 0;
        this.timer = null;
        this.msPerBeat = 60000 / bpm;
        this.onTick = onTick;
    }

    tick() {
        this.time++;
        this.onTick();
        this.timer = setTimeout(this.tick.bind(this), this.msPerBeat)
    }

    start() {
        this.timer = setTimeout(this.tick.bind(this), this.msPerBeat);
    }

    stop() {
        clearTimeout(this.timer);
        this.timer = null;
    }

    setBpm(bpm: number) {
        this.msPerBeat = 60000 / bpm;
    }

    setOnTick(onTick: () => void) {
        this.onTick = onTick;
    }
}

export default Timer;
