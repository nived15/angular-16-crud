# Angular 16 → 20 Migration Quick Reference

## 📊 Migration Overview
- **Current Version:** Angular 16.0.0
- **Target Version:** Angular 20.x
- **Complexity:** MEDIUM
- **Estimated Effort:** 16-24 hours
- **Risk Level:** LOW-MEDIUM
- **Readiness Score:** 65/100

## 🎯 Migration Priorities

### HIGH PRIORITY
1. **TutorialsListComponent** - Core functionality, 65 LOC
2. **TutorialDetailsComponent** - Complex inputs/routing, 93 LOC  
3. **AppComponent** - Root component, must go first

### MEDIUM PRIORITY
4. **AddTutorialComponent** - Form component, 42 LOC
5. **TutorialService** - Dependency injection updates
6. **Module Elimination** - Delete AppModule & AppRoutingModule

## 🔄 Key Pattern Changes

| Angular 16 Pattern | Angular 20 Pattern |
|-------------------|-------------------|
| `@NgModule` | Standalone components |
| `constructor(private service: Service)` | `service = inject(Service)` |
| `@Input() prop: string` | `prop = input<string>()` |
| `@Output() event = new EventEmitter()` | `event = output<T>()` |
| `property = value` | `property = signal(value)` |
| `*ngIf="condition"` | `@if (condition) {}` |
| `*ngFor="let item of items"` | `@for (item of items; track item.id) {}` |
| `HttpClientModule` | `provideHttpClient()` |
| `platformBrowserDynamic()` | `bootstrapApplication()` |

## 📋 Migration Phases (8 Total)

### Phase 1: Preparation (2-3 hrs)
- Backup & branch setup
- Dependency audit
- Test baseline

### Phase 2: Core Update (3-4 hrs)
- Run `ng update @angular/core@20`
- Fix breaking changes
- Verify build

### Phase 3: Standalone Components (6-8 hrs)
- Convert all 4 components
- Implement Signals
- Update templates

### Phase 4: Module Elimination (1-2 hrs)
- Create app.routes.ts
- Update main.ts
- Delete modules

### Phase 5: Service Modernization (1-2 hrs)
- Update DI pattern
- Add type safety

### Phase 6: Zoneless (Optional, 2-3 hrs)
- Remove zone.js
- Performance testing

### Phase 7: Testing & QA (3-4 hrs)
- Update unit tests
- E2E testing
- Performance audit

### Phase 8: Documentation (1-2 hrs)
- Update README
- Team training

## ⚠️ Critical Migration Points

### Must Convert
- ✅ All 4 components → standalone
- ✅ All templates → modern control flow
- ✅ All DI → inject() function
- ✅ All inputs → input() function
- ✅ All state → Signals
- ✅ main.ts → bootstrapApplication()
- ✅ HttpClientModule → provideHttpClient()

### High Risk Areas
1. **Template-driven forms** with ngModel
2. **Observable subscriptions** (use toSignal())
3. **Route params** in TutorialDetailsComponent

## 🧪 Testing Checklist

### Functional Tests
- [ ] Create new tutorial
- [ ] View tutorials list
- [ ] Search by title
- [ ] View tutorial details
- [ ] Edit tutorial
- [ ] Delete tutorial
- [ ] Delete all tutorials
- [ ] Navigation between routes

### Technical Tests
- [ ] All unit tests passing
- [ ] No console errors
- [ ] Bundle size reduced
- [ ] Performance improved
- [ ] Change detection working

## 📦 Component Migration Checklist

### For Each Component:
```typescript
// 1. Add standalone flag
@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // ...
})

// 2. Replace constructor DI
private service = inject(ServiceName);

// 3. Convert inputs
viewMode = input(false);
currentTutorial = input<Tutorial>(defaultValue);

// 4. Convert outputs  
tutorialCreated = output<Tutorial>();

// 5. Convert state to Signals
submitted = signal(false);
tutorials = signal<Tutorial[]>([]);

// 6. Update templates
// *ngIf="condition" → @if (condition) {}
// *ngFor="let x of items" → @for (x of items; track x.id) {}
```

## 🚀 Quick Commands

### Update Angular
```bash
ng update @angular/core@20 @angular/cli@20
```

### Run Tests
```bash
npm test
```

### Build & Analyze
```bash
ng build --configuration production
```

### Serve App
```bash
ng serve
```

## 📈 Success Metrics

- ✅ Zero compilation errors
- ✅ All tests passing (>95%)
- ✅ 0 NgModule files
- ✅ Bundle size: -10% target
- ✅ Performance: 90+ Lighthouse score

## 🔗 Resources

- [Full Assessment Report](./assessment-report.md)
- [Angular Signals Guide](https://angular.dev/guide/signals)
- [Standalone Components](https://angular.dev/guide/components/importing)
- [Modern Control Flow](https://angular.dev/api/core/@if)

## 💡 Pro Tips

1. **Migrate components in dependency order** (AppComponent first)
2. **Keep zone.js initially**, remove after full Signal migration
3. **Use toSignal()** for Observable → Signal conversion
4. **Test after each component** migration
5. **Batch template updates** for efficiency

## 🆘 Rollback Plan

If issues arise:
```bash
git reset --hard origin/master
npm install
ng serve
```

---

**Next Step:** Review [full assessment report](./assessment-report.md) and schedule team meeting to plan migration sprint.
