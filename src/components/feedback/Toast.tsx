import { toast, Toaster, ToastBar } from 'react-hot-toast';
import React from 'react';

const CustomToaster: React.FC = () => (
  <Toaster
    position="top-right"
    toastOptions={{
      className: 'rounded shadow-lg font-medium text-sm',
      style: { background: '#fff', color: '#222' },
      duration: 4000,
    }}
    containerClassName="z-[9999]"
  >
    {(t) => (
      <ToastBar toast={t} style={{}}>
        {({ icon, message }) => (
          <div className="flex items-center gap-2">
            {icon}
            <span>{message}</span>
            {t.type !== 'loading' && (
              <button
                className="ml-2 text-blue-600 hover:underline text-xs"
                onClick={() => toast.dismiss(t.id)}
              >
                Fechar
              </button>
            )}
          </div>
        )}
      </ToastBar>
    )}
  </Toaster>
);

export default CustomToaster; 