# Angular 16 → 20 Demo Migration Checklist

**Demo Scope:** Partial migration of 2 components (AppComponent + AddTutorialComponent)  
**Legacy Components:** 2 components kept as Angular 16 examples for comparison  
**Estimated Time:** 3-4 hours

Use this checklist to track your demo migration progress.

---

## Pre-Migration Setup (30 min)

### Preparation
- [ ] Read [assessment report](./assessment-report.md) - Demo scope section
- [ ] Review [component migration guide](./component-migration-guide.md)
- [ ] Create demo branch: `git checkout -b demo/angular-20-migration`
- [ ] Ensure current app runs: `ng serve`
- [ ] Test "Add Tutorial" feature works
- [ ] Take screenshot/video of current state

### Demo Baseline
- [ ] App loads without errors: ✓ / ✗
- [ ] Add Tutorial works: ✓ / ✗
- [ ] Ready to begin migration: ✓ / ✗

---

## Phase 1: AppComponent Migration (30 min)

### Make Standalone
- [ ] Add `standalone: true` to @Component decorator
- [ ] Add `imports: [RouterOutlet, CommonModule]`
- [ ] Add `changeDetection: ChangeDetectionStrategy.OnPush`

### Convert to Signals
- [ ] Convert `title` property to `signal('Angular 20 Demo - Hybrid Migration')`
- [ ] Update template to use `{{ title() }}` if displayed

### Update AppModule
- [ ] Remove AppComponent from `declarations` array
- [ ] Add AppComponent to `imports` array

### Test
- [ ] Application compiles: ✓ / ✗
- [ ] Application loads in browser: ✓ / ✗
- [ ] No console errors: ✓ / ✗
- [ ] Navigation works: ✓ / ✗

**AppComponent Status:** ⬜ Not Started | ⬜ In Progress | ⬜ Complete

---

## Phase 2: AddTutorialComponent Migration (2 hours)

### Make Standalone
- [ ] Add `standalone: true` to @Component decorator
- [ ] Add `imports: [FormsModule, CommonModule]`
- [ ] Add `changeDetection: ChangeDetectionStrategy.OnPush`

### Update Dependency Injection
- [ ] Remove `constructor(private tutorialService: TutorialService)`
- [ ] Add `tutorialService = inject(TutorialService);`
- [ ] Add import: `import { inject } from '@angular/core';`

### Convert State to Signals
- [ ] Convert `tutorial` object to signal:
  ```typescript
  tutorial = signal<Tutorial>({
    title: '',
    description: '',
    published: false
  });
  ```
- [ ] Convert `submitted` to `signal(false)`

### Update Methods to Use Signals
- [ ] Update `saveTutorial()` method:
  - [ ] Read tutorial data using `this.tutorial()`
  - [ ] Set submitted using `this.submitted.set(true)`
- [ ] Update `newTutorial()` method:
  - [ ] Reset submitted: `this.submitted.set(false)`
  - [ ] Reset tutorial: `this.tutorial.set({ title: '', description: '', published: false })`

### Migrate Template Control Flow
- [ ] Replace `*ngIf="!submitted"` with `@if (!submitted()) {`
- [ ] Replace `*ngIf="submitted"` with `@if (submitted()) {`
- [ ] Add closing braces `}` for @if blocks

### Fix Template Property Bindings
- [ ] Update all `tutorial.title` references to work with signals
- [ ] Fix `[(ngModel)]` bindings to work with signal updates
- [ ] Test form input updates signal correctly

### Add Educational Comments
- [ ] Add comment: `// Angular 20: Using inject() instead of constructor DI`
- [ ] Add comment: `// Angular 20: Using Signals for reactive state`
- [ ] Add comment: `// Angular 20: Modern @if control flow`

### Test AddTutorialComponent
- [ ] Component compiles: ✓ / ✗
- [ ] Form displays correctly: ✓ / ✗
- [ ] Can type in title field: ✓ / ✗
- [ ] Can type in description field: ✓ / ✗
- [ ] Submit button works: ✓ / ✗
- [ ] Success message displays: ✓ / ✗
- [ ] "Add" button creates new form: ✓ / ✗
- [ ] No console errors: ✓ / ✗

**AddTutorialComponent Status:** ⬜ Not Started | ⬜ In Progress | ⬜ Complete

---

## Phase 3: Mark Legacy Components (15 min)

### TutorialsListComponent
- [ ] Add TODO comment at top:
  ```typescript
  // TODO: LEGACY COMPONENT - Angular 16 Pattern (Not Migrated)
  // Kept for before/after comparison in demo
  // See AddTutorialComponent for Angular 20 patterns
  ```
- [ ] Verify component still works: ✓ / ✗

### TutorialDetailsComponent
- [ ] Add TODO comment at top:
  ```typescript
  // TODO: LEGACY COMPONENT - Angular 16 Pattern (Not Migrated)
  // Kept for before/after comparison in demo
  // See AddTutorialComponent for Angular 20 patterns
  ```
- [ ] Verify component still works: ✓ / ✗

**Legacy Components Status:** ⬜ Not Started | ⬜ Complete

---

## Phase 4: Demo Validation (30 min)

### Code Comparison Documentation
- [ ] Create side-by-side comparison:
  - [ ] AppComponent (Angular 20) vs Legacy
  - [ ] AddTutorialComponent (Angular 20) vs TutorialsListComponent (Angular 16)
- [ ] Document key differences spotted:
  - [ ] `standalone: true`
  - [ ] Signals vs plain properties
  - [ ] `inject()` vs constructor DI
  - [ ] `@if` vs `*ngIf`
  - [ ] `OnPush` change detection

### Functional Testing
- [ ] Navigate to Add Tutorial page
- [ ] Fill out tutorial form
- [ ] Submit tutorial
- [ ] See success message
- [ ] Click "Add" to reset form
- [ ] Navigate to Tutorials List (legacy component)
- [ ] Verify new tutorial appears
- [ ] All navigation works correctly

### Demo Preparation
- [ ] Take screenshots of:
  - [ ] Migrated component code
  - [ ] Legacy component code
  - [ ] Working application
- [ ] Record 2-minute demo video (optional)
- [ ] Prepare talking points:
  - [ ] Why hybrid migration approach
  - [ ] Key Angular 20 features shown
  - [ ] Benefits of gradual migration
- [ ] Create demo presentation outline

**Demo Validation Status:** ⬜ Not Started | ⬜ Complete

---

## Final Demo Checklist

### Pre-Demo Review
- [ ] All migrated components work correctly
- [ ] All legacy components still functional
- [ ] No console errors in browser
- [ ] Application compiles without errors
- [ ] Code includes educational comments
- [ ] Documentation updated

### Demo Readiness
- [ ] Can explain standalone components
- [ ] Can explain Signals
- [ ] Can explain modern control flow  
- [ ] Can explain inject() function
- [ ] Can explain OnPush change detection
- [ ] Can show before/after comparison

### Success Criteria ✓
- [ ] 2 components migrated to Angular 20
- [ ] 2 components kept as legacy examples
- [ ] Hybrid architecture working
- [ ] All features functional
- [ ] Total time: 3-4 hours or less
- [ ] Demo ready to present

---

## Time Tracking

| Phase | Estimated | Actual | Notes |
|-------|-----------|--------|-------|
| Phase 1: AppComponent | 30 min | _____ | |
| Phase 2: AddTutorialComponent | 2 hrs | _____ | |
| Phase 3: Legacy Markers | 15 min | _____ | |
| Phase 4: Demo Validation | 30 min | _____ | |
| **TOTAL** | **3-4 hrs** | **_____** | |

---

## Notes & Issues

Use this space to track any issues or important notes during migration:

```
Issue #1:


Resolution:


Issue #2:


Resolution:
```

---

## Post-Demo Next Steps

After successful demo, if proceeding with full migration:
- [ ] Migrate TutorialsListComponent
- [ ] Migrate TutorialDetailsComponent
- [ ] Update TutorialService fully
- [ ] Eliminate AppModule completely
- [ ] Create standalone routing
- [ ] Update main.ts to bootstrapApplication
- [ ] Full test suite update
- [ ] Production deployment

**Full Migration Estimated:** Additional 12-16 hours

---

## Demo Completed ✓

- [ ] Demo successfully presented
- [ ] Stakeholder feedback collected
- [ ] Decision made on full migration: YES / NO / LATER
- [ ] Next steps documented

**Completion Date:** _________________  
**Completed By:** _________________  
**Demo Result:** _________________

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
