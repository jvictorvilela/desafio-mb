<template>
    <div class="registration-radio" :class="{ empty: emptyFlag }">
        <span class="radio-title" v-if="label">{{ label }}</span>
        <span v-if="emptyFlag" class="empty-alert">Campo obrigatório!</span>
        <div class="registration-radio-container">
            <div v-for="option in config.options" class="option-container">
                <label>
                    <div class="radio-btn" :class="{ checked: isChecked(option.value) }"></div>
                    <input type="radio" :name="name ?? 'radio'" :value="option.value" @input="onRadio">
                    <span>{{ option.label }}</span>
                </label>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        label: String,
        config: Object,
        modelValue: String,
        name: String,
    },
    data() {
        return {
            checked: this.modelValue ?? '',
            isEmptyValidated: false,
        }
    },
    emits: ['update:modelValue'],
    methods: {
        onRadio(event) {
            const value = event.target.value;
            this.$emit('update:modelValue', value);
            this.checked = value;
        },

        isChecked(value) {
            return value == this.checked;
        },

        validateEmpty() {
            this.isEmptyValidated = true;
            return !!this.modelValue;
        }
    },
    computed: {
        emptyFlag() {
            return this.isEmptyValidated && !this.modelValue;
        }
    },
    mounted() {

    },
});
</script>

<style lang="scss" scoped>
.registration-radio {
    &.empty {
        label {
            span {
                color: red;
            }
        }
    }
}

.empty-alert {
    color: red;
    background-color: #ff000030;
    border-radius: 5px;
    font-size: 10px;
    font-weight: 600;
    padding: 2px 6px;
    margin-bottom: 5px;
    display: inline-block;
}

.registration-radio-container {
    display: flex;
    justify-content: space-around;
}

.radio-title {
    margin-bottom: 8px;
    color: var(--gray-1);
}

.option-container {
    display: flex;
}

label {
    display: flex;
    gap: 12px;
    position: relative;

    &:hover {
        .radio-btn {
            border-color: #585858;

            &::after {
                border-color: #585858;
            }
        }
    }
}

input {
    outline: none;
}

.radio-btn {
    display: flex;
    width: 16px;
    height: 16px;
    background-color: #fff;
    border: 1px solid var(--gray-1);
    border-radius: 100%;
    position: absolute;
    left: -1px;
    top: 50%;
    transform: translateY(-50%);

    &.checked {
        &::after {
            content: '';
            width: 9px;
            height: 9px;
            border-radius: 100%;
            border: 1px solid var(--gray-1);
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        }
    }
}
</style>