<?php

if (!defined('ABSPATH')) {
    exit;
}

add_action('after_switch_theme', 'flush_rewrite_rules');

load_theme_textdomain('@@textDomain');

if(!defined('WOOD_THEME_DIR')) {
    define ('WOOD_THEME_DIR', get_theme_root().'/'.get_template().'/');
}

if(!defined('WOOD_THEME_DIR')) {
    define ('WOOD_THEME_DIR', WP_CONTENT_URL.'/themes/'.get_template().'/');
}

if (defined('WP_DEBUG')) {
    require_once WOOD_THEME_DIR . 'includes/debug/console-log.php';
}

add_action('after_setup_theme', 'theme_setup');
add_action('wp_enqueue_scripts', 'theme_styles');
add_action('wp_enqueue_scripts', 'theme_scripts');

if (!function_exists('theme_setup')) {
    function theme_setup() {
        add_theme_support(
            'html5',
            array(
                'comment-list',
                'comment-form',
                'search-form',
                'gallery',
                'caption'
            )
        );

        remove_action('wp_head', 'wp_generator');
        remove_action('wp_head', 'print_emoji_detection_script', 7);
        remove_action('wp_print_styles', 'print_emoji_styles');

        show_admin_bar(false);
    }
}

if (!function_exists('theme_styles')) {
    function theme_styles() {
        require_once WOOD_THEME_DIR . 'includes/enq/enqueue_styles.php';
    }
}

if (!function_exists('theme_scripts')) {
    function theme_scripts() {
        require_once WOOD_THEME_DIR . 'includes/enq/enqueue_scripts.php';
    }
}