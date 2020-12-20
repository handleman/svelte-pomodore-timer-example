<script>
import { onDestroy } from 'svelte';
    import {interval, rest, timer, countDown} from '../helpers/stores.js'

    import {COUNTDOWN_STATE} from '../enums/countDownState';
    
    const DELAY = 60;
    let minutes = $countDown.minutes;
    let seconds = $countDown.seconds;

    let countDownState = $countDown.state;

    $: active = interpolateTimerToCountdownState($timer) === COUNTDOWN_STATE.ACTIVE   || interpolateTimerToCountdownState($timer) === COUNTDOWN_STATE.RESET;
    $: paused= interpolateTimerToCountdownState($timer) === COUNTDOWN_STATE.PAUSED

    const interpolateTimerToCountdownState = (timer) =>{
        if (timer.active && !timer.paused){
            return COUNTDOWN_STATE.ACTIVE;
        }
        if (timer.active && timer.paused){
            return COUNTDOWN_STATE.PAUSED;
        }
        if (!timer.active && !timer.paused){
            return COUNTDOWN_STATE.RESET;
        }
    };

    const startCountdown = ()=>{
        console.log('start timer');
    };
    const stopCountdown = ()=>{
        console.log('stop timer');
    };
     const resetCountdown = ()=>{
        console.log('reset countdown');
        countDown.update(oldState=>{
            const state = oldState;
            state.minutes = $interval;
            state.seconds = 0;
            state.state = COUNTDOWN_STATE.RESET;
            return state;
        });
    };

    /**
     * watching for timer state and laucnhing appropriate actions
     */
    const timerUnSubscribe = timer.subscribe(value=>{
        const derivedConuntDownState = interpolateTimerToCountdownState(value);
        console.log(`derived state : ${ derivedConuntDownState }`);
        console.log(`current state : ${ countDownState }`);
        
        if (derivedConuntDownState !== countDownState){
            countDownState = derivedConuntDownState
            switch(countDownState){
                case COUNTDOWN_STATE.ACTIVE:
                    startCountdown();
                    break;
                case COUNTDOWN_STATE.PAUSED:
                    stopCountdown();
                    break;
                case COUNTDOWN_STATE.RESET:
                    resetCountdown();
                    break;
                default:
                    console.log('state wasnt changed');
            }
            
        }
        
    });
    /**
     * watching for timer interval and rest length and resetting coundown on change.
     */
    const intervalUnSubscribe = interval.subscribe(value =>{
        console.log('interval', value);
        if( countDownState !== COUNTDOWN_STATE.REST && minutes !== value){
            resetCountdown();
        }
    })
    const restUnSubscribe = rest.subscribe(value =>{
        console.log('rest', value);
        if( countDownState === COUNTDOWN_STATE.REST && minutes !== value){
            resetCountdown();
        }
    })

    /**
     * cleaning memory on component unmount
     * it is general svelte component lifecycle hook
     * https://svelte.dev/docs#onDestroy
    */
    onDestroy(()=>{
        timerUnSubscribe();
        intervalUnSubscribe();
        restUnSubscribe();
    });

</script>
<style lang="scss">
    @import '../styles/colors.scss';

    $side: 250px;
    
    .pomodoro{
        width: $side;
        height: $side;
        border-radius: 100%;
        
        box-shadow: 3px 3px 18px -6px rgba(0,0,0,0.75);
        display: flex;
        align-items: center;
        justify-content: center;
        &.active{
            background-color: $accentColor;
        }
        &.paused {
            background-color: $averageColor;
            color: #333;
        }
        .clock{
            text-align: center;
            font-size: 40pt;
            font-weight: bold;
            color: white;
        }
    }
    
</style>

<div class="pomodoro" class:active class:paused >
    <div class="clock">
        <span >{minutes}</span>:<span>{seconds}</span>
    </div>
</div>