import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableTelefoneComponent } from './table-telefone.component';

describe('TableTelefoneComponent', () => {
  let component: TableTelefoneComponent;
  let fixture: ComponentFixture<TableTelefoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableTelefoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableTelefoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
