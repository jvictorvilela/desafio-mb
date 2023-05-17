<template>
    <div class="registration-input" :class="{ empty: emptyFlag }">
        <label>
            <span v-if="label">{{ label }}<span v-if="emptyFlag" class="empty-alert">Campo obrigatório!</span></span>
            <input :value="modelValue" @input="onInput" :type="type" v-bind="$attrs" v-maska :data-maska="getMaskFilter()">
        </label>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import { vMaska } from "maska"

export default defineComponent({
    props: {
        label: String,
        type: String,
        mask: String,
        modelValue: String,
    },
    directives: {
        maska: vMaska,
    },
    emits: ['update:modelValue'],
    data() {
        return {
            isEmptyValidated: false,
        }
    },
    methods: {
        onInput(event) {
            this.$emit('update:modelValue', event.target.value);
        },

        validateEmpty() {
            this.isEmptyValidated = true;
            return !!this.modelValue;
        },

        getMaskFilter() {
            switch (this.mask) {
                case 'tel':
                    return '(##) #####-####';
                case 'cpf':
                    return '###.###.###-##';
                case 'cnpj':
                    return '##.###.###/####-##';
                case 'birth':
                    return '##/##/####';
            }
        }
    },
    computed: {
        emptyFlag() {
            return this.isEmptyValidated && !this.modelValue;
        }
    }
});
</script>

<style lang="scss" scoped>
.registration-input {
    label {
        display: flex;
        flex-direction: column;

        span {
            margin-bottom: 8px;
            color: var(--gray-1);
        }
    }

    input {
        border-radius: 5px;
        border: 1px solid var(--gray-1);
        outline: none;
        padding: 10px;
        transition: all 0.15s;

        &:focus {
            border-color: var(--primary-color);
        }
    }

    &.empty {
        input {
            border-color: red!important;
            box-shadow: 0 0 0 1px red;
        }

        label {
            span {
                color: red;
            }

            span.empty-alert {
                color: red;
                background-color: #ff000030;
                border-radius: 5px;
                font-size: 10px;
                font-weight: 600;
                margin-left: 6px;
                padding: 2px 6px;
            }
        }
    }
}
</style>