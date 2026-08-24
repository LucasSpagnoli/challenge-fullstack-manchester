import React, { useState } from "react";
import Header from "../components/Header";
import { UserModal } from "../components/UserModal";
import { useUser } from "../api/lib/useUser";
import { ConfirmModal } from "../components/ConfrmModal";

export const AdminPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletingUserId, setDeletingUserId] = useState<number | null>(null);
  const { users, loading, error, addUser, deleteUser } = useUser();

  return (
    <div className="min-h-screen w-full bg-white flex flex-col font-sans relative pt-20">
      <Header />

      <main className="flex-1 py-8 px-6">
        <div className="max-w-7xl mx-auto w-full">

          <header className="mb-14">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-4">
              <div>
                <div className="mb-2 flex items-center gap-3">
                  <div className="w-8 h-px bg-[#D4AF37]" />
                  <span className="text-xs uppercase tracking-[0.35em] text-[#D4AF37]">
                    Administração
                  </span>
                </div>
                <h1 className="text-4xl md:text-[2.75rem] font-serif font-light text-black tracking-tight leading-none">
                  Funcionários do Sistema
                </h1>
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                type="button"
                className="shrink-0 px-6 py-3 bg-black text-white text-[10px] font-medium uppercase tracking-[0.2em] hover:bg-[#D4AF37] hover:text-black transition-colors duration-300 cursor-pointer">
                + Adicionar Funcionário
              </button>
            </div>
            <div className="border-t-[3px] border-black" />
            <div className="border-t border-[#D4AF37] mt-0.75" />
          </header>

          {loading && users.length === 0 && (
            <div className="text-center py-12 text-sm text-black/40 uppercase tracking-[0.2em]">
              Carregando Funcionários...
            </div>
          )}

          {error && (
            <div className="text-center py-12 text-sm text-red-600 uppercase tracking-[0.2em] border border-red-200 bg-red-50 p-4">
              {error}
            </div>
          )}

          {!loading && !error && users.length === 0 && (
            <div className="text-center py-12 text-sm text-black/40 uppercase tracking-[0.2em] border border-dashed border-black/10 p-8">
              Nenhum Funcionário cadastrado no sistema.
            </div>
          )}

          {!error && users.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              {users.map((user) => (
                <article
                  key={user.id}
                  className="w-full border border-black/10 bg-white p-6 flex flex-col gap-6 hover:border-[#D4AF37] transition-colors duration-300">

                  <header className="border-b border-black/5 pb-4 flex justify-between items-center">
                    <h3 className="text-xl font-serif font-light text-black tracking-tight truncate">
                      Dados de Acesso
                    </h3>
                    <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-black/30">
                      ID {String(user.id).padStart(3, "0")}
                    </span>
                  </header>

                  <div className="flex flex-col gap-5 flex-1">
                    <div>
                      <span className="block text-[10px] uppercase tracking-[0.15em] text-black/60 mb-1">
                        Nome do Funcionário
                      </span>
                      <p className="text-base text-black font-light font-serif">
                        {user.name}
                      </p>
                    </div>

                    <div>
                      <span className="block text-[10px] uppercase tracking-[0.15em] text-black/60 mb-1">
                        E-mail de Acesso
                      </span>
                      <p className="text-sm text-black font-light">
                        {user.email}
                      </p>
                    </div>

                    <footer className="mt-4 pt-4 border-t border-black/5 flex items-center justify-between">
                      <button
                        onClick={() => setDeletingUserId(user.id)}
                        type="button"
                        className="text-[10px] uppercase tracking-[0.15em] text-red-900/60 hover:text-red-600 transition-colors font-medium cursor-pointer">
                        Excluir Funcionário
                      </button>
                    </footer>
                  </div>
                </article>
              ))}
            </div>
          )}

        </div>
      </main>

      {isModalOpen && (
        <UserModal
          onClose={() => window.location.reload()}
          onSubmitAction={addUser}
        />
      )}

      {deletingUserId !== null && (
        <ConfirmModal
          onConfirm={async () => {
            try {
              await deleteUser(deletingUserId);
            } catch (err) {
              alert(err instanceof Error ? err.message : "Erro ao deletar Funcionário.");
            } finally {
              setDeletingUserId(null);
            }
          }}
          onCancel={() => setDeletingUserId(null)}
        />
      )}
    </div>
  );
};

export default AdminPage;