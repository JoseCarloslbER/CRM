import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreBillComponent } from './pre-bill.component';

describe('PreBillComponent', () => {
  let component: PreBillComponent;
  let fixture: ComponentFixture<PreBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreBillComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
