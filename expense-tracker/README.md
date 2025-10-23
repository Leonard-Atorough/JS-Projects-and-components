# Expense Tracker

A TypeScript-based expense tracking application that helps users manage and analyze their spending. Built with modern web technologies and a focus on clean architecture.

## Features

### Currently Implemented ✅

- **Expense Management**

  - Add new expenses with descriptions and amounts
  - Edit existing expenses
  - Categorize expenses
  - Date tracking for expenses

- **Data Persistence**

  - Local storage integration
  - Automatic saving of expenses

- **State Management**

  - Custom state management solution
  - Reactive updates
  - State subscription system

- **UI Components**
  - Expense input form with validation
  - Expense table with sorting
  - Modular component architecture
  - CSS modules for styled components

### Coming Soon 🚀

- **Filtering & Search**

  - Search by expense description
  - Category filtering
  - Date range selection
  - Advanced filter combinations

- **Data Visualization**

  - Monthly spending overview
  - Category-wise breakdown
  - Spending trends
  - Interactive charts

- **Enhanced Features**
  - Batch operations for expenses
  - Export functionality
  - Budget tracking
  - Spending analytics

## Technology Stack

- TypeScript
- Modern ES6+ JavaScript
- CSS Modules
- Vite (Build tool)
- Vitest (Testing)

## Project Structure

expense-tracker/
├── src/
│ ├── models/ # Data models and types
│ ├── services/ # Core services (storage, etc.)
│ ├── state/ # State management
│ └── ui/ # UI components and views
│ ├── components/ # Reusable UI components
│ ├── layout/ # Layout components
│ └── views/ # Page views

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server
   ```bash
    npm run dev
   ```
4. Run tests
   ```bash
   npm test
   ```

## Testing

- Unit tests with Vitest
- Mock implementations for browser APIs
- Coverage reporting
-

## Contributing

1. Fork the repository
2. Create your feature branch (git checkout -b feature/AmazingFeature)
3. Commit your changes (git commit -m 'Add some AmazingFeature')
4. Push to the branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE.md file for details

## Acknowledgments

Built with modern TypeScript best practices
Focused on maintainable, testable code
Modular architecture for easy extension
