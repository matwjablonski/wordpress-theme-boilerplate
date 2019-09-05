<?php
/*
Template Name: Home page
*/
    if (!defined('ABSPATH')) {
        exit;
    }
    get_header();
    if ( have_posts() ) :
        while ( have_posts() ) :
            the_post(); 

            get_template_part('template-parts/page/content', 'home');

        endwhile;
    endif;
    get_footer();
?>