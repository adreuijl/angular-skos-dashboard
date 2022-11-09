import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-download-turtle-button',
  templateUrl: './download-turtle-button.component.html',
  styleUrls: ['./download-turtle-button.component.css']
})
export class DownloadTurtleButtonComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Output() downloadRequestEmitter = new EventEmitter <boolean>();


  onDownload() {
    this.downloadRequestEmitter.emit()
  }

}
