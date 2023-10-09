<template>
  <section class="wrapper-main">
    <div class="newsEdit wrapper">
      <h2 class="landing-title">Новая новость</h2>

      <Form
      >
        <div class="newsEdit-form-inputs">
          <div class="newsEdit-formItem">
            <label for="" class="newsEdit-formItem-label">Заголовок</label>
            <Input
              name="title"
              type="textarea"
              placeholder="Введите текст обращения"
              :maxSymbol="100"
              staticPlaceholder
            />
          </div>

          <div class="newsEdit-formItem">
            <label for="" class="newsEdit-formItem-label">Подзаголовок</label>
            <Input
              name="subtitle"
              type="textarea"
              placeholder="Введите текст обращения"
              :maxSymbol="200"
              staticPlaceholder
            />
          </div>

          <div class="newsEdit-formItem">
            <label for="" class="newsEdit-formItem-label">Фото / Видео</label>
            <Button
              class="newsEdit-addFileBtn"
              name="Прикрепить файл"
              type="outline-blue"
              v-slot:left
            >
              <SvgIcon
                name="plus"
                :viewboxWidth="24"
                :viewboxHeight="24"
              />
            </Button>
          </div>

          <div class="newsEdit-formItem">
            <label for="" class="newsEdit-formItem-label">Текст обращения</label>
            <Input
              name="subtitle"
              type="textarea"
              placeholder="Введите текст обращения"
            />
          </div>
        </div>

        <div class="newsEdit-form-btns">
          <Button
            name="Создать новость"
            htmlType="submit"
          />
          <Button
            name="Отмена"
            htmlType="submit"
            type="default-grey"
          />
        </div>
      </Form>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.wrapper-main {
  /* background-color: var(--accent-color-op05); */
  padding-top: 40px;
}

.newsEdit {
  &-form {
    &-inputs {
      margin-bottom: 40px;
    }

    &-btns {
      display: flex;
      grid-gap: 20px;
    }
  }

  &-formItem {
    max-width: 800px;
    margin-bottom: 24px;

    &-label {
      display: inline-block;
      color: var(--light-gray-color);
      font-size: 18px;
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
}
</style>