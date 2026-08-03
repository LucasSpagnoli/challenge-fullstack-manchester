import { useState } from "react";
import { validateClient } from "../../utils/validateClient";
import { numberToCellphone } from "../../utils/numberToCellphone";
import type { UseClientFormProps } from "../types/client.interfaces";

function useClientForm({ initialData, onClose, onSubmitAction }: UseClientFormProps) {
    const [name, setName] = useState(initialData?.name ?? "");
    const [number, setNumber] = useState(initialData?.number ?? "");
    const [fieldErrors, setFieldErrors] = useState<{ name?: string; number?: string }>({});
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formattedNumber = numberToCellphone(number.trim());
        const { valid, errors } = validateClient(name, formattedNumber);
        setError(null)
        setFieldErrors(errors);
        if (!valid) return;

        setIsSubmitting(true);
        try {
            await onSubmitAction({ name: name.trim(), number: formattedNumber })
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