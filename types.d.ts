/// <reference types="@types/telegram-web-app" />

declare module "*.svg" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent;
  export default component;
}

declare module "*.png" {
  const url: string;
  export default url;
}
