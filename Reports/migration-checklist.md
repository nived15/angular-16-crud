# Angular 16 → 20 Migration Checklist

Use this checklist to track your migration progress. Check off items as you complete them.

---

## Pre-Migration Setup

### Preparation
- [ ] Read full [assessment report](./assessment-report.md)
- [ ] Review [component migration guide](./component-migration-guide.md)
- [ ] Team meeting scheduled and migration plan approved
- [ ] Create backup of entire codebase
- [ ] Create feature branch: `git checkout -b feature/angular-20-migration`
- [ ] Ensure all current tests are passing
- [ ] Document current bundle size for comparison
- [ ] Set up testing environment

### Baseline Metrics
- [ ] Record current bundle size: _________ KB
- [ ] Record current test pass rate: _________ %
- [ ] Record current Lighthouse score: _________
- [ ] Record current load time: _________ seconds

---

## Phase 1: Angular Core Update

### Update Dependencies
- [ ] Run `ng update @angular/core@20 @angular/cli@20`
- [ ] Review migration output for warnings
- [ ] Fix any automatic migration errors
- [ ] Update `tsconfig.json` if needed
- [ ] Run `npm install` to ensure clean install
- [ ] Verify `ng serve` runs without errors
- [ ] Check browser console for errors
- [ ] Run tests: `npm test`

### Verify Build
- [ ] Application compiles successfully
- [ ] Application loads in browser
- [ ] No console errors on load
- [ ] Basic navigation works

**Phase 1 Exit Criteria:**
- [ ] All checklist items above completed
- [ ] Application runs on Angular 20
- [ ] No blocking errors

---

## Phase 2: Component Migration

### 1. AppComponent
- [ ] Add `standalone: true`
- [ ] Add `imports: [RouterOutlet]`
- [ ] Add `changeDetection: ChangeDetectionStrategy.OnPush`
- [ ] Convert `title` property to `signal()`
- [ ] Update template to read signal with `()`
- [ ] Test: Application loads and displays correctly
- [ ] Run component tests
- [ ] Fix any failing tests

**AppComponent Status:** ⬜ Not Started | ⬜ In Progress | ⬜ Complete

---

### 2. TutorialDetailsComponent
- [ ] Add `standalone: true`
- [ ] Add `imports: [FormsModule, RouterLink]`
- [ ] Add `changeDetection: ChangeDetectionStrategy.OnPush`
- [ ] Replace `constructor` DI with `inject()`:
  - [ ] TutorialService
  - [ ] ActivatedRoute
  - [ ] Router
- [ ] Convert `@Input() viewMode` to `input(false)`
- [ ] Convert `@Input() currentTutorial` to `input<Tutorial>(defaultValue)`
- [ ] Convert `message` to `signal('')`
- [ ] Create `editableTutorial` writable signal
- [ ] Update `ngOnInit()` to use signal reads `()`
- [ ] Update `getTutorial()` to use `.set()`
- [ ] Update `updatePublished()` to use signals
- [ ] Update `updateTutorial()` to use signals
- [ ] Update `deleteTutorial()` to use signals
- [ ] Update template:
  - [ ] Replace `*ngIf` with `@if`
  - [ ] Replace `ng-template` with `@else`
  - [ ] Update all property reads to signal calls
  - [ ] Fix two-way binding with `.update()`
- [ ] Test: View mode displays correctly
- [ ] Test: Edit mode works
- [ ] Test: Update tutorial
- [ ] Test: Delete tutorial
- [ ] Test: Publish/unpublish status
- [ ] Run component tests
- [ ] Fix any failing tests

**TutorialDetailsComponent Status:** ⬜ Not Started | ⬜ In Progress | ⬜ Complete

---

### 3. AddTutorialComponent
- [ ] Add `standalone: true`
- [ ] Add `imports: [FormsModule]`
- [ ] Add `changeDetection: ChangeDetectionStrategy.OnPush`
- [ ] Replace `constructor` DI with `inject(TutorialService)`
- [ ] Convert `tutorial` to `signal<Tutorial>(defaultValue)`
- [ ] Convert `submitted` to `signal(false)`
- [ ] Update `saveTutorial()`:
  - [ ] Read tutorial with `this.tutorial()`
  - [ ] Set submitted with `this.submitted.set(true)`
- [ ] Update `newTutorial()`:
  - [ ] Set submitted with `.set(false)`
  - [ ] Set tutorial with `.set(defaultValue)`
- [ ] Update template:
  - [ ] Replace `*ngIf` with `@if`
  - [ ] Update signal reads: `submitted()`, `tutorial()`
  - [ ] Fix two-way binding (split into `[ngModel]` and `(ngModelChange)`)
- [ ] Test: Form displays correctly
- [ ] Test: Submit tutorial
- [ ] Test: "Add" button creates new form
- [ ] Run component tests
- [ ] Fix any failing tests

**AddTutorialComponent Status:** ⬜ Not Started | ⬜ In Progress | ⬜ Complete

---

### 4. TutorialsListComponent
- [ ] Add `standalone: true`
- [ ] Add `imports: [FormsModule, TutorialDetailsComponent]`
- [ ] Add `changeDetection: ChangeDetectionStrategy.OnPush`
- [ ] Replace `constructor` DI with `inject(TutorialService)`
- [ ] Convert properties to signals:
  - [ ] `tutorials = signal<Tutorial[]>([])`
  - [ ] `currentTutorial = signal<Tutorial>({})`
  - [ ] `currentIndex = signal(-1)`
  - [ ] `title = signal('')`
- [ ] Update `retrieveTutorials()` to use `.set()`
- [ ] Update `refreshList()` to use `.set()`
- [ ] Update `setActiveTutorial()` to use `.set()`
- [ ] Update `removeAllTutorials()` to use signals
- [ ] Update `searchTitle()`:
  - [ ] Read title with `this.title()`
  - [ ] Set results with `.set()`
- [ ] Update template:
  - [ ] Replace `*ngFor` with `@for` (include `track tutorial.id`)
  - [ ] Replace `*ngIf` with `@if` if used
  - [ ] Update all property reads to signal calls
  - [ ] Use `$index` for loop index
  - [ ] Fix two-way binding on search input
  - [ ] Pass signals to child component: `[currentTutorial]="currentTutorial()"`
- [ ] Test: List displays tutorials
- [ ] Test: Click tutorial selects it
- [ ] Test: Search by title works
- [ ] Test: Delete all tutorials
- [ ] Test: Tutorial details display in sidebar
- [ ] Run component tests
- [ ] Fix any failing tests

**TutorialsListComponent Status:** ⬜ Not Started | ⬜ In Progress | ⬜ Complete

---

**Phase 2 Exit Criteria:**
- [ ] All 4 components migrated to standalone
- [ ] All components use Signals
- [ ] All components use `inject()` for DI
- [ ] All components use OnPush change detection
- [ ] All templates use modern control flow
- [ ] All component tests passing
- [ ] Full application functionality verified

---

## Phase 3: Service Migration

### TutorialService
- [ ] Add `inject` import from `@angular/core`
- [ ] Replace `constructor(private http: HttpClient)` with `private http = inject(HttpClient)`
- [ ] Update type signatures (remove `any`):
  - [ ] `get(id: string): Observable<Tutorial>`
  - [ ] `create(data: Partial<Tutorial>): Observable<Tutorial>`
  - [ ] `update(id: string, data: Partial<Tutorial>): Observable<any>`
  - [ ] `delete(id: string): Observable<any>`
  - [ ] `findByTitle(title: string): Observable<Tutorial[]>`
- [ ] Run service tests
- [ ] Fix any failing tests

**TutorialService Status:** ⬜ Not Started | ⬜ In Progress | ⬜ Complete

---

## Phase 4: Module Elimination

### Create Route Configuration
- [ ] Create `src/app/app.routes.ts`
- [ ] Export routes as `const` array:
  ```typescript
  export const routes: Routes = [
    { path: '', redirectTo: 'tutorials', pathMatch: 'full' },
    { path: 'tutorials', component: TutorialsListComponent },
    { path: 'tutorials/:id', component: TutorialDetailsComponent },
    { path: 'add', component: AddTutorialComponent }
  ];
  ```
- [ ] Test: Routes file compiles

### Update main.ts
- [ ] Import `bootstrapApplication` from `@angular/platform-browser`
- [ ] Import `provideRouter` from `@angular/router`
- [ ] Import `provideHttpClient` from `@angular/common/http`
- [ ] Import `provideZoneChangeDetection` from `@angular/core`
- [ ] Import `AppComponent`
- [ ] Import `routes` from `./app/app.routes`
- [ ] Replace `platformBrowserDynamic().bootstrapModule(AppModule)` with:
  ```typescript
  bootstrapApplication(AppComponent, {
    providers: [
      provideRouter(routes),
      provideHttpClient(),
      provideZoneChangeDetection({ eventCoalescing: true })
    ]
  })
  ```
- [ ] Test: Application compiles
- [ ] Test: Application loads
- [ ] Test: All routes work

### Delete Module Files
- [ ] Delete `src/app/app.module.ts`
- [ ] Delete `src/app/app-routing.module.ts`
- [ ] Search codebase for any remaining module imports
- [ ] Remove any lingering module references
- [ ] Test: Application compiles without modules
- [ ] Test: Full application functionality

**Phase 4 Exit Criteria:**
- [ ] Zero `*.module.ts` files in `src/app/`
- [ ] `main.ts` uses standalone bootstrap
- [ ] All routes working
- [ ] HTTP calls functioning
- [ ] No compilation errors

---

## Phase 5: Configuration Updates

### angular.json
- [ ] Review polyfills section
- [ ] Consider removing `zone.js` for zoneless (optional)
- [ ] Update budget limits if needed
- [ ] Test build: `ng build --configuration production`

### tsconfig.json
- [ ] Update `target` to `ES2023` (optional)
- [ ] Update `lib` to include `ES2023` (optional)
- [ ] Review `experimentalDecorators` (can be removed after full Signal migration)
- [ ] Consider setting `useDefineForClassFields: true`
- [ ] Test: Application compiles with new config

### package.json
- [ ] Verify all Angular packages are @20.x
- [ ] Check for deprecated dependencies
- [ ] Consider updating Bootstrap (currently 4.6.2)
- [ ] Run `npm audit` and fix vulnerabilities
- [ ] Run `npm outdated` to check for updates

---

## Phase 6: Testing & Quality Assurance

### Unit Tests
- [ ] All component tests updated and passing
- [ ] All service tests updated and passing
- [ ] Test coverage >80%
- [ ] No skipped/disabled tests
- [ ] Run: `npm test`

### Manual Testing Checklist
- [ ] **Navigate to tutorials list** - displays correctly
- [ ] **Click on a tutorial** - details display in sidebar
- [ ] **Search for tutorial by title** - filters list correctly
- [ ] **Navigate to Add Tutorial page** - form displays
- [ ] **Fill out form and submit** - success message shown
- [ ] **Click "Add" button** - form resets
- [ ] **Navigate to tutorial details** (full page view)
- [ ] **Edit tutorial fields** - can type in inputs
- [ ] **Click Update** - success message shown
- [ ] **Toggle Published status** - updates correctly
- [ ] **Click Delete** - navigates back to list
- [ ] **Click "Remove All"** - deletes all tutorials
- [ ] **Test browser back/forward buttons** - navigation works
- [ ] **Refresh page on each route** - loads correctly

### Cross-Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### Performance Testing
- [ ] Run Lighthouse audit
- [ ] Record new bundle size: _________ KB
- [ ] Compare with baseline (target: -10%)
- [ ] Record new load time: _________ seconds
- [ ] Compare with baseline
- [ ] Check for console warnings/errors
- [ ] Verify change detection efficiency

### Code Quality
- [ ] Run linter: `ng lint` (if configured)
- [ ] No TypeScript compilation errors
- [ ] No template errors
- [ ] Code formatted consistently
- [ ] Remove any debug console.logs

---

## Phase 7: Documentation

### Code Documentation
- [ ] Update `README.md` with Angular 20 information
- [ ] Document new component patterns
- [ ] Update developer setup instructions
- [ ] Add migration notes to project docs

### Team Knowledge Transfer
- [ ] Schedule team training on Signals
- [ ] Share migration guide with team
- [ ] Demonstrate new patterns
- [ ] Answer team questions
- [ ] Update onboarding documentation

---

## Phase 8: Deployment Preparation

### Pre-Deployment
- [ ] Create production build: `ng build --configuration production`
- [ ] Test production build locally
- [ ] Review build output and sizes
- [ ] Ensure no build warnings
- [ ] Create deployment checklist
- [ ] Prepare rollback plan

### Staging Deployment
- [ ] Deploy to staging environment
- [ ] Smoke test all critical paths
- [ ] Performance test on staging
- [ ] Security scan (if applicable)
- [ ] Stakeholder review

### Production Deployment
- [ ] Schedule deployment window
- [ ] Notify stakeholders
- [ ] Deploy to production
- [ ] Verify deployment success
- [ ] Monitor for errors
- [ ] Check performance metrics

---

## Post-Migration

### Monitoring (First 24 Hours)
- [ ] Monitor error logs
- [ ] Check application performance
- [ ] Review user feedback
- [ ] Verify all features working
- [ ] Check analytics for anomalies

### Optimization (Optional)
- [ ] Investigate zoneless configuration
- [ ] Consider lazy loading routes
- [ ] Optimize bundle size further
- [ ] Implement performance improvements
- [ ] Add PWA capabilities

### Cleanup
- [ ] Remove Angular 16 backup branches (after 30 days)
- [ ] Update CI/CD pipelines
- [ ] Archive migration documentation
- [ ] Update team wiki/confluence

---

## Final Checklist

### Success Criteria
- [ ] ✅ Application running on Angular 20
- [ ] ✅ Zero NgModule files in codebase
- [ ] ✅ All components standalone
- [ ] ✅ All components use Signals
- [ ] ✅ All DI uses `inject()` function
- [ ] ✅ All templates use modern control flow
- [ ] ✅ All tests passing (>95%)
- [ ] ✅ Performance maintained or improved
- [ ] ✅ No console errors
- [ ] ✅ Bundle size reduced
- [ ] ✅ Deployment successful
- [ ] ✅ Team trained on new patterns

---

## Notes & Issues

### Issues Encountered
_Document any issues encountered during migration and their solutions:_

1. Issue: _________________________
   Solution: _____________________

2. Issue: _________________________
   Solution: _____________________

### Lessons Learned
_Document lessons learned for future migrations:_

1. _________________________________

2. _________________________________

### Time Tracking
- Phase 1 (Core Update): ________ hours
- Phase 2 (Components): ________ hours
- Phase 3 (Services): ________ hours
- Phase 4 (Modules): ________ hours
- Phase 5 (Config): ________ hours
- Phase 6 (Testing): ________ hours
- Phase 7 (Docs): ________ hours
- Phase 8 (Deployment): ________ hours
- **Total Time:** ________ hours

---

## Resources

- [Full Assessment Report](./assessment-report.md)
- [Quick Reference Guide](./migration-quick-reference.md)
- [Component Migration Guide](./component-migration-guide.md)
- [Angular Signals Documentation](https://angular.dev/guide/signals)
- [Angular Standalone Components](https://angular.dev/guide/components/importing)
- [Modern Control Flow](https://angular.dev/api/core/@if)

---

**Migration Status:** ⬜ Not Started | ⬜ In Progress | ⬜ Complete

**Migration Completed Date:** _______________

**Team Sign-off:** _______________
