<script>
	import Pomodoro from '../components/Pomodoro.svelte'
	import Button from '../components/Button.svelte'
	import TimerControlsPanel from '../components/TimerControlsPanel.svelte'

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
	<TimerControlsPanel>
		<Button primary>Start</Button>
		<Button >Pause</Button>
		<Button accent>Reset</Button>
	</TimerControlsPanel>

</div>