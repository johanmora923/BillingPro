'use client';

import React from 'react';
import { toast } from 'sonner';

export default function PromiseToast() {
    return (
        <button
            className="toast-button"
            onClick={() => {
                // Creamos una promesa
                const myPromise = new Promise((resolve) => {
                    setTimeout(() => {
                        resolve({ name: 'My toast' }); // Resuelve la promesa después de 3 segundos
                    }, 3000);
                });

                // Usamos el toast.promise de Sonner
                toast.promise(myPromise, {
                    loading: 'Loading...', // Mensaje mostrado mientras la promesa está pendiente
                    success: (data) => {
                        return `${data.name} toast has been added`; // Mensaje al resolverse con éxito
                    },
                    error: 'Error', // Mensaje en caso de error
                });
            }}
        >
            Render toast
        </button>
    );
}
