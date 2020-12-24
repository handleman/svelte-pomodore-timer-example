<script>
	import {interval, rest, timer} from '../helpers/stores.js' 
	import Pomodoro from '../components/Pomodoro.svelte'
	import Button from '../components/Button.svelte'
	import TimerControlsPanel from '../components/TimerControlsPanel.svelte'

	$: isTimerReadyForUse= !$timer.active && !$timer.paused
	$: isTimerInUse = $timer.active && !$timer.paused
	$: isTimerOnPause= $timer.active && $timer.paused

	const handleStartTimer = event => {
		timer.set({
            active:true,
            paused:false
        });
		
	}

	const handlePauseHandler = event => {
		timer.set({
            active:true,
            paused:true
        });

	}
	const handleResetHandler = event => {
		timer.set({
            active:false,
            paused:false
        });
	}

</script>

<style>
	.timer-panel{
		display: flex;
		flex-direction: column;
		align-items: center;
	}	
</style>

<svelte:head>
	<title>Sapper Pomodoro timer example</title>
</svelte:head>

<div class="timer-panel">
	<Pomodoro/>
	<TimerControlsPanel >
		{#if isTimerReadyForUse || isTimerOnPause}
			<Button on:click={handleStartTimer} primary >Run</Button>
		{/if}

		{#if isTimerInUse}
			<Button on:click={handlePauseHandler}>Pause</Button>
		{/if}

		{#if isTimerOnPause}
			<Button on:click={handleResetHandler} accent>Reset</Button>
		{/if}

	</TimerControlsPanel>

</div>