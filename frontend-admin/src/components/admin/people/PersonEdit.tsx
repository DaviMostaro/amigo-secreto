import { PersonComplete } from "@/types/PersonComplete";
import * as api from "@/api/admin";
import { useEffect, useState } from "react";
import { ErrorItem, getErrorsFromZod } from "@/utils/getErrorsFromZod";
import { z } from "zod";
import { InputField } from "../InputField";
import { escapeCPF } from "@/utils/escapeCPF";
import { Button } from "../Button";

type Props = {
    person: PersonComplete;
    refreshAction: () => void
};

export const PersonEdit = ({ person, refreshAction }: Props) => {
    const [nameField, setNameField] = useState(person.name);
    const [cpfField, setCpfField] = useState(person.cpf);
    const [errors, setErrors] = useState<ErrorItem[]>([]);
    const [loading, setLoading] = useState(false);

    const personSchema = z.object({
        nameField: z.string().min(1, 'Preencha o nome da pessoa'),
        cpfField: z.string().length(11, 'CPF invalido')
    });

    useEffect(() => {
        setErrors([]);
        const data = personSchema.safeParse({ nameField, cpfField });
        if (!data.success) return setErrors(getErrorsFromZod(data.error));
    }, [nameField, cpfField]);

    const handleEditButton = async () => {
        if(errors.length > 0) return;

        setLoading(true);
        const updatedPerson = await api.updatePerson(person.id_event, person.id_group, person.id, { name: nameField, cpf: cpfField });  
        setLoading(false);
        if(updatedPerson) {
            refreshAction();
        } else {
            alert('Não foi possivel atualizar a pessoa');
        }
    }

    return (
        <div>
            <h4 className="text-xl">Editar Pessoa</h4>
                <InputField 
                    value={nameField}
                    onChange={(e) => setNameField(e.target.value)}
                    placeholder="Digite o nome da pessoa"
                    errorMessage={errors.find(e => e.field === 'nameField')?.message}
                    disabled={loading}
                />
                <InputField 
                    value={cpfField}
                    onChange={(e) => setCpfField(escapeCPF(e.target.value))}
                    placeholder="Digite o CPF da pessoa"
                    errorMessage={errors.find(e => e.field === 'cpfField')?.message}
                    disabled={loading}
                />
                <div className="flex gap-3">
                    <Button
                        value='Cancelar'
                        onClick={refreshAction}
                        disabled={loading}
                    />
                    <Button
                        value={loading ? 'Salvando...' : 'Salvar'}
                        onClick={handleEditButton}
                        disabled={loading}
                    />
                </div>
        </div>
    );
}