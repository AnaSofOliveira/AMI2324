import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalEquipasFavoritasPage } from './modal-equipas-favoritas.page';

describe('ModalEquipasFavoritasPage', () => {
  let component: ModalEquipasFavoritasPage;
  let fixture: ComponentFixture<ModalEquipasFavoritasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEquipasFavoritasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
