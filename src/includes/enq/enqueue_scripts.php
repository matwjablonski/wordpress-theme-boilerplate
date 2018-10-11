<?php

$translation_array = array(
	'some_string' => __( 'Some string to translate', '@@textDomain' ),
);

wp_localize_script(
    'wood-scripts',
    'translations',
    $translation_array
);

wp_enqueue_script(
    'wood-scripts',
    get_template_directory_uri() . '/assets/js/bundle.js?v=@@version',
    array(),
    null,
    true
);