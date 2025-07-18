import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DrugInfo from '../../Pages/DrugsInfo';
import axios from 'axios';

// Mock axios
jest.mock('axios');

const mockDrugs = {
  company: ["AstraZeneca", "Pfizer"],
  drugs: [
    { name: "Drug A", company: "AstraZeneca" },
    { name: "Drug B", company: "Pfizer" }
  ]
};

describe('DrugInfo', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockDrugs });
  });

  test('renders all drugs initially', async () => {
    render(<DrugInfo />);

    // Wait for the drugs to render
    const rows = await screen.findAllByRole('row');
    expect(rows.length).toBeGreaterThan(1); // includes header row
  });

  test('filters by selected company', async () => {
    render(<DrugInfo />);
    await screen.findAllByRole('row');

    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'Pfizer' }
    });

    await waitFor(() => {
      expect(screen.getByText('Drug B')).toBeInTheDocument();
      expect(screen.queryByText('Drug A')).not.toBeInTheDocument();
    });
  });

  test('resets to all companies', async () => {
    render(<DrugInfo />);
    await screen.findAllByRole('row');

    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'Pfizer' }
    });

    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'All' }
    });

    await waitFor(() => {
      expect(screen.getByText('Drug A')).toBeInTheDocument();
      expect(screen.getByText('Drug B')).toBeInTheDocument();
    });
  });
});
