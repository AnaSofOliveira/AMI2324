import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListaEquipasFavoritasComponent } from './lista-equipas-favoritas.component';

describe('ListaEquipasFavoritasComponent', () => {
  let component: ListaEquipasFavoritasComponent;
  let fixture: ComponentFixture<ListaEquipasFavoritasComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaEquipasFavoritasComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListaEquipasFavoritasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
