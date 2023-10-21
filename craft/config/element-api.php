<?php

use craft\elements\Entry;
use craft\helpers\UrlHelper;

return [
    'endpoints' => [
        'recipes.json' => function() {
            return [
                'elementType' => Entry::class,
                'elementsPerPage' => 12,
                'criteria' => [
                    'section' => 'recipes'
                ],
                'transformer' => function(Entry $entry) {
                    return [
                        'id' => $entry->id,
                        'title' => $entry->title,
                        'slug' => $entry->slug,
                        'recipeImg' => $entry->recipeImg->one()->url
                    ];
                },
                'pretty' => true
            ];
        }
    ]
];