import { render } from '@testing-library/react';
import CustomToaster from './Toast';

describe('CustomToaster', () => {
  it('renderiza o Toaster do react-hot-toast', () => {
    const { container } = render(<CustomToaster />);
    expect(container.querySelector('.z-[9999]')).toBeInTheDocument();
  });
}); 