import { ref, computed, ComputedRef } from 'vue'

const progress = ref(0)

interface IProgress {
  readonly value: ComputedRef<string>
  readonly visible: ComputedRef<boolean>
  start: () => Promise<void>
  end: () => Promise<void>
}

const sleep = (timeout: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, timeout))

export default class Progress implements IProgress {
  readonly value = computed(() => progress.value + '%')
  readonly visible = computed(() => progress.value > 0 && progress.value <= 100)

  start = async () => {
    await this.go(70)
  }

  private go = async (value: number, timeout = 0, interval = 10) => {
    if (value < progress.value) {
      progress.value = value
      return
    }

    const values = Array(value - progress.value)
      .fill(null)
      .map((_, index) => progress.value + index)
    for await (const number of values) {
      if (number < progress.value) break
      progress.value = number
      await sleep(interval)
    }
    await sleep(timeout)
  }

  end = async () => {
    await this.go(100, null, null)
    await this.go(101, 100)
    await this.go(0)
  }
}
