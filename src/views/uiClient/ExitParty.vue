<template>
  <div class="wrapper-main">
    <section class="exitParty">
      <div class="wrapper">
        <h2 class="landing-title">
          <!-- {{ exitPartyDatas.status === 'approved' ? 'Дорогой пользователь!' : 'Выйти из партии' }} -->
          Выйти из партии
        </h2>

        <div class="exitParty-inner" v-if="(!exitPartyDatas.status || exitPartyDatas.status === 'approved') && !isLoading.page && partyData">
          <div class="exitParty-content">
            <div class="exitParty-content-messege">
              <h4 class="exitParty-content-subtitle">Дорогой пользователь,</h4><br>
              <p>Мы ценим ваше участие и вклад в нашу партию и организацию. Ваше решение выйти из-под пристального внимания, и мы глубоко уважаем ваш выбор.</p>
            </div>

            <div class="exitParty-content-listBlock">
              <h4 class="exitParty-content-subtitle">Для выполнения этой процедуры, пожалуйста, следуйте инструкциям ниже:</h4>
              <ul class="exitParty-content-listBlock-list">
                <li>Заполните форму, предоставленную по следующей ссылке: <a href="/doc/ru/Respublica. Партиядан шығу туралы өтініш. Заявление о выходе из партии .docx">"Открыть"</a>.</li>
                <li>После того как вы заполнили форму, пожалуйста, распечатайте ее.</li>
                <li>Подпишитесь на распечатанной форме, удостоверяя тем самым ваше намерение выйти из партии.</li>
                <li>Отсканируйте или сфотографируйте заполненную и подписанную форму.</li>
                <li>Прикрепите отсканированный/сфотографированный документ к данному сообщению</li>
              </ul>
            </div>

            <p>
              Пожалуйста, обратите внимание, что ваша заявка будет оформлена после получения заполненной формы с вашей подписью. Если у вас возникли какие-либо вопросы или требуется дополнительная помощь, не стесняйтесь обращаться к нашей службе поддержки. +7 707 877777<br>
              Спасибо за сотрудничество и понимание.
            </p>
          </div>


          <Form class="exitParty-form" @finish="postRequestExitParty">
            <div class="exitParty-form-inputs">
              <div class="exitParty-form-select">
                <label for="position">Выберите причину выхода</label>
                <Select
                  placeholder="Выберите из списка причину"
                  staticPlaceholder
                  :options="[
                    {label: 'Несогласие с политикой партии', value: 'Несогласие с политикой партии'},
                    {label: 'Разочарование в лидерстве партии', value: 'Разочарование в лидерстве партии'},
                    {label: 'Несоответствие партийных ценностей с собственными убеждениями', value: 'Несоответствие партийных ценностей с собственными убеждениями'},
                    {label: 'Отсутствие эффективных механизмов для осуществления изменений в партии', value: 'Отсутствие эффективных механизмов для осуществления изменений в партии'},
                    {label: 'Недовольство сделанными партией решениями или действиями', value: 'Недовольство сделанными партией решениями или действиями'},
                    {label: 'Неудовлетворительное взаимодействие с другими членами партии', value: 'Неудовлетворительное взаимодействие с другими членами партии'},
                    {label: 'Потеря доверия к партии и ее руководству', value: 'Потеря доверия к партии и ее руководству'},
                    {label: 'Желание присоединиться к другой партии, которая лучше соответствует своим убеждениям', value: 'Желание присоединиться к другой партии, которая лучше соответствует своим убеждениям'},
                    {label: 'Другое', value: null}
                  ]"
                  v-model="exitPartyDatas.select"
                  required
                />
              </div>

              <TransitionGroup>
                <div
                  v-if="!exitPartyDatas.select"
                  v-collapse
                >
                  <Input
                    name="position"
                    type="textarea"
                    v-model="exitPartyDatas.text"
                    placeholder="Введите причину выхода"
                    staticPlaceholder
                    required
                  />
                </div>

                <div
                  v-if="!exitPartyDatas.document"
                  v-collapse
                >
                  <Button
                    class="exitParty-form-addFileBtn"
                    name="Прикрепить файл"
                    type="outline-blue"
                    v-slot:left
                    @click="clickInputFile"
                  >
                    <input
                      type="file"
                      id="upload-files"
                      multiple
                      style="display: none"
                      @change="uploadFiles"
                    />
                    <SvgIcon
                      name="plus"
                      :viewboxWidth="24"
                      :viewboxHeight="24"
                    />
                  </Button>
                </div>
              </TransitionGroup>
            </div>

            <div class="exitParty-doc">
              <h4 class="exitParty-doc-title">Документ:</h4>
              <label v-if="!exitPartyDatas.document" for="upload-files" class="exitParty-doc-name empty">Прикрепите обязательно файл заполненной формы</label>
              <div v-else class="exitParty-doc-namEwithAction">
                <div class="exitParty-doc-name">{{ exitPartyDatas.document?.name }}</div>
                <SvgIcon
                  class="exitParty-doc-remove"
                  name="x"
                  :viewboxHeight="14"
                  :viewboxWidth="21"
                  :width="24"
                  :height="24"
                  @click="deleteFile()"
                />
              </div>
            </div>


            <div class="exitParty-btns">
              <Button
                name="Отправить"
                class="exitParty-addFileBtn"
                :loading="isLoading.btn"
                htmlType="submit"
                :disabled="!exitPartyDatas.document"
              />
              <Button
                class="exitParty-addFileBtn"
                name="Отмена"
                type="default-grey"
              />
            </div>
          </Form>
        </div>

        <div class="exitParty-inner" v-else-if="exitPartyDatas.status === 'pending'">
          <div class="exitParty-content">
            <h4 class="exitParty-content-messege-title green">ЗАЯВКА УСПЕШНО ОТПРАВЛЕНА</h4>

            <div class="exitParty-doc">
              <h4 class="exitParty-doc-title">Документ:</h4>
              <div class="exitParty-doc-namEwithAction">
                <a class="exitParty-doc-name" :href="'https://api.respublica.codetau.com/' + exitPartyDatas.document?.name">{{ exitPartyDatas.document?.name }}</a>
              </div>
            </div>

            <p>
              Спасибо за отправленную заявку. 
              Мы уведомим вас, как будет обработан и подтвержден ваш запрос. 
              Ваше решение имеет для нас большое значение, и мы ценим ваше участие в нашей работе.
              Пожалуйста, ожидайте дополнительную информацию от нас в ближайшее время. 
              Если у вас возникли какие-либо вопросы или вам потребуется дополнительная помощь, не стесняйтесь обращаться к нашей службе поддержки.
            </p>
          </div>
        </div>
        <br>
        <br><br>
        <br><br>

        <div class="exitParty-inner" v-if="exitPartyDatas.status === 'approved' || oldExitRequest">
          <div class="exitParty-content">
            <h4 class="exitParty-content-messege-title blue">
              ВАША ЗАЯВКА УСПЕШНО ОБРАБОТАНА
              <span style="color:grey">{{ moment(oldExitRequest.created_at).format('MMMM Do YYYY, h:mm:ss a') }}</span>
            </h4>
            <br>

            <div class="exitParty-doc">
              <h4 class="exitParty-doc-title">Документ:</h4>
              <div class="exitParty-doc-namEwithAction">
                <a class="exitParty-doc-name" :href="'https://api.respublica.codetau.com/' + oldExitRequest.document">{{ oldExitRequest.document }}</a>
              </div>
            </div>
            <p>
              Спасибо за вашу активность и участие в жизни наших участников. Желаем вам удачи в ваших будущих усилиях и началах.
              Если в будущем вы решите вернуться или изменить свою позицию, помните, что мы всегда открыты для диалога и готовы приветствовать вас обратно.
            </p><br><br>

            <p>
              С уважением, Партия Respublica!
            </p>
          </div>
        </div>
        
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { reactive,ref  } from 'vue';

// Modules
import { useToast } from '../../modules/toast'
import { onMounted } from 'vue';
import moment from 'moment';

const { toast } = useToast()

const partyData = ref();
const exitPartyDatas = reactive({
  select: 'Несогласие с политикой партии',
  text: null,
  document: null,
  status: null
})
const oldExitRequest = ref();
const fileTypes = ['doc', 'docx', 'pdf', 'png', 'jpg', 'jpeg', 'gif', 'JPG'];

const isLoading = reactive({
  page: true,
  btn: false
})
const token = localStorage.getItem('TOKEN');

const clickInputFile = () => {
  document.getElementById('upload-files')?.click();
}

const deleteFile = () => {
  exitPartyDatas.document = null;
}

const uploadFiles = (event) => {
  if (event.target.files.length > 0) {
    if (isDocx(event.target.files[0].name)) exitPartyDatas.document = event.target.files[0];
    else {
      toast({
        message: 'Документ должен быть с рачширением ' + fileTypes.join(', ')
      })
    }
  }
}

const isDocx = (fileName) => {
  const type = fileName.split(".")
  return fileTypes.includes(type[type.length - 1])
}

// Get Party Data
const getPartData = () => {
  const url = `https://api.respublica.codetau.com/api/v1/parties/memberships`;
  axios({
    method: "get",
    url: url,
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + token
    }
  })
    .then((response) => {
      partyData.value = response.data;
    })
    .catch((err) => {
      console.log('err', err);
      // toast({
      //   message: 'Возникли ошибки при запросе'
      // })
    });
}


// Get Exit Party Data

onMounted(() => {
  getPartData();
  getRequestExitParty();
});

const getRequestExitParty = () => {
  isLoading.page = true;
  const url = `https://api.respublica.codetau.com/api/v1/parties/memberships/resignation`;

  axios({
    method: "get",
    url: url,
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + token
    }
  })
    .then((response) => {
      console.log('response', response);
      
      if (response.data.status !== 'approved') {
        exitPartyDatas.document = {};
        exitPartyDatas.document.name = response.data.document;
        exitPartyDatas.status = response.data.status;
      } else oldExitRequest.value = response.data;

      isLoading.page = false;
    })
    .catch((err) => {
      console.log('err', err);

     
        // toast({
        //   message: 'Возникли ошибки при запросе'
        // })
      isLoading.page = false;
    });
}

// Send Exit From Party
const postRequestExitParty = () => {
  isLoading.btn = true;
  const url = `https://api.respublica.codetau.com/api/v1/parties/memberships/resignation`;

  const formData = new FormData();
  formData.append("comment", exitPartyDatas.select ?? exitPartyDatas.text!);
  formData.append("document", exitPartyDatas.document!);

  axios({
    method: "post",
    url: url,
    data: formData,
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + token
    }
  })
    .then((response) => {
      console.log('response', response);
      
      exitPartyDatas.status = 'pending';
      isLoading.btn = false;
    })
    .catch((err) => {
      console.log('err', err);

      if (err.response.data.detail === 'Pending resignation request already exists.') {
        toast({
          message: 'Ожидающий рассмотрения запрос об отставке уже существует.'
        })
      } else {
        toast({
          message: 'Возникли ошибки при запросе'
        })
      }
      isLoading.btn = false;
    });
}
</script>

<style scoped lang="scss">
.wrapper-main {
  padding-top: 40px;
  background-color: var(--accent-color-op05);
}

.exitParty {
  &-content {
    max-width: 1240px;
    margin-bottom: 65px;

    &-subtitle {
      font-size: 20px;
      font-weight: 700;
    }
  
    &-messege,
    &-listBlock {
      margin-bottom: 30px;
    }

    &-messege-title {
      font-size: 36px;
      font-weight: 700;
      margin-bottom: 30px;

      &.green {
        color: var(--green-color);
      }

      &.blue {
        color: var(--accent-color);
      }
    }
  
    &-listBlock-list {
      list-style-type: decimal;
      padding-left: 22px;
  
      & li {
        font-size: 20px;

        & a {
          color: var(--accent-color);
        }
      }
    }
  
    & p {
      font-size: 20px;
    }
  }

  &-form {
    max-width: 700px;

    &-inputs {
      margin-bottom: 38px;
    }

    &-select {
      & label {
        display: block;
        font-size: 18px;
        font-weight: 500;
        margin-bottom: 10px;
      }
    }

    &-addFileBtn {
      display: flex;
      align-items: center;
      grid-gap: 10px;
  
      & svg {
        width: 24px;
        height: 24px;
        fill: var(--accent-color);
      }
    }
  }

  &-doc {
    display: flex;
    grid-gap: 9px;
    margin-bottom: 50px;

    &-title {
      color: var(--light-gray-color);
      font-size: 20px;
      font-weight: 500;
    }

    &-name {
      color: var(--accent-color);
      font-size: 20px;
      text-decoration-line: underline;
      margin-bottom: 0px !important;

      &.empty {
        
        color: var(--red-color);
      }
    }

    &-namEwithAction {
      display: flex;
      align-items: center;
      grid-gap: 10px;
    }

    &-remove {
      height: 20px;
      width: 20px;
      cursor: pointer;

      fill: var(--red-color);
    }
  }

  &-btns {
    display: flex;
    grid-gap: 20px;
  }
}
</style>
