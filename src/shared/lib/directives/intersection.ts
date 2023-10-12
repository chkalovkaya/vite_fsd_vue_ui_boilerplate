import { Directive } from 'vue'

export const VIntersection: Directive & { name: string } = {
    name: 'intersection',
    mounted(el, binding) {
        const options: IntersectionObserverInit = {
            rootMargin: '0px',
            threshold: 1,
        }

        const callback: IntersectionObserverCallback = entries => {
            if (entries[0].isIntersecting) {
                binding.value()
            }
        }

        const observer = new IntersectionObserver(callback, options)
        observer.observe(el)
    },
}
