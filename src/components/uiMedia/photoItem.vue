<template>
  <button
    class="newsItem withZoomPreview"
  >

    <!-- Preview -->
    <!-- :style="`background-image:url('https://api.respublica.codetau.com/${data.preview_image}');`" -->
    <div class="newsItem-preview withZoomPreview-preview">
      <div
        class="newsItem-preview-img bg-cover withZoomPreview-preview-img"
        :style="`background-image:url('https://api.respublica.codetau.com/${data.image}');`"
      ></div>
    </div>

    <!-- Delete Button -->
    <div class="newsItem-delete">
      <Button
        type="default-light-grey"
        @click="deletePhoto"
      >
        <SvgIcon
          name="trash-edit-with-bg"
          :viewboxWidth="50"
          :viewboxHeight="50"
        />
      </Button>
    </div>
  </button>
</template>

<script setup lang="ts">
import axios from 'axios'
import { ref } from "vue";
import { useToast } from '../../modules/toast'

interface IProps {
  data: any,
}

const props = defineProps<IProps>()

const { toast } = useToast()

const isLoading = ref(false);
const token = localStorage.getItem('TOKEN');

// Send Send Photo
const deletePhoto = () => {
  isLoading.value = true;
  const url = `https://api.respublica.codetau.com/api/v1/admin/articles/images`;
  // const url = `https://api.respublica.codetau.com/api/v1/admin/articles/{id}?article_id=${data.id}`;
  console.log('props', props.data.id);
  axios({
    method: "delete",
    url: url,
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + token
    }
  })
    .then((response) => {
      console.log('response', response);

      toast({
        message: 'Фотография удалена!',
        type: 'success'
      })

      isLoading.value = false;
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
      isLoading.value = false;
    });
}
</script>

<style scoped lang="scss">
.newsItem {
  text-align: left;

  padding: 10px;

  border-radius: 10px;
  border: 1px solid transparent;
  background-color: white;

  position: relative;
  overflow: hidden;

  transition: all .3s ease-in-out;

  &:hover {
    border-color: var(--accent-color);
    background-color: var(--accent-color-op05);

    & .newsItem-delete {
      right: 20px;
    }
  }

  &-preview {
    width: 100%;
    border-radius: 10px;

    &-img {
      padding-bottom: 72%;
    }
  }

  &-delete {
    height: 60px;
    
    position: absolute;
    right: 20px;
    top: 20px;
    z-index: 2;

    padding: 5px;
    border-radius: 10px;
    background-color: white;

    transition: all .3s ease-in-out;

    & button {
      height: 50px;
      width: 50px;
      padding: 0px !important;
      margin: 0px !important;

      &:hover {
        background-color: var(--red-color-op10) !important;
  
        & svg {
          stroke: var(--red-color);
        }
      }
    }
    
    & svg {
      height: 50px;
      width: 50px;
      stroke: var(--light-gray-color);

      transition: all .3s ease-in-out;
    }

  }
}
</style>