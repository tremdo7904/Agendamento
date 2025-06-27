import { render, screen, fireEvent } from '@testing-library/react';
import Input from './Input';

describe('Input', () => {
  it('renderiza o label e valor corretamente', () => {
    render(<Input label="Nome" value="João" onChange={() => {}} />);
    expect(screen.getByLabelText('Nome')).toHaveValue('João');
  });

  it('chama onChange ao digitar', () => {
    const handleChange = jest.fn();
    render(<Input label="Email" value="" onChange={handleChange} />);
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'a@b.com' } });
    expect(handleChange).toHaveBeenCalled();
  });
}); 