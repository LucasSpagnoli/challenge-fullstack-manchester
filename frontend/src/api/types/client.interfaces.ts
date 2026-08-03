export interface Client {
    client_id: number,
    name: string
    number: string,
    user_id: number
}

export interface UseClientResult {
    clients: Client[],
    addClient: (client: Client) => Client,
    updateClient: (client: Client) => Client,
    deleteClient: (client_id: number) => any,
    error: string,
    loading: boolean,
}

export interface UpdateClientPayload {
    name?: string,
    number?: string
}

export interface CreateClientPayload {
    name: string,
    number: string
}

export interface ClientModalProps {
    onClose: () => void;
    isNew: boolean;
    initialData?: Client;
    onSubmitAction: (data: { name: string; number: string }) => Promise<any>;
}

export interface UseClientFormProps {
    initialData?: Client;
    onClose: () => void;
    onSubmitAction: (data: { name: string; number: string }) => Promise<any>;
}