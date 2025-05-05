import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CamembertComponent } from './camembert.component';

describe('CamembertComponent', () => {
  let component: CamembertComponent;
  let fixture: ComponentFixture<CamembertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CamembertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CamembertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
