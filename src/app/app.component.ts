import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {PdfConverterComponent} from "./pdf-converter/pdf-converter.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PdfConverterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'pdf-webworker';
}
