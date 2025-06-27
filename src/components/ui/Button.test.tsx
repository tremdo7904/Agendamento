import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  it('renderiza o texto corretamente', () => {
    render(<Button>Salvar</Button>);
    expect(screen.getByText('Salvar')).toBeInTheDocument();
  });

  it('chama onClick quando clicado', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Clique</Button>);
    fireEvent.click(screen.getByText('Clique'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('mostra loading quando loading=true', () => {
    render(<Button loading>Carregando</Button>);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });
}); 