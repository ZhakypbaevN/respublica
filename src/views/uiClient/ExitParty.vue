<template>
  <div class="wrapper-main">
    <section class="exitParty">
      <div class="wrapper">
        <h2 class="landing-title">
          {{ $t('page.quit-the-party') }}
        </h2>

        <div class="exitParty-inner" v-if="(!exitPartyDatas.status || exitPartyDatas.status === 'rejected' || exitPartyDatas.status === 'approved') && !isLoading.page && partyData">
          <div class="exitParty-content">
            <div class="exitParty-content-messege">
              <h4 class="exitParty-content-subtitle">{{ $t('quit-party.dear-user') }}</h4><br>
            </div>

            <div class="exitParty-content-listBlock">
              <h4 class="exitParty-content-subtitle">{{ $t('quit-party.rules.title') }}</h4>
              <ul class="exitParty-content-listBlock-list" v-html="$t('quit-party.rules.list')" />
            </div>

            <p>
              <span v-html="$t('quit-party.rules.notice')" />
              <a href="mailto:info@respublica-partiyasy.kz">info@respublica-partiyasy.kz</a>
            </p>
          </div>


          <Form class="exitParty-form" @finish="onPostRequestExitParty">
            <div class="exitParty-form-inputs">
              <div>
                <Input
                  name="position"
                  type="textarea"
                  v-model="exitPartyDatas.text"
                  :placeholder="$t('formdata.enter-the-reason-for-the-exit')"
                  staticPlaceholder
                  required
                />
              </div>

              <Transition>
                <div
                  v-if="!exitPartyDatas.document"
                  v-collapse
                >
                  <Button
                    class="exitParty-form-addFileBtn"
                    :name="$t('button.attach-a-file')"
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
              </Transition>
            </div>

            <div class="exitParty-doc" v-if="exitPartyDatas.document">
              <h4 class="exitParty-doc-title">{{ $t("formdata.document") }}:</h4>

              <label v-if="!exitPartyDatas.document" for="upload-files" class="exitParty-doc-name empty">{{ $t("formdata.be-sure-to-attach-the-file-of-the-completed-form") }}</label>
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
                :name="$t('button.sand')"
                class="exitParty-addFileBtn"
                :loading="isLoading.btn"
                htmlType="submit"
                :disabled="!exitPartyDatas.document"
              />
              <Button
                class="exitParty-addFileBtn"
                :name="$t('button.cancel')"
                type="default-grey"
              />
            </div>
          </Form>
        </div>

        <div class="exitParty-inner" v-else-if="exitPartyDatas.status === 'pending'">
          <div class="exitParty-content">
            <h4 class="exitParty-content-messege-title green">{{ $t('quit-party.pending.title') }}</h4>


            <div class="exitParty-motive">
              <h4 class="exitParty-motive-title">{{ $t("formdata.reason") }}:</h4>
              <p class="exitParty-motive-text">{{ exitPartyDatas.text }}</p>
            </div>

            <div class="exitParty-doc">
              <h4 class="exitParty-doc-title">{{ $t("formdata.document") }}:</h4>
              <div class="exitParty-doc-namEwithAction">
                <a class="exitParty-doc-name" :href="getFileUrl(exitPartyDatas.document?.name)">{{ exitPartyDatas.document?.name }}</a>
              </div>
            </div>

            <p v-html="$t('quit-party.pending.description')" />
          </div>
        </div>

        <div class="exitParty-inner" v-if="oldExitRequest.status === 'approved'">
          <div class="exitParty-content">
            <h4 class="exitParty-content-messege-title blue">
              {{ $t('quit-party.approved.title') }}
              <span style="color:grey">{{ moment(oldExitRequest.created_at).format('MMMM Do YYYY, h:mm:ss a') }}</span>
            </h4>
            <br>

            <div class="exitParty-motive">
              <h4 class="exitParty-motive-title">{{}}:</h4>
              <p class="exitParty-motive-text">{{ oldExitRequest.reason_for_resignation }}</p>
            </div>

            <div class="exitParty-doc">
              <h4 class="exitParty-doc-title">{{ $t("formdata.document") }}:</h4>
              <div class="exitParty-doc-namEwithAction">
                <a class="exitParty-doc-name" :href="getFileUrl(oldExitRequest.document)">{{ oldExitRequest.document }}</a>
              </div>
            </div>
            <p v-html="$t('quit-party.approved.description')" />
          </div>
        </div>

        <div class="exitParty-inner" v-if="oldExitRequest.status === 'rejected'">
          <div class="exitParty-content">
            <h4 class="exitParty-content-messege-title blue">
              {{ $t('quit-party.rejected.title') }}
              <span style="color:grey">{{ moment(oldExitRequest.created_at).format('MMMM Do YYYY, h:mm:ss a') }}</span>
            </h4>
            <br>

            <div class="exitParty-motive">
              <h4 class="exitParty-motive-title">{{}}:</h4>
              <p class="exitParty-motive-text">{{ oldExitRequest.reason_for_resignation }}</p>
            </div>

            <div class="exitParty-doc">
              <h4 class="exitParty-doc-title">{{ $t("formdata.document") }}:</h4>
              <div class="exitParty-doc-namEwithAction">
                <a class="exitParty-doc-name" :href="getFileUrl(oldExitRequest.document)">{{ oldExitRequest.document }}</a>
              </div>
            </div>
            <p v-html="$t('quit-party.rejected.description')" />
          </div>
        </div>
        
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref, onMounted } from 'vue';
  import { useI18n } from 'vue-i18n'

  import moment from 'moment';

  // Modules & Helpers
  import { useToast } from '@/modules/toast'
  import getFileUrl from '@/helpers/getFileUrlByDate';

  // types
  import { IExitPartyData, IPartyResignation } from '@/types/party-resignations';
  import { getPartyData, getRequestExitParty, postRequestExitParty } from '@/actions/uiClient/party-data';
  
  const { t } = useI18n()
  const { toast } = useToast()

  const partyData = ref();
  const exitPartyDatas = reactive(<IExitPartyData>{
    text: null,
    document: null,
    status: null
  })
  const oldExitRequest = ref(<IPartyResignation>{
    status: null
  });
  const fileTypes = ['doc', 'docx', 'pdf', 'png', 'jpg', 'jpeg', 'PNG', 'JPG'];

  const isLoading = reactive({
    page: true,
    btn: false
  })

  const token = localStorage.getItem('access_token');

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

  // Send Exit Request
  const onPostRequestExitParty = async () => {
    isLoading.btn = true;
    const url = `https://api.respublica-partiyasy.kz/api/v1/parties/memberships/resignation?reason_for_resignation=${exitPartyDatas.text!}`;

    const formData = new FormData();
    formData.append("document", exitPartyDatas.document!);

    try {
      await postRequestExitParty(exitPartyDatas.text!, formData)
      toast({
        message: 'Заявка успешно отправлена',
        type: 'success'
      })
      exitPartyDatas.status = 'pending';
      isLoading.btn = false;
    } catch (err) {
      if (err.response.data.detail === 'Pending resignation request already exists.') {
        toast({
          message: 'Ожидающий рассмотрения запрос об отставке уже существует.'
        })
      }
    } finally {

    }
  }

  // Get Party Data
  const onGetPartData = async () => {
    try {
      const response = await getPartyData();
      partyData.value = response;

      onGetRequestExitParty();
    } finally {

    }
  }
  
  // Get Exit Party Data
  const onGetRequestExitParty = async () => {
    try {
      const response = await getRequestExitParty();
      
      if (response.status === 'pending') {
        exitPartyDatas.document = {};
        exitPartyDatas.document.name = response.document;
        exitPartyDatas.text = response.reason_for_resignation;
        exitPartyDatas.status = response.status;
      } else oldExitRequest.value = response;
    } finally {
      isLoading.page = false;
    }
  }
  
  onMounted(onGetPartData);
</script>

<style scoped lang="scss">
.wrapper-main {
  padding: 40px 0 80px;
  background-color: var(--accent-color-op05);

  // Adaptation
  @media (max-width: 992px) {
    padding: 30px 0 60px;
  }

  @media (max-width: 768px) {
    padding: 30px 0 50px;
  }

  @media (max-width: 576px) {
    padding: 30px 0 40px;
  }
}

.exitParty {
  &-inner {
    margin-bottom: 100px;
  }
  &-content {
    max-width: 1240px;
    margin-bottom: 65px;

    &-subtitle {
      font-size: 20px;
      font-weight: 700;
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

    &-listBlock {
      margin-bottom: 30px;
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
    
    & a {
      color: var(--accent-color) !important;
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

  &-motive {
    display: flex;
    grid-gap: 9px;
    margin-bottom: 20px;

    &-title {
      color: var(--light-gray-color);
      font-size: 20px;
      font-weight: 500;
    }

    &-text {
      color: var(--gray-color);
      font-size: 20px;
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

  // Adaptation
  @media (max-width: 1200px) {
    &-inner {
      margin-bottom: 90px;
    }
    
    &-content {
      margin-bottom: 60px;

      &-subtitle {
        font-size: 18px;
      }

      &-messege-title {
        font-size: 34px;
        margin-bottom: 28px;
      }
    
      &-listBlock-list {
        padding-left: 22px;
    
        & li {
          font-size: 20px;
        }
      }
    
      & p {
        font-size: 20px;
      }
    }

    &-form {
      &-inputs {
        margin-bottom: 36px;
      }

      &-select label {
        font-size: 18px;
        margin-bottom: 10px;
      }

      &-addFileBtn {
        grid-gap: 10px;
    
        & svg {
          width: 24px;
          height: 24px;
        }
      }
    }

    &-motive {
      grid-gap: 8px;
      margin-bottom: 18px;

      &-title {
        font-size: 20px;
      }

      &-text {
        font-size: 20px;
      }
    }

    &-doc {
      grid-gap: 9px;
      margin-bottom: 48px;

      &-title {
        font-size: 20px;
      }

      &-name {
        font-size: 20px;
      }

      &-namEwithAction {
        grid-gap: 10px;
      }

      &-remove {
        height: 20px;
        width: 20px;
      }
    }

    &-btns {
      grid-gap: 20px;
    }
  }

  @media (max-width: 992px) {
    &-inner {
      margin-bottom: 86px;
    }
    
    &-content {
      margin-bottom: 56px;

      &-subtitle {
        font-size: 18px;
      }

      &-messege-title {
        font-size: 32px;
        margin-bottom: 26px;
      }
    
      &-listBlock-list {
        padding-left: 22px;
    
        & li {
          font-size: 18px;
        }
      }
    
      & p {
        font-size: 18px;
      }
    }

    &-form {
      &-inputs {
        margin-bottom: 34px;
      }

      &-select label {
        font-size: 18px;
        margin-bottom: 10px;
      }

      &-addFileBtn {
        grid-gap: 10px;
    
        & svg {
          width: 24px;
          height: 24px;
        }
      }
    }

    &-motive {
      grid-gap: 8px;
      margin-bottom: 18px;

      &-title {
        font-size: 18px;
      }

      &-text {
        font-size: 18px;
      }
    }

    &-doc {
      grid-gap: 9px;
      margin-bottom: 46px;

      &-title {
        font-size: 18px;
      }

      &-name {
        font-size: 18px;
      }

      &-namEwithAction {
        grid-gap: 10px;
      }

      &-remove {
        height: 20px;
        width: 20px;
      }
    }

    &-btns {
      grid-gap: 20px;
    }
  }

  @media (max-width: 768px) {
    &-inner {
      margin-bottom: 82px;
    }
    
    &-content {
      margin-bottom: 52px;

      &-subtitle {
        font-size: 16px;
      }

      &-messege-title {
        font-size: 30px;
        margin-bottom: 24px;
      }
    
      &-listBlock-list {
        padding-left: 20px;
    
        & li {
          font-size: 16px;
        }
      }
    
      & p {
        font-size: 16px;
      }
    }

    &-form {
      &-inputs {
        margin-bottom: 32px;
      }

      &-select label {
        font-size: 16px;
        margin-bottom: 8px;
      }

      &-addFileBtn {
        grid-gap: 8px;
    
        & svg {
          width: 22px;
          height: 22px;
        }
      }
    }

    &-motive {
      grid-gap: 6px;
      margin-bottom: 16px;

      &-title {
        font-size: 16px;
      }

      &-text {
        font-size: 16px;
      }
    }

    &-doc {
      grid-gap: 9px;
      margin-bottom: 44px;

      &-title {
        font-size: 16px;
      }

      &-name {
        font-size: 16px;
      }

      &-namEwithAction {
        grid-gap: 9px;
      }

      &-remove {
        height: 16px;
        width: 16px;
      }
    }

    &-btns {
      grid-gap: 16px;
    }
  }

  @media (max-width: 576px) {
    &-inner {
      margin-bottom: 76px;
    }
    
    &-content {
      margin-bottom: 48px;

      &-messege-title {
        font-size: 28px;
        margin-bottom: 22px;
      }
    
      &-listBlock-list {
        padding-left: 18px;
      }
    }

    &-form {
      &-inputs {
        margin-bottom: 28px;
      }
    }

    &-doc {
      margin-bottom: 40px;
    }
  }

  @media (max-width: 380px) {
  }
}
</style>
<style>
.exitParty-content-listBlock-list li  a {
  color: var(--accent-color);
}
</style>