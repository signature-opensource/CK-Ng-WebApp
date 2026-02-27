import { computed, effect, Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { Filter, FilterType, TableColumn } from '@local/ck-gen';

export interface StoredFilterState {
  translationKey: string;
  value: unknown;
  active: boolean;
  filterType: FilterType;
}

export interface PageConfig {
  filters: Array<Filter<unknown>>;
  filterStates: Array<StoredFilterState>;
  pageSize: number;
  columnsState: Record<string, boolean>;
  radioFilterValue: string;
  pageIndex: number;
  searchString: string;
}

export type ConfigurableType = never
  // <ConfigurableTypes />
  ;

@Injectable( {
  providedIn: 'root'
} )
export class PageConfigService {
  readonly #storageKey = 'ck-webapp-config';

  #configMap: WritableSignal<Record<string, PageConfig>> = signal( {} );

  constructor() {
    const saved = this.#load();
    this.#configMap.set( saved );

    effect( () => {
      this.#save( this.#configMap() );
    } );
  }

  #defaultConfig( overrides: Partial<PageConfig> = {} ): PageConfig {
    return {
      filters: [],
      filterStates: [],
      pageSize: 20,
      columnsState: {},
      radioFilterValue: '',
      pageIndex: 1,
      searchString: '',
      ...overrides,
    };
  }

  updateConfig<T extends ConfigurableType>( storageKey: string, config: PageConfig ) {
    const current = this.#configMap();
    this.#configMap.set( {
      ...current,
      [storageKey]: config,
    } );
  }

  updateFilters( storageKey: string, filters: Array<Filter<unknown>> ): void {
    const current = this.#configMap()[storageKey];
    if ( current ) {
      const existingFiltersMap = new Map( current.filters.map( f => [f.label, f] ) );
      const mergedFilters = filters.map( newFilter => {
        const existing = existingFiltersMap.get( newFilter.label );
        return existing ?? newFilter;
      } );
      current.filters = mergedFilters;
      this.updateConfig( storageKey, current );
    } else {
      this.#configMap.set( {
        ...this.#configMap(),
        [storageKey]: this.#defaultConfig( { filters } ),
      } );
    }
  }

  updateFilterStates( storageKey: string, filters: Array<Filter<unknown>>, translationKeys: Array<string> ): void {
    const states: Array<StoredFilterState> = filters.map( ( f, i ) => ( {
      translationKey: translationKeys[i] ?? f.label,
      value: f.value,
      active: f.active,
      filterType: f.filterType,
    } ) );

    const current = this.#configMap()[storageKey];
    if ( current ) {
      this.updateConfig( storageKey, { ...current, filterStates: states } );
    } else {
      this.#configMap.set( {
        ...this.#configMap(),
        [storageKey]: this.#defaultConfig( { filterStates: states } ),
      } );
    }
  }

  getFilterStates( storageKey: string ): Array<StoredFilterState> {
    const states = this.#configMap()[storageKey]?.filterStates;
    return Array.isArray( states ) ? states : [];
  }

  applyStoredFilterStates( filters: Array<Filter<unknown>>, translationKeys: Array<string>, storedStates: Array<StoredFilterState> ): void {
    if ( storedStates.length === 0 ) return;

    const stateMap = new Map( storedStates.map( s => [s.translationKey, s] ) );
    for ( let i = 0; i < filters.length; i++ ) {
      const key = translationKeys[i];
      const stored = stateMap.get( key );
      if ( stored && stored.filterType === filters[i].filterType ) {
        filters[i].value = stored.value;
        filters[i].active = stored.active;
      }
    }
  }

  updateColumns<T extends ConfigurableType>( storageKey: string, columns: Array<TableColumn<T>> ): void {
    const columnsState: Record<string, boolean> = {};
    for ( const col of columns ) {
      columnsState[col.displayedName] = col.hidden;
    }
    const current = this.#configMap()[storageKey];
    if ( current ) {
      this.updateConfig( storageKey, { ...current, columnsState } );
    } else {
      this.#configMap.set( {
        ...this.#configMap(),
        [storageKey]: this.#defaultConfig(),
      } );
    }
  }

  updatePageSize( storageKey: string, pageSize: number ): void {
    const current = this.#configMap()[storageKey];
    if ( current ) {
      current.pageSize = pageSize;
      this.updateConfig( storageKey, current );
    } else {
      this.#configMap.set( {
        ...this.#configMap(),
        [storageKey]: this.#defaultConfig( { pageSize } ),
      } );
    }
  }

  updatePageIndex( storageKey: string, pageIndex: number ): void {
    const current = this.#configMap()[storageKey];
    if ( current ) {
      this.updateConfig( storageKey, { ...current, pageIndex } );
    } else {
      this.#configMap.set( {
        ...this.#configMap(),
        [storageKey]: this.#defaultConfig( { pageIndex } ),
      } );
    }
  }

  resetPageIndex( storageKey: string ): void {
    this.updatePageIndex( storageKey, 1 );
  }

  updateSearchString( storageKey: string, searchString: string ): void {
    const current = this.#configMap()[storageKey];
    if ( current ) {
      this.updateConfig( storageKey, { ...current, searchString } );
    } else {
      this.#configMap.set( {
        ...this.#configMap(),
        [storageKey]: this.#defaultConfig( { searchString } ),
      } );
    }
  }

  clearSearchString( storageKey: string ): void {
    this.updateSearchString( storageKey, '' );
  }

  updateRadioFilterValue( storageKey: string, radioFilterValue: string ): void {
    const current = this.#configMap()[storageKey];
    if ( current ) {
      this.updateConfig( storageKey, { ...current, radioFilterValue } );
    } else {
      this.#configMap.set( {
        ...this.#configMap(),
        [storageKey]: this.#defaultConfig( { radioFilterValue } ),
      } );
    }
  }

  getPageConfig( storageKey: string, defaultRadioFilterValue = '' ): Signal<PageConfig> {
    return computed( () => this.#configMap()[storageKey] ?? this.#defaultConfig( { radioFilterValue: defaultRadioFilterValue } ) );
  }

  #load(): Record<string, PageConfig> {
    try {
      const raw = localStorage.getItem( this.#storageKey );
      if ( !raw ) return {};
      const parsed = JSON.parse( raw ) as Record<string, Partial<PageConfig>>;

      // Migrate old entries that lack new fields
      for ( const key of Object.keys( parsed ) ) {
        const entry = parsed[key];
        if ( entry.filterStates === undefined ) entry.filterStates = [];
        if ( entry.pageIndex === undefined ) entry.pageIndex = 1;
        if ( entry.searchString === undefined ) entry.searchString = '';
      }

      return parsed as Record<string, PageConfig>;
    } catch {
      return {};
    }
  }

  #save( data: Record<string, PageConfig> ): void {
    localStorage.setItem( this.#storageKey, JSON.stringify( data ) );
  }
}
