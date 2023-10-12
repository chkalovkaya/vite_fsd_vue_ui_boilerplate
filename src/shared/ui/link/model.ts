import { type UseLinkOptions } from 'vue-router'

export interface ILink extends UseLinkOptions {
    name?: string
    disabled?: boolean
    target?: '_blank'
}
