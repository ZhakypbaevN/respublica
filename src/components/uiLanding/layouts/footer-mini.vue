<template>
  <footer class="footer">
    <div class="wrapper landing-wrapper">
      <div class="footer-inner">
        <div class="footer-left">
          <p class="footer-copyright">© 2023 партия RESPUBLICA</p>
          <button class="footer-siteRightBtn">Все права защищены.</button>
        </div>
        
        <div class="footer-snList">
          <a href="https://www.facebook.com/profile.php?id=100090395200403&mibextid=D4KYlr" target="_blank" class="footer-snList-item">
            <SvgIcon
              name="facebook-dark"
              :viewboxHeight="32"
              :viewboxWidth="32"
            />
          </a>
          
          <a href="https://instagram.com/respublica_partiyasy?igshid=MzRlODBiNWFlZA==" target="_blank" class="footer-snList-item">
            <SvgIcon
              name="instagram-dark"
              :viewboxHeight="32"
              :viewboxWidth="32"
            />
          </a>
          
          <a href="#" class="footer-snList-item">
            <SvgIcon
              name="whatsapp-dark"
              :viewboxHeight="32"
              :viewboxWidth="32"
            />
          </a>

          <a href="https://youtube.com/@respublica_partiyasy?si=lu_6apPVAJCFtd0z" target="_blank" class="footer-snList-item">
            <SvgIcon
              name="youtube-dark"
              :viewboxHeight="32"
              :viewboxWidth="32"
            />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import SvgIcon from '../../../components/common/SvgIcon.vue'
import Button from '../../../components/common/Button.vue'
</script>

<style scoped lang="scss">
.footer {
  padding: 80px 0 50px;
  background-color: var(--primary-color);

  & * {
    color: white;
  }

  &-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &-snList {
    display: flex;
    grid-gap: 20px;
    margin-bottom: 30px;

    &-item {
      height: 42px;
      width: 42px;
      
      display: flex;
      justify-content: center;
      align-items: center;

      background-color: white;
      border-radius: 100%;

      & svg {
        width: 60%;
        height: 60%;
      }
    }
  }

  &-description {
    max-width: 596px;
  }

  &-copyright {
    font-size: 18px;
    margin-bottom: 10px;
  }
  &-siteRightBtn {
    font-size: 18px;
  }
}
</style>