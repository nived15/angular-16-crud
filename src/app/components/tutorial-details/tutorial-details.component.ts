import { Component, OnInit, ChangeDetectionStrategy, input, signal, inject, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { TutorialService } from 'src/app/services/tutorial.service';
import { Tutorial } from 'src/app/models/tutorial.model';

@Component({
  selector: 'app-tutorial-details',
  templateUrl: './tutorial-details.component.html',
  styleUrls: ['./tutorial-details.component.css'],
  standalone: true,
  imports: [FormsModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TutorialDetailsComponent implements OnInit {
  private tutorialService = inject(TutorialService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  
  viewMode = input(false);
  currentTutorial = input<Tutorial>({
    title: '',
    description: '',
    published: false
  });

  internalTutorial = signal<Tutorial>({
    title: '',
    description: '',
    published: false
  });
  
  message = signal('');

  constructor() {
    // Sync input signal to internal signal
    effect(() => {
      this.internalTutorial.set(this.currentTutorial());
    });
  }

  ngOnInit(): void {
    if (!this.viewMode()) {
      this.message.set('');
      this.getTutorial(this.route.snapshot.params['id']);
    }
  }

  getTutorial(id: string): void {
    this.tutorialService.get(id).subscribe({
      next: (data) => {
        this.internalTutorial.set(data);
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }

  updatePublished(status: boolean): void {
    const data = {
      title: this.internalTutorial().title,
      description: this.internalTutorial().description,
      published: status
    };

    this.message.set('');

    this.tutorialService.update(this.internalTutorial().id, data).subscribe({
      next: (res) => {
        console.log(res);
        this.internalTutorial.update(t => ({ ...t, published: status }));
        this.message.set(res.message || 'The status was updated successfully!');
      },
      error: (e) => console.error(e)
    });
  }

  updateTutorial(): void {
    this.message.set('');

    this.tutorialService
      .update(this.internalTutorial().id, this.internalTutorial())
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message.set(res.message || 'This tutorial was updated successfully!');
        },
        error: (e) => console.error(e)
      });
  }

  deleteTutorial(): void {
    this.tutorialService.delete(this.internalTutorial().id).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/tutorials']);
      },
      error: (e) => console.error(e)
    });
  }

  updateTitle(value: string): void {
    this.internalTutorial.update(t => ({ ...t, title: value }));
  }

  updateDescription(value: string): void {
    this.internalTutorial.update(t => ({ ...t, description: value }));
  }
}
