"use strict";

(function(){
    var SRC_PATH = 'src';
    
    var phpEngine = uniter.createEngine('PHP', {
        'include': function(src, promise, global) {
            $.ajax({url: SRC_PATH + '/' + src, async: true}).done(function( source ) {
                promise.resolve(source); 
            }).fail(function() {
                promise.reject();
            });
        }
    });
    
    var globalScope = phpEngine.getEnvironment().getGlobalScope();
    var globalNamespace = globalScope.valueFactory.globalNamespace;
    var spl_autoload_register = globalNamespace.getFunction('spl_autoload_register');
    
    spl_autoload_register(function() {
        var src = this[0].value.replace(/\\/g, '/') + '.phps';
        var resumable = phpEngine.state.getResumable();
        phpEngine.execute('<?php include "'+src+'";').done(function(native) {
            pause.resume();
        }).fail(function() {
            pause.resume();
        });
        var pause = resumable.createPause();
        pause.now();
    });

    phpEngine.expose(Crafty, 'Crafty');
    
    /**
     * Output data buffer
     */
    phpEngine.getStdout().on('data', function (data) {
        console.info(data);
    });
    
    /**
     * Output error buffer
     */
    phpEngine.getStderr().on('data', function (data) {
        console.error(data);
    });

    phpEngine.execute('<?php include "WorldRift/Program.phps";', 'program').done(function(){
    }).fail(function(e){
        console.error(e);   
    });
})();