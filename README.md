# Screeps TypeScript - Plantilla Starter

![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-blue?logo=typescript&logoColor=white)
![Node](https://img.shields.io/badge/Node-%3E%3D16.x-green?logo=node.js&logoColor=white)
![Screeps](https://img.shields.io/badge/Screeps-MMO-orange?logo=)
![License](https://img.shields.io/badge/License-MIT-yellow)
![Build](https://img.shields.io/badge/Build-Rollup-red?logo=rollup.js&logoColor=white)

> **Versión custom no oficial** - Plantilla minimalista para Screeps con TypeScript, optimizada para desarrollo profesional mediante API + Build Pipeline.

## ¿Por qué esta plantilla?

Usa **API + Build Pipeline** (estándar profesional) en lugar del editor in-game o carpetas locales enlazadas.

**Ventajas clave:**
- ✅ TypeScript completo con tipado y autocomplete
- ✅ Organización modular escalable
- ✅ Source maps con ErrorMapper para debugging preciso
- ✅ ESLint + Prettier preconfigurados
- ✅ Funciona en Screeps Web (MMO oficial) y servidores privados
- ✅ Base minimalista sin código innecesario

**Comparación:**

| Característica | Editor In-game | Carpeta Local | Esta Plantilla |
|---------------|----------------|---------------|----------------|
| TypeScript | ❌ | ⚠️ Manual | ✅ Automático |
| Funciona en Web | ✅ | ❌ | ✅ |
| Modular + Git | ❌ | ⚠️ | ✅ |
| Proyectos grandes | ❌ | ⚠️ | ✅ |

---

## Instalación

**Requisitos:** [Node.js](https://nodejs.org/) ≥16.x

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar credenciales (obtener token en screeps.com/a/#!/account)
cp screeps.sample.json screeps.json  # Linux/Mac
# o
Copy-Item screeps.sample.json screeps.json  # Windows

# Editar screeps.json con tu token

# 3. Desarrollar
npm run watch-main  # Compila y sube automáticamente al guardar
```

---

## Estructura

```
src/
├── main.ts             # Punto de entrada - Loop principal
├── types/
│   └── global.d.ts     # Extensiones de tipos globales
└── utils/
    └── ErrorMapper.ts  # Source map debugging
dist/                   # Código compilado (auto-generado)
screeps.json            # Credenciales (gitignored)
```

## Comandos

```bash
npm run watch-main    # Desarrollo: compila y sube automáticamente
npm run push-main     # Compilar y subir una vez
npm run build         # Solo compilar (sin subir)
npm run lint          # Verificar código con ESLint
```

## Recursos

- [API Reference](https://docs.screeps.com/api/) - Documentación oficial de Screeps
- [typed-screeps](https://github.com/screepers/typed-screeps) - Definiciones TypeScript
- [screeps-typescript-starter](https://github.com/screepers/screeps-typescript-starter) - Plantilla original

---

**Basado en [screeps-typescript-starter](https://github.com/screepers/screeps-typescript-starter)** - Versión custom simplificada y optimizada.
