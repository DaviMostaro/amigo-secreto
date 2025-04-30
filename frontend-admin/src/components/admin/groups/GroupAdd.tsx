import { useState } from "react";
import { InputField } from "../InputField";
import { z } from "zod";
import { ErrorItem, getErrorsFromZod } from "@/utils/getErrorsFromZod";
import { Button } from "../Button";
import * as api from "@/api/admin";

type Props = {
    eventId: number;
    refreshAction: () => void;
}

export const GroupAdd = ({ eventId, refreshAction }: Props) => {
    const [nameField, setNameField] = useState(''); 
    const [errors, setErrors] = useState<ErrorItem[]>([]);
    const [loading, setLoading] = useState(false);

    const groupSchema = z.object({
        nameField: z.string().min(1, 'Preencha o nome do grupo'),
    });

    const handleAddButton = async () => {
        setErrors([]);
        const data = groupSchema.safeParse({ nameField });
        if(!data.success) return setErrors(getErrorsFromZod(data.error));

        setLoading(true);
        const groupItem = await api.addGroup(eventId, { name: nameField });
        setLoading(false);
        if(groupItem) {
            setNameField('');
            refreshAction();
        } else {
            alert('Nao foi possivel adicionar o grupo');
        }
    }

    return (
        <div>
            <h4 className="text-xl">Novo Grupo</h4>
            <InputField 
                value={nameField}
                onChange={e => setNameField(e.target.value)}
                placeholder="Digite o nome do grupo"
                errorMessage={errors.find(e => e.field === 'nameField')?.message}
                type="text"
                disabled={loading}
            />
            <div className="">
                <Button
                    value={loading ? 'Adicionando...' : 'Adicionar'}
                    onClick={handleAddButton}
                />
            </div>
        </div>
    );
};