<script>
    import {interval, rest, timer} from '../helpers/stores.js'
    
    $: active = ($timer.active && !$timer.paused)  || (!$timer.active && !$timer.paused);
    $: paused= $timer.active && $timer.paused
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
        <span >{$interval}</span>:<span>{$rest}</span>
    </div>
</div>