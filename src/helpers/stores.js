import { writable } from 'svelte/store';
import { COUNTDOWN_STATE } from '../enums/countDownState';

const INTERVAL = 25;
const REST = 5;
export const interval = writable(INTERVAL);
export const rest = writable(REST);

const timerDefault = {
    active: false,
    paused: false
}

const countDownDefault = {
    state: COUNTDOWN_STATE.RESET,
    minutes: INTERVAL,
    seconds: 0,
    interval:INTERVAL,
    rest:REST,
    restMode: false
}

export const timer = writable(timerDefault);
export const countDown = writable(countDownDefault);