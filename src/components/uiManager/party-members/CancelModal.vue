<template>
  <Modal
    v-if="props.show"
    @hide="emits('hide')"
    class="exitParty"
    :title="$t('party.rejection-of-the-exit-from-the-parties')"
  >
    <Form
      @finish="postCencelExitParty"
    >
      <div class="exitParty-inputs">

        <Input
          name="motive"
          type="textarea"
          :placeholder="$t('formdata.enter-the-reason-for-not-agreeing')"
          staticPlaceholder
          required
        />

        <Button
          class="exitParty-addFileBtn"
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

        <div class="exitParty-doc">
          <h4 class="exitParty-doc-title">{{ $t('formdata.document') }}:</h4>
          <label v-if="!file" for="upload-files" class="exitParty-doc-name empty">{{ $t('formdata.be-sure-to-attach-the-file-of-the-completed-form') }}</label>
          <div v-else class="exitParty-doc-namEwithAction">
            <div class="exitParty-doc-name">{{ file?.name }}</div>
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
      </div>
      

      <Button
        :name="$t('button.sand')"
        :loading="loading"
        htmlType="submit"
      />
    </Form>
  </Modal>
</template>

<script setup lang="ts">
// Components
import { ref } from 'vue'
import axios from 'axios'
import { useI18n } from 'vue-i18n'

// Modules
import { useToast } from '@/modules/toast'

const { t } = useI18n()
const { toast } = useToast()

interface IProps {
  show: boolean,
  id: number
}
interface Emits {
  (event: 'hide'): Function,
  (event: 'finish'): Function,
}

const props = defineProps<IProps>()
const emits = defineEmits<Emits>()

const loading = ref(false)
const file = ref()
const fileTypes = ['doc', 'docx', 'pdf', 'png', 'jpg', 'jpeg', 'PNG', 'JPG'];
const token = localStorage.getItem('access_token');

const clickInputFile = () => {
  document.getElementById('upload-files')?.click();
}

const deleteFile = () => {
  file.value = null;
}

const uploadFiles = (event) => {
  if (event.target.files.length > 0) {
    if (isDocx(event.target.files[0].name)) file.value = event.target.files[0];
    else {
      toast({
        message: `${t('message.the-document-must-be-extended')} ${fileTypes.join(', ')}`
      })
    }
  }
}

const isDocx = (fileName) => {
  const type = fileName.split(".")
  return fileTypes.includes(type[type.length - 1])
}

const postCencelExitParty = ({ motive }: { motive: string }) => {
  loading.value = true;
  const url = `https://api.respublica-partiyasy.kz/api/v1/admin/parties/memberships/resignations/${props.id}/reject?reason_for_reject=${motive}`

  const formData = new FormData();
  formData.append("document_of_reject", file.value);

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
      emits('finish');
      toast({
        message: 'Отказ успешно отправлен',
        type: 'success'
      })
      
      loading.value = false;
    })
    .catch((err) => {
      console.log('err', err);

      toast({
        message: 'Возникли ошибки при запросе'
      })
      loading.value = false;
    });
}
</script>

<style scoped lang="scss">
.exitParty {
  &-inputs {
    &-home {
      display: grid;
      grid-template-columns: 1fr 135px 135px;
      grid-gap: 16px;
    }
    &-subtitle {
      display: block;
      font-size: 20px;
      font-weight: 500;
      margin-bottom: 10px;
    }

    &-gender {
      display: grid;
      grid-template-columns: 1fr 140px 140px;
      grid-gap: 20px;

      & button {
        height: 60px;
      }
    }
  }

  &-addFileBtn {
    display: inline-flex;
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
