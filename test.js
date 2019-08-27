'use strict'
var  chai = require('chai');
// var validator = require('./app/lib/validator');
var hello = require('./hello');
// var user = require('./app/controller/user_ctrl');
var expect = chai.expect;
chai.should();

function returnName(name){
    return 'ayaj';
};
describe('1st unit test',function(){
    it('hello',function(){
        returnName('ayaj').should.equal('ayaj');
    });
});

function addtwonumbers(num){
    return (num+num);
}
describe('add functionality',function(){
    it('return two numbers',function(){
        addtwonumbers(5).should.equal(10);
    })
})


function division(value){
    return (value%2)===0;

    
}
describe('dividedfunction',function(){
    it('return division value',function(){
       hello.division(4).should.equal(true)
    })
})


// npm run start debuge