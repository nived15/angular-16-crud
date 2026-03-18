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

## 📋 Demo Migration Phases (4 Total)

### Phase 1: Preparation (30 min)
- Create demo branch
- Verify app works
- Document baseline

### Phase 2: Component Migration (2.5 hrs)
- Migrate AppComponent (30 min)
- Migrate AddTutorialComponent (2 hrs)
- Implement all Angular 20 patterns

### Phase 3: Legacy Markers (15 min)
- Add TODO comments to legacy components
- Update AppModule for hybrid approach
- Verify hybrid architecture works

### Phase 4: Demo Validation (30 min)
- Test all functionality
- Document before/after
- Prepare demo presentation

## ⚠️ Demo Critical Points

### Must Migrate (2 Components)
- ✅ AppComponent → standalone
- ✅ AddTutorialComponent → standalone + Signals

### Must Keep Legacy (2 Components)
- ⚠️ TutorialsListComponent → Angular 16 example
- ⚠️ TutorialDetailsComponent → Angular 16 example

### Hybrid Architecture
- ✅ AppModule imports standalone AppComponent
- ✅ Module-based routing still works
- ✅ Mix of standalone and module components
- ✅ Gradual migration demonstration

### Angular 20 Features to Showcase
1. **Standalone components** - `standalone: true`
2. **Signals** - `signal()`, `.set()`, `()`  
3. **Modern control flow** - `@if`, `@for`
4. **inject() function** - No constructor DI
5. **OnPush** - Optimized change detection

## 🧪 Demo Testing Checklist

### Migrated Components (Must Work)
- [ ] AppComponent displays
- [ ] Add Tutorial page loads
- [ ] Form accepts input
- [ ] Submit creates tutorial
- [ ] Success message shows
- [ ] Reset button works

### Legacy Components (Must Still Work)
- [ ] Tutorials list displays
- [ ] Search functionality works
- [ ] Tutorial details display
- [ ] All CRUD operations functional

### Demo Validation
- [ ] Side-by-side code comparison ready
- [ ] Can explain each Angular 20 feature
- [ ] Screenshots/video prepared
- [ ] Talking points documented
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
