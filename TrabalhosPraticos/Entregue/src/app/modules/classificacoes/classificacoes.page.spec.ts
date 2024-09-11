import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClassificacoesPage } from './classificacoes.page';

describe('ClassificacoesPage', () => {
  let component: ClassificacoesPage;
  let fixture: ComponentFixture<ClassificacoesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassificacoesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
