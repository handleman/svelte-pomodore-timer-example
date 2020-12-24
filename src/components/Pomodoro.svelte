<script>
import { onDestroy } from 'svelte';
    import {interval, rest, timer, countDown} from '../helpers/stores.js'

    import {COUNTDOWN_STATE} from '../enums/countDownState';
    
    const DELAY = 60;

    let tickInterval = null;

    $: active = interpolateTimerToCountdownState($timer) === COUNTDOWN_STATE.ACTIVE 
    $: ready = interpolateTimerToCountdownState($timer) === COUNTDOWN_STATE.RESET;
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
        const tickCallback = () =>{
            if($countDown.seconds === 0){
                $countDown.seconds = DELAY-1;
                $countDown.minutes = $countDown.minutes-1;
                return;
            }
            if($countDown.minutes === 0 && $countDown.seconds === 1){
                resetCountdown();
                return;
            }
            $countDown.seconds = $countDown.seconds-1;
        }
        tickInterval = setInterval(tickCallback,1000)
    };
    const stopCountdown = ()=>{
        console.log('stop timer');
        console.log('tickInterval', tickInterval);
        
        clearInterval(tickInterval);

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
        if(tickInterval){
            clearInterval(tickInterval);
        }
    };

    /**
     * watching for timer state and laucnhing appropriate actions
     */
    const timerUnSubscribe = timer.subscribe(value=>{
        console.log(`derived state : ${ interpolateTimerToCountdownState(value) }`);
        console.log(`current state : ${ $countDown.state }`);
        
        $countDown.state = interpolateTimerToCountdownState(value);
        switch($countDown.state){
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
    });
    /**
     * watching for timer interval and rest length and resetting coundown on change.
     */
    const intervalUnSubscribe = interval.subscribe(value =>{
        console.log('interval', value);
        if( $countDown.interval !== value){
            $countDown.interval = value;
            resetCountdown();
        }
    })
    const restUnSubscribe = rest.subscribe(value =>{
        console.log('rest', value);
        if( $countDown.rest !== value){
            $countDown.rest = value;
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
        stopCountdown();
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
        &.ready{
            background-color: lighten($accentColor, 10%);
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

<div class="pomodoro" class:active class:paused class:ready>
    <div class="clock">
        <span >{ $countDown.minutes}</span>:<span>{ $countDown.seconds}</span>
    </div>
</div>