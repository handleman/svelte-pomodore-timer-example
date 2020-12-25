<script>
import { onDestroy } from 'svelte';
    import {interval, rest, timer, countDown} from '../helpers/stores.js'

    import {COUNTDOWN_STATE} from '../enums/countDownState';
    
    const DELAY = 60;
    const TICK = 1000;

    let tickInterval = null;

    // computed props
    $: active = interpolateTimerToCountdownState($timer) === COUNTDOWN_STATE.ACTIVE 
    $: ready = interpolateTimerToCountdownState($timer) === COUNTDOWN_STATE.RESET;
    $: paused = interpolateTimerToCountdownState($timer) === COUNTDOWN_STATE.PAUSED;
    $: resting = $countDown.restMode && !(interpolateTimerToCountdownState($timer) === COUNTDOWN_STATE.PAUSED);

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
            const isSecoundsOut = ($countDown.seconds === 0);
            const isIntervalOut = ($countDown.minutes === 0 && $countDown.seconds === 1)
            if(isSecoundsOut){
                $countDown.seconds = DELAY-1;
                $countDown.minutes = $countDown.minutes-1;
                return;
            }
            if(isIntervalOut){
                toggleCountdown();
                return;
            }
            $countDown.seconds = $countDown.seconds-1;
        }
        tickInterval = setInterval(tickCallback, TICK)
    };
    const stopCountdown = ()=>{
        console.log('stop timer');
        console.log('tickInterval', tickInterval);
        
        clearInterval(tickInterval);

    };
    const toggleCountdown = ()=>{
        console.log('toggleCountdown');
        console.log('toggleCountdown');
        if(! $countDown.restMode){
            countDown.update((oldState)=>{

                return {
                    ...oldState,
                    minutes: $rest,
                    seconds:0,
                    restMode:true
                }

            })
            alert('You need to get some rest')

        }else{
            countDown.update((oldState)=>{

                return {
                    ...oldState,
                    minutes: $interval,
                    seconds:0,
                    restMode:false
                }

            })
            alert("You should back to the work")
        }

    };
    const resetCountdown = ()=>{
        console.log('reset countdown');
        countDown.update(oldState=>{
            return {
                ...oldState,
                minutes: $interval,
                seconds: 0,
                state: COUNTDOWN_STATE.RESET,
                restMode:false
            };
        });
        
        if(tickInterval){
            clearInterval(tickInterval);
        }
    };
    const resetTimer = () =>{
        timer.set({
            active:false,
            paused:false
        });
    }

    /**
     * watching for timer state and laucnhing appropriate actions
     */
    const timerUnSubscribe = timer.subscribe(value=>{
        const derivedState = interpolateTimerToCountdownState(value);
        const shouldSkip = (derivedState !== COUNTDOWN_STATE.ACTIVE && derivedState === $countDown.state) 
        console.log(`derived state : ${ derivedState}`);
        console.log(`current state : ${ $countDown.state }`);

        if(shouldSkip){
            return;
        }
        $countDown.state = derivedState
        switch(derivedState){
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
            resetTimer();
        }
    })
    const restUnSubscribe = rest.subscribe(value =>{
        console.log('rest', value);
        if( $countDown.rest !== value){
            $countDown.rest = value;
            resetCountdown();
            resetTimer();
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
        &.resting{
            background-color: $primaryColor;
        }
        .clock{
            text-align: center;
            font-size: 40pt;
            font-weight: bold;
            color: white;
        }
    }
    
</style>

<div class="pomodoro" class:active class:paused class:ready class:resting>
    <div class="clock">
        <span >{ $countDown.minutes}</span>:<span>{ $countDown.seconds}</span>
    </div>
</div>