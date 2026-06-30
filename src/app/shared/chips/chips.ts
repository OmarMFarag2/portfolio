
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, EventEmitter, inject, Input, OnInit, Output, signal } from '@angular/core';
import { Form, FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-chips',
  imports: [MatButtonModule, MatFormFieldModule, MatChipsModule, FormsModule, MatIconModule, MatInputModule, MatSelectModule],
  templateUrl: './chips.html',
  styleUrl: './chips.css',
})
export class Chips implements OnInit {
  @Input() chips!: string[]
  @Input() title!: string
  private _announcer = inject(LiveAnnouncer);
  readonly keywords = signal<string[]>([]);
  @Output() chipsChange = new EventEmitter<string[]>();
  ngOnInit() {
    this.keywords.set(this.chips);
  }
  addKeyword(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.keywords.update(keywords => {
        const updated = [...keywords, value];
        this.chipsChange.emit(updated);
        return updated;
      });
    }

    event.chipInput.clear();
  }

  removeKeyword(keyword: string) {
    this.keywords.update(keywords => {
      const updated = keywords.filter(k => k !== keyword);
      this.chipsChange.emit(updated);
      return updated;
    });
  }
}

