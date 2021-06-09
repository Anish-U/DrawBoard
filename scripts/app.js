let isDrawing = false;
let drawColor = "black";
let drawWidth = 2;
let canvasBg = "white";

let pathArray = [];
let index = -1;

const canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

canvas.height = 500;
canvas.width = window.innerWidth - 80;

context.fillStyle = canvasBg;
context.fillRect(0, 0, canvas.width, canvas.height);

canvas.addEventListener("touchstart", start, false);
canvas.addEventListener("touchmove", draw, false);
canvas.addEventListener("touchend", stop, false);

canvas.addEventListener("mousedown", start, false);
canvas.addEventListener("mousemove", draw, false);
canvas.addEventListener("mouseup", stop, false);
canvas.addEventListener("mouseout", stop, false);

function start(e) {
  isDrawing = true;
  context.beginPath();
  context.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
  e.preventDefault();
}

function draw(e) {
  if (!isDrawing) return;
  context.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
  context.strokeStyle = drawColor;
  context.lineWidth = drawWidth;
  context.lineCap = "round";
  context.lineJoin = "round";
  context.stroke();
}
function stop(e) {
  if (isDrawing) {
    context.stroke();
    context.closePath();
    isDrawing = false;
  }
  e.preventDefault();

  if (e.type != "mouseout") {
    pathArray.push(context.getImageData(0, 0, canvas.width, canvas.height));
    index++;
  }
}

const circles = document.querySelectorAll(".circle");

circles.forEach((element) => {
  element.addEventListener("click", () => {
    drawColor = element.attributes["data-color"].value;
  });
});

const colorPicker = document.getElementById("colorPicker");

colorPicker.addEventListener("input", () => {
  drawColor = colorPicker.value;
});

const widthPicker = document.getElementById("widthPicker");

widthPicker.addEventListener("input", () => {
  console.log(widthPicker.value);
  drawWidth = parseInt(widthPicker.value);
});

const clearBtn = document.getElementById("clearBtn");

clearBtn.addEventListener("click", () => {
  context.fillStyle = canvasBg;
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillRect(0, 0, canvas.width, canvas.height);
  pathArray = [];
  index = -1;
});

const undoBtn = document.getElementById("undoBtn");

undoBtn.addEventListener("click", () => {
  if (index <= 0) {
    clearBtn.click();
  } else {
    index--;
    pathArray.pop();
    context.putImageData(pathArray[index], 0, 0);
  }
});

document.addEventListener("keydown", function (event) {
  if (event.ctrlKey && event.key === "z") {
    undoBtn.click();
  }
});
