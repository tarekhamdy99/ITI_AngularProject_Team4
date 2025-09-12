import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
 
@Component({
  selector: 'app-root',
  standalone: true,  // مهم جداً علشان imports يشتغل
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.css']   // لازم تكون بصيغة جمع
})
export class App {
  protected readonly title = signal('AngularProjectTeam4');
}
