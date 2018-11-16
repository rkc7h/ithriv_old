import {
  ElementRef,
  Renderer2,
  Component,
  Type
} from '@angular/core';
import { CategoryColorBorderDirective } from './category-color-border.directive';
import { async, TestBed, ComponentFixture } from '@angular/core/testing';

class MockElementRef extends ElementRef { nativeElement = {}; constructor() { super(null); } }

@Component({
  template: `<div [appCategoryColorBorder]="resource"></div>`
})
class TestCategoryColorComponent { }

fdescribe('CategoryColorBorderDirective', () => {
  const el = new MockElementRef();
  let renderer2: Renderer2;
  let fixture: ComponentFixture<TestCategoryColorComponent>;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          TestCategoryColorComponent,
          CategoryColorBorderDirective
        ],
        providers: [
          { provide: ElementRef, useClass: MockElementRef },
          Renderer2
        ]
      })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(TestCategoryColorComponent);
        renderer2 = fixture.componentRef.injector.get<Renderer2>(Renderer2 as Type<Renderer2>);
      });
  }));

  it('should create an instance', () => {
    const directive = new CategoryColorBorderDirective(el, renderer2);
    expect(directive).toBeTruthy();
  });
});
