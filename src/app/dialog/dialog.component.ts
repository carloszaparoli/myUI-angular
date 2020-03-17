import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  titulo: string;
  mensagem: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { 
    this.titulo = data.title;
    this.mensagem = data.message;
  }

  ngOnInit(): void {
  }

}