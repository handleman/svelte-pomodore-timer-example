<script>

export let primary = false
export let accent = false

</script>
<style lang="scss">
    @import '../styles/colors.scss';
    button {
        display: block;
        border: 2px solid $averageColor;
        background-color: white;
        color: $averageColor;
        font-size: 1em;
        font-weight: bold;
        padding: .5em 1em;
        border-radius: 10px;
        transition: border-color .3s, color .3s, background-color .3s;
        box-shadow: 0 1px 3px rgba(0, 0, 0, .4);
        cursor: pointer;
        &:hover{
            border-color: lighten($averageColor, 10%);
            color: lighten($averageColor, 10%);

        }
        &:active{
            border-color: lighten($averageColor, 5%);
            color: lighten($averageColor, 5%);
            box-shadow: 0 1px 3px rgba(0, 0, 0, .2);

        }
        &.primary{
            background-color: $primaryColor;
            border-color: $primaryColor;
            color: white;
            &:hover{
                background-color: lighten($primaryColor, 10%);
                border-color: lighten($primaryColor, 10%);
            }
            &:active{
                background-color: lighten($primaryColor, 5%);
                border-color: lighten($primaryColor, 5%);
            }
        }
        &.accent{
            background-color: $accentColor;
            border-color: $accentColor;
            color: white;
            &:hover{
                background-color: lighten($accentColor, 10%);
                border-color: lighten($accentColor, 10%);
            }
            &:active{
                background-color: lighten($accentColor, 5%);
                border-color: lighten($accentColor, 5%);
            }
        }
    }
</style>

<button type="button"  class:primary class:accent on:click>
    <slot></slot>
</button>