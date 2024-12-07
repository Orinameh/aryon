import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from '@/components/ErrorBoundary'; // Adjust import path
import { isRouteErrorResponse, useRouteError } from 'react-router';

// Mock react-router-dom
vi.mock('react-router', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    actual,
    isRouteErrorResponse: vi.fn(),
    useRouteError: vi.fn()
  };
});

describe('ErrorBoundary Component', () => {
  // Helper to reset mocks before each test
  beforeEach(() => {
    vi.resetAllMocks();
  });

  // Route Error Response Tests
  describe('Route Error Response', () => {
    it('renders route error response correctly', () => {
      // Mock route error response
      const mockRouteError = {
        status: 404,
        statusText: 'Not Found',
        data: 'Page could not be found'
      };

      vi.mocked(isRouteErrorResponse).mockReturnValue(true);
      vi.mocked(useRouteError).mockReturnValue(mockRouteError);

      render(<ErrorBoundary />);

      // Check route error details
      expect(screen.getByText('404 Not Found')).toBeInTheDocument();
      expect(screen.getByText('Page could not be found')).toBeInTheDocument();
    });

    it('handles different route error statuses', () => {
      const testCases = [
        { status: 500, statusText: 'Internal Server Error', data: 'Server error occurred' },
        { status: 403, statusText: 'Forbidden', data: 'Access denied' }
      ];

      testCases.forEach(mockRouteError => {
        vi.mocked(isRouteErrorResponse).mockReturnValue(true);
        vi.mocked(useRouteError).mockReturnValue(mockRouteError);

        render(<ErrorBoundary />);

        expect(screen.getByText(`${mockRouteError.status} ${mockRouteError.statusText}`)).toBeInTheDocument();
        expect(screen.getByText(mockRouteError.data)).toBeInTheDocument();

        // Clear the previous render
        vi.clearAllMocks();
      });
    });
  });

  // Error Instance Tests
  describe('Error Instance', () => {
    it('renders generic error details', () => {
      // Mock Error instance
      const mockError = new Error('Test error message');
      mockError.stack = 'Mock stack trace';

      vi.mocked(isRouteErrorResponse).mockReturnValue(false);
      vi.mocked(useRouteError).mockReturnValue(mockError);

      render(<ErrorBoundary />);

      // Check error details
      expect(screen.getByText('Error')).toBeInTheDocument();
      expect(screen.getByText('Test error message')).toBeInTheDocument();
      expect(screen.getByText('The stack trace is:')).toBeInTheDocument();
      expect(screen.getByText('Mock stack trace')).toBeInTheDocument();
    });

    it('handles error without stack trace', () => {
      // Mock Error instance without stack
      const mockError = new Error('Test error message');
      delete mockError.stack;

      vi.mocked(isRouteErrorResponse).mockReturnValue(false);
      vi.mocked(useRouteError).mockReturnValue(mockError);

      render(<ErrorBoundary />);

      // Check error details
      expect(screen.getByText('Error')).toBeInTheDocument();
      expect(screen.getByText('Test error message')).toBeInTheDocument();
      expect(screen.getByText('The stack trace is:')).toBeInTheDocument();
    });
  });

  // Unknown Error Tests
  describe('Unknown Error', () => {
    it('renders unknown error message', () => {
      // Mock an unknown error type
      const unknownError = 'Some unknown error';

      vi.mocked(isRouteErrorResponse).mockReturnValue(false);
      vi.mocked(useRouteError).mockReturnValue(unknownError);

      render(<ErrorBoundary />);

      // Check unknown error message
      expect(screen.getByText('Unknown Error')).toBeInTheDocument();
    });
  });

  // Edge Cases
  describe('Edge Cases', () => {
    it('handles null error', () => {
      vi.mocked(isRouteErrorResponse).mockReturnValue(false);
      vi.mocked(useRouteError).mockReturnValue(null);

      render(<ErrorBoundary />);

      // Check unknown error message
      expect(screen.getByText('Unknown Error')).toBeInTheDocument();
    });

    it('handles undefined error', () => {
      vi.mocked(isRouteErrorResponse).mockReturnValue(false);
      vi.mocked(useRouteError).mockReturnValue(undefined);

      render(<ErrorBoundary />);

      // Check unknown error message
      expect(screen.getByText('Unknown Error')).toBeInTheDocument();
    });
  });
});