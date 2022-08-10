<template>
  <ValidationObserver ref="form">
    <form @submit.prevent="saveForm">
      <h4 class="title">Informações pessoais</h4>
      <div class="flex flex-col">
        <div class="w-full mb-4">
          <div class="flex flex-col">
            <label>Nome Completo*</label>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              mode="passive"
            >
              <input
                v-model="user.name"
                placeholder="Nome e Sobrenome"
                type="text"
                :class="errors.length > 0 ? 'has-error' : ''"
                class="w-full focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
              <span v-if="errors.length > 0" class="has-error">
                Insira seu nome e sobrenome
              </span>
            </ValidationProvider>
          </div>
        </div>
        <div class="flex space-x-4 mb-4">
          <div class="w-3/12">
            <div class="flex flex-col">
              <label class="m-0" for="birthdate">Data de Nascimento*</label>
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                mode="passive"
              >
                <input
                  v-model="user.birthdate"
                  type="date"
                  name="birthdate"
                  :max="minDate"
                  :class="errors.length > 0 ? 'has-error' : ''"
                  class="w-full focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
                <span v-if="errors.length > 0" class="has-error">
                  Data de nascimento inválida, a data informada deve ser maior
                  de 18 anos
                </span>
              </ValidationProvider>
            </div>
          </div>
          <div class="w-5/12">
            <CustomInput
              v-model="user.nationality"
              label="Nacionalidade"
              type="text"
              class="w-full"
            />
          </div>
          <div class="w-4/12">
            <CustomInput
              v-model="user.birthplace"
              label="Naturalidade"
              type="text"
              class="w-full"
            />
          </div>
        </div>
        <div class="flex space-x-4 mb-4">
          <div class="md:w-1/2 w-3/12">
            <CustomInput
              v-model="user.rg"
              v-mask="rgMask"
              label="RG*"
              type="text"
              placeholder="000000000"
              :class="documentError ? 'has-error-document' : ''"
              class="w-full"
              :rules="checkDocumentRules ? 'required' : ''"
            />
          </div>
          <div class="md:w-1/2 w-3/12">
            <CustomInput
              v-model="user.cpf"
              v-mask="['###.###.###-##']"
              label="CPF*"
              type="text"
              placeholder="00000000000"
              class="w-full"
              :class="documentError ? 'has-error-document' : ''"
              :rules="'cpf'"
              :has-message="true"
            />
          </div>
          <div class="w-3/12">
            <CustomInput
              v-model="user.otherDocumentType"
              name="otherDocumentType"
              label="Outro documento"
              type="text"
              class="w-full"
              :rules="
                user.otherDocumentNumber || checkDocumentRules ? 'required' : ''
              "
            />
          </div>
          <div class="w-3/12">
            <CustomInput
              v-model="user.otherDocumentNumber"
              name="otherDocumentNumber"
              label="Nº documento"
              type="text"
              class="w-full"
              :rules="
                user.otherDocumentType || checkDocumentRules ? 'required' : ''
              "
            />
          </div>
        </div>
        <div v-if="documentError" class="flex space-x-4 mb-6 justify-center">
          <p class="has-error-document w-full text-center">
            Insira um documento válido
          </p>
        </div>
        <div class="flex space-x-4 mb-4">
          <div class="w-5/12">
            <div class="flex flex-col">
              <label>Gênero</label>
              <ValidationProvider v-slot="{ errors }" mode="passive">
                <v-select
                  :clearable="false"
                  placeholder="Selecione"
                  label="title"
                  :options="options.gender"
                  :class="errors.length > 0 ? 'has-error' : ''"
                  :value="user.gender"
                  @input="setGender"
                />
              </ValidationProvider>
            </div>
          </div>
          <div class="w-4/12">
            <div class="flex flex-col">
              <label>Estado civil</label>
              <ValidationProvider v-slot="{ errors }" mode="passive">
                <v-select
                  :value="user.maritialStatus"
                  :clearable="false"
                  placeholder="Selecione"
                  :class="errors.length > 0 ? 'has-error' : ''"
                  class="focus:outline-none focus:ring-1 focus:ring-blue-600"
                  :options="options.maritialStatus"
                  @input="setMaitialStatus"
                />
              </ValidationProvider>
            </div>
          </div>
          <div class="w-2/12">
            <div class="flex flex-col">
              <label>Tem filhos?</label>
              <ValidationProvider v-slot="{ errors }" mode="passive">
                <v-select
                  placeholder="Selecione"
                  :clearable="false"
                  label="title"
                  :class="errors.length > 0 ? 'has-error' : ''"
                  class="focus:outline-none focus:ring-1 focus:ring-blue-600"
                  :options="options.haveChildren"
                  @input="setHasChildren"
                />
              </ValidationProvider>
            </div>
          </div>
          <div class="w-1/12">
            <div v-if="disabledHasChildren" class="flex flex-col">
              <label>Quantos?</label>
              <p class="px-2 py-5">0</p>
            </div>
            <CustomInput
              v-else
              v-model="user.childrenAmount"
              v-mask="['##']"
              name="number_children"
              label="Quantos?"
              type="number"
              placeholder="0"
              class="w-full"
            />
          </div>
        </div>
        <div class="flex space-x-4 mb-4">
          <div class="w-4/12">
            <CustomInput
              v-model="user.phones.home"
              v-mask="['+## (##) ####-####']"
              name="phone"
              label="Telefone Residencial"
              type="text"
              placeholder="+55 (00) 0000-0000"
              class="w-full"
              rules="min:8"
            />
          </div>
          <div class="w-4/12">
            <CustomInput
              v-model="user.phones.business"
              v-mask="['+## (##) ####-####?#']"
              name="phone_comercial"
              label="Telefone Comercial"
              type="text"
              placeholder="+55 (00) 0000-0000"
              class="w-full"
              rules="min:8"
            />
          </div>
          <div class="w-4/12">
            <CustomInput
              v-model="user.phones.cell"
              v-mask="['+## (##) #####-####']"
              name="mobile_phone"
              label="Celular"
              type="text"
              placeholder="+55 (00) 00000-0000"
              class="w-full"
              rules="min:9"
            />
          </div>
        </div>
        <div class="flex space-x-4 mb-4">
          <div class="w-6/12">
            <label>E-mail</label>
            <ValidationProvider
              v-slot="{ errors }"
              rules="email"
              mode="passive"
              name="Email"
              vid="email"
            >
              <input
                v-model="user.emails.first"
                name="email"
                placeholder="email@email.com"
                type="email"
                class="w-full focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
              {{ errors[0] }}
            </ValidationProvider>
          </div>
          <div class="w-6/12">
            <label>Confirme seu e-mail</label>
            <ValidationProvider
              v-slot="{ errors }"
              rules="confirmed:email"
              mode="passive"
              name="Email Confirmation"
            >
              <input
                v-model="user.emails.first_confirmation"
                name="email_confirmation"
                placeholder="email@email.com"
                type="email"
                :class="{ 'has-error': errors.length > 0 }"
                class="w-full focus:outline-none focus:ring-1 focus:ring-blue-600"
                data-vv-as="emailOne"
              />
              <span v-if="errors.length > 0" class="has-error">
                E-mails não coincidem
              </span>
            </ValidationProvider>
          </div>
        </div>

        <div class="flex space-x-4 mb-4">
          <div class="w-6/12">
            <label>E-mail secundário</label>
            <ValidationProvider
              v-slot="{ errors }"
              rules="email"
              mode="passive"
              name="EmailTwo"
              vid="emailTwo"
            >
              <input
                v-model="user.emails.second"
                name="email"
                placeholder="email@email.com"
                type="email"
                class="w-full focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
              {{ errors[0] }}
            </ValidationProvider>
          </div>
          <div class="w-6/12">
            <label>Confirme seu e-mail secundário</label>
            <ValidationProvider
              v-slot="{ errors }"
              rules="confirmed:emailTwo"
              mode="passive"
              name="EmailTwo Confirmation"
            >
              <input
                v-model="user.emails.second_confirmation"
                name="emailTwo_confirmation"
                placeholder="email@email.com"
                type="email"
                :class="{ 'has-error': errors.length > 0 }"
                class="w-full focus:outline-none focus:ring-1 focus:ring-blue-600"
                data-vv-as="emailTwo"
              />
              <span v-if="errors.length > 0" class="has-error">
                E-mails secundário não coincidem
              </span>
            </ValidationProvider>
          </div>
        </div>
      </div>

      <!-- ENDEREÇOS SECTION -->
      <h4 class="title mt-5">Endereços</h4>
      <div
        v-for="(addressInfo, index) in user.addressInfo"
        :key="index"
        class="flex flex-col"
      >
        <hr v-if="index > 0" class="mb-3" />

        <div class="w-full mb-4">
          <div class="flex flex-col">
            <label>Tipo de Endereço</label>
            <ValidationProvider v-slot="{ errors }" mode="passive">
              <v-select
                :key="index"
                v-model="addressInfo.type"
                placeholder="Selecione"
                :clearable="false"
                :class="errors.length > 0 ? 'has-error' : ''"
                class="focus:outline-none focus:ring-1 focus:ring-blue-600"
                :options="options.addressType"
              />
            </ValidationProvider>
          </div>
        </div>
        <div class="flex space-x-4 mb-4">
          <div class="w-6/12">
            <CustomInput
              :id="index"
              :key="index"
              v-model="addressInfo.cep"
              v-mask="['#####-###']"
              name="zipcode"
              label="CEP"
              type="text"
              placeholder="00000000"
              class="w-full"
              @keyup.native="searchCep"
            />
          </div>
          <div class="w-6/12">
            <CustomInput
              :key="index"
              v-model="addressInfo.country"
              name="country"
              label="País"
              type="text"
              class="w-full"
            />
          </div>
        </div>
        <div class="flex space-x-4 mb-4">
          <div class="w-6/12">
            <CustomInput
              :key="index"
              v-model="addressInfo.city"
              name="city"
              label="Cidade"
              type="text"
              class="w-full"
            />
          </div>
          <div class="w-6/12">
            <div class="flex flex-col">
              <CustomInput
                v-model="addressInfo.state"
                name="state"
                label="Estado"
                type="text"
                class="w-full"
              />
            </div>
          </div>
        </div>
        <div class="flex space-x-4 mb-4">
          <div class="w-10/12">
            <CustomInput
              :key="index"
              v-model="addressInfo.address"
              name="address"
              label="Logradouro"
              type="text"
              class="w-full"
            />
          </div>
          <div class="w-2/12">
            <CustomInput
              :key="index"
              v-model="addressInfo.number"
              v-mask="['#########']"
              name="number"
              label="Número"
              type="text"
              class="w-full"
            />
          </div>
        </div>
        <div class="flex space-x-4 mb-4">
          <div class="w-6/12">
            <CustomInput
              :key="index"
              v-model="addressInfo.district"
              name="district"
              label="Bairro"
              type="text"
              class="w-full"
            />
          </div>
          <div class="w-6/12">
            <CustomInput
              :key="index"
              v-model="addressInfo.addressComplement"
              name="addressComplement"
              label="Complementares"
              type="text"
              class="w-full"
            />
          </div>
        </div>

        <div class="flex">
          <button
            v-if="index > 0"
            type="button"
            class="flex text-primary-regular items-center space-x-8"
            @click="removeAddress(index)"
          >
            <svg
              class="mr-2"
              width="10"
              height="12"
              viewBox="0 0 10 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7 0.666667H9.33333V2H0V0.666667H2.33333L3 0H6.33333L7 0.666667ZM2 12C1.26667 12 0.666667 11.4 0.666667 10.6667V2.66667H8.66667V10.6667C8.66667 11.4 8.06667 12 7.33333 12H2Z"
                fill="#BE123C"
              />
            </svg>
            remover endereço
          </button>
        </div>
      </div>

      <div class="flex justify-end w-full">
        <OutlineButton
          type="button"
          label="Adicionar outro endereço"
          @click.native="addAddress"
        />
      </div>

      <!-- FORMACAO SECTION -->
      <h4 class="title mt-5">Formação acadêmica e complementar</h4>
      <div class="flex flex-col">
        <div class="w-full mb-4">
          <div class="flex flex-col">
            <label>Nível de Escolaridade</label>
            <v-select
              v-model="user.academicInfo.educationLevel"
              :clearable="false"
              placeholder="Selecione"
              label="title"
              class="focus:outline-none focus:ring-1 focus:ring-blue-600"
              :options="options.graduationLevel"
            />
          </div>
        </div>
        <div class="w-full mb-4">
          <CustomInput
            v-model="user.academicInfo.mainGraduation"
            name="major_graduation"
            label="Graduação Principal"
            type="text"
            class="w-full"
          />
        </div>
        <div class="w-full mb-4">
          <CustomInput
            v-model="user.academicInfo.occupation"
            name="occupation"
            label="Profissão"
            type="text"
            class="w-full"
          />
        </div>
        <div class="w-full mb-4">
          <CustomInput
            v-model="user.academicInfo.anotherSkill"
            name="skills"
            label="Alguma habilidade específica?"
            type="text"
            class="w-full"
          />
        </div>
      </div>

      <h4 class="title mt-5">Idiomas</h4>
      <div v-for="(lang, index) in user.languagesInfo" :key="index + `lang`">
        <hr v-if="index > 0" class="mb-3" />

        <div class="flex space-x-4 mb-4">
          <div class="w-6/12">
            <CustomInput
              v-model="lang.language"
              name="language"
              label="Idioma"
              type="text"
              class="w-full"
            />
          </div>
          <div class="w-6/12">
            <div class="flex flex-col">
              <label class='mb-0'>Nível de Escolaridade</label>
              <v-select
                v-model="lang.level"
                :clearable="false"
                placeholder="Selecione"
                label="title"
                class="focus:outline-none focus:ring-1 focus:ring-blue-600"
                :options="['Básico', 'Intermediário', 'Avançado']"
              />
            </div>
          </div>
        </div>

        <div class="flex">
          <button
            v-if="index > 0"
            type="button"
            class="flex text-primary-regular items-center space-x-8"
            @click="removeLang(index)"
          >
            <svg
              class="mr-2"
              width="10"
              height="12"
              viewBox="0 0 10 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7 0.666667H9.33333V2H0V0.666667H2.33333L3 0H6.33333L7 0.666667ZM2 12C1.26667 12 0.666667 11.4 0.666667 10.6667V2.66667H8.66667V10.6667C8.66667 11.4 8.06667 12 7.33333 12H2Z"
                fill="#BE123C"
              />
            </svg>
            remover idioma
          </button>
        </div>
      </div>
      <div class="flex justify-end w-full">
        <OutlineButton
          type="button"
          label="Adicionar outro idioma"
          @click.native="addIdioma"
        />
      </div>

      <h4 class="title mt-5">Informações de emergência</h4>
      <div class="flex flex-col">
        <div class="w-full mb-4">
          <CustomInput
            v-model="user.emergencyInfo.specialHealthCare"
            name="health_care"
            label="Há algum cuidado relacionado à sua saúde que gostaria que soubéssemos?"
            type="text"
            class="w-full"
          />
        </div>
      </div>

      <h4 class="title mt-5">Contato de Emergência</h4>
      <div class="flex flex-col">
        <div class="flex space-x-4 mb-4">
          <div class="w-4/12">
            <CustomInput
              v-model="user.emergencyInfo.emergencyContactName"
              name="emergency_name"
              label="Nome"
              type="text"
              class="w-full"
            />
          </div>
          <div class="w-4/12">
            <CustomInput
              v-model="user.emergencyInfo.emergencyContactPhone"
              v-mask="['+## (##) ####-####?#']"
              name="emergency_phone"
              label="Telefone"
              type="text"
              placeholder="+55 (00) 0000-0000"
              class="w-full"
              rules="min:8"
            />
          </div>
          <div class="w-4/12">
            <CustomInput
              v-model="user.emergencyInfo.emergencyContactKinship"
              name="emergencyContactKinship"
              label="Parentesco"
              type="text"
              class="w-full"
            />
          </div>
        </div>
      </div>

      <h4 class="title mt-5">Informações complementares</h4>
      <div class="flex flex-col">
        <div class="w-full mb-4">
          <CustomInput
            v-model="user.complementaryInfo.originReligion"
            name="religion"
            label="Religião de origem"
            type="text"
            class="w-full"
          />
        </div>
        <div class="w-full mb-4">
          <CustomTextarea
            v-model="user.complementaryInfo.otherInstitution"
            name="religion2"
            label="Caso esteja vindo de outro Centro Espírita, descreva: nome da
          entidade espírita, quais cursos realizou, quando e trabalhos
          realizados."
            class="w-full"
          />
        </div>
        <div class="w-full mb-4">
          <CustomTextarea
            v-model="user.complementaryInfo.volunteerWork"
            label="Realiza ou realizou trabalho voluntário? Descreva basicamente os três
          últimos."
            class="w-full"
          />
        </div>
        <div class="w-full mb-4">
          <CustomTextarea
            v-model="user.complementaryInfo.obs"
            name="comments"
            label="Observações"
            class="w-full"
          />
        </div>
      </div>

      <div class="flex">
        <div class="w-9/12">
          <CustomInput
            v-model="user.inclusionInfo.collaboratorName"
            name="collaborator"
            label="Nome do colaborador que cadastrou"
            type="text"
            placeholder="Nome do colaborador que cadastrou"
            class="w-full"
            :disabled="true"
          />
        </div>
        <div class="w-3/12">
          <div class="flex flex-col">
            <CustomInput
              v-model="user.inclusionInfo.inclusionDate"
              name="inclusionDate"
              label="Data de inclusão"
              type="text"
              class="w-full"
              :disabled="true"
            />
          </div>
        </div>
      </div>

      <div class="flex justify-end">
        <Button text-label="Salvar" class="px-6 py-2" type="submit" />
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import { ptBR } from 'vuejs-datepicker/dist/locale'
import CustomInput from '@/components/Form/CustomInput.vue'
import CustomTextarea from '~/components/Form/CustomTextarea.vue'
import OutlineButton from '~/components/Buttons/OutlineButton.vue'
import Button from '~/components/Buttons/Button.vue'

export default {
  name: 'CadastroForm',
  components: {
    CustomTextarea,
    CustomInput,
    OutlineButton,
    Button,
  },
  layout: 'admin',
  data() {
    return {
      ptBR,
      rgMask: [/[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9xX]/],
      otherDocument: false,
      documentError: false,
      selectedMaritialStatus: null,
      selectedHasChildren: null,
      disabledHasChildren: true,
      inclusionDateFormatter: '',
      birthdateFormatter: '',
      addressNumber: 1,
      user: {
        name: '',
        birthdate: '',
        nationality: '',
        birthplace: '',
        rg: '',
        cpf: '',
        otherDocumentType: '',
        otherDocumentNumber: '',
        gender: '',
        maritialStatus: '',
        hasChildren: false,
        childrenAmount: 0,
        phones: {
          home: '',
          business: '',
          cell: '',
        },
        emails: {
          first: '',
          second: '',
        },
        addressInfo: [
          {
            type: '',
            city: '',
            state: '',
            country: '',
            cep: '',
            address: '',
            number: '',
            addressComplement: '',
            district: '',
          },
        ],
        academicInfo: {
          educationLevel: '',
          mainGraduation: '',
          occupation: '',
          anotherSkill: '',
        },
        languagesInfo: [
          {
            language: '',
            level: '',
          },
        ],
        emergencyInfo: {
          specialHealthCare: '',
          emergencyContactName: '',
          emergencyContactPhone: '',
        },
        complementaryInfo: {
          originReligion: '',
          otherInstitution: '',
          volunteerWork: '',
          obs: '',
        },
        inclusionInfo: {
          collaboratorId: this.$auth.user.UserAttributes.Sub,
          collaboratorName: this.$auth.user.UserAttributes.Name,
          inclusionDate: this.$moment().format('DD/MM/YYYY'),
        },
      },
    }
  },
  computed: {
    ...mapState('persons', ['options']),
    minDate() {
      return this.$moment().subtract(18, 'years').format('YYYY-MM-DD')
    },
    maxDate() {
      return this.$moment().format('YYYY-MM-DD')
    },
    checkDocumentRules() {
      if (this.user.cpf || this.user.rg || this.user.otherDocumentNumber) {
        return false
      }

      return true
    },
    dateNascRules() {
      // const date = this.$moment().subtract(18, 'years').format('YYYY-MM-DD')
      return `required|date_between:['1900-01-01', '2022-10-10', true]`
    },
    // rgRegex(e){
    //   const value = e.target.value
    //   console.log(e)
    //   if(value.length <= 11) return 
    //   if(e.keyCode !== 88) return
    //   console.log(value.length)
    // },
  },
  watch: {
    birthdateFormatter(newValue) {
      const d = this.$moment(newValue).format('DD/MM/YYYY')
      this.user.birthdate = d
    },
  },
  methods: {
    ...mapActions('persons', ['create']),

    // search by CEP
    async searchCep(input) {
      const index = input.target.id
      const cepSearch = input.target.value
      const cepFormated = cepSearch.replace(/-/, '')

      if (cepFormated.length === 8) {
        await this.$viaCep.buscarCep(cepFormated).then((obj) => {
          if (obj.erro) {
            this.user.addressInfo[index].city = ''
            this.user.addressInfo[index].state = ''
            this.user.addressInfo[index].country = ''
            this.user.addressInfo[index].address = ''
            this.user.addressInfo[index].district = ''
          } else {
            this.user.addressInfo[index].city = obj.localidade
            this.user.addressInfo[index].state = obj.uf
            this.user.addressInfo[index].country = 'Brasil'
            this.user.addressInfo[index].address = obj.logradouro
            this.user.addressInfo[index].district = obj.bairro
          }
        })
      }
    },

    async saveForm() {
      const isValid = await this.$refs.form.validate()
      this.documentError = false
      this.otherDocument = false

      if (!(this.user.rg || this.user.cpf || this.user.otherDocumentNumber)) {
        this.documentError = true
      }

      if (!isValid) return

      this.user.childrenAmount = parseInt(this.user.childrenAmount)

      this.$swal({
        icon: 'info',
        title: 'Enviando...',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        showCloseButton: true,
        timer: 2000,
      })

      try {
        await this.create(this.user).then(() => {
          this.$swal({
            icon: 'success',
            title: 'Sucesso',
            text: 'Usuário cadastrado com sucesso',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            showCloseButton: true,
            timer: 2000,
          })
        })
      } catch (e) {
        this.$swal({
          icon: 'error',
          title: 'Ops...',
          text: e.message,
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          showCloseButton: true,
          timer: false,
        })
      }
    },

    removeAddress(index) {
      const array = this.user.addressInfo
      if (index > -1) {
        array.splice(index, 1) // 2nd parameter means remove one item only
      }
    },

    removeLang(index) {
      const array = this.user.languagesInfo
      if (index > -1) {
        array.splice(index, 1) // 2nd parameter means remove one item only
      }
    },

    setMaitialStatus(val) {
      this.user.maritialStatus = val
    },

    setGender(val) {
      this.user.gender = val
    },

    setHasChildren(val) {
      if (val === 'Sim') {
        this.disabledHasChildren = false
        this.user.hasChildren = true
      } else {
        this.disabledHasChildren = true
        this.user.hasChildren = false
        this.user.childrenAmount = 0
      }
    },

    incrementAddress() {
      this.addressNumber++
    },

    setAddress(val) {
      this.user.addressInfo.type = val
    },

    addAddress() {
      this.user.addressInfo.push({
        type: null,
        city: '',
        state: '',
        country: '',
        cep: '',
        address: '',
        number: '',
        addressComplement: '',
        district: '',
      })
    },

    addIdioma() {
      this.user.languagesInfo.push({
        language: '',
        level: '',
      })
    },
  },
}
</script>

<style lang="scss">
hr {
  color: transparent;
}

button {
  &.delete-address {
    margin-bottom: -25px;
    z-index: 2;
  }

  &.delete-lang {
    margin-bottom: -25px;
    z-index: 2;
  }
}

.title {
  color: #508ec7;
  margin-bottom: 24px;
}

.input-date {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 8px 6px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  box-sizing: border-box;
  border-radius: 8px;
  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
  margin: 4px 0px;
}

// input:disabled {
//   background: red;
// }
</style>
