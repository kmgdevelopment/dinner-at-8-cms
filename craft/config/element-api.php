<?php

use craft\elements\Entry;
use craft\elements\Category;

return [
    'endpoints' => [
        'recipes.json' => function() {
            $entryCriteria = [
                'section' => 'recipes'
            ];

            // filter by search query
            $searchQuery = Craft::$app->request->getQueryParam('query');
            if($searchQuery) {
                $entryCriteria += [
                    'search' => $searchQuery,
                    'orderBy' => 'score'
                ];
            }

            // filter by category
            $categoryQuery = Craft::$app->request->getQueryParam('category');
            if($categoryQuery) {
                $operator = ['and'];
                $categoryList = explode(' ', $categoryQuery);

                $entryCriteria += [
                    'relatedTo' => array_merge($operator, $categoryList)
                ];
            }

            return [
                'elementType' => Entry::class,
                'elementsPerPage' => 12,
                'criteria' => $entryCriteria,
                'resourceKey' => 'entries',
                'transformer' => function(Entry $entry) {
                    return [
                        'id' => $entry->id,
                        'title' => $entry->title,
                        'uri' => $entry->uri,
                        'recipeImg' => $entry->recipeImg->one()->url
                    ];
                },
                'pretty' => true
            ];
        },
        'filter-cats.json' => function() {
            return [
                'elementType' => Category::class,
                'criteria' => [
                    'group' => ['diet','holiday','meal','protein','season'],
                    'level' => 1,
                    'orderBy' => 'groupId,title'
                ],
                'resourceKey' => 'cats',
                'paginate' => false,
                'transformer' => function(Category $cat) {
                    return [
                        "groupId" => $cat->group->id,
                        "groupName" => $cat->group->name,
                        "id" => $cat->id,
                        "title" => $cat->title
                    ];
                },
                'pretty' => true
            ];
        },
        'recipes/<slug:{slug}>.json' => function($slug) {
            return [
                'elementType' => Entry::class,
                'criteria' => [
                    'section' => 'recipes',
                    'slug' => $slug
                ],
                'one' => true,
                'transformer' => function(Entry $entry) {  
                    // MAKES
                    $recipeMakes = null;
                    if( !empty($entry->recipeMakes[0]['quantity']) ) {
                        $recipeMakes = [
                            'quantity' => $entry->recipeMakes[0]['quantity'],
                            'unit' => $entry->recipeMakes[0]['unit']
                        ];
                    }

                    // INGREDIENTS
                    $recipeIngredients = [];
                    foreach( $entry->recipeIngredients as $block ) {
                       if( $block->type->handle == 'heading' ) {
                            $recipeIngredients[] = [
                                'id' => $block->id,
                                'type' => 'heading',
                                'text' => $block->text
                            ];

                       } elseif( $block->type->handle == 'ingredientList' ) {
                            $ingredientList = [];
                            foreach( $block->list as $item ) {
                                $ingredientList[] = [
                                    'id' => $item->id,
                                    'quantity' => $item->quantity,
                                    'unit' => $item->unit->value ? $item->unit->value : null,
                                    'ingredient' => $item->ingredient,
                                    'preparation' => $item->preparation
                                ];
                            }
                            $recipeIngredients[] = [
                              'id' => $block->id,
                              'type' => 'ingredientList',
                              'list' => $ingredientList
                            ];
                       }
                    }

                    // INSTRUCTIONS
                    $recipeInstructions = [];
                    foreach( $entry->recipeInstructions as $block ) {
                        if( $block->type->handle == 'heading' ) {
                            $recipeInstructions[] = [
                                'id' => $block->id,
                                'type' => 'heading',
                                'text' => $block->text
                            ];
                            
                        } elseif( $block->type->handle == 'instructionList' ) {
                            $instructionList = [];
                            foreach( $block->theList as $item ) {
                                $instructionList[] = [
                                    'id' => $item->id,
                                    'description' => $item->description
                                ];
                            }
                            $recipeInstructions[] = [
                                'id' => $block->id,
                                'type' => 'instructionList',
                                'list' => $instructionList
                            ];
                        }
                    }

                    return [
                        'title' => $entry->title,
                        'recipeServes' => $entry->recipeServes,
                        'recipeMakes' => $recipeMakes,
                        'recipeImg' => $entry->recipeImg->one()->url,
                        'recipeIngredients' => $recipeIngredients,
                        'recipeInstructions' => $recipeInstructions,
                        'recipeNotes' => $entry->recipeNotes,
                        'recipeSourceName' => $entry->recipeSourceName,
                        'recipeSourceUrl' => $entry->recipeSourceUrl
                    ];
                },
                'pretty' => true,
            ];
        },
    ]
];