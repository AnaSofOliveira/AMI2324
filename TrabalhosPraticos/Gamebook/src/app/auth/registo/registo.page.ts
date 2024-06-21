import { Component, OnInit } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { AuthLayoutComponent } from 'src/app/layout/auth-layout/auth-layout.component';
import { IonSpinner } from "@ionic/angular/standalone";
import { IonicModule } from '@ionic/angular';
import {ChangeDetectionStrategy, signal} from '@angular/core';
import { FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {merge} from 'rxjs';



@Component({
  selector: 'app-registo',
  templateUrl: './registo.page.html',
  styleUrls: ['./registo.page.scss'],
  standalone: true,
  imports: [AuthLayoutComponent, IonicModule, MatDivider, IonSpinner],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistoPage{

constructor(private router: Router) {

}


}
