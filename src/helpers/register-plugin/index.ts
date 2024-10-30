import type { App } from 'vue'
import type { IAppPlugin } from './IAppPlugin.interface'
import type { ClassConstructor } from '../../types/ClassConstructor.type'

export const registerPlugin = (app: App, plugin: ClassConstructor<IAppPlugin>, options: any) => {
  new plugin().register(app, options)
}
