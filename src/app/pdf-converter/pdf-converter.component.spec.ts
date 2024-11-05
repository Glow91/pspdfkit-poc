import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfConverterComponent } from './pdf-converter.component';

describe('PdfConverterComponent', () => {
  let component: PdfConverterComponent;
  let fixture: ComponentFixture<PdfConverterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PdfConverterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdfConverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
