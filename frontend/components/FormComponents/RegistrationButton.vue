<template>
    <button class="registration-button" :class="{ filled: isFilled }">{{ title }}</button>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        title: String,
        isFilled: Boolean,
    }
});
</script>

<style lang="scss" scoped>
.registration-button {
    padding: 10px 30px;
    background-color: #fff;
    border: 1px solid var(--primary-color);
    border-radius: 5px;
    color: var(--primary-color);
    transition: all 0.1s;
    cursor: pointer;

    &:hover {
        background-color: var(--primary-color);
        color: #fff;
    }

    &:active {
        background-color: var(--primary-color-darker);
        color: #fff;
    }

    &.filled {
        background-color: var(--primary-color);
        color: #fff;

        &:hover {
            background-color: var(--primary-color-darker);
        }

        &:active {
            background-color: var(--primary-color-darkest);
        }
    }
}
</style>