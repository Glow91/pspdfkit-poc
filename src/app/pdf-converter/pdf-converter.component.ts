import { Component, OnInit } from '@angular/core';
import PSPDFKit, {StandaloneConfiguration} from 'pspdfkit';
import {from, interval, Observable, switchMap} from "rxjs";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-pdf-converter',
  templateUrl: './pdf-converter.component.html',
  styleUrl: './pdf-converter.component.scss',
  standalone: true,
  imports: [
    AsyncPipe
  ]
})
export class PdfConverterComponent {

  protected counter$ = interval(100);

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];

      // Wähle zwischen 'readAsText' oder 'readAsArrayBuffer'
      this.readFile(file, 'readAsArrayBuffer')
        .pipe(
          switchMap(arrayBuffer => {
            return from(PSPDFKit.convertToPDF({
              // Use the assets directory URL as a base URL. PSPDFKit will download its library assets from here.
              baseUrl: location.protocol + "//" + location.host + "/assets/",
              document: arrayBuffer as string | ArrayBuffer,
              headless: true,
            } as StandaloneConfiguration, PSPDFKit.Conformance.PDFA_1A));
          }),

        )
        .subscribe({
        next: result => {
          console.log('Dateiinhalt als String:', result)
          const time = new Date();
            // 1. Konvertiere den ArrayBuffer in einen Blob
            const blob = new Blob([result], { type: 'application/pdf' });
            // 2. Erstelle eine temporäre URL für den Blob
            const url = URL.createObjectURL(blob);

            // 3. Erstelle ein unsichtbares <a>-Element zum Herunterladen
            const a = document.createElement('a');
            a.href = url;
            a.download = `convertedPDFA_${time.getTime()}.pdf`;
            document.body.appendChild(a);

            // 4. Simuliere einen Klick auf das <a>-Element
            a.click();

            // 5. Entferne das <a>-Element und die URL, um Speicherplatz freizugeben
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        },
        error: err => console.error('Fehler beim Lesen der Datei:', err)
      });
    }
  }

  private readFile(file: File, readAs: 'readAsText' | 'readAsArrayBuffer'): Observable<string | ArrayBuffer | null> {
    const fileReader = new FileReader();

    // Erstelle ein Observable aus den Load- und Error-Events des FileReader
    return new Observable<string | ArrayBuffer | null>((observer) => {
      fileReader.onload = () => {
        observer.next(fileReader.result);
        observer.complete();
      };

      fileReader.onerror = (error) => {
        observer.error(error);
      };

      // Datei entweder als Text oder ArrayBuffer einlesen
      if (readAs === 'readAsText') {
        fileReader.readAsText(file);
      } else if (readAs === 'readAsArrayBuffer') {
        fileReader.readAsArrayBuffer(file);
      }
    });
  }
}
