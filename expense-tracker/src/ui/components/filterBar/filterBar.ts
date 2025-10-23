//filter strategy
// We create a filter bar component
// The component will accept a search input, a category dropdown and a date range picker
// we can subscribe to the app store so that we are hooked into any changes
// we define a new filter.ts file that defines our filter methods and actions
// we have a method in appStore that calls applyFilters from filter.ts
// when filters change, we call app store.applyFilters with the current filters
// this way, the dashboard and any other state subscribers will get the filtered data

// The filterBar component will have its own state for the current filter values
// on change of any filter input, we update the filter state and call appStore.applyFilters
