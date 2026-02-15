import brightness from '@system.brightness';
import device from '@system.device';
import app from '@system.app';
import vibrator from '@system.vibrator';

export default {
    data: {
        showLight: false,
        showHourglass: false,
        bgColor: '#ffffff',
        hourglassColor: '#ffffff',
        shutterHeight: 0,
        timer: null,
        autoOffTimer: null,
        currentPulseColor: '#ffffff',
        currR: 255,
        currG: 0,
        currB: 0,
        targetR: 0,
        targetG: 0,
        targetB: 0,
        maxRes: 454,
        customColor: '#ffffff',
        customInterval: 300,
        customIsOn: false,
        showTicker: false,
        hourDisplay: "00",
        minuteDisplay: "00",
        dateDisplay: "",
        tickerColor: "#00ff00",
        displayYear: 0,
        yearRoman: "",
        lastScrollY: 0,
        showCounter: false,
        counterValue: 0,
        counterInterval: null,
        showDice: false,
        diceValue: 1,
        isRolling: false,
        coinResult: 'cara',
        displayCoin: false,
        currentBrightness: 255,
        showVibration: false,
        vibrationSpeed: 500,
        randomLogo: "/common/logom8ax.png",
    },
    onInit() {
        const y = new Date().getFullYear();
        this.displayYear = y;
        this.yearRoman = (y <= 3999) ? " - " + this.toRoman(y) : "";
        const logos = [
            "/common/logom8ax.png",
            "/common/logomviiiax.png",
            "/common/m8ax1.png",
            "/common/m8ax2.png",
            "/common/m8ax3.png"
        ];
        this.randomLogo = logos[Math.floor(Math.random() * logos.length)];
        try {
            this.maxRes = device.getInfoSync()?.width || 454;
        } catch (e) {
            this.maxRes = 454;
        }
    },
    handleWheel(e) {
        const isActive =
            this.showLight || this.showHourglass || this.showCounter || this.showDice || this.displayCoin ||
            this.showVibration;
        if (!isActive) {
            this.$element('mainList')?.scrollBy({ dx: 0, dy: e.deltaY > 0 ? 120 : -120, smooth: true });
        }
    },
    handleKey(e) {
        const isActive =
            this.showLight || this.showHourglass || this.showCounter || this.showDice || this.displayCoin ||
            this.showVibration;
        let step = 0;
        if (e.code === 2001 || e.code === 19) {
            step = -120;
        }
        if (e.code === 2002 || e.code === 20) {
            step = 120;
        }
        if (step !== 0) {
            if (!isActive) {
                this.$element('mainList')?.scrollBy({ dx: 0, dy: step, smooth: true });
            } else {
                this.currentBrightness = Math.min(Math.max(this.currentBrightness + (step > 0 ? 20 : -20), 20), 255);
                brightness.setValue({ value: this.currentBrightness });
            }
        }
    },
    toRoman(num) {
        const v = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
        const s = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];
        let r = '';
        for (let i = 0; i < v.length; i++) {
            while (num >= v[i]) {
                r += s[i];
                num -= v[i];
            }
        }
        return r;
    },
    setCustomColor(c) {
        this.customColor = c;
    },
    setCustomInterval(ms) {
        this.customInterval = ms;
    },
    activate(mode) {
        try {
            if (this.$element('mainList')) {
                const offset = this.$element('mainList').currentOffset();
                if (offset) {
                    this.lastScrollY = offset.y;
                }
            }
        } catch (e) {
        }
        if (this.timer) {
            clearInterval(this.timer);
        }
        if (this.autoOffTimer) {
            clearTimeout(this.autoOffTimer);
        }
        this.autoOffTimer = setTimeout(() => {
            this.deactivate();
        }, 18000000);
        this.bgColor = '#000000';
        this.showHourglass = false;
        this.showLight = true;
        brightness.setKeepScreenOn({ keepScreenOn: true });
        brightness.setValue({ value: 255 });
        this.currentBrightness = 255;
        const colors = {
            white: '#ffffff',
            warm: '#ffebcc',
            fish: '#00ff00',
            hunt: '#ff0000',
            blue: '#0000ff'
        };
        if (colors[mode]) {
            return this.bgColor = colors[mode];
        }
        switch (mode) {
            case 'custom':
                this.bgColor = '#000000';
                this.timer = setInterval(() => {
                    this.bgColor = this.customColor;
                    let flashDuration = Math.min(this.customInterval / 2, 150);
                    setTimeout(() => {
                        this.bgColor = '#000000';
                    }, flashDuration);
                }, this.customInterval);
                break;
            case 'dice':
            case 'coin':
                const isD = mode === 'dice';
                this[isD ? 'showDice' : 'displayCoin'] = this.isRolling = true;
                let c = 0;
                this.timer = setInterval(() => {
                    if (isD) {
                        this.diceValue = Math.floor(Math.random() * 6) + 1;
                    } else {
                        this.coinResult =
                            Math.random() > 0.5 ? 'cara' : 'cruz';
                    }
                    this.tickerColor = this.generateFullRandomColor();
                    if (++c > 22) {
                        clearInterval(this.timer);
                        this.isRolling = false;
                    }
                }, 50);
                break;
            case 'counter':
                this.showCounter = true;
                this.counterValue = 0;
                this.counterInterval = setInterval(() => {
                    this.counterValue = (this.counterValue + 1) % 7201;
                    this.tickerColor = '#' + Math.random().toString(16).slice(2, 8);
                }, 1000);
                break;
            case 'vibration':
                this.showVibration = true;
                let s = 0;
                const p =
                    [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1,
                        0, 0, 0];
                this.timer = setInterval(() => {
                    if (!this.showVibration) {
                        return clearInterval(this.timer);
                    }
                    let cur = p[s++%p.length];
                    this.bgColor = cur ? '#f00' : '#000';
                    if (cur) {
                        vibrator.vibrate({ mode: 'short' });
                    }
                }, 150);
                break;
            case 'ticker':
                this.showTicker = true;
                const u = () => {
                    const d = new Date(), hh = d.getHours(), mm = d.getMinutes();
                    this.hourDisplay = (hh < 10 ? "0" : "") + hh;
                    this.minuteDisplay = (mm < 10 ? "0" : "") + mm;
                    this.dateDisplay =
                        ['DOM', 'LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB'][d.getDay()] + " " + d.getDate();
                    this.tickerColor = this.generateFullRandomColor();
                };
                u();
                this.timer = setInterval(u, 1000);
                break;
            case 'random_flash':
                this.timer = setInterval(() => {
                    this.bgColor = this.generateFullRandomColor();
                    setTimeout(() => {
                        this.bgColor = '#000000';
                    }, 100);
                }, 1000);
                break;
            case 'beacon':
                this.bgColor = '#ff0000';
                this.timer = setInterval(() => {
                    this.bgColor = this.bgColor === '#ff0000' ? '#000000' : '#ff0000';
                }, 1000);
                break;
            case 'police':
                let pS = 0;
                const pC = ['#000000', '#ff0000', '#0000ff'];
                const pP = [1, 0, 1, 0, 1, 0, 2, 0, 2, 0, 2, 0];
                this.timer = setInterval(() => {
                    this.bgColor = pC[pP[pS++ % pP.length]];
                }, 60);
                break;
            case 'disco':
                this.timer = setInterval(() => {
                    this.bgColor = this.generateFullRandomColor();
                }, 150);
                break;
            case 'candle':
                this.timer = setInterval(() => {
                    const flicker = Math.floor(Math.random() * 60) + 150;
                    this.bgColor = `rgb(255, ${flicker}, 0)`;
                }, 100);
                break;
            case 'hourglass':
                this.showLight = false;
                this.showHourglass = true;
                this.shutterHeight = 0;
                this.hourglassColor = '#' + Math.random().toString(16).slice(2, 8);
                this.timer = setInterval(() => {
                    this.shutterHeight += (this.maxRes / (300000 / 50));
                    if (this.shutterHeight >= this.maxRes) {
                        this.shutterHeight = 0;
                        this.hourglassColor = '#' + Math.random().toString(16).slice(2, 8);
                    }
                }, 50);
                break;
            case 'romantic':
                this.setNewTarget();
                this.timer = setInterval(() => {
                    const f = (c, t) => c < t ? c + 1 : (c > t ? c - 1 : c);
                    this.currR = f(this.currR, this.targetR);
                    this.currG = f(this.currG, this.targetG);
                    this.currB = f(this.currB, this.targetB);
                    this.bgColor = `rgb(${this.currR},${this.currG},${this.currB})`;
                    if (this.currR === this.targetR && this.currG === this.targetG &&
                        this.currB === this.targetB) {
                        this.setNewTarget();
                    }
                }, 50);
                break;
            case 'v16':
                let vS = 0;
                this.timer = setInterval(() => {
                    this.bgColor = [1, 0, 1, 0, 1, 0, 0, 0][vS++ % 8] ? '#ffaa00' : '#000000';
                }, 100);
                break;
            case 'sos':
                this.startMorseSOS(false);
                break;
            case 'rescue':
                let rS = 0;
                this.timer = setInterval(() => {
                    this.bgColor = [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0][rS++ % 16] ? '#ffffff' : '#000000';
                }, 150);
                break;
            case 'sos_colors':
                this.startMorseSOS(true);
                break;
            case 'strobo':
                this.timer = setInterval(() => {
                    this.bgColor = this.bgColor === '#ffffff' ? '#000000' : '#ffffff';
                }, 60);
                break;
        }
    },
    deactivate() {
        clearInterval(this.timer);
        clearTimeout(this.autoOffTimer);
        clearInterval(this.counterInterval);
        this.timer = this.autoOffTimer = this.counterInterval = null;
        this.showLight = this.showHourglass =
            this.showTicker = this.showCounter = this.showDice = this.displayCoin = this.showVibration = false;
        brightness.setKeepScreenOn({ keepScreenOn: false });
        const list = this.$element('mainList');
        if (list) {
            list.scrollTo({ y: this.lastScrollY, smooth: false });
            list.focus();
        }
    },
    generateFullRandomColor() {
        const f = () => Math.floor(Math.random() * 256);
        return `rgb(${f()},${f()},${f()})`;
    },
    startMorseSOS(useColors) {
        const p = [1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0];
        let s = 0, last = 0, col = useColors ? this.generateFullRandomColor() : '#fff';
        this.showLight = true;
        if (this.timer) {
            clearInterval(this.timer);
        }
        this.timer = setInterval(() => {
            let cur = p[s++ % p.length];
            if (cur && !last && useColors) {
                col = this.generateFullRandomColor();
            }
            this.bgColor = cur ? col : '#000';
            last = cur;
        }, 200);
    },
    handleDiceClick() {
        if (!this.isRolling) {
            this.activate('dice');
        }
    },
    handleCoinClick() {
        if (!this.isRolling) {
            this.activate('coin');
        }
    },
    setNewTarget() {
        this.targetR = Math.floor(Math.random() * 256);
        this.targetG = Math.floor(Math.random() * 256);
        this.targetB = Math.floor(Math.random() * 256);
    },
    handleSwipe(e) {
        if (e.direction === 'right') {
            if (this.showLight || this.showHourglass || this.showTicker) {
                this.deactivate();
            } else {
                app.terminate();
            }
        }
    },
    onDestroy() {
        this.deactivate();
    },
    onShow() {
        setTimeout(() => {
            const el = this.$element('mainList');
            if (el) {
                el.focus();
            }
        }, 500);
    },
    handleCrownRotation(e) {
        const isActive =
            this.showLight || this.showHourglass || this.showCounter || this.showDice || this.displayCoin ||
            this.showVibration;
        const rotationValue = e.rotation || e.rotate || 0;
        if (rotationValue !== 0) {
            if (!isActive) {
                this.$element('mainList')?.scrollBy({
                    dx: 0,
                    dy: rotationValue > 0 ? 120 : -120,
                    smooth: true
                });
            } else {
                this.currentBrightness =
                    Math.min(Math.max(this.currentBrightness + (rotationValue > 0 ? 20 : -20), 20), 255);
                brightness.setValue({ value: this.currentBrightness });
            }
        }
    },
}