import Component from './component';
import { expect } from 'chai';

const testRenderTpl = `
  <div><span></span><div>
`;
const testContextRenderTpl = `
  <div><span>{{contextTest}}</span><div>
`;

let component;

describe('Component', () => {

  beforeEach(() => {
    component = new Component();
  });

  describe('Sanity check', () => {

    it('should have an empty name', () => {
      expect(component.name).to.be.empty;
    });

    it('should have an empty tpl', () => {
      expect(component.tpl).to.be.empty;
    });

    it('should have an empty context', () => {
      expect(component.context).to.be.empty;
    });

  });

  describe('Compilation', () => {

    it('should not compile without tpl', () => {
      expect(component.compile).to.throw(Error);
    });

    it('should not render without tpl', () => {
      expect(component.render()).to.throw(Error);
    });

    it('should render and compile a template', () => {
      component.tpl = testRenderTpl;
      expect(component.compile).to.equal(testRenderTpl);
    });

    it('should render and compile a template with context', () => {
      component.tpl = testContextRenderTpl;
      component.context = { contextTest: 'testing' };

      const expectedResult = testContextRenderTpl.replace('{{contextTest}}', 'testing');
      expect(component.compile).to.equal(expectedResult);
    });

  });

  describe('Element', () => {

    // TODO (hamish): Init karma and run using a TestBed

  });

  describe('Destroy', () => {

    // TODO (hamish): ""

  });

});