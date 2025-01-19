# React-приложение для тегирования изображений

Это приложение на React, которое позволяет пользователям просматривать изображения, загружать дополнительные теги для изображений с использованием различных моделей (например, "vit", "clip") и отображать теги динамически.

## Возможности

- **Отображение изображений**: Просмотр изображений в модальном окне с функцией увеличения.
- **Динамическая загрузка тегов**: Получение и отображение тегов с использованием различных моделей.
- **Поиск и фильтрация**: Поиск изображений и отображение соответствующих тегов.
- **Адаптивный дизайн**: Полностью адаптивный и стилизованный с использованием CSS.

## Начало работы

Следуйте этим шагам, чтобы настроить и запустить проект локально.

### 1. Требования

- [Node.js](https://nodejs.org/) (рекомендуемая версия 16.x и выше)
- npm или yarn (Менеджер пакетов для Node.js)

### 2. Установка

1. Клонируйте репозиторий:

   ```bash
   git clone <repository-url>
   cd <repository-folder>

2. Установите зависимости:

    ```bash
    npm install
    # или
    yarn install

3. Back-end приложения брался из репозиториия:

    https://github.com/NeZlox/cii.git
    В нём подробно описано подключение  

    ИЛИ

    Настройте конфигурацию API в файле src/api/config.js Обновите объект endpoints, чтобы соответствовать вашим маршрутам API

### 3.Запуск приложения

Чтобы запустить сервер разработки воспользуйтесь командами :

   ```bash
   npm start
  ```
 или
  ```bash
   yarn start
  ```
Приложение будет доступно по адресу http://localhost:3000.

### 4.Структура проекта

  ```text
  src/
  ├── components/          # Переиспользуемые React-компоненты
  │   ├── ImageModal.js    # Модальное окно для отображения изображений и загрузки тегов
  ├── api/
  │   ├── config.js        # Конфигурация API
  ├── styles/
  │   ├── App.css          # Основные стили CSS
  ├── App.js               # Корневой компонент
  ├── index.js             # Точка входа в React
  ```

### 5.Конфигурация

Убедитесь, что вы настроили API эндпоинты в файле src/api/config.js. Пример структуры:

```script
  export const config = {
    endpoints: {
      tags: {
        types: {
          vit: "/api/tags/vit",
          clip: "/api/tags/clip",
          union: "/api/tags/union",
          intersection: "/api/tags/intersection",
        },
      },
    },
  };
```
### 6.Доступные скрипты

В директории проекта вы можете выполнить следующие команды:
  
  ```bash npm start / yarn start ``` — Запускает приложение в режиме разработки. Откройте http://localhost:3000, чтобы просмотреть его в браузере.
  
  ```bash npm run build / yarn build ``` — Создаёт сборку для продакшн-режима в папке build. Приложение будет оптимизировано для лучшей производительности.

### 7.Как использовать

  1. Загрузить изображение: Выберите изображение для загрузки и просмотра в модальном окне.
  2. Загрузить теги: Используйте доступные кнопки для получения тегов с разных моделей (например, "vit", "clip").
  3. Поиск изображений: Используйте функцию поиска, чтобы найти изображения и просмотреть их теги.

### 8.Зависимости

Проект использует следующие основные зависимости:

  React: Библиотека для создания пользовательских интерфейсов.
  Axios: Клиент для работы с HTTP-запросами.
  Полный список зависимостей можно увидеть в файле package.json.

### 9.Лицензия

  Этот проект лицензирован на условиях MIT License.

### 10. Репозиторий

  Фронтенд и API этого проекта содержатся в репозитории cii. В репозитории вы найдете как код для клиентской части (фронтенд, использующий React), так и для серверной части (API), которые работают вместе для реализации функционала:
  
back-end: https://github.com/NeZlox/cii.git

front-end: https://github.com/andryousik/sii.git
