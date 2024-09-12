A derivada numérica é aproximada pela fórmula:

```
v(t) ≈ (s(t + Δt) − s(t)) / Δt
```

### Aqui:

- `s(t)` representa a posição do carro em um instante `t`.
- `s(t + Δt)` é a posição após um pequeno intervalo de tempo `Δt`.
- `v(t)` é a velocidade aproximada nesse intervalo.

### No código, o cálculo está sendo feito da seguinte maneira:

- **Delta de posição**: A diferença entre a posição atual e a última posição medida:
  
  ```
  deltaPosition = position - lastSensorPassPosition
  ```

- **Delta de tempo**: A diferença entre o tempo atual e o tempo da última medição de posição:
  
  ```
  deltaTime = currentTime - lastSensorPassTime
  ```

- **Velocidade**: O cálculo da velocidade instantânea é feito ao dividir o delta da posição pelo delta do tempo:
  
  ```
  v(t) = Δs / Δt
  ```
