var assert = require("assert");
var should = require('should');

var gip = require ("./../index.js");

describe('github-issue-prioritizer', function(){
  describe('#prioritizeIssues()', function(){
    
    it('it should have a title', function(){
      gip.prioritizeIssues(require('./fixtures/fixture.json'))[0].should.have.property('title', 'Gone with the wind');
    });

    it('it should recognize due_date', function(){
      gip.prioritizeIssues(require('./fixtures/fixture.json'))[0].priority.attributes.should.have.property('due_date', 'Dec 25, 2000');
    });

    it('it should recognize business_value', function(){
      gip.prioritizeIssues(require('./fixtures/fixture.json'))[0].priority.attributes.should.have.property('business_value', 1);
    });

    it('it should recognize technical_value', function(){
      gip.prioritizeIssues(require('./fixtures/fixture.json'))[0].priority.attributes.should.have.property('technical_value', 2);
    });

    it('it should recognize completion', function(){
      gip.prioritizeIssues(require('./fixtures/fixture.json'))[0].priority.attributes.should.have.property('completion', 0);
    });

  });
});