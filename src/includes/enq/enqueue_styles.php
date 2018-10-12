<?php

wp_enqueue_style(
    'wood-styles',
    get_template_directory_uri() . '/assets/css/app.css?v=@@version',
    array(),
    null,
    'all'
);  