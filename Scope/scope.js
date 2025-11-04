"use strict";
var Scope;
(function (Scope) {
    class ScopeSuper {
        static x = "ScopeSuperStatic"; // Scope of superclass
        x = "ScopeSuperObject"; // Scope of superobject
        log() {
            console.group("Super");
            const x = "ScopeSuperMethod";
            log("ScopeSuperMethod", x);
            log("ScopeSuperObject", this.x);
            console.groupEnd();
        }
    }
    class ScopeSub extends ScopeSuper {
        static x = "ScopeSubStatic"; // Scope of subclass
        x = "ScopeSubObject"; // Scope of subobject
        log() {
            console.group("Sub");
            const x = "ScopeSubMethod"; // Scope of method
            {
                const x = "ScopeSubMethodBlock"; // Scope of block
                log("ScopeSubMethodBlock", x);
                log("ScopeSubObject", this.x);
                // log("ScopeSuperObject", super.x);
                super.log();
            }
            log("ScopeSubMethod", x);
            console.groupEnd();
        }
    }
    const x = "Scope"; // Scope of namespace
    const sub = new ScopeSub();
    const sup = new ScopeSuper();
    sub.log();
    sup.log();
    console.group("Scope");
    log("Scope", x);
    log("ScopeSuperStatic", ScopeSuper.x);
    log("ScopeSubStatic", ScopeSub.x);
    console.groupEnd();
    console.group("Method");
    method();
    console.groupEnd();
    function method() {
        const x = "ScopeMethod";
        log("ScopeMethod", x);
    }
    function log(_expected, _is) {
        if (_expected == _is)
            console.log(_expected, " == ", _is);
        else
            console.warn(_expected, " != ", _is);
    }
    Scope.log = log;
})(Scope || (Scope = {}));
console.group("File");
const x = "File"; // Scope of file
Scope.log("File", x);
console.groupEnd();
