<?php

namespace WorldRift;

class Program extends PA {
    public function __construct($Crafty) {
        $Crafty->init();
        $Crafty->background('blue');
        $ent = $Crafty->e("2D, Canvas, Color, Draggable");
        $ent->attr(['w'=>200,'h'=>200]);
        $ent->color('red');
    }
}

$app = new Program($Crafty);