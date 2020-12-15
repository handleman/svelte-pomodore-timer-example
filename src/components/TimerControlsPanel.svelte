<style lang="scss">
 .controls{
     display: flex;
     justify-content: sp;
     padding-top: 2em;


 }
 .controls :global(button){
    margin-right: 1em;
        &:last-child{
            margin-right: 0;
        }
 }
</style>

<div class=controls>
    <slot></slot>
</div>