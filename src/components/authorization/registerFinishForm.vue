<template>
  <Form class="wrapper-darkMain-form" @finish="postFeedback">
    <h2 class="wrapper-darkMain-title">Введите ваши данные</h2>

    <div class="modal-inputs">
      <Input
        light
        v-model="formValue.iin"
        placeholder="Введите ваш ИИН"
        mask="######-######"
        required
      />

      <Transition>
        <div class="modal-userData" v-if="userData" v-collapse>
          <h4 class="modal-userData-title">ФИО:</h4>
          <h4 class="modal-userData-value">
            {{ userData?.name }}
            {{ userData?.surname }}
            {{ userData?.patronymic }}
          </h4>

          <p class="modal-userData-title">Статус:</p>
          <p :class="`modal-userData-value status ${!userData?.inParty ? 'error' : ''}`">
            {{!userData?.inParty ? 'Не подтвержденная личность' : 'Подтверждена личность'}}
          </p>
        </div>
      </Transition>

      <Transition>
        <div
          class="modal-inputs-passwords"
          v-if="userData && userData?.inParty"
          v-collapse
        >
          <Input
            light
            type="password"
            name="password"
            v-model="password"
            placeholder="Придумайте пароль"
            required
          />

          <Input
            light
            type="password"
            validation="sameAs"
            :sameAs="password"
            placeholder="Повторите пароль"
            required
          />
        </div>
      </Transition>
    </div>

    <div class="modal-bottom">
      <Transition>
        <div class="modal-error" v-if="userData && !userData?.inParty" v-collapse>
          <div class="modal-error-message">
            Вам необходимо пройти регистрацию на egov
          </div>

          <a href="https://egov.kz/cms/ru/articles/mobilecitizen" target="_blank">
            <Button
              name="Инструкция по регистрация на egov"
              class="modal-error-toEgov"
              type="default-green"
              :loading="loading"
            />
          </a>
        </div>
      </Transition>
      <Transition>
        <Button
          v-if="userData && userData?.inParty"
          v-collapse
          class="modal-btn"
          name="Зарегистрироваться"
          type="default-blue"
          :loading="loading"
          htmlType="submit"
        />
      </Transition>
    </div>

    <div class="modal-message">
      <h4 class="modal-message-title">У вас есть аккаунт? </h4>
      <button
        type="button"
        class="modal-message-btn"
        @click="() => $emit('toLogin')"
      >
        <span>Войти</span>
      </button>
    </div>
  </Form>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import axios from 'axios'
import { useToast } from '../../modules/toast'
import { useRouter } from 'vue-router';

const { toast } = useToast()
const router = useRouter()

interface IProps {
  phone: string
}
interface Emits {
  (event: 'toLogin', value: Function): void,
}

const props = defineProps<IProps>()
defineEmits<Emits>()

const loading = ref(false)
const password = ref('');

const userData = ref<any>(null);

const formValue = reactive({
  iin: ''
})

watch(
  () => formValue.iin,
  () => {
    const url = `https://tri.codetau.com/usersInEgov`;
    axios({
      method: "get",
      url: url,
    })
      .then((response) => {
        userData.value = null;
        console.log('url', url);
        console.log('response', response);



        response.data.forEach(user => {
          if (user.iin === formValue.iin) {
            userData.value = user;
            // if () checkError = true;
          }
        });
        loading.value = false
      })
      .catch((err) => {
        console.log('err', err);
        toast({
          message: 'Возникли ошибки при запросе'
        })
        loading.value = false
      });
  },
  {
    deep: true
  }
)

const postFeedback = ({ password }: { password: string }) => {
  const url = `https://tri.codetau.com/users`;
  axios({
    method: "post",
    url: url,
    data: {
      "phone": props.phone,
      "password": password
    }
  })
    .then((response) => {
      console.log('url', url);
      console.log('response', response);

      toast({
        message: 'Успешно зарегистрированы',
        type: 'success'
      })
      
      setTimeout(() => {
        router.push('/main-db')
      }, 5000);
      loading.value = false
    })
    .catch((err) => {
      console.log('err', err);
      toast({
        message: 'Возникли ошибки при запросе'
      })
      loading.value = false
    });
}
</script>

<style scoped lang="scss">
.modal {
  &-inputs {
    width: 100%;
    display: flex;
    flex-direction: column;
    grid-gap: 15px;
    margin-bottom: 30px;

    &-passwords {
      padding-top: 30px;
    }
  }

  &-userData {
    display: grid;
    grid-template-columns: 80px 1fr;
    grid-gap: 8px 12px;

    &-title,
    &-value {
      font-size: 18px;
      text-align: left;
    }

    &-value.status {
      color: var(--green-color);

      &.error {
        color: var(--red-color);
      }
    }
  }

  &-btn {
    width: 100%;
  }

  &-error {
    &-message {
      color: var(--red-color);
      font-size: 18px;
      font-weight: 500;

      padding: 19px 30px;
      border-radius: 10px;
      border: 1px solid rgba(255, 0, 54, 0.50);
      background: rgba(255, 0, 54, 0.20);

      margin-bottom: 16px;
    }

    &-toEgov {
      width: 100%;
    }
  }
  
  &-bottom {
    margin-bottom: 50px;
  }

  &-message {
    &-title,
    & span {
      display: inline;
      font-size: 18px;
      font-weight: 500;
    }

    & span {
      color: var(--accent-color);
    }
  }
}

.v-enter-active,
.v-leave-active {
  transition: all 0.2s ease;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.v-leave-active {
}
</style>
