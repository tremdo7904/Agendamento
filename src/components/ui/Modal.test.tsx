import { render, screen } from '@testing-library/react';
import Modal from './Modal';

describe('Modal', () => {
  it('renderiza o conteúdo quando aberto', () => {
    render(
      <Modal open={true} onClose={() => {}}>
        <div>Conteúdo do Modal</div>
      </Modal>
    );
    expect(screen.getByText('Conteúdo do Modal')).toBeInTheDocument();
  });

  it('não renderiza quando fechado', () => {
    render(
      <Modal open={false} onClose={() => {}}>
        <div>Fechado</div>
      </Modal>
    );
    expect(screen.queryByText('Fechado')).not.toBeInTheDocument();
  });
}); 