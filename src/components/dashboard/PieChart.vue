<script setup>
import Chart from "chart.js/auto";
import { onMounted, ref } from "vue";
const areaToDraw = ref(null);

const draw = (ctx) => {
  return new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["In-Progress", "Expired", "Completed"],
      datasets: [
        {
          label: "In-Progress, Expired, Completed",
          data: [300, 50, 100],
          backgroundColor: [
            "rgb(54, 162, 235)",
            "rgb(255, 99, 132)",
            "rgb(50, 193, 186)",
          ],
          hoverOffset: 4,
        },
      ],
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
