<template>
  <Modal
    v-if="props.show"
    @hide="emits('hide')"
    class="feedbackModal"
    title="Вступить в партию"
  >
    <Form @finish="postFeedback">
      <div class="feedbackModal-inputs">
        <Input
          name="iin"
          placeholder="ИИН"
          required
        />

        <Input
          name="lastname"
          placeholder="Фамилия"
          required
        />

        <Input
          name="name"
          placeholder="Имя"
          required
        />

        <Input
          name="middleName"
          placeholder="Отчество"
          required
        />

        <Select
          name="education"
          placeholder="Укажите ваше образование"
          :options="[
            {label: 'Алматы', value: 'Алматы'},
            {label: 'Астана', value: 'Астана'},
            {label: 'Караганда', value: 'Караганда'},
          ]"
          required
        />

        <Input
          name="specialization"
          placeholder="Специальность"
          required
        />

        <Input
          name="workPlace"
          placeholder="Место работы"
          required
        />

        <Input
          name="post"
          placeholder="Должность"
          required
        />

        <Input
          type="tel"
          name="phone"
          placeholder="Ваш номер телефона"
          :min="17"
          required
        />

        <Input
          type="email"
          name="email"
          placeholder="E-mail"
          required
        />

        <Select
          name="region"
          placeholder="Укажите область"
          :options="[
            {label: 'Алматы', value: 'Алматы'},
            {label: 'Астана', value: 'Астана'},
            {label: 'Караганда', value: 'Караганда'},
          ]"
          required
        />

        <Select
          name="locality"
          placeholder="Населенный пункт"
          :options="[
            {label: 'Алматы', value: 'Алматы'},
            {label: 'Астана', value: 'Астана'},
            {label: 'Караганда', value: 'Караганда'},
          ]"
          required
        />

        <div class="feedbackModal-inputs-home">
          <Input
            name="name"
            placeholder="Улица/Проспект/Мкр"
            required
          />

          <Input
            name="name"
            placeholder="Дом"
            required
          />

          <Input
            name="name"
            placeholder="Кв."
            required
          />
        </div>


        <div>
          <label>
            Относитесь ли вы к категории:
          </label>

          <div class="feedbackModal-checkboxList-block">
            <div class="feedbackModal-checkboxList">
              <label class="feedbackModal-checkboxList-item">
                <input type="checkbox">
                <span>
                  Пенсионеры
                </span>
              </label>

              <label class="feedbackModal-checkboxList-item">
                <input type="checkbox">
                <span>
                  Инвалиды
                </span>
              </label>
            </div>

            <div class="feedbackModal-checkboxList">
              <label class="feedbackModal-checkboxList-item">
                <input type="checkbox">
                <span>
                  Безработные
                </span>
              </label>

              <label class="feedbackModal-checkboxList-item">
                <input type="checkbox">
                <span>
                  Находящиеся в отпуске по уходу за детьми
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div class="feedbackModal-checkboxList">
        <label class="feedbackModal-checkboxList-item">
          <input type="checkbox">
          <span>
            С Уставом и Программой политической партии «Respublica» ознакомлен(а), поддерживаю их и обязуюсь выполнять.
          </span>
        </label>

        <label class="feedbackModal-checkboxList-item">
          <input type="checkbox">
          <span>
            Продолжая, Вы выражаете согласие на сбор и обработку своих персональных данных не противоречащими законодательству Республики Казахстан способами, как на бумажных носителях, так и в электронном формате, в той мере, насколько это необходимо.
          </span>
        </label>

        <label class="feedbackModal-checkboxList-item">
          <input type="checkbox">
          <span>
            Подтверждаю, что не являюсь членом другой политической партии
          </span>
        </label>
      </div>
      

      <Button
        name="Отправить заявку"
        :loading="loading"
        htmlType="submit"
      />

    </Form>
  </Modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// import axios from 'axios'
// import { useToast } from '../../../modules/toast'
// const { toast } = useToast()

interface IProps {
  show: boolean,
}
interface Emits {
  (event: 'hide'): Function
}

const props = defineProps<IProps>()
const emits = defineEmits<Emits>()


const loading = ref(false)

const postFeedback = ({ name, phone, comment }: { name: string, phone: string, comment: string }) => {
  console.log('name', name);
  console.log('name', phone);
  console.log('name', comment);
  // const url = "https://admin.passepartout.kz/message?token=AZ8uZkEqwncL5fm";
  // const bodyFormData = {
  //   title: name,
  //   message: `Телефон номер: ${phone},\r\nКомментарий: ${comment}`,
  //   priority: 5,
  // };

  // const formData = new FormData();
  // Object.keys(bodyFormData).forEach(key => formData.append(key, bodyFormData[key]));

  // loading.value = true
  // // Simple POST request with a JSON body using axios
  // axios({
  //   method: "post",
  //   url: url,
  //   data: formData,
  // })
  //   .then((response) => {
  //     toast({
  //       message: 'Ваша заявка успешно отправлена'
  //     })
  //     loading.value = false
  //     emits('hide')
  //   })
  //   .catch((err) => {
  //     toast({
  //       message: 'Возникли ошибки при запросе'
  //     })
  //     loading.value = false
  //   });
}
</script>

<style scoped lang="scss">
.feedbackModal {
  &-inputs {
    &-home {
      display: grid;
      grid-template-columns: 1fr 135px 135px;
      grid-gap: 16px;
    }
    & label {
      display: block;
      font-size: 20px;
      font-weight: 500;
      margin-bottom: 10px;
    }
  }

  &-addFileBtn {
    display: flex;
    align-items: center;
    grid-gap: 10px;
    margin-bottom: 38px;
    margin-bottom: 8px;

    & svg {
      width: 24px;
      height: 24px;
      fill: var(--accent-color);
    }
  }

  &-description {
    color: var(--light-gray-color);
    margin-bottom: 10px;
  }

  &-btns {
    display: flex;
    grid-gap: 20px;
  }
}

</style>
