import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'svg-wrapper',
  templateUrl: './svg-wrapper.component.html',
  styleUrls: ['./svg-wrapper.component.scss'],
})
export class SvgWrapperComponent implements OnInit {
  @Input() src: string = '';
  @Input() color: string = 'black';
  @Input() class: string = '';
  svgContent: string = '';

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.http.get(this.src, { responseType: 'text' }).subscribe((content) => {
      this.svgContent = content;
    });
  }
}
