import { useState } from "react";
import { validateClient } from "../../utils/validateClient";
import { numberToCellphone } from "../../utils/numberToCellphone";
import type { ClientModalProps } from "../types/client.interfaces";
import { createClient, updateClient } from "../clients";

function useClientForm({ isNew, initialData, client_id, onClose }: ClientModalProps) {
    const [name, setName] = useState(initialData?.name ?? "");
    const [number, setNumber] = useState(initialData?.number ?? "");
    const [fieldErrors, setFieldErrors] = useState<{ name?: string; number?: string }>({});
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { valid, errors } = validateClient(name, number);
        setFieldErrors(errors);
        if (!valid) return;

        setIsSubmitting(true);
        try {
            const formattedNumber = numberToCellphone(number.trim());
            if (isNew) await createClient({ name: name.trim(), number: formattedNumber });
            else if (client_id) await updateClient(client_id, { name: name.trim(), number: formattedNumber });
            onClose();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Falha ao carregar os clientes.");
        }
        finally {
            setIsSubmitting(false);
        }
    };

    return { name, setName, number, setNumber, fieldErrors, isSubmitting, handleSubmit, error };
}

export default useClientForm