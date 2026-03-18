import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Tutorial } from 'src/app/models/tutorial.model';
import { TutorialService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-add-tutorial',
  templateUrl: './add-tutorial.component.html',
  styleUrls: ['./add-tutorial.component.css'],
  standalone: true,
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddTutorialComponent {
  private tutorialService = inject(TutorialService);
  
  tutorial = signal<Tutorial>({
    title: '',
    description: '',
    published: false
  });
  
  submitted = signal(false);

  saveTutorial(): void {
    const data = {
      title: this.tutorial().title,
      description: this.tutorial().description
    };

    this.tutorialService.create(data).subscribe({
      next: (res) => {
        console.log(res);
        this.submitted.set(true);
      },
      error: (e) => console.error(e)
    });
  }

  newTutorial(): void {
    this.submitted.set(false);
    this.tutorial.set({
      title: '',
      description: '',
      published: false
    });
  }

  updateTitle(value: string): void {
    this.tutorial.update(t => ({ ...t, title: value }));
  }

  updateDescription(value: string): void {
    this.tutorial.update(t => ({ ...t, description: value }));
  }
}
