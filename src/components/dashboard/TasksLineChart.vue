<script setup>
import Chart from "chart.js/auto";
import { onMounted, ref } from "vue";
const areaToDraw = ref(null);

const draw = (ctx) => {
  return new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Monday", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "Tasks",
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: "rgb(61, 165, 233)",
          tension: 0.1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
};

const drawBarGraph = () => {
  let ctx = null;
  if (areaToDraw.value !== null && areaToDraw.value !== undefined) {
    ctx = areaToDraw.value.getContext("2d");
  }
  if (ctx !== null && ctx !== undefined) {
    return draw(ctx);
  } else {
    return null;
  }
};
onMounted(() => {
  drawBarGraph();
});
</script>
<template>
  <canvas ref="areaToDraw" width="400" height="250"></canvas>
</template>
