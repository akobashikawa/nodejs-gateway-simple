# nodejs-gateway-simple

Simple gateway para alternar una solicitud entre múltiples servidores. 

Para fines didácticos y de prueba.

## Uso

- El port por default es 8080. En `.env`, se puede usar PORT para indica el número de puerto.

- En `.env`, indicar los servidores a alternar, siguiendo la convención `SERVER_<url>=<url>`.

- Ejemplo:

```
PORT=8090
SERVER_A=http://192.168.1.10
SERVER_B=http://192.168.1.11
```

## Operación

- El gateway redireccionará las solicitudes a los servidores alternando de uno en uno, según el orden en que se han definido.
- Para forzar que una solicitud sea atendida por cierto servidor, indicarlo en el query string siguiendo la convención `_server=<name>`

- Ejemplo:

```
http:\\gateway.url:8080/api/myrequest?_server=a
```