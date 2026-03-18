# Component-by-Component Migration Guide (Demo Edition)

**Demo Scope:** This guide focuses on the 2 components selected for Angular 20 migration, with legacy examples provided for comparison.

## Demo Migration Strategy

### Components to MIGRATE (✅)
1. **AppComponent** - Simple demonstration of standalone + signals (~30 min)
2. **AddTutorialComponent** - Full demonstration of all Angular 20 patterns (~2 hrs)

### Components to KEEP AS LEGACY (⚠️ Angular 16 Reference)
3. **TutorialsListComponent** - Kept as before/after comparison example
4. **TutorialDetailsComponent** - Kept as before/after comparison example

**Purpose:** By migrating only 2 components, we create a perfect demonstration of Angular 20 features while maintaining legacy code for educational comparison. This reduces implementation time from 16-24 hours to 3-4 hours.

---

## 1. AppComponent Migration (✅ MIGRATE THIS)

### Current Code (Angular 16)
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular 16 Crud example';
}
```

### Target Code (Angular 20)
```typescript
import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = signal('Angular 20 Crud example');
}
```

### Migration Steps
1. Add `standalone: true`
2. Add `imports: [RouterOutlet]` (for router-outlet in template)
3. Add `changeDetection: ChangeDetectionStrategy.OnPush`
4. Convert `title` to `signal()`
5. Update template if using `{{ title }}` → `{{ title() }}`

### Template Changes
```html
<!-- If template uses title, update: -->
<h1>{{ title() }}</h1>  <!-- Note the () to read signal -->
```

---

## 2. AddTutorialComponent Migration (✅ MIGRATE THIS)

**Demo Priority:** HIGH - This component demonstrates all key Angular 20 features  
**Time Estimate:** 2 hours  
**Educational Value:** Best example for training and presentation

### Current Code (Angular 16)
```typescript
import { Component } from '@angular/core';
import { Tutorial } from 'src/app/models/tutorial.model';
import { TutorialService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-add-tutorial',
  templateUrl: './add-tutorial.component.html',
  styleUrls: ['./add-tutorial.component.css'],
})
export class AddTutorialComponent {
  tutorial: Tutorial = {
    title: '',
    description: '',
    published: false
  };
  submitted = false;

  constructor(private tutorialService: TutorialService) {}

  saveTutorial(): void {
    const data = {
      title: this.tutorial.title,
      description: this.tutorial.description
    };

    this.tutorialService.create(data).subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
      },
      error: (e) => console.error(e)
    });
  }

  newTutorial(): void {
    this.submitted = false;
    this.tutorial = {
      title: '',
      description: '',
      published: false
    };
  }
}
```

### Target Code (Angular 20)
```typescript
import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Tutorial } from 'src/app/models/tutorial.model';
import { TutorialService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-add-tutorial',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-tutorial.component.html',
  styleUrls: ['./add-tutorial.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddTutorialComponent {
  // Inject services using inject()
  private tutorialService = inject(TutorialService);

  // Convert state to signals
  tutorial = signal<Tutorial>({
    title: '',
    description: '',
    published: false
  });
  
  submitted = signal(false);

  saveTutorial(): void {
    const currentTutorial = this.tutorial();
    const data = {
      title: currentTutorial.title,
      description: currentTutorial.description
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
}
```

### Template Changes (add-tutorial.component.html)
```html
<!-- BEFORE (Angular 16) -->
<div *ngIf="!submitted">
  <input [(ngModel)]="tutorial.title" name="title" />
</div>
<div *ngIf="submitted">
  <h4>Tutorial was submitted successfully!</h4>
</div>

<!-- AFTER (Angular 20) -->
@if (!submitted()) {
  <div>
    <input [(ngModel)]="tutorial().title" name="title" />
    <!-- Note: Two-way binding with signals requires special handling -->
    <!-- Consider using [ngModel] and (ngModelChange) separately -->
  </div>
}
@if (submitted()) {
  <div>
    <h4>Tutorial was submitted successfully!</h4>
  </div>
}

<!-- RECOMMENDED: Separate input/output binding -->
<input 
  [ngModel]="tutorial().title" 
  (ngModelChange)="tutorial.update(t => ({ ...t, title: $event }))"
  name="title" />
```

### Migration Steps
1. Add `standalone: true`
2. Add `imports: [FormsModule]`
3. Add `changeDetection: ChangeDetectionStrategy.OnPush`
4. Replace `constructor` with `inject(TutorialService)`
5. Convert `tutorial` and `submitted` to signals
6. Update method implementations to use `.set()` and `()`
7. Update template control flow
8. Handle two-way binding carefully

### Notes
- **Signal updates:** Use `.set()` to update or `.update()` for partial updates
- **Reading signals:** Always use `()` to read signal values
- **Two-way binding:** May need manual split into `[ngModel]` + `(ngModelChange)`

---

## 3. TutorialsListComponent (⚠️ KEEP AS LEGACY - DO NOT MIGRATE)

**Demo Purpose:** Before/after comparison example  
**Status:** Angular 16 - Leave untouched  
**Educational Value:** Shows complex Angular 16 patterns for comparison  
**Action Required:** Add TODO comment only

### Add This Comment to Component File
```typescript
// TODO: LEGACY COMPONENT - Angular 16 Pattern (Not Migrated for Demo)
// Kept for before/after comparison
// See AddTutorialComponent for Angular 20 patterns
// If full migration approved, this component would be migrated similarly
```

### What This Component Shows (Angular 16 Reference)

This component demonstrates Angular 16 patterns that would be converted in a full migration:

#### Current Angular 16 Patterns:
- ❌ Module-based (not standalone)
- ❌ Constructor-based dependency injection
- ❌ Plain properties instead of signals
- ❌ `*ngFor` instead of `@for`
- ❌ Default change detection (not OnPush)

#### What It Would Become (If Migrated):
- ✅ `standalone: true`
- ✅ `inject(TutorialService)`
- ✅ All properties as signals
- ✅ Template using `@for` with `track`
- ✅ `ChangeDetectionStrategy.OnPush`

### Current (Legacy) Code Example

**DO NOT MODIFY** - Keep this as reference for comparison

### Current Code (Angular 16) - Simplified
```typescript
import { Component, OnInit } from '@angular/core';
import { Tutorial } from 'src/app/models/tutorial.model';
import { TutorialService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-tutorials-list',
  templateUrl: './tutorials-list.component.html',
  styleUrls: ['./tutorials-list.component.css'],
})
export class TutorialsListComponent implements OnInit {
  tutorials?: Tutorial[];
  currentTutorial: Tutorial = {};
  currentIndex = -1;
  title = '';

  constructor(private tutorialService: TutorialService) {}

  ngOnInit(): void {
    this.retrieveTutorials();
  }

  retrieveTutorials(): void {
    this.tutorialService.getAll().subscribe({
      next: (data) => {
        this.tutorials = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }

  // ... other methods
}
```

### Target Code (Angular 20)
```typescript
import { Component, ChangeDetectionStrategy, signal, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Tutorial } from 'src/app/models/tutorial.model';
import { TutorialService } from 'src/app/services/tutorial.service';
import { TutorialDetailsComponent } from '../tutorial-details/tutorial-details.component';

@Component({
  selector: 'app-tutorials-list',
  standalone: true,
  imports: [FormsModule, TutorialDetailsComponent],
  templateUrl: './tutorials-list.component.html',
  styleUrls: ['./tutorials-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TutorialsListComponent implements OnInit {
  private tutorialService = inject(TutorialService);

  // Convert all properties to signals
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
}
```

### Template Changes (tutorials-list.component.html)
```html
<!-- BEFORE (Angular 16) -->
<input [(ngModel)]="title" placeholder="Search by title" />
<ul class="list-group">
  <li *ngFor="let tutorial of tutorials; let i = index"
      [class.active]="i == currentIndex"
      (click)="setActiveTutorial(tutorial, i)">
    {{ tutorial.title }}
  </li>
</ul>
<app-tutorial-details
  [viewMode]="true"
  [currentTutorial]="currentTutorial">
</app-tutorial-details>

<!-- AFTER (Angular 20) -->
<input 
  [ngModel]="title()" 
  (ngModelChange)="title.set($event)"
  placeholder="Search by title" />
<ul class="list-group">
  @for (tutorial of tutorials(); track tutorial.id) {
    <li class="list-group-item"
        [class.active]="$index == currentIndex()"
        (click)="setActiveTutorial(tutorial, $index)">
      {{ tutorial.title }}
    </li>
  }
</ul>
<app-tutorial-details
  [viewMode]="true"
  [currentTutorial]="currentTutorial()">
</app-tutorial-details>
```

### Migration Steps
1. Add `standalone: true`
2. Add `imports: [FormsModule, TutorialDetailsComponent]`
3. Add `changeDetection: ChangeDetectionStrategy.OnPush`
4. Replace constructor DI with `inject()`
5. Convert all properties to signals
6. Update all methods to use `.set()` for writes and `()` for reads
7. Update template:
   - `*ngFor` → `@for` with `track`
   - Use `$index` for loop index
   - Split `[(ngModel)]` into one-way bindings
   - Call signals with `()` in template

### Important Notes
- **Track function:** Always include `track` in `@for` (use `tutorial.id`)
- **$index:** Replaces the `let i = index` syntax
- **Signal reads in templates:** Must include `()` to read value

---

## 4. TutorialDetailsComponent (⚠️ KEEP AS LEGACY - DO NOT MIGRATE)

**Demo Purpose:** Before/after comparison example  
**Status:** Angular 16 - Leave untouched  
**Educational Value:** Shows complex routing & @Input patterns  
**Action Required:** Add TODO comment only

### Add This Comment to Component File
```typescript
// TODO: LEGACY COMPONENT - Angular 16 Pattern (Not Migrated for Demo)
// Kept for before/after comparison
// See AddTutorialComponent for Angular 20 patterns
// This component shows complex @Input usage that would become input() in Angular 20
```

### What This Component Shows (Angular 16 Reference)

This component demonstrates advanced Angular 16 patterns that would be converted in a full migration:

#### Current Angular 16 Patterns:
- ❌ `@Input()` decorators for component inputs
- ❌ Multiple constructor-injected dependencies
- ❌ Traditional routing parameter access
- ❌ Plain properties for state
- ❌ Complex template with `*ngIf`

#### What It Would Become (If Migrated):
- ✅ `input()` function for inputs
- ✅ `inject()` for all dependencies
- ✅ Signal-based state management
- ✅ `@if` in templates
- ✅ Computed signals for derived state

### Current (Legacy) Code Example

**DO NOT MODIFY** - Keep this as reference for training and comparison

### Current Code (Angular 16) - Simplified
```typescript
import { Component, Input, OnInit } from '@angular/core';
import { TutorialService } from 'src/app/services/tutorial.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Tutorial } from 'src/app/models/tutorial.model';

@Component({
  selector: 'app-tutorial-details',
  templateUrl: './tutorial-details.component.html',
  styleUrls: ['./tutorial-details.component.css'],
})
export class TutorialDetailsComponent implements OnInit {
  @Input() viewMode = false;
  @Input() currentTutorial: Tutorial = {
    title: '',
    description: '',
    published: false
  };
  
  message = '';

  constructor(
    private tutorialService: TutorialService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getTutorial(this.route.snapshot.params['id']);
    }
  }

  getTutorial(id: string): void {
    this.tutorialService.get(id).subscribe({
      next: (data) => {
        this.currentTutorial = data;
      },
      error: (e) => console.error(e)
    });
  }

  // ... other methods
}
```

### Target Code (Angular 20)
```typescript
import { Component, ChangeDetectionStrategy, signal, input, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { TutorialService } from 'src/app/services/tutorial.service';
import { Tutorial } from 'src/app/models/tutorial.model';

@Component({
  selector: 'app-tutorial-details',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './tutorial-details.component.html',
  styleUrls: ['./tutorial-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TutorialDetailsComponent implements OnInit {
  // Inject services
  private tutorialService = inject(TutorialService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  // Convert @Input() to input()
  viewMode = input(false);
  currentTutorial = input<Tutorial>({
    title: '',
    description: '',
    published: false
  });

  // Convert internal state to signal
  message = signal('');
  
  // For editable mode, we need a writable signal
  editableTutorial = signal<Tutorial>({
    title: '',
    description: '',
    published: false
  });

  ngOnInit(): void {
    if (!this.viewMode()) {
      this.message.set('');
      this.getTutorial(this.route.snapshot.params['id']);
    } else {
      // In view mode, sync the input to local signal
      this.editableTutorial.set(this.currentTutorial());
    }
  }

  getTutorial(id: string): void {
    this.tutorialService.get(id).subscribe({
      next: (data) => {
        this.editableTutorial.set(data);
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }

  updatePublished(status: boolean): void {
    const current = this.editableTutorial();
    const data = {
      title: current.title,
      description: current.description,
      published: status
    };

    this.message.set('');

    this.tutorialService.update(current.id, data).subscribe({
      next: (res) => {
        console.log(res);
        this.editableTutorial.update(t => ({ ...t, published: status }));
        this.message.set(
          res.message || 'The status was updated successfully!'
        );
      },
      error: (e) => console.error(e)
    });
  }

  updateTutorial(): void {
    this.message.set('');
    const current = this.editableTutorial();

    this.tutorialService.update(current.id, current).subscribe({
      next: (res) => {
        console.log(res);
        this.message.set(
          res.message || 'This tutorial was updated successfully!'
        );
      },
      error: (e) => console.error(e)
    });
  }

  deleteTutorial(): void {
    const current = this.editableTutorial();
    this.tutorialService.delete(current.id).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/tutorials']);
      },
      error: (e) => console.error(e)
    });
  }
}
```

### Template Changes (tutorial-details.component.html)
```html
<!-- BEFORE (Angular 16) -->
<div *ngIf="viewMode; else editable">
  <div *ngIf="currentTutorial.id">
    <h4>Tutorial</h4>
    <div><label>Title:</label> {{ currentTutorial.title }}</div>
    <a routerLink="/tutorials/{{ currentTutorial.id }}">Edit</a>
  </div>
  <div *ngIf="!currentTutorial">
    <p>Please click on a Tutorial...</p>
  </div>
</div>

<ng-template #editable>
  <div *ngIf="currentTutorial.id" class="edit-form">
    <input [(ngModel)]="currentTutorial.title" name="title" />
  </div>
</ng-template>

<!-- AFTER (Angular 20) -->
@if (viewMode()) {
  @if (currentTutorial().id) {
    <div>
      <h4>Tutorial</h4>
      <div><label>Title:</label> {{ currentTutorial().title }}</div>
      <a [routerLink]="'/tutorials/' + currentTutorial().id">Edit</a>
    </div>
  }
  @if (!currentTutorial()) {
    <div>
      <p>Please click on a Tutorial...</p>
    </div>
  }
} @else {
  @if (editableTutorial().id) {
    <div class="edit-form">
      <input 
        [ngModel]="editableTutorial().title"
        (ngModelChange)="editableTutorial.update(t => ({ ...t, title: $event }))"
        name="title" />
      <div *ngIf="message()">{{ message() }}</div>
    </div>
  }
}
```

### Migration Steps
1. Add `standalone: true`
2. Add `imports: [FormsModule, RouterLink]`
3. Add `changeDetection: ChangeDetectionStrategy.OnPush`
4. Replace all constructor DI with `inject()`
5. Replace `@Input()` with `input()` function
6. Convert internal state (`message`) to signal
7. Create `editableTutorial` signal for mutable state
8. Update all methods to use signal reads `()` and writes `.set()` or `.update()`
9. Update template:
   - `*ngIf` → `@if`
   - `ng-template` → `@else` block
   - Read input signals with `()`
   - Handle two-way binding with `.update()`

### Important Notes
- **Input signals are read-only:** Create separate writable signal for editing
- **@else syntax:** Replaces `ng-template #name` pattern
- **Signal.update():** Useful for partial updates: `signal.update(val => ({ ...val, prop: newValue }))`

---

## 5. TutorialService Migration

### Current Code (Angular 16)
```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tutorial } from '../models/tutorial.model';

const baseUrl = 'http://localhost:8080/api/tutorials';

@Injectable({
  providedIn: 'root',
})
export class TutorialService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Tutorial[]> {
    return this.http.get<Tutorial[]>(baseUrl);
  }

  get(id: any): Observable<Tutorial> {
    return this.http.get<Tutorial>(`${baseUrl}/${id}`);
  }

  // ... other methods
}
```

### Target Code (Angular 20)
```typescript
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tutorial } from '../models/tutorial.model';

const baseUrl = 'http://localhost:8080/api/tutorials';

@Injectable({
  providedIn: 'root',
})
export class TutorialService {
  private http = inject(HttpClient);

  getAll(): Observable<Tutorial[]> {
    return this.http.get<Tutorial[]>(baseUrl);
  }

  get(id: string): Observable<Tutorial> {
    return this.http.get<Tutorial>(`${baseUrl}/${id}`);
  }

  create(data: Partial<Tutorial>): Observable<Tutorial> {
    return this.http.post<Tutorial>(baseUrl, data);
  }

  update(id: string, data: Partial<Tutorial>): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(title: string): Observable<Tutorial[]> {
    return this.http.get<Tutorial[]>(`${baseUrl}?title=${title}`);
  }
}
```

### Migration Steps
1. Add `inject` import from `@angular/core`
2. Replace `constructor(private http: HttpClient)` with `private http = inject(HttpClient)`
3. Replace all `any` types with proper TypeScript types
4. Service remains injectable with `providedIn: 'root'`

---

## General Migration Tips

### 1. Signal Update Patterns

```typescript
// Set entire value
signal.set(newValue);

// Update partial value
signal.update(current => ({ ...current, prop: newValue }));

// Mutate array
todos.update(current => [...current, newTodo]);

// Remove from array
todos.update(current => current.filter(t => t.id !== id));
```

### 2. Template Signal Usage

```html
<!-- Reading signals -->
<div>{{ mySignal() }}</div>

<!-- In property bindings -->
<input [value]="mySignal()" />

<!-- In event handlers (pass signal value) -->
<button (click)="doSomething(mySignal())">Click</button>

<!-- In structural directives -->
@if (showSignal()) {
  <div>Content</div>
}

@for (item of itemsSignal(); track item.id) {
  <div>{{ item.name }}</div>
}
```

### 3. Common Pitfalls

❌ **WRONG:** Forgetting to call signal
```typescript
if (submitted) { } // Wrong! 'submitted' is the signal object
```

✅ **CORRECT:** Always call signals
```typescript
if (submitted()) { } // Correct! Gets the signal value
```

❌ **WRONG:** Mutating signal values directly
```typescript
this.tutorial().title = 'New'; // Wrong! No effect
```

✅ **CORRECT:** Use .set() or .update()
```typescript
this.tutorial.update(t => ({ ...t, title: 'New' }));
```

---

## Testing Migration

### Component Test Updates

#### Before (Angular 16)
```typescript
describe('AddTutorialComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddTutorialComponent],
      imports: [FormsModule, HttpClientTestingModule]
    }).compileComponents();
  });

  it('should create', () => {
    expect(component.submitted).toBe(false);
  });
});
```

#### After (Angular 20)
```typescript
describe('AddTutorialComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTutorialComponent, HttpClientTestingModule]
      // Note: Component itself is imported (standalone)
    }).compileComponents();
  });

  it('should create', () => {
    expect(component.submitted()).toBe(false); // Call signal
  });

  it('should update signal', () => {
    component.submitted.set(true);
    expect(component.submitted()).toBe(true);
  });
});
```

---

## Migration Order Recommendation

1. ✅ **AppComponent** (simplest, no dependencies)
2. ✅ **TutorialService** (needed by components)
3. ✅ **TutorialDetailsComponent** (used by TutorialsListComponent)
4. ✅ **AddTutorialComponent** (independent)
5. ✅ **TutorialsListComponent** (depends on TutorialDetailsComponent)
6. ✅ **Delete modules** (after all components converted)
7. ✅ **Update main.ts** (final step)

---

**Remember:** Test after each component migration to catch issues early!
