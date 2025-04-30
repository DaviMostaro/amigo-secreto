import { Group } from "@/types/Group";
import { ErrorItem, getErrorsFromZod } from "@/utils/getErrorsFromZod";
import { useEffect, useState } from "react";
import { InputField } from "../InputField";
import { Button } from "../Button";
import * as api from "@/api/admin";
import { z } from "zod";

type Props = {
    group: Group;
    refreshAction: () => void;
}

export const GroupEdit = ({ group, refreshAction }: Props) => {
    const [nameField, setNameField] = useState(group.name);
    const [errors, setErrors] = useState<ErrorItem[]>([]);
    const [loading, setLoading] = useState(false);

    const groupSchema = z.object({
        nameField: z.string().min(1, 'Preencha o nome do grupo'),
    });

    useEffect(() => {
        setErrors([]);
        const data = groupSchema.safeParse({ nameField });
        if (!data.success) return setErrors(getErrorsFromZod(data.error));
    }, [nameField]);

    const handleSaveButton = async () => {
        if(errors.length > 0) return;

        setLoading(true);
        const updatedGroup = await api.updateGroup(group.id_event, group.id, { name: nameField });  
        setLoading(false);
        if(updatedGroup) {
            refreshAction();
        } else {
            alert('Nao foi possivel atualizar o grupo');
        }
    }

    return(
        <div>
            <h4 className="text-xl">Editar Grupo</h4>
            <InputField
                value={nameField}
                onChange={(e) => setNameField(e.target.value)}
                placeholder="digite o nome do grupo"
                disabled={loading}
                errorMessage={errors.find(item => item.field === 'nameField')?.message}
            />
            <div className="flex gap-3">
                <Button value="Cancelar" disabled={loading} onClick={() => refreshAction()} />
                <Button value={loading ? 'Salvando...' : 'Salvar'}  disabled={loading || errors.length > 0} onClick={handleSaveButton} />
            </div>
        </div>
    );
}