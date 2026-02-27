# CK.Ng.WebApp

Reusable Angular components for CK back-office detail pages.

## Components

### `ck-details-page-layout`

Full-page layout for detail views: fixed header with back/refresh buttons, an optional fixed header slot, and a scrollable content area.

```html
<ck-details-page-layout (returnClicked)="onReturn()" (refreshClicked)="onRefresh()">
  <div pageHeader>
    <!-- Fixed area: title, tags, actions -->
  </div>

  <!-- Scrollable content -->
  <ck-details-section [title]="'Section Title' | translate">
    <p>Content here</p>
  </ck-details-section>
</ck-details-page-layout>
```

| Output | Description |
|---|---|
| `returnClicked` | Emitted when the back button is clicked |
| `refreshClicked` | Emitted when the refresh button is clicked |

| Slot | Description |
|---|---|
| `[pageHeader]` | Fixed (non-scrolling) area below the header buttons |
| Default | Scrollable content area |

### `ck-details-page-header`

Header bar with a back button and a refresh button. Used internally by `ck-details-page-layout`, but can also be used standalone.

```html
<ck-details-page-header (returnClicked)="onReturn()" (refreshClicked)="onRefresh()" />
```

### `ck-details-section`

Titled content section for use inside detail pages.

```html
<ck-details-section [title]="'Section.Title' | translate">
  <p>Section content</p>
</ck-details-section>
```

| Input | Type | Description |
|---|---|---|
| `title` | `string` | Section heading |
