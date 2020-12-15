import { writable } from 'svelte/store';
export const interval = writable(25);
export const rest = writable(5);

const timerDefault = {
    active: false,
    paused: false
}

export const timer = writable(timerDefault);