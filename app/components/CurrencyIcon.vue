<script setup lang="ts">
import UsdtFilled from "~/assets/currencies/usdt-filled.svg";
import TonFilled from "~/assets/currencies/ton-filled.svg";
import EthFilled from "~/assets/currencies/eth-filled.svg";
import UsdtEmpty from "~/assets/currencies/usdt-empty.svg";
import TonEmpty from "~/assets/currencies/ton-empty.svg";
import EthEmpty from "~/assets/currencies/eth-empty.svg";

const { filled = false } = defineProps<{
  filled?: boolean;
  currency: "USDT" | "TON" | "ETH";
}>();

const filledMap = {
  USDT: UsdtFilled,
  TON: TonFilled,
  ETH: EthFilled,
};
const emptyMap = {
  USDT: UsdtEmpty,
  TON: TonEmpty,
  ETH: EthEmpty,
};
const iconMap = filled ? filledMap : emptyMap;
</script>

<template>
  <component :is="iconMap[currency]" :filled class="!mb-0" />
</template>
