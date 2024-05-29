<template>
  <Modal
    @hide="emit('hide')"
    class="editModal"
    :title="data ? t('editing-a-user') : t('create-a-user')"
  >
    <Form
      @finish="onEditUser"
    >
      <div class="editModal-inner" v-if="userData">
        <div class="editModal-inputs">
          <Input
            name="iin"
            :placeholder="$t('formdata.iin')"
            mask="############"
            v-model="userData.iin"
            required
          />

          <Input
            name="lastname"
            :placeholder="$t('formdata.surname')"
            v-model="userData.last_name"
            required
          />

          <Input
            name="name"
            :placeholder="$t('formdata.name')"
            v-model="userData.first_name"
            required
          />

          <Input
            name="middleName"
            :placeholder="$t('formdata.middle-name')"
            v-model="userData.middle_name"
          />
        </div>

        <Select
          name="role"
          :placeholder="$t('formdata.role')"
          :options="rolesList"
          v-model="userData.role"
          required
        />
        
        <div class="editModal-inputs">
          <Input
            type="tel"
            name="phone"
            v-model="userData.phone"
            :placeholder="$t('formdata.phone')"
            validation="phone"
            :min="17"
            required
          />

          <Input
            type="email"
            name="email"
            v-model="userData.email"
            placeholder="Email"
            validation="email"
            required
          />

          <Input
            type="password"
            validation="password"
            v-model="userData.password"
            :name="!data ? 'password' : ''"
            :placeholder="$t('formdata.password')"
            :required="!data"
          />
        </div>
      </div>

      <Button
        :name="$t(
          data
            ? 'button.save'
            : 'button.create'
        )"
        :loading="loading"
        htmlType="submit"
      />
    </Form>
  </Modal>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import { ref, onMounted } from 'vue'

  import { IUser } from '@/types/users';
  import { postUser, putUser } from '@/actions/uiAdmin/users';
  import { useToast } from '@/modules/toast'
  import formatPhone from '@/helpers/formatPhone.js'

  const { t } = useI18n()
  const { toast } = useToast()

  interface IProps {
    data?: IUser
  }
  interface Emits {
    (event: 'hide'): Function,
    (event: 'reloadTable'): Function,
    (event: 'update:data', value: any): void
  }

  const props = defineProps<IProps>()
  const emit = defineEmits<Emits>()
  
  const userData = ref<IUser>();
  const loading = ref(false);

  onMounted(() => {
    if (props.data) {
      userData.value = Object.assign({}, props.data);
      if (userData.value.role === null) userData.value.role = '--';
    } else userData.value = {
      iin: null,
      first_name: null,
      last_name: null,
      middle_name: null,
      phone: null,
      role: null,
      password: null,
      email: null,
      is_deleted: false
    }
  })

  const rolesList = [
    {
      label: t('status.admin'),
      value: 'admin'
    },
    {
      label: t('status.client'),
      value: '--'
    },
    {
      label: t('status.manager'),
      value:'manager'
    },
    {
      label: t('status.media'),
      value: 'editor'
    },
    // {
    //   label: t('status.handling-requests'),
    //   value: t('status.unemployed')
    // }
  ]

  const onEditUser = async ({ password }: { password: string }) => {
    loading.value = true
    try {
      const formData = new FormData();
  
      for (const key in userData.value) {
        if (key === 'phone') formData.append(key, formatPhone(userData.value[key]))
        else if (key === 'password' && userData.value.password) formData.append(key, userData.value.password!.trim() === '' ?  null : userData.value[key])
        else if (key === 'role' && userData.value[key] !== '--') formData.append(key, userData.value[key] == '--' ? null : userData.value[key])
        else if (key !== 'role') formData.append(key, userData.value[key]);
      }

      if (!userData.value.password || userData.value.password!.trim() === '') formData.delete('password')

      const response = props.data
        ? await putUser(props.data.id, formData)
        : await postUser(formData)

      toast({
        message: props.data
          ? t('message.the-user-has-been-successfully-edited')
          : t('message.the-user-has-been-successfully-created'),
        type: 'success'
      })

      emit('update:data', response)
      emit('reloadTable')
      emit('hide')
      
    } catch (err) {
      if (err.response.data.detail === 'IIN is already!') {
        toast({
          message: t('message.iin-is-already'),
          type: 'warning'
        })
      } else if (err.response.data.detail === 'Phone number is already!') {
        toast({
          message: t('message.phone-number-is-already'),
          type: 'warning'
        })
      }
    } finally {
      loading.value = false
    }
  }
</script>


<style scoped lang="scss">
.editModal {
  
  &-inner {
    display: flex;
    flex-direction: column;
    grid-gap: 18px;
    
    margin-bottom: 20px;
  }
}

</style>
