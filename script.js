const car = document.getElementById("car");
const street = document.getElementsByClassName("street");
const speedDisplay = document.getElementById("speed");
const timeDisplay = document.getElementById("time");
const sensorSpeedDisplay = document.getElementById("sensor-speed");
const sensorTimeDisplay = document.getElementById("sensor-time");
const speedControl = document.getElementById("speed-control");

let position = 0;
let lastTimestamp = null;
const sensorPosition = 800;
let hasPassedSensor = false;
let totalTimeMoving = 0;

function startCarMovement() {
  requestAnimationFrame(updateCarPosition);
}

function updateCarPosition(timestamp) {
  if (!lastTimestamp) lastTimestamp = timestamp;

  const deltaTime = (timestamp - lastTimestamp) / 1000;
  lastTimestamp = timestamp;

  const velocity = calculateVelocity();
  position += velocity * deltaTime;

  car.style.left = `${position}px`;

  let sensorPass = checkSensorPass(position);
  
  if (velocity > 0) {
    totalTimeMoving += deltaTime; 
  }

  displayValues(velocity, totalTimeMoving, sensorPass);

  if (position < street[0].clientWidth - 50) {
    requestAnimationFrame(updateCarPosition);
  }
}

function calculateVelocity() {
  return parseFloat(speedControl.value);
}

let pulseRadar = 0;
let velocityRadar = 0;

function checkSensorPass(position) {
  if (position >= sensorPosition && !hasPassedSensor) {
    if (pulseRadar <= 2) {
      pulseRadar++;
      velocityRadar = calcVelocityInstant(position);
    } else {
      hasPassedSensor = true;
      return velocityRadar;
    }
  }
}

function displayValues(velocity, time, sensorPass) {
  speedDisplay.textContent = velocity.toFixed(2);
  timeDisplay.textContent = time.toFixed(2);

  if (sensorPass > 0) {
    sensorSpeedDisplay.textContent = sensorPass.toFixed(2);
    sensorTimeDisplay.textContent = time.toFixed(2);
  }
}

let lastSensorPassTime = null;
let lastSensorPassPosition = null;

// A derivada da posição em relação ao tempo é dada por:
// 𝑣(𝑡) = 𝑑𝑠(𝑡)/𝑑𝑡
// Isso significa que, numericamente, a velocidade instantânea é:
// 𝑣(𝑡) ≈ ( 𝑠(𝑡 + Δ𝑡) − 𝑠(𝑡) ) / Δ𝑡

function calcVelocityInstant(position) {
  const currentTime = lastTimestamp / 1000;

  if (lastSensorPassTime === null) {
    lastSensorPassTime = currentTime;
    lastSensorPassPosition = position;
    return 0;
  } else {
    // Δs (variação da posição)
    const deltaPosition = position - lastSensorPassPosition;

    // Δt (variação do tempo)
    const deltaTime = currentTime - lastSensorPassTime;

    // Atualizar os valores para a próxima passagem
    lastSensorPassTime = currentTime;
    lastSensorPassPosition = position;

    // Aplicar a fórmula da derivada numérica (Δs / Δt)
    if (deltaTime > 0) {
      return deltaPosition / deltaTime;
    } else {
      return 0;
    }
  }
}

startCarMovement();
