<?php

return [

    'paths' => ['*', 'sanctum/csrf-cookie', 'storage/*'],

    'allowed_methods' => ['*'],  // Permite todos los métodos.

    'allowed_origins' => ['*'],  // permite todos los origenes

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],  // Permite todos los encabezados o especifica solo los necesarios.

    'exposed_headers' => ['*'],

    'max_age' => 0,

    'supports_credentials' => false,

];