function getAndFormatTime() {
  function padZero(n) {
    return String(n).padStart(2, "0");
  }
  const now = new Date();
  const hours = padZero(now.getHours());
  const minutes = padZero(now.getMinutes());
  const seconds = padZero(now.getSeconds());

  const time = `${hours}:${minutes}:${seconds}`;
  const utcTime = `UTC 0: ${now.toUTCString().split(" ").at(4)}`;
  document.getElementById("clock").textContent = time;
  document.getElementById("timezone").textContent = utcTime;
}

const canvas = document.getElementById("clock-face");
const context = canvas.getContext("2d");
let radius = canvas.height / 2;
context.translate(radius * 2, radius);
radius = radius * 0.9;

function drawClock() {
  context.clearRect(
    -canvas.width / 2, // because we translated the origin later
    -canvas.height / 2,
    canvas.width,
    canvas.height
  );

  context.arc(0, 0, radius, 0, 2 * Math.PI);
  context.fillStyle = "#6b9a9400";
  context.fill();

  context.beginPath();
  context.arc(0, 0, radius * 0.05, 0, 2 * Math.PI);
  context.fillStyle = "#333";
  context.fill();

  context.font = 0.2 * radius + "px arial";
  context.textBaseline = "middle";
  context.textAlign = "center";

  for (let i = 1; i <= 12; i++) {
    const ang = (i * Math.PI) / 6;
    const x = Math.cos(ang) * radius * 0.85;
    const y = Math.sin(ang) * radius * 0.85;
    context.fillText("•", x, y);
  }

  drawTime(context, radius);
}

function drawTime(ctx, radius) {
  const now = new Date();
  let hour = now.getHours();
  let minute = now.getMinutes();
  let second = now.getSeconds();
  //hour
  hour = hour % 12;
  hour = (hour * Math.PI) / 6 + (minute * Math.PI) / (6 * 60) + (second * Math.PI) / (360 * 60);
  drawHand(ctx, hour, radius * 0.5, radius * 0.07);
  //minute
  minute = (minute * Math.PI) / 30 + (second * Math.PI) / (30 * 60);
  drawHand(ctx, minute, radius * 0.8, radius * 0.07);
  // second
  second = (second * Math.PI) / 30;
  drawHand(ctx, second, radius * 0.9, radius * 0.02);
}

function drawHand(ctx, pos, length, width) {
  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.moveTo(0, 0);
  ctx.rotate(pos);
  ctx.lineTo(0, -length);
  ctx.stroke();
  ctx.rotate(-pos);
}

document.addEventListener("DOMContentLoaded", () => {
  getAndFormatTime();
  drawClock();
  setInterval(() => {
    getAndFormatTime();
    drawClock();
  }, 1000);
});
