import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';
import { GreatBigExampleApplicationSharedModule } from '../shared.module';

let fixture;

describe('Component: Button', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        GreatBigExampleApplicationSharedModule
      ]
    });
    fixture = TestBed.createComponent(ButtonComponent);
    fixture.detectChanges();
  });

  it('should invoke handleClick when button is clicked',
    async(inject([], () => {
      fixture.whenStable().then(() => {
        spyOn(fixture.componentInstance, 'handleClick');
        fixture.componentInstance.qaid = 'button-1';
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        compiled.querySelector('#button-1').click();
        expect(fixture.componentInstance.handleClick).toHaveBeenCalled();
      });
    }))
  );

  it('should emit event when handleClick is invoked',
    async(inject([], () => {
      fixture.whenStable().then(() => {
        fixture.componentInstance.onClick.subscribe((c) => {
          expect(c.data).toEqual('test data');
        });
        const testEvent = { data: 'test data' };
        fixture.componentInstance.handleClick(testEvent);
      });
    }))
  );

  it('should render the button with the correct class applied',
    async(inject([], () => {
      fixture.whenStable().then(() => {
        fixture.componentInstance.qaid = 'button-1';
        fixture.componentInstance.className = 'test-class';
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('#button-1')
          .getAttribute('class').split(' ')).toContain('test-class');
      });
    })
    )
  );
});
