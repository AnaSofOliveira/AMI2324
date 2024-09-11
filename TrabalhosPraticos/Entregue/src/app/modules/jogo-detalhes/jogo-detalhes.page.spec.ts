import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JogoDetalhesPage } from './jogo-detalhes.page';

describe('JogoDetalhesPage', () => {
  let component: JogoDetalhesPage;
  let fixture: ComponentFixture<JogoDetalhesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(JogoDetalhesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
