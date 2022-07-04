# Fran_Lobo_Back-Final-Project-202205-MAD

Análisis inicial del proyecto final:

Temática:

Aplicación mobile donde poder encontrar el juego de mesa que buscas. Nos permite guardar y editar nuestra propia lista de favoritos de juegos , mostrarlos, añadirlos o borrarlos.
También nos proporciona información extra como un ranking de juegos mas jugados o añadidos por los usuarios al igual que tiendas donde poderlos comprar.

---

Elementos de la aplicación

Páginas

. Home
. Login
. Personal playlist
. Ranking
.Themes

Componentes y responsabilidades

. Comunes

        Header: Mostrar logo y cabecera.Pintar componente login.
        Footer : Opciones de navegación, funcionalidad de cambio página.
        Navigation: Funcionalidad de cambio de página.

. Home ( Header, Footer y Navigation)

      Search: Nos permite buscar el juego por su nombre.
      Info: Muestra información estática sobre los juegos más clásicos ( A modo de ejemplo).

. Login

      Login: Recoger entrada de usuario y cambiar estado guest/logged  (ESTADO)

. Personal playlist (Header, Footer , Navigation)

      Search: Recoger entrada de usuario sobre la que se mostrará en lista (ESTADO)
      List: Mostrar API local de favoritos en función de lo que  especifique filter. (ESTADO)
      Game: Mostrar información de juego.

. Ranking Incluye Header, Footer y Navigation.

. Themes Incluye Header , Footer y Navigation.

Milestones:

---

Orden de creación de páginas

. Home
. Ranking
. Personal Playlist
. Themes

Prioridad de detalles de implementación

Básico: Imprescindible, realizar en primeras etapas. Estado por defecto
Avanzado: Añadidos de mejora de funcionalidades, añadir una vez completado básico y su testing al 100%.

. Header

. Login-botón
. Profile- botón

. Footer

. Botones de Navegación

. Info

. Imágenes estáticas
. Panel de descripción (Descripción del juego, url a video con instrucciones de uso)
. Valoraciones (Estrellas) Avanzado

. Search

. Buscador de juegos.
. Login

. Personal Playlist

. Lista de juegos
. Juego clickable para ir a details, botón borrar

. Ranking

. Mostrar los 5 juegos más añadidos a las listas de favoritos de los usuarios

. Themes

. Listas de juegos por temas.
. Lista de juegos por votación de usuarios. Avanzado

. Details

. Imagen de juego
. Descripción del juego
. Valoraciones
. Dificultad
. url (Video de instrucciones)
