# 🔦 M8AX - Lux Pro (Wearable Edition) 🔦

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HarmonyOS](https://img.shields.io/badge/HarmonyOS-000000?style=for-the-badge&logo=huawei&logoColor=white)
![Status](https://img.shields.io/badge/Status-Estable-green?style=for-the-badge)
![Device](https://img.shields.io/badge/Device-Huawei%20GTS%20/%20GT%20Series-blue?style=for-the-badge)

---

Este repositorio alberga el código fuente de **M8AX Lux Pro**, una plataforma multifuncional de ingeniería para **wearables** que exprime el hardware al límite. No es solo una linterna; es un centro de utilidades tácticas, algoritmos de azar y gestión de señales lumínicas avanzadas diseñado para la serie Huawei GT/GTS.

Desarrollado en **JavaScript (LiteOS/HarmonyOS)**, el sistema destaca por su control de bajo nivel sobre el brillo del panel, el motor háptico y la corona física del dispositivo.

---

## 🛠️ Tecnologías y Arquitectura del Sistema

- **Framework:** HarmonyOS UI Framework.
- **Detección Automática de Hardware:** El sistema detecta la resolución real del reloj (`getInfoSync`) para ajustar la interfaz (por defecto **454px**).
- **Gestión Energética Radical:** Temporizador de auto-apagado de seguridad de 5 horas (`18,000,000ms`) para proteger la batería y limpieza total de procesos en `onDestroy`.
- **Control de Brillo Maestro:** Ajuste dinámico de 20 a 255 nits mediante la **corona rotatoria** o botones físicos (`handleKey`).
- **Sistema de Identidad Variable:** Pool de 5 logotipos de **M8AX** que se cargan aleatoriamente en cada inicio.

---

## ◼️ Módulos de Iluminación y Óptica

El motor de iluminación gestiona múltiples espectros y efectos visuales técnicos:

- **Espectros Tácticos:**
  - **Standard & Warm:** Luz blanca pura y modo cálido para lectura.
  - **Fishing (Verde) & Hunting (Rojo):** Optimizados para actividades cinegéticas y pesca nocturna.
  - **Blue Mode:** Espectro azul actínico.
- **Efectos Dinámicos:**
  - **Candle Effect:** Fluctuaciones de luminancia que simulan una llama real.
  - **Romantic Fader:** Transiciones suaves (fading) entre objetivos RGB aleatorios.
  - **Disco & Random Flash:** Pulsos cromáticos de alta frecuencia para eventos.

---

## ◼️ Protocolos de Emergencia y Seguridad

- **SOS Morse Visual:** Ejecución del código internacional de socorro mediante parpadeo lumínico (Blanco o Colores).
- **Beacon & V16:** Simulación de balizas de seguridad vial con tiempos estandarizados.
- **Police & Strobe:** Estroboscopio de alta intensidad (60ms) para máxima visibilidad.
- **Rescue Signal:** Patrón de destellos de largo alcance para equipos de rescate.

---

## ◼️ Utilidades y Motores de Azar

- **Modo Vibración (Haptic):** Módulo independiente con patrones rítmicos hápticos y feedback visual rojo/negro.
- **Reloj de Arena (Hourglass):** Temporizador visual de 5 minutos con persiana de llenado dinámica.
- **Dice & Coin Engine:** Simuladores de azar con animación de rodado a 50ms.
- **Digital Counter:** Cronómetro con cambio de color aleatorio por segundo.
- **Ticker & Roman Year:** Reloj digital completo con conversión del año a **Números Romanos**.

---

## ◼️ Ergonomía y Control

- **Smart Scroll Lock:** Bloqueo del menú cuando hay un módulo activo para usar la corona como regulador de brillo.
- **Keep Screen On:** Forzado de pantalla encendida en todos los modos activos.
- **Navigation Memory:** Retorno automático a la posición exacta del scroll tras desactivar una función.

---

# 🇺🇸 English Version

# 🔦 M8AX - Lux Pro (Wearable Edition) 🔦

This repository hosts the source code for **M8AX Lux Pro**, a high-performance multifunctional engineering platform for **wearables**. It is an advanced hub for tactical utilities, random algorithms, and professional light signaling designed for the Huawei GT/GTS series.

Built with **JavaScript (LiteOS/HarmonyOS)**, the system features low-level control over panel brightness, the haptic motor, and the device's physical crown.

---

## 🛠️ Technologies and System Architecture

- **Framework:** HarmonyOS UI Framework.
- **Auto Hardware Detection:** Automatically detects screen resolution (`getInfoSync`) to scale the UI (454px default).
- **Extreme Power Management:** 5-hour safety auto-off timer (`18,000,000ms`) and full process cleanup during `onDestroy`.
- **Master Brightness Control:** Dynamic adjustment from 20 to 255 nits via **physical crown rotation** or hardware keys.
- **Variable Identity System:** Randomized loading of 5 different **M8AX** logos on every app launch.

---

## ◼️ Lighting and Optical Modules

The lighting engine manages multiple technical spectrums and visual effects:

- **Tactical Spectrums:**
  - **Standard & Warm:** Pure white and warm yellow modes for general visibility.
  - **Fishing (Green) & Hunting (Red):** Optimized for night fishing and preserving night vision while hunting.
  - **Blue Mode:** High-frequency actinic blue light.
- **Dynamic Effects:**
  - **Candle Effect:** Luminance fluctuations simulating a real flame.
  - **Romantic Fader:** Interpolation engine for smooth transitions between random RGB targets.
  - **Disco & Random Flash:** High-frequency chromatic pulses for social events.

---

## ◼️ Emergency and Security Protocols

- **Visual Morse SOS:** International distress signal execution via light flashing (White or Random Colors).
- **Beacon & V16:** Road safety beacon simulation with standardized timing patterns.
- **Police & Strobe:** High-intensity strobe (60ms) for maximum critical visibility.
- **Rescue Signal:** Long-range white flash pattern designed for search and rescue teams.

---

## ◼️ Utilities and Chance Engines

- **Vibration Mode (Haptic):** Standalone module using the haptic motor (`vibrator`) with rhythmic patterns and red/black visual feedback.
- **Hourglass:** 5-minute visual timer with a dynamic filling "shutter" based on screen resolution.
- **Dice & Coin Engine:** Physical chance simulators with high-speed (50ms) rolling animations and color-shifting results.
- **Digital Counter:** Infinite stopwatch with per-second random color refreshing.
- **Ticker & Roman Year:** Digital clock with date and automatic **Roman Numeral** year conversion logic.

---

## ◼️ Ergonomics and Interface Control

- **Smart Scroll Lock:** Automatically disables list scrolling when a module is active, remapping the crown to brightness control.
- **Keep Screen On:** Forces the display to remain active during any utility execution.
- **Navigation Memory:** Uses `scrollTo` to return the user to their exact menu position after deactivating a function.