<?php 
    global $post; 
?>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    <title><?php bloginfo('name'); ?> - <?php wp_title(); ?></title>
<?php if (is_single()) : ?>
    <meta property="og:locale" content="<?php echo get_locale(); ?>">
    <meta property="og:url" content="<?php echo get_permalink($post->ID); ?>">
    <meta property="og:site_name" content="<?php bloginfo('name'); ?>">
    <meta property="og:type" content="article">
    <meta property="og:title" content="<?php wp_title(); ?>">
    <meta property="og:description" content="<?php echo get_the_excerpt($post->ID); ?>">
    <meta property="og:image" content="<?php echo get_the_post_thumbnail_url($page->ID, 'thumbnail-sm'); ?>">
    <meta property="og:image:width" content="544">
    <meta property="og:image:height" content="303">
    <meta property="og:image:alt" content="<?php echo get_post_meta(get_post_thumbnail_id(), '_wp_attachment_image_alt', true); ?>">
    <meta property="og:updated_time" content="<?php echo get_the_modified_date('c', $post->ID); ?>">
    <meta property="article:author" content="<?php echo get_the_author_meta('display_name', $post->post_author); ?>">
    <meta property="article:publisher" content="<?php echo get_the_author_meta('display_name', $post->post_author); ?>">
    <meta property="article:published_time" content="<?php echo get_the_time('c', $post->ID); ?>">
    <meta property="article:modified_time" content="<?php echo get_the_modified_date('c', $post->ID); ?>">
    <meta property="article:section" content="<?php echo array_values(get_the_category($post->ID))[0]->name; ?>">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:description" content="<?php echo get_the_excerpt($post->ID); ?>">
    <meta name="twitter:title" content="<?php wp_title(); ?>">
    <meta name="twitter:image" content="<?php echo get_the_post_thumbnail_url($page->ID, 'thumbnail-sm'); ?>">
<?php endif; ?>
    <!--[if lt IE 9]>
    <script src="//cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.2/html5shiv.min.js"></script>
    <![endif]-->
    <?php wp_head(); ?>
</head>