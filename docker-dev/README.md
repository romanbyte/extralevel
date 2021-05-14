### Локальная разработка с использованием Docker

[Установка Docker](https://docs.docker.com/get-docker/) 

Для сборки и запуска контейнеров используется docker-compose
([устанавливается отдельно](https://docs.docker.com/compose/install/)).

**Запуск проекта**

При первом запуске проекта находясь в директории `./docker-env` выполнить команды:
- `docker-compose build` — сборка образов
- `docker-compose up -d` — запуск контейнеров

При повторном запуске достаточно запустить команду `docker-compose up -d`, 
так как образы уже собрались ранее.


Инспектировать работу контейнеров можно с помощью команды `docker-compose -f logs extralevel-main-static` 
или 
например [PhpStorm](https://www.jetbrains.com/help/phpstorm/docker.html)
или [VSCode](https://code.visualstudio.com/docs/containers/overview).

Останавливать контейнеры нужно командой `docker-compose down`.


**Работа с приложением в докере**

В контейнере можно выполнять всю ручную работу с проектом 
- `docker exec -it extralevel-main-static export HOME /home/node/app s6-setuidgid node bash` —
  войти в shell контейнера `extralevel-main-static`.

Войти в контейнер можно под пользователем root, запустив bash без экспорта переменной HOME 
и установки идентификаторов пользователя и группы, но без необходимости этого делать 
не рекомендуется во избежание проблем с правами.

- `docker exec -it extralevel-main-static bash` — войти под пользователем `root`.
