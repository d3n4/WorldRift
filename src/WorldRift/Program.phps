<?php

namespace WorldRift;

class Program extends PA {
    public function __construct($Crafty) {
        $Crafty->init();
        $Crafty->background('blue');
    }
}

$app = new Program($Crafty);