<template>
  <Modal
    v-if="props.show"
    @hide="emits('hide')"
    class="feedbackModal"
    title="Подать обращение"
  >
    <Form @finish="postFeedback">
      <div class="feedbackModal-inputs">
        <div>
          <label> Вид обращения<span>*</span> </label>

          <Select
            name="region"
            placeholder="Выберите категорию обращения"
            :options="[
              { label: 'Алматы', value: 'Алматы' },
              { label: 'Астана', value: 'Астана' },
              { label: 'Караганда', value: 'Караганда' },
            ]"
            required
          />
        </div>

        <div>
          <label> Категория обращения<span>*</span> </label>

          <Select
            name="region"
            placeholder="Выберите категорию обращения"
            :options="[
              { label: 'Алматы', value: 'Алматы' },
              { label: 'Астана', value: 'Астана' },
              { label: 'Караганда', value: 'Караганда' },
            ]"
            required
          />
        </div>

        <div>
          <label> Текст обращения<span>*</span> </label>
          <Input
            type="textarea"
            name="name"
            placeholder="Введите текст обращения"
            required
            autofocus
            max
          />
        </div>

        <div>
          <label> Файлы </label>

          <p class="feedbackModal-description">
            Прикрепите фото и документы, которые могут помочь или выступить
            доказательством
          </p>

          <Button
            class="feedbackModal-addFileBtn"
            name="Прикрепить файл"
            type="outline-blue"
            v-slot:left
          >
            <SvgIcon name="plus" :viewboxWidth="24" :viewboxHeight="24" />
          </Button>

          <p class="feedbackModal-description">
            Максимальный размер одного файла 19 мб.<br />
            Общий размер файлов не более 80 мб, количество до 10 файлов.Форматы: png, pdf,
            jpg, jpeg, gif, tiff, bmp, doc, docx, xls, xlsx.
          </p>
        </div>

        <div>
          <label> Фактический адрес<span>*</span> </label>

          <p class="feedbackModal-description">Введите адрес фактического проживания</p>

          <Select
            name="region"
            placeholder="Укажите область"
            :options="[
              { label: 'Алматы', value: 'Алматы' },
              { label: 'Астана', value: 'Астана' },
              { label: 'Караганда', value: 'Караганда' },
            ]"
            required
          />

          <Select
            name="region"
            placeholder="Населенный пункт"
            :options="[
              { label: 'Алматы', value: 'Алматы' },
              { label: 'Астана', value: 'Астана' },
              { label: 'Караганда', value: 'Караганда' },
            ]"
            required
          />

          <div class="feedbackModal-inputs-home">
            <Input name="name" placeholder="Улица" required />

            <Input name="name" placeholder="Дом/корпус" required />

            <Input name="name" placeholder="Квартира" required />
          </div>
        </div>
      </div>

      <div class="feedbackModal-checkboxList">
        <label class="feedbackModal-checkboxList-item">
          <input type="checkbox" />
          <span>
            Я как пользователь Сервиса, даю
            <a href="https://eotinish.kz/ru/agreement" target="_blank"
              >согласие на сбор и обработку моих персональных данных</a
            >
          </span>
        </label>

        <label class="feedbackModal-checkboxList-item">
          <input type="checkbox" />
          <span>
            Я согласен(на) с
            <a href="https://eotinish.kz/ru/privacy" target="_blank"
              >политикой конфиденциальности</a
            >
          </span>
        </label>
      </div>

      <div class="feedbackModal-btns">
        <Button name="Отправить" :loading="loading" htmlType="submit" />

        <Button type="default-grey" name="Отмена" @click="emits('hide')" />
      </div>
    </Form>
  </Modal>
</template>

<script setup lang="ts">
import { ref } from "vue";
// import axios from 'axios'
// import { useToast } from '../../../modules/toast'
// const { toast } = useToast()

interface IProps {
  show: boolean;
}
interface Emits {
  (event: "hide"): Function;
}

const props = defineProps<IProps>();
const emits = defineEmits<Emits>();

const loading = ref(false);

const postFeedback = ({
  name,
  phone,
  comment,
}: {
  name: string;
  phone: string;
  comment: string;
}) => {
  console.log("name", name);
  console.log("name", phone);
  console.log("name", comment);
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
};
</script>

<style scoped lang="scss">
.feedbackModal {
  &-inputs {
    &-home {
      display: flex;
      grid-gap: 16px;
    }
    & label {
      display: block;
      font-size: 20px;
      font-weight: 500;
      margin-bottom: 10px;

      & span {
        color: var(--red-color);
      }
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
