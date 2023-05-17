<template>
    <div class="registration-area">
        <div class="registration-container">
            <h3 class="steps-info">Etapa <span class="steps-info__current-step">{{ currentStep }}</span> de 4</h3>
            <div class="step" v-if="currentStep === 1">
                <h1 class="step-title">Seja bem vindo(a)</h1>
                <div class="form-container">
                    <RegistrationInput label="Endereço de e-mail" ref="email" v-model="formValues.email" type="email" />
                    <RegistrationRadio
                        :config="{ options: [{ label: 'Pessoa Física', value: 'pf' }, { label: 'Pessoa Jurídica', value: 'pj' }] }"
                        name="radio1" 
                        v-model="formValues.personType"
                        ref="personType" />
                    <RegistrationButton title="Continuar" :isFilled="true" @click="nextStep" />
                </div>
            </div>

            <div class="step" v-if="currentStep === 2 && formValues.personType === 'pf'">
                <h1 class="step-title">Pessoa Física</h1>
                <div class="form-container">
                    <RegistrationInput label="Nome" ref="name" v-model="formValues.name"/>
                    <RegistrationInput label="CPF" mask="cpf" ref="cpf" v-model="formValues.cpf"/>
                    <RegistrationInput label="Data de nascimento" mask="birth" ref="birth" v-model="formValues.birth"/>
                    <RegistrationInput label="Telefone" mask="tel" ref="tel" v-model="formValues.tel"/>

                    <div class="button-group">
                        <RegistrationButton title="Voltar" @click="prevStep" />
                        <RegistrationButton title="Continuar" :isFilled="true" @click="nextStep" />
                    </div>
                </div>
            </div>

            <div class="step" v-if="currentStep === 2 && formValues.personType === 'pj'">
                <h1 class="step-title">Pessoa Jurídica</h1>
                <div class="form-container">
                    <RegistrationInput label="Razão social" ref="corporateName" v-model="formValues.corporateName"/>
                    <RegistrationInput label="CNPJ" mask="cnpj" ref="cnpj" v-model="formValues.cnpj"/>
                    <RegistrationInput label="Data de abertura" mask="birth" ref="openingDate" v-model="formValues.openingDate"/>
                    <RegistrationInput label="Telefone" mask="tel" ref="corporateTel" v-model="formValues.tel"/>

                    <div class="button-group">
                        <RegistrationButton title="Voltar" @click="prevStep" />
                        <RegistrationButton title="Continuar" :isFilled="true" @click="nextStep" />
                    </div>
                </div>
            </div>

            <div class="step" v-if="currentStep === 3">
                <h1 class="step-title">Senha de acesso</h1>
                <div class="form-container">
                    <RegistrationInput label="Sua senha" ref="password" v-model="formValues.password" type="password"/>

                    <div class="button-group">
                        <RegistrationButton title="Voltar" @click="prevStep" />
                        <RegistrationButton title="Continuar" :isFilled="true" @click="nextStep" />
                    </div>
                </div>
            </div>

            <div class="step" v-if="currentStep === 4">
                <h1 class="step-title smaller">Revise suas informações</h1>
                <div class="form-container">
                    <RegistrationInput label="Endereço de e-mail" ref="emailReview" v-model="formValues.email" type="email"/>
                    <RegistrationInput label="Nome" ref="nameReview" v-model="formValues.name" v-if="formValues.personType === 'pf'" />
                    <RegistrationInput label="CPF" mask="cpf" ref="cpfReview" v-model="formValues.cpf" v-if="formValues.personType === 'pf'" />
                    <RegistrationInput label="Data de nascimento" mask="birth" ref="birthReview" v-model="formValues.birth" v-if="formValues.personType === 'pf'" />
                    <RegistrationInput label="Razão social" ref="corporateNameReview" v-model="formValues.corporateName" v-if="formValues.personType === 'pj'" />
                    <RegistrationInput label="CNPJ" mask="cnpj" ref="cnpjReview" v-model="formValues.cnpj" v-if="formValues.personType === 'pj'" />
                    <RegistrationInput label="Data de abertura" mask="birth" ref="openingDateReview" v-model="formValues.openingDate" v-if="formValues.personType === 'pj'" />
                    <RegistrationInput label="Telefone" mask="tel" ref="telReview" v-model="formValues.tel"/>
                    <RegistrationInput label="Senha" ref="passwordReview" v-model="formValues.password" type="password"/>


                    <div class="button-group">
                        <RegistrationButton title="Voltar" @click="prevStep" />
                        <RegistrationButton title="Cadastrar" @click="register" :isFilled="true" />
                    </div>
                </div>
            </div>


        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import RegistrationInput from './FormComponents/RegistrationInput.vue';
import RegistrationRadio from './FormComponents/RegistrationRadio.vue';
import RegistrationButton from './FormComponents/RegistrationButton.vue';
import axios from 'axios';

export default defineComponent({
    components: {
        RegistrationInput,
        RegistrationRadio,
        RegistrationButton
    },

    data() {
        return {
            currentStep: 1,
            personType: '',
            formValues: {
                email: '',
                personType: '',
                name: '',
                cpf: '',
                birth: '',
                tel: '',
                corporateName: '',
                cnpj: '',
                openingDate: '',
                password: '',
            },
        }
    },

    methods: {
        nextStep() {
            if (this.validateEmptyFields()) {
                this.currentStep++;
            }
        },

        prevStep() {
            this.currentStep--;
        },

        register() {
            if (this.validateEmptyFields()) {
                const endPoint = window.location.href;
                axios.post(endPoint, this.formValues).then((response) => {
                    console.log(response);
                    alert('Usuário salvo com sucesso :)');
                    document.location.reload();
                }).catch((error) => {
                    alert('Erro ao salvar usuário :()');
                    console.log(error);
                });
            }
        },

        // retorna false, caso tenha algum campo vazio
        validateEmptyFields() {
            let hasEmpty = false;
            Object.values(this.$refs).forEach(ref => {
                if (ref && !ref.validateEmpty()) {
                    hasEmpty = true;
                }
            });
            return !hasEmpty;
        },
    },
});
</script>

<style lang="scss" scoped>
.registration-area {
    display: flex;
    justify-content: center;
}

.registration-container {
    display: flex;
    flex-direction: column;
    max-width: 330px;
    width: 100%;
    padding: 35px;
}

h1.step-title {
    color: var(--gray-1);
    font-weight: 800;
    margin-bottom: 30px;
}

h1.step-title.smaller {
    font-size: 26px;
}

.steps-info {
    color: var(--gray-1);
    font-weight: 500;
    margin-bottom: 6px;

    &__current-step {
        color: var(--primary-color);
    }
}

.form-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.button-group {
    display: flex;
    gap: 20px;

    * {
        flex-grow: 1;
    }
}
</style>