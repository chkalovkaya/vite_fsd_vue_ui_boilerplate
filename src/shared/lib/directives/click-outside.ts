import { Directive } from 'vue'

export const VClickOutside: Directive & { name: string } = {
    name: 'click-outside',
    beforeMount(el, binding) {
        el.clickOutsideEvent = function (event: Event) {
            if (!(el === event.target || el.contains(event.target))) {
                binding.value(event, el)
            }
        }
        document.body.addEventListener('click', el.clickOutsideEvent)
    },
    unmounted(el) {
        document.body.removeEventListener('click', el.clickOutsideEvent)
    },
}
