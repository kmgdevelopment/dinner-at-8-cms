<?php
return array(
    '*' => array(
        'strategies' => [
            'manifest' => \club\assetrev\utilities\strategies\ManifestFileStrategy::class,
            'querystring' => \club\assetrev\utilities\strategies\QueryStringStrategy::class,
            'passthrough' => function ($filename, $config) {
                return $filename;
            },
        ],
        'pipeline' => 'querystring|passthrough',
        'manifestPath' => '',
        'assetsBasePath' => '../dist/assets/',
        'assetUrlPrefix' => '/assets/',
    ),
    'production' => array(
        
    )
);