import { createPortal } from "react-dom";
import type { ConfirmModalProps } from "../api/types/client.interfaces";
import { useState } from "react";

export function ConfirmModal({ onConfirm, onCancel }: ConfirmModalProps) {

    const [isDeleting, setIsDeleting] = useState(false);
    const handleConfirm = async () => {
        setIsDeleting(true);
        try {
            await onConfirm();
        } finally {
            setIsDeleting(false);
        }
    };
    return createPortal(
        <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 font-sans">
            <div className="bg-white w-full max-w-sm p-8 shadow-2xl border border-black/10 flex flex-col">

                <header className="mb-6">
                    <div className="mb-3 w-8 h-px bg-red-700" />
                    <p className="text-md text-black mt-2 leading-relaxed">
                        Tem certeza de que deseja prosseguir?<br /> Esta ação é irreversível.</p>
                </header>

                <footer className="flex items-center justify-end gap-3">
                    <button
                        onClick={onCancel}
                        type="button"
                        className="cursor-pointer text-xs uppercase tracking-[0.15em] text-black/60 hover:text-black transition-colors font-medium px-4 py-2">
                        Cancelar
                    </button>

                    <button
                        onClick={handleConfirm}
                        type="button"
                        disabled={isDeleting}
                        className="cursor-pointer px-6 py-3 bg-black text-white text-xs uppercase tracking-[0.2em] hover:bg-red-700 transition-colors duration-300">
                        {isDeleting ? "Carregando..." : "Excluir"}
                    </button>
                </footer>

            </div>
        </div>,
        document.body
    );
}