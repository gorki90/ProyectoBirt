<?php

return [

    'paths' => ['*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'],  // Permite todos los métodos, o especifica los que necesites.

    'allowed_origins' => ['*'],  // Cambia esto a la URL de tu frontend.

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],  // Permite todos los encabezados o especifica solo los necesarios.

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => false,

];