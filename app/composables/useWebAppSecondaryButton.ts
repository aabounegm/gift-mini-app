/**
 * @file A copy of `useWebAppMainButton` since it is not yet available in the original package (vue-tg).
 */

import { computed, ref } from "vue";
import { useWebApp } from "vue-tg";

const secondaryButtonText = ref(Telegram.WebApp.SecondaryButton.text);
const secondaryButtonColor = ref(Telegram.WebApp.SecondaryButton.color);
const secondaryButtonTextColor = ref(Telegram.WebApp.SecondaryButton.textColor);
const isSecondaryButtonVisible = ref(Telegram.WebApp.SecondaryButton.isVisible);
const isSecondaryButtonActive = ref(Telegram.WebApp.SecondaryButton.isActive);
const isSecondaryButtonProgressVisible = ref(
  Telegram.WebApp.SecondaryButton.isProgressVisible
);

function updateState() {
  secondaryButtonText.value = Telegram.WebApp.SecondaryButton.text;
  secondaryButtonColor.value = Telegram.WebApp.SecondaryButton.color;
  secondaryButtonTextColor.value = Telegram.WebApp.SecondaryButton.textColor;
  isSecondaryButtonVisible.value = Telegram.WebApp.SecondaryButton.isVisible;
  isSecondaryButtonActive.value = Telegram.WebApp.SecondaryButton.isActive;
  isSecondaryButtonProgressVisible.value =
    Telegram.WebApp.SecondaryButton.isProgressVisible;
}

function setSecondaryButtonText(
  ...params: Parameters<typeof Telegram.WebApp.SecondaryButton.setText>
) {
  Telegram.WebApp.SecondaryButton.setText(...params);
  updateState();
}

function showSecondaryButton(
  ...params: Parameters<typeof Telegram.WebApp.SecondaryButton.show>
) {
  Telegram.WebApp.SecondaryButton.show(...params);
  updateState();
}

function hideSecondaryButton(
  ...params: Parameters<typeof Telegram.WebApp.SecondaryButton.hide>
) {
  Telegram.WebApp.SecondaryButton.hide(...params);
  updateState();
}

function enableSecondaryButton(
  ...params: Parameters<typeof Telegram.WebApp.SecondaryButton.enable>
) {
  Telegram.WebApp.SecondaryButton.enable(...params);
  updateState();
}

function disableSecondaryButton(
  ...params: Parameters<typeof Telegram.WebApp.SecondaryButton.disable>
) {
  Telegram.WebApp.SecondaryButton.disable(...params);
  updateState();
}

function showSecondaryButtonProgress(
  ...params: Parameters<typeof Telegram.WebApp.SecondaryButton.showProgress>
) {
  Telegram.WebApp.SecondaryButton.showProgress(...params);
  updateState();
}

function hideSecondaryButtonProgress(
  ...params: Parameters<typeof Telegram.WebApp.SecondaryButton.hideProgress>
) {
  Telegram.WebApp.SecondaryButton.hideProgress(...params);
  updateState();
}

function setSecondaryButtonParams(
  ...params: Parameters<typeof Telegram.WebApp.SecondaryButton.setParams>
) {
  Telegram.WebApp.SecondaryButton.setParams(...params);
  updateState();
}

export function useWebAppSecondaryButton() {
  const { onEvent } = useWebApp();

  const onSecondaryButtonClicked = (
    eventHandler: SecondaryButtonClickedCallback,
    options?: Parameters<typeof onEvent>[2]
    // @ts-expect-error Outdated typings
  ) => onEvent("secondaryButtonClicked", eventHandler, options);

  return {
    secondaryButtonText: computed({
      get() {
        return secondaryButtonText.value;
      },
      set(text) {
        setSecondaryButtonText(text);
      },
    }),
    secondaryButtonColor: computed({
      get() {
        return secondaryButtonColor.value;
      },
      set(color) {
        setSecondaryButtonParams({
          color,
        });
      },
    }),
    secondaryButtonTextColor: computed({
      get() {
        return secondaryButtonTextColor.value;
      },
      set(color) {
        setSecondaryButtonParams({
          text_color: color,
        });
      },
    }),
    secondaryButtonPosition: computed({
      get() {
        return Telegram.WebApp.SecondaryButton.position;
      },
      set(position) {
        Telegram.WebApp.SecondaryButton.position = position;
      },
    }),
    isSecondaryButtonVisible: computed({
      get() {
        return isSecondaryButtonVisible.value;
      },
      set(isVisible) {
        isVisible ? showSecondaryButton() : hideSecondaryButton();
      },
    }),
    isSecondaryButtonActive: computed({
      get() {
        return isSecondaryButtonActive.value;
      },
      set(isActive) {
        isActive ? enableSecondaryButton() : disableSecondaryButton();
      },
    }),
    isSecondaryButtonProgressVisible: computed({
      get() {
        return isSecondaryButtonProgressVisible.value;
      },
      set(isProgressVisible) {
        isProgressVisible
          ? showSecondaryButtonProgress()
          : hideSecondaryButtonProgress();
      },
    }),
    setSecondaryButtonText,
    onSecondaryButtonClicked,
    showSecondaryButton,
    hideSecondaryButton,
    enableSecondaryButton,
    disableSecondaryButton,
    showSecondaryButtonProgress,
    hideSecondaryButtonProgress,
    setSecondaryButtonParams,
  };
}
