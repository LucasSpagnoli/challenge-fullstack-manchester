import type { ClientModalProps } from "../api/types/client.interfaces";
import useClientForm from "../api/lib/useClientForm";

export const ClientModal: React.FC<ClientModalProps> = ({ onClose, isNew, initialData, client_id }) => {
    const { name, setName, number, setNumber, fieldErrors, error: apiError, isSubmitting, handleSubmit } = useClientForm({ isNew, initialData, client_id, onClose })

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-md p-8 shadow-2xl border border-black/10 flex flex-col">
                <header className="mb-8">
                    <h2 className="text-2xl font-serif font-light text-black tracking-tight">
                        {isNew ? "Novo Cliente" : "Editar Cliente"}
                    </h2>
                    <p className="text-sm text-black/50 font-sans mt-1">
                        {isNew
                            ? "Insira os dados primários para cadastro."
                            : "Retifique as credenciais do cliente."}
                    </p>
                </header>

                <form onSubmit={handleSubmit} className="space-y-6 flex-1">
                    <div>
                        <label className="block text-xs uppercase tracking-[0.15em] text-black/60 mb-2">
                            Nome Completo
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Ex.: João da Silva"
                            disabled={isSubmitting}
                            className="w-full border-0 border-b border-black/20 bg-transparent py-2.5 text-black placeholder:text-black/30 focus:outline-none focus:border-[#D4AF37] transition-colors duration-200 disabled:opacity-50"
                        />
                    </div>

                    <div>
                        <label className="block text-xs uppercase tracking-[0.15em] text-black/60 mb-2">
                            Número de Celular
                        </label>
                        <input
                            type="tel"
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                            placeholder="+55 (47) 99999-9999"
                            disabled={isSubmitting}
                            className="w-full border-0 border-b border-black/20 bg-transparent py-2.5 text-black placeholder:text-black/30 focus:outline-none focus:border-[#D4AF37] transition-colors duration-200 disabled:opacity-50"
                        />
                    </div>
                    {fieldErrors.name && <p className="text-xs text-red-600">{fieldErrors.name}</p>}
                    {fieldErrors.number && <p className="text-xs text-red-600 mb-2">{fieldErrors.number}</p>}
                    {apiError && <p className="text-xs text-red-600 mb-2">{apiError}</p>}
                    <footer className="mt-10 flex items-center justify-end gap-4">
                        <button
                            onClick={onClose}
                            type="button"
                            disabled={isSubmitting}
                            className="text-xs uppercase tracking-[0.15em] text-black/60 hover:text-black transition-colors font-medium px-4 py-2 disabled:opacity-50">
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting || !name.trim() || !number.trim()}
                            className="px-6 py-3 bg-black text-white text-xs uppercase tracking-[0.2em] hover:bg-[#D4AF37] hover:text-black transition-colors duration-300 disabled:opacity-50">
                            {isSubmitting
                                ? "Processando..."
                                : isNew
                                    ? "Cadastrar"
                                    : "Salvar"}
                        </button>
                    </footer>
                </form>
            </div>
        </div>
    );
};