<script>

</script>
<style lang="scss">
    $side: 250px;
    .pomodoro{
        width: $side;
        height: $side;
        border-radius: 150px;
        background-color: crimson;
        box-shadow: 3px 3px 18px -6px rgba(0,0,0,0.75);
        display: flex;
        align-items: center;
        justify-content: center;
        .clock{
            text-align: center;
            font-size: 40pt;
            font-weight: bold;
            color: white;
        }
    }
    
</style>

<div class="pomodoro">
    <div class="clock">
        <span >25</span>:<span>00</span>
    </div>
</div>