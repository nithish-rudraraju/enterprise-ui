import { TestBed } from '@angular/core/testing';
import * as axe from 'axe-core';
import { AppComponent } from './app.component';

describe('Application accessibility smoke check', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [AppComponent] }).compileComponents();
  });

  it('has no axe-core violations in the initial dashboard view', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const result = await axe.run(fixture.nativeElement, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] } });
    expect(result.violations.flatMap(violation => violation.nodes.map(node => `${violation.id}: ${node.target.join(', ')} — ${node.failureSummary}`))).toEqual([]);
    fixture.destroy();
  });

  it('has no axe-core violations in the create request dialog', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    fixture.componentInstance.openCreate();
    fixture.detectChanges();
    const result = await axe.run(fixture.nativeElement, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] } });
    expect(result.violations.flatMap(violation => violation.nodes.map(node => `${violation.id}: ${node.target.join(', ')} — ${node.failureSummary}`))).toEqual([]);
    fixture.destroy();
  });
});
