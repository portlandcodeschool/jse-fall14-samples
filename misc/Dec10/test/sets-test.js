/*
// --- Old homemade assert: ---
function assert(claim,message) {
    claim || console.log(message);
}

// --- New homemade version with exceptions: ---
function assert(claim) {
    claim || throw ("Assertion Error: " +claim+ " == true");
}

assert.equal = function(a,b) {
    (a == b) || throw ("Assertion Error: " +a+ "==" +b);
}

assert.identical = function(a,b) {
    (a === b) || throw ("Assertion Error: " +a+ "===" +b)
}

// etc...

*/


// --- Assertion module: ---
var assert = require('assert'); //standard with Node
var should = require('should'); // alternative
var expect = require('chai').expect; // alternative


// --- The code to be tested: ---
var union = require('../sets.js').union;
var intersection = require('../sets.js').intersection;

// Various helper functions...

function randomInt (max) {
    max = max || 100;
    return Math.floor(Math.random()*max);
}

function randomStr () {
    return String(randomInt());
}

function randomObject(len) {
    len = len || 3; // include len random properties
    var obj = {};
    while (len>0) {
        --len;
        obj[randomStr()] = randomStr();
    }
    return obj;
}

function makeTrioUsing(funct) {
    var a = randomObject(),
        b = randomObject();
    return {
        a: a,
        b: b,
        c: funct(a,b)
    }
}

function severalTimes(cb,n) {
    if (!n) n=10;//default
    assert(n>0 && n%1==0);
    while (n--) cb();
}

function withRandomSamples(outputFn,testFn,n) {
    severalTimes(function(){
        var abc = makeTrioUsing(outputFn);
        testFn(abc);
    }, n);
}


//--- Describe test suite ---
describe("intersection(A,B)", function() {
    it("should have value (A.prop && B.prop) for shared properties", function() {
        withRandomSamples(intersection,function(abc){
            for (var key in abc.c) {
                if ((key in abc.a) && (key in abc.b)) {
                    assert.equal(abc.c[key], abc.a[key] && abc.b[key]);
                }
            }
        });
    });
    it("should have no other properties", function() {
        withRandomSamples(intersection,function(abc){
            for (var key in abc.c) {
                assert((key in abc.a) && (key in abc.b));
            }
        });
    });
}); // describe intersection

describe("union(A,B)", function() {
    it("should include any property in A", function() {
        withRandomSamples(union,function(abc){
            for (var key in abc.a) {
                assert(key in abc.c);
            }
        });
    });
    it("should include any property in B", function() {
        withRandomSamples(union,function(abc){
            for (var key in abc.b) {
                assert(key in abc.c);
            }
        });
    });
    it("should match A's values for A-only properties", function() {
        withRandomSamples(union,function(abc){
            for (var key in abc.a) {
                if (!(key in abc.b)) {
                    assert.equal(abc.c[key], abc.a[key]);
                }
            }
        });
    });
    it("should match B's values for B-only properties", function() {
        withRandomSamples(union,function(abc){
            for (var key in abc.b) {
                if (!(key in abc.a)) {
                    assert.equal(abc.c[key], abc.b[key]);
                }
            }
        });
    });
    it("should have value (A.prop||B.prop) for shared properties", function() {
        withRandomSamples(union,function(abc){
            for (var key in abc.c) {
                if ((key in abc.a) && (key in abc.b)) {
                    // assert version:
                    assert.equal(abc.c[key], abc.a[key] || abc.b[key]);

                    // chai.expect version:
                    //expect(abc.c[key]).to.equal(abc.a[key] || abc.b[key]);

                    // should version:
                    //abc.c[key].should.equal(abc.a[key] || abc.b[key]);
                }
            }
        });
    });
    it("should have no other properties", function() {
        withRandomSamples(union,function(abc){
            for (var key in abc.c) {
                assert((key in abc.a) || (key in abc.b));
            }
        });
    })
}); // describe union

