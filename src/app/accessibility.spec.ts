import { ComponentFixture, TestBed } from '@angular/core/testing';
import * as axe from 'axe-core';
import { AppComponent } from './app.component';

describe('Service Desk accessibility smoke checks', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [AppComponent] }).compileComponents();
  });

  async function expectNoViolations(fixture: ComponentFixture<AppComponent>): Promise<void> {
    fixture.detectChanges();
    const result = await axe.run(fixture.nativeElement, {
      runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] }
    });
    const violations = result.violations.flatMap(violation =>
      violation.nodes.map(node => `${violation.id}: ${node.target.join(', ')} — ${node.failureSummary}`)
    );
    expect(violations).toEqual([]);
  }

  it('has no axe-core violations on the dashboard', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    await expectNoViolations(fixture);
    fixture.destroy();
  });

  it('has no axe-core violations on the request list', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.componentInstance.setView('Requests');
    await expectNoViolations(fixture);
    fixture.destroy();
  });

  it('has no axe-core violations on request details', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.componentInstance.openDetails(fixture.componentInstance.requests[0]);
    await expectNoViolations(fixture);
    fixture.destroy();
  });

  it('has no axe-core violations in the profile popover', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.componentInstance.profileOpen = true;
    await expectNoViolations(fixture);
    fixture.destroy();
  });

  it('has no axe-core violations in the create request dialog', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.componentInstance.openCreate();
    await expectNoViolations(fixture);
    fixture.destroy();
  });
});
