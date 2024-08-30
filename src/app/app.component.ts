import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { ColorBoxComponent } from './color-box/color-box.component';
import { ColorService } from './service/color.service';
import { ButtonComponent } from './button/button.component';
import rgbHex from 'rgb-hex';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ColorBoxComponent,
    HttpClientModule,
    ButtonComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(
    private colorService: ColorService,
    private clipboard: Clipboard
  ) {}

  private data: any = { model: 'default' };
  public colors: any;
  repeatArray: any[] = [0, 1, 2, 3, 4];
  public placeHolderArray: any = [];
  public hexArray: any = [];

  ngOnInit(): void {
    this.onGenerateColors();
  }

  onGenerateColors(): void {
    this.colorService.generateColors(this.data).subscribe(
      (response) => {
        this.colors = response.result;
        this.extractAllNumbers(this.colors);
        console.log('Generated colors:', this.hexArray);
        this.fromRbgtoHex(this.placeHolderArray);
      },
      (error: any) => console.log(error),
      () => console.log('DONE GENERATING DATA', this.hexArray)
    );
  }

  //put all numbers from API into one array
  extractAllNumbers(x: number[][]): any {
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 3; j++) {
        this.placeHolderArray.push(x[i][j]);
      }
    }
  }
  //from the array with all numbers we get hex values
  fromRbgtoHex(x: number[]): any {
    for (let i = 0; i < x.length; i += 3) {
      this.hexArray.push('#' + rgbHex(x[i], x[i + 1], x[i + 2]));
    }
  }

  //used for getting color when we click on a card
  copyColor(x: number): any {
    let content = this.hexArray[x];
    this.clipboard.copy(content);
  }
}
