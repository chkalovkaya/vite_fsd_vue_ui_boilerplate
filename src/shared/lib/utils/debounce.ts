export function useDebounce(callback: Function, delay: number = 500): Function {
    let timeout = null as ReturnType<typeof setTimeout> | null

    return (...args: any) => {
        if (timeout) {
            clearTimeout(timeout)
        }
        timeout = setTimeout(() => {
            callback(...args)
        }, delay)
    }
}
