import { Component, OnInit, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Tutorial } from 'src/app/models/tutorial.model';
import { TutorialService } from 'src/app/services/tutorial.service';
import { TutorialDetailsComponent } from '../tutorial-details/tutorial-details.component';

@Component({
  selector: 'app-tutorials-list',
  templateUrl: './tutorials-list.component.html',
  styleUrls: ['./tutorials-list.component.css'],
  standalone: true,
  imports: [FormsModule, TutorialDetailsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TutorialsListComponent implements OnInit {
  private tutorialService = inject(TutorialService);
  
  tutorials = signal<Tutorial[]>([]);
  currentTutorial = signal<Tutorial>({});
  currentIndex = signal(-1);
  title = signal('');

  ngOnInit(): void {
    this.retrieveTutorials();
  }

  retrieveTutorials(): void {
    this.tutorialService.getAll().subscribe({
      next: (data) => {
        this.tutorials.set(data);
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }

  refreshList(): void {
    this.retrieveTutorials();
    this.currentTutorial.set({});
    this.currentIndex.set(-1);
  }

  setActiveTutorial(tutorial: Tutorial, index: number): void {
    this.currentTutorial.set(tutorial);
    this.currentIndex.set(index);
  }

  removeAllTutorials(): void {
    this.tutorialService.deleteAll().subscribe({
      next: (res) => {
        console.log(res);
        this.refreshList();
      },
      error: (e) => console.error(e)
    });
  }

  searchTitle(): void {
    this.currentTutorial.set({});
    this.currentIndex.set(-1);

    this.tutorialService.findByTitle(this.title()).subscribe({
      next: (data) => {
        this.tutorials.set(data);
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }

  updateSearchTitle(value: string): void {
    this.title.set(value);
  }
}
